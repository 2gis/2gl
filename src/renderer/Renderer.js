import SpriteRenderer from './SpriteRenderer';
import MultiSpriteRenderer from './MultiSpriteRenderer';
import TransparentRenderer from './TransparentRenderer';

/**
 * Используется для инициализация WebGL контекста и отрисовки объектов.
 * Для некоторых объектов может использовать специфичные рендеры.
 *
 * @param {Object} options
 * @param {HTMLElement} [options.canvas] Элемент canvas
 * @param {WebGLRenderingContext} [options.gl] Если элемент canvas не указан, то можно напрямую передать WebGL контекст
 * @param {Number} [options.pixelRatio=1] Pixel ratio экрана
 * @param {Boolean} [options.antialias=true] Использовать ли антиалиасинг
 * @param {Boolean} [options.autoClear=true] Стирать ли прошлый кадр перед новый рендерингом
 * @param {Array} [options.clearColor=true] Цвет заливки в формате RGBA
 * @param {Object} [options.sortObjects=true] Нужно ли сортировать прозрачные объекты по удаленности
 * или по renderOrder
 * */
class Renderer {
    constructor(options) {
        options = options || {};

        if (options.canvas) {
            this._canvasElement = typeof options.canvas === 'string' ?
                document.getElementById(options.canvas) : options.canvas;

            const attributes = {
                antialias: options.antialias !== undefined ? options.antialias : true
            };

            this._gl = this._canvasElement.getContext('webgl', attributes) ||
                this._canvasElement.getContext('experimental-webgl', attributes);
        } else {
            this._gl = options.gl;
        }

        this._pixelRatio = options.pixelRatio || 1;

        /**
         * Определяет стирать ли прошлый кадр перед новый рендерингом
         * @type {Boolean}
         */
        this.autoClear = options.autoClear !== undefined ? options.autoClear : true;

        /**
         * Цвет заливки в формате RGBA
         * @type {Array}
         */
        this.clearColor = options.clearColor || [1, 1, 1, 1];
        this.sortObjects = true;

        this._spriteRenderer = new SpriteRenderer();
        this._multiSpriteRenderer = new MultiSpriteRenderer(this);
        this._transparentRenderer = new TransparentRenderer();
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
     */
    render(scene, camera) {
        const gl = this._gl;
        const typedObjects = {
            common: [],
            transparent: [],
            sprites: [],
            multiSprites: []
        };

        scene.typifyForRender(typedObjects);

        if (this._renderTarget) {
            this._renderTarget.bind(gl);
        }

        gl.clearDepth(1);
        gl.clearStencil(0);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);

        if (this.autoClear) {
            this.clear();
        }

        camera.updateLocalMatrix();
        camera.updateWorldMatrix();

        gl.disable(gl.BLEND);

        const state = {
            renderer: this,
            scene,
            camera,
            gl
        };
        // TODO: make state immutable?

        const renderObjects = typedObjects.common;

        if (state.renderer.sortObjects) {
            renderObjects.sort(this._renderOrderSort);
        }

        renderObjects.forEach(object => object.render(state));

        this._transparentRenderer.render(state, typedObjects.transparent);

        this._spriteRenderer.render(state, typedObjects.sprites);

        this._multiSpriteRenderer.render(state, typedObjects.multiSprites);

        if (this._renderTarget) {
            this._renderTarget.unbind(gl);
        }

        return this;
    }

    _renderOrderSort(a, b) {
        return a.renderOrder - b.renderOrder;
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

/**
 * Объект используется для распределения объектов по типам рендеров,
 * т.к. прозрачные объекты и спрайты рендерятся отдельно.
 *
 * @typedef {Object} TypedObjects
 * @property {Array} common Сюда складываются все объекты, для которых нет специальных рендеров
 * @property {Array} transparent Прозрачные объекты
 * @property {Array} sprites Спрайты
 */
