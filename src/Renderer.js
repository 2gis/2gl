import Object3DPlugin from './rendererPlugins/Object3DPlugin';

/**
 * Используется для инициализация WebGL контекста и отрисовки объектов.
 * Для некоторых объектов может использовать специфичные рендеры.
 *
 * @param {Object} options
 * @param {HTMLElement} [options.canvas] Элемент canvas
 * @param {WebGLRenderingContext} [options.gl] Если элемент canvas не указан, то можно напрямую передать WebGL контекст
 * @param {Number} [options.pixelRatio=1] Pixel ratio экрана
 * @param {Boolean} [options.antialias=true] Использовать ли антиалиасинг
 * @param {Boolean} [options.stencil=false] Использовать ли stencil buffer
 * @param {Boolean} [options.autoClear=true] Стирать ли прошлый кадр перед новый рендерингом
 * @param {Number[]} [options.clearColor=[1,1,1,1]] Цвет заливки в формате RGBA
 * @param {Boolean} [options.sortObjects=true] Нужно ли сортировать прозрачные объекты по удаленности
 * или по renderOrder
 * */
class Renderer {
    constructor(options) {
        options = options || {};

        if (options.canvas) {
            this._canvasElement = typeof options.canvas === 'string' ?
                document.getElementById(options.canvas) : options.canvas;

            const attributes = {
                antialias: options.antialias !== undefined ? options.antialias : true,
                stencil: options.stencil !== undefined ? options.stencil : false,
                failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat !== undefined ?
                    options.failIfMajorPerformanceCaveat : false
            };

            this._gl = options.version === 2 ?
                this._canvasElement.getContext('webgl2', attributes) :
                (this._canvasElement.getContext('webgl', attributes) ||
                    this._canvasElement.getContext('experimental-webgl', attributes));
        } else {
            this._gl = options.gl;
        }

        this._pixelRatio = options.pixelRatio || 1;

        /**
         * Определяет стирать ли прошлый кадр перед новым рендерингом
         * @type {Boolean}
         */
        this.autoClear = options.autoClear !== undefined ? options.autoClear : true;

        /**
         * Цвет заливки в формате RGBA
         * @type {Array}
         */
        this.clearColor = options.clearColor || [1, 1, 1, 1];
        this.sortObjects = true;

        this._plugins = [];
        this._pluginsByType = {};
        this._maxPluginOrder = 0;

        this.addPlugin(new Object3DPlugin(), 0);

        /**
         * Список включенных WebGL расширений
         * @type {Object}
         */
        this.webGlExtensions = {};
    }

    /**
     * Добавляет {@link RendererPlugin} к рендеру. К рендеру может быть добавлен только один плагин каждого типа.
     * @param {Plugin} plugin Плагин
     * @param {?Number} order Каждый плагин выполняется при рендеринге по возрастанию order,
     * если его нет, то выбирается максимальный order + 1.
     */
    addPlugin(plugin, order) {
        if (order === undefined) {
            order = this._maxPluginOrder + 1;
        }

        this._plugins.push({
            plugin,
            order
        });
        this._plugins.sort((a, b) => a.order - b.order);
        this._pluginsByType[plugin.type] = plugin;

        this._maxPluginOrder = Math.max.apply(Math, this._plugins.map(p => p.order));

        return this;
    }

    /**
     * Удаляет {@link RendererPlugin} из рендера.
     * @param {Plugin} Plugin Класс плагина
     */
    removePlugin(Plugin) {
        this._plugins.some((el, i) => {
            if (el.plugin instanceof Plugin) {
                delete this._pluginsByType[this._plugins[i].plugin.type];
                this._plugins.splice(i, 1);
                return true;
            }
            return false;
        });

        return this;
    }

    /**
     * Устанавливает параметр pixel ratio
     * @param {Number} value
     */
    setPixelRatio(value) {
        this._pixelRatio = value;

        return this;
    }

