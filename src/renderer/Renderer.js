import SpriteRenderer from './SpriteRenderer';
import TransparentRenderer from './TransparentRenderer';

/**
 * Используется для инициализация WebGL контекста и отрисовки объектов.
 * Для некоторых объектов может использовать специфичные рендеры.
 *
 * @param {Object} options
 * @param {HTMLElement} options.container Элемент в который будет добавлен canvas
 * @param {Number} [options.pixelRatio=1] Pixel ratio экрана
 * @param {Boolean} [options.antialias=true] Использовать ли антиалиасинг
 * @param {Boolean} [options.autoClear=true] Стирать ли прошлый кадр перед новый рендерингом
 * @param {Array} [options.clearColor=true] Цвет заливки в формате RGBA
 * @param {Object} [options.sortObjects=true] Нужно ли сортировать прозрачные объекты по удаленности
 * или по renderOrder
 * */
class Renderer {
    constructor(options) {
        this._container = typeof options.container === 'string' ?
            document.getElementById(options.container) : options.container;

        this._pixelRatio = options.pixelRatio || 1;
        this._antialias = options.antialias !== undefined ? options.antialias : true;

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
        this._transparentRenderer = new TransparentRenderer();

        this._initCanvas();
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
     * Устанавливает размеры canvas и viewport для WebGL
     * @param {Number} width
     * @param {Number} height
     */
    setSize(width, height) {
        this._size = [
            width * this._pixelRatio,
            height * this._pixelRatio
        ];

        this._canvasElement.width = this._size[0];
        this._canvasElement.height = this._size[1];
        this._canvasElement.style.width = width + 'px';
        this._canvasElement.style.height = height + 'px';
        this._gl.viewport(0, 0, this._size[0], this._size[1]);

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
     * Очищает текущий кадр и заливает цветом указанным в clearColor
     */
    clear() {
        let gl = this._gl;

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
        let gl = this._gl;
        let typedObjects = {
            common: [],
            transparent: [],
            sprites: []
        };

        scene.typifyForRender(typedObjects);

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

        let state = {
            renderer: this,
            scene,
            camera,
            gl
        };
        // TODO: make state immutable?

        typedObjects.common.forEach(object => object.render(state));

        this._transparentRenderer.render(state, typedObjects.transparent);

        this._spriteRenderer.render(state, typedObjects.sprites);

        return this;
    }

    _initCanvas() {
        this._canvasElement = document.createElement('canvas');

        this._canvasElement.width = window.innerWidth;
        this._canvasElement.height = window.innerHeight;

        this._container.appendChild(this._canvasElement);

        let attributes = {
            antialias: this._antialias
        };

        this._gl = this._canvasElement.getContext('webgl', attributes);
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