    /**
     * Возвращает текущий pixel ratio
     * @returns {Number}
     */
    getPixelRatio() {
        return this._pixelRatio;
    }

    /**
     * Устанавливает размеры элементу canvas и viewport для WebGL
     * @param {Number} width Ширина в пикселях
     * @param {Number} height Высота в пикселях
     */
    setSize(width, height) {
        this._size = [
            width * this._pixelRatio,
            height * this._pixelRatio
        ];

        if (this._canvasElement) {
            this._canvasElement.width = this._size[0];
            this._canvasElement.height = this._size[1];
            this._canvasElement.style.width = width + 'px';
            this._canvasElement.style.height = height + 'px';
        }

        this.setViewport();

        return this;
    }

    /**
     * Устанавливает viewport для WebGL
     * Если размеры не указаны, то выставляет размеры указанные в функции {@link Renderer#setSize}
     * @param {Number} [width] Ширина в пикселях
     * @param {Number} [height] Высота в пикселях
     */
    setViewport(width, height) {
        if (width !== undefined && height !== undefined) {
            this._gl.viewport(0, 0, width, height);
        } else {
            this._gl.viewport(0, 0, this._size[0], this._size[1]);
        }

        return this;
    }

    /**
     * Возвращает текущий viewport WebGL
     * @returns {Array}
     */
    getSize() {
        return this._size;
    }

    /**
     * Устанавливает RenderTarget
     * @param {?RenderTarget} renderTarget
     */
    setRenderTarget(renderTarget) {
        this._renderTarget = renderTarget;
        return this;
    }

    /**
     * Считывает указанную область пикселей в массив
     * @param {Number} x Координаты начала области
     * @param {Number} y Координаты начала области
     * @param {Number} width Ширина области
     * @param {Number} height Высота области
     * @param {TypedArray} array Массив для записи данных
     */
    readPixels(x, y, width, height, array) {
        const gl = this._gl;

        if (this._renderTarget) {
            this._renderTarget.bind(gl);
            gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, array);
            this._renderTarget.unbind(gl);
        } else {
            gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, array);
        }

        return this;
    }

    /**
     * Очищает текущий кадр и заливает цветом указанным в clearColor
     */
    clear() {
        const gl = this._gl;

        gl.clearColor.apply(gl, this.clearColor);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        return this;
    }

    /**
     * Рисует сцену
     * @param {Scene} scene Сцена
     * @param {Camera} camera Камера
     * @param {*} userData Дополнительная информация, которая будет передана всем плагинам и объектам
     */
    render(scene, camera, userData) {
        const gl = this._gl;

        scene.typifyForRender(this._pluginsByType);

        if (this._renderTarget) {
            this._renderTarget.bind(gl);
        }

        gl.clearDepth(1);
        gl.clearStencil(0);

        if (this.autoClear) {
            this.clear();
        }

        camera.updateLocalMatrix();
        camera.updateWorldMatrix();

        const state = {
            renderer: this,
            extensions: this.webGlExtensions,
            scene,
            camera,
            gl,
            userData
        };
        // TODO: make state immutable?

        const pluginsToRender = this._plugins
            .map(item => item.plugin)
            .filter(plugin => plugin.hasObjects());

        for (let i = 0; i < pluginsToRender.length; i++) {
            pluginsToRender[i].render(
                state,
                pluginsToRender[i - 1],
                pluginsToRender[i + 1]
            );
        }

        if (this._renderTarget) {
            this._renderTarget.unbind(gl);
        }

        return this;
    }

    /**
     * Включает расширение WebGL
     *
     * @param {String} name Название расширения
     */
    addExtension(name) {
        this.webGlExtensions[name] = this._gl.getExtension(name);
        return this;
    }
}

export default Renderer;

/**
 * Состояние рендера. Передается объектам для отрисовки.
 *
 * @typedef {Object} State
 * @property {WebGLRenderingContext} gl
 * @property {Scene} scene
 * @property {Camera} camera
 * @property {Renderer} renderer
 */
