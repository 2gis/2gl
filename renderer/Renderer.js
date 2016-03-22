'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteRenderer = require('./SpriteRenderer');

var _SpriteRenderer2 = _interopRequireDefault(_SpriteRenderer);

var _TransparentRenderer = require('./TransparentRenderer');

var _TransparentRenderer2 = _interopRequireDefault(_TransparentRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Renderer = function () {
    function Renderer(options) {
        _classCallCheck(this, Renderer);

        // this._container = typeof options.container === 'string' ?
        //     document.getElementById(options.container) : options.container;

        this._gl = options.context;

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

        this._spriteRenderer = new _SpriteRenderer2.default();
        this._transparentRenderer = new _TransparentRenderer2.default();

        // this._initializeCanvas();
    }

    /**
     * Устанавливает параметр pixel ratio
     * @param {Number} value
     */


    _createClass(Renderer, [{
        key: 'setPixelRatio',
        value: function setPixelRatio(value) {
            this._pixelRatio = value;

            return this;
        }

        /**
         * Возвращает текущий pixel ratio
         * @returns {Number}
         */

    }, {
        key: 'getPixelRatio',
        value: function getPixelRatio() {
            return this._pixelRatio;
        }

        /**
         * Устанавливает размеры элементу canvas и viewport для WebGL
         * @param {Number} width Ширина в пикселях
         * @param {Number} height Высота в пикселях
         */

    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this._size = [width * this._pixelRatio, height * this._pixelRatio];

            // this._canvasElement.width = this._size[0];
            // this._canvasElement.height = this._size[1];
            // this._canvasElement.style.width = width + 'px';
            // this._canvasElement.style.height = height + 'px';
            // this._gl.viewport(0, 0, this._size[0], this._size[1]);

            return this;
        }

        /**
         * Возвращает текущий viewport WebGL
         * @returns {Array}
         */

    }, {
        key: 'getSize',
        value: function getSize() {
            return this._size;
        }

        /**
         * Очищает текущий кадр и заливает цветом указанным в clearColor
         */

    }, {
        key: 'clear',
        value: function clear() {
            var gl = this._gl;

            gl.clearColor.apply(gl, this.clearColor);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            return this;
        }

        /**
         * Рисует сцену
         * @param {Scene} scene Сцена
         * @param {Camera} camera Камера
         */

    }, {
        key: 'render',
        value: function render(scene, camera) {
            var gl = this._gl;
            var typedObjects = {
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

            var state = {
                renderer: this,
                scene: scene,
                camera: camera,
                gl: gl
            };
            // TODO: make state immutable?

            var renderObjects = typedObjects.common;

            if (state.renderer.sortObjects) {
                renderObjects.sort(this._renderOrderSort);
            }

            renderObjects.forEach(function (object) {
                return object.render(state);
            });

            this._transparentRenderer.render(state, typedObjects.transparent);

            this._spriteRenderer.render(state, typedObjects.sprites);

            return this;
        }
    }, {
        key: '_initializeCanvas',
        value: function _initializeCanvas() {
            this._canvasElement = document.createElement('canvas');
            this._container.appendChild(this._canvasElement);

            var attributes = {
                antialias: this._antialias
            };

            this._gl = this._canvasElement.getContext('webgl', attributes) || this._canvasElement.getContext('experimental-webgl', attributes);
        }
    }, {
        key: '_renderOrderSort',
        value: function _renderOrderSort(a, b) {
            return a.renderOrder - b.renderOrder;
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;

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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlci9SZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlTTtBQUNGLGFBREUsUUFDRixDQUFZLE9BQVosRUFBcUI7OEJBRG5CLFVBQ21COzs7OztBQUlqQixhQUFLLEdBQUwsR0FBVyxRQUFRLE9BQVIsQ0FKTTs7QUFNakIsYUFBSyxXQUFMLEdBQW1CLFFBQVEsVUFBUixJQUFzQixDQUF0QixDQU5GO0FBT2pCLGFBQUssVUFBTCxHQUFrQixRQUFRLFNBQVIsS0FBc0IsU0FBdEIsR0FBa0MsUUFBUSxTQUFSLEdBQW9CLElBQXREOzs7Ozs7QUFQRCxZQWFqQixDQUFLLFNBQUwsR0FBaUIsUUFBUSxTQUFSLEtBQXNCLFNBQXRCLEdBQWtDLFFBQVEsU0FBUixHQUFvQixJQUF0RDs7Ozs7O0FBYkEsWUFtQmpCLENBQUssVUFBTCxHQUFrQixRQUFRLFVBQVIsSUFBc0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBQXRCLENBbkJEO0FBb0JqQixhQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FwQmlCOztBQXNCakIsYUFBSyxlQUFMLEdBQXVCLDhCQUF2QixDQXRCaUI7QUF1QmpCLGFBQUssb0JBQUwsR0FBNEIsbUNBQTVCOzs7QUF2QmlCLEtBQXJCOzs7Ozs7OztpQkFERTs7c0NBaUNZLE9BQU87QUFDakIsaUJBQUssV0FBTCxHQUFtQixLQUFuQixDQURpQjs7QUFHakIsbUJBQU8sSUFBUCxDQUhpQjs7Ozs7Ozs7Ozt3Q0FVTDtBQUNaLG1CQUFPLEtBQUssV0FBTCxDQURLOzs7Ozs7Ozs7OztnQ0FTUixPQUFPLFFBQVE7QUFDbkIsaUJBQUssS0FBTCxHQUFhLENBQ1QsUUFBUSxLQUFLLFdBQUwsRUFDUixTQUFTLEtBQUssV0FBTCxDQUZiOzs7Ozs7OztBQURtQixtQkFZWixJQUFQLENBWm1COzs7Ozs7Ozs7O2tDQW1CYjtBQUNOLG1CQUFPLEtBQUssS0FBTCxDQUREOzs7Ozs7Ozs7Z0NBT0Y7QUFDSixnQkFBTSxLQUFLLEtBQUssR0FBTCxDQURQOztBQUdKLGVBQUcsVUFBSCxDQUFjLEtBQWQsQ0FBb0IsRUFBcEIsRUFBd0IsS0FBSyxVQUFMLENBQXhCLENBSEk7QUFJSixlQUFHLEtBQUgsQ0FBUyxHQUFHLGdCQUFILEdBQXNCLEdBQUcsZ0JBQUgsQ0FBL0IsQ0FKSTs7QUFNSixtQkFBTyxJQUFQLENBTkk7Ozs7Ozs7Ozs7OytCQWNELE9BQU8sUUFBUTtBQUNsQixnQkFBTSxLQUFLLEtBQUssR0FBTCxDQURPO0FBRWxCLGdCQUFNLGVBQWU7QUFDakIsd0JBQVEsRUFBUjtBQUNBLDZCQUFhLEVBQWI7QUFDQSx5QkFBUyxFQUFUO2FBSEUsQ0FGWTs7QUFRbEIsa0JBQU0sZUFBTixDQUFzQixZQUF0QixFQVJrQjs7QUFVbEIsZUFBRyxVQUFILENBQWMsQ0FBZCxFQVZrQjtBQVdsQixlQUFHLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFYa0I7O0FBYWxCLGVBQUcsTUFBSCxDQUFVLEdBQUcsVUFBSCxDQUFWLENBYmtCO0FBY2xCLGVBQUcsU0FBSCxDQUFhLEdBQUcsTUFBSCxDQUFiLENBZGtCOztBQWdCbEIsZUFBRyxTQUFILENBQWEsR0FBRyxHQUFILENBQWIsQ0FoQmtCO0FBaUJsQixlQUFHLFFBQUgsQ0FBWSxHQUFHLElBQUgsQ0FBWixDQWpCa0I7QUFrQmxCLGVBQUcsTUFBSCxDQUFVLEdBQUcsU0FBSCxDQUFWLENBbEJrQjs7QUFvQmxCLGdCQUFJLEtBQUssU0FBTCxFQUFnQjtBQUNoQixxQkFBSyxLQUFMLEdBRGdCO2FBQXBCOztBQUlBLG1CQUFPLGlCQUFQLEdBeEJrQjtBQXlCbEIsbUJBQU8saUJBQVAsR0F6QmtCOztBQTJCbEIsZUFBRyxPQUFILENBQVcsR0FBRyxLQUFILENBQVgsQ0EzQmtCOztBQTZCbEIsZ0JBQU0sUUFBUTtBQUNWLDBCQUFVLElBQVY7QUFDQSw0QkFGVTtBQUdWLDhCQUhVO0FBSVYsc0JBSlU7YUFBUjs7O0FBN0JZLGdCQXFDWixnQkFBZ0IsYUFBYSxNQUFiLENBckNKOztBQXVDbEIsZ0JBQUksTUFBTSxRQUFOLENBQWUsV0FBZixFQUE0QjtBQUM1Qiw4QkFBYyxJQUFkLENBQW1CLEtBQUssZ0JBQUwsQ0FBbkIsQ0FENEI7YUFBaEM7O0FBSUEsMEJBQWMsT0FBZCxDQUFzQjt1QkFBVSxPQUFPLE1BQVAsQ0FBYyxLQUFkO2FBQVYsQ0FBdEIsQ0EzQ2tCOztBQTZDbEIsaUJBQUssb0JBQUwsQ0FBMEIsTUFBMUIsQ0FBaUMsS0FBakMsRUFBd0MsYUFBYSxXQUFiLENBQXhDLENBN0NrQjs7QUErQ2xCLGlCQUFLLGVBQUwsQ0FBcUIsTUFBckIsQ0FBNEIsS0FBNUIsRUFBbUMsYUFBYSxPQUFiLENBQW5DLENBL0NrQjs7QUFpRGxCLG1CQUFPLElBQVAsQ0FqRGtCOzs7OzRDQW9ERjtBQUNoQixpQkFBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUF0QixDQURnQjtBQUVoQixpQkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssY0FBTCxDQUE1QixDQUZnQjs7QUFJaEIsZ0JBQU0sYUFBYTtBQUNmLDJCQUFXLEtBQUssVUFBTDthQURULENBSlU7O0FBUWhCLGlCQUFLLEdBQUwsR0FBVyxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBeEMsS0FDUCxLQUFLLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBK0Isb0JBQS9CLEVBQXFELFVBQXJELENBRE8sQ0FSSzs7Ozt5Q0FZSCxHQUFHLEdBQUc7QUFDbkIsbUJBQU8sRUFBRSxXQUFGLEdBQWdCLEVBQUUsV0FBRixDQURKOzs7O1dBNUpyQjs7O2tCQWlLUyIsImZpbGUiOiJSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTcHJpdGVSZW5kZXJlciBmcm9tICcuL1Nwcml0ZVJlbmRlcmVyJztcbmltcG9ydCBUcmFuc3BhcmVudFJlbmRlcmVyIGZyb20gJy4vVHJhbnNwYXJlbnRSZW5kZXJlcic7XG5cbi8qKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyBXZWJHTCDQutC+0L3RgtC10LrRgdGC0LAg0Lgg0L7RgtGA0LjRgdC+0LLQutC4INC+0LHRitC10LrRgtC+0LIuXG4gKiDQlNC70Y8g0L3QtdC60L7RgtC+0YDRi9GFINC+0LHRitC10LrRgtC+0LIg0LzQvtC20LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0YHQv9C10YbQuNGE0LjRh9C90YvQtSDRgNC10L3QtNC10YDRiy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb3B0aW9ucy5jb250YWluZXIg0K3Qu9C10LzQtdC90YIg0LIg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDQtNC+0LHQsNCy0LvQtdC9IGNhbnZhc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnBpeGVsUmF0aW89MV0gUGl4ZWwgcmF0aW8g0Y3QutGA0LDQvdCwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFudGlhbGlhcz10cnVlXSDQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LvQuCDQsNC90YLQuNCw0LvQuNCw0YHQuNC90LNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYXV0b0NsZWFyPXRydWVdINCh0YLQuNGA0LDRgtGMINC70Lgg0L/RgNC+0YjQu9GL0Lkg0LrQsNC00YAg0L/QtdGA0LXQtCDQvdC+0LLRi9C5INGA0LXQvdC00LXRgNC40L3Qs9C+0LxcbiAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmNsZWFyQ29sb3I9dHJ1ZV0g0KbQstC10YIg0LfQsNC70LjQstC60Lgg0LIg0YTQvtGA0LzQsNGC0LUgUkdCQVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnNvcnRPYmplY3RzPXRydWVdINCd0YPQttC90L4g0LvQuCDRgdC+0YDRgtC40YDQvtCy0LDRgtGMINC/0YDQvtC30YDQsNGH0L3Ri9C1INC+0LHRitC10LrRgtGLINC/0L4g0YPQtNCw0LvQtdC90L3QvtGB0YLQuFxuICog0LjQu9C4INC/0L4gcmVuZGVyT3JkZXJcbiAqICovXG5jbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICAvLyB0aGlzLl9jb250YWluZXIgPSB0eXBlb2Ygb3B0aW9ucy5jb250YWluZXIgPT09ICdzdHJpbmcnID9cbiAgICAgICAgLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdGlvbnMuY29udGFpbmVyKSA6IG9wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgICAgIHRoaXMuX2dsID0gb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgIHRoaXMuX3BpeGVsUmF0aW8gPSBvcHRpb25zLnBpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgdGhpcy5fYW50aWFsaWFzID0gb3B0aW9ucy5hbnRpYWxpYXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYW50aWFsaWFzIDogdHJ1ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J7Qv9GA0LXQtNC10LvRj9C10YIg0YHRgtC40YDQsNGC0Ywg0LvQuCDQv9GA0L7RiNC70YvQuSDQutCw0LTRgCDQv9C10YDQtdC0INC90L7QstGL0Lkg0YDQtdC90LTQtdGA0LjQvdCz0L7QvFxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gb3B0aW9ucy5hdXRvQ2xlYXIgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b0NsZWFyIDogdHJ1ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KbQstC10YIg0LfQsNC70LjQstC60Lgg0LIg0YTQvtGA0LzQsNGC0LUgUkdCQVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsZWFyQ29sb3IgPSBvcHRpb25zLmNsZWFyQ29sb3IgfHwgWzEsIDEsIDEsIDFdO1xuICAgICAgICB0aGlzLnNvcnRPYmplY3RzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9zcHJpdGVSZW5kZXJlciA9IG5ldyBTcHJpdGVSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLl90cmFuc3BhcmVudFJlbmRlcmVyID0gbmV3IFRyYW5zcGFyZW50UmVuZGVyZXIoKTtcblxuICAgICAgICAvLyB0aGlzLl9pbml0aWFsaXplQ2FudmFzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0L/QsNGA0LDQvNC10YLRgCBwaXhlbCByYXRpb1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFBpeGVsUmF0aW8odmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGl4ZWxSYXRpbyA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0LXQutGD0YnQuNC5IHBpeGVsIHJhdGlvXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRQaXhlbFJhdGlvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGl4ZWxSYXRpbztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtGDIGNhbnZhcyDQuCB2aWV3cG9ydCDQtNC70Y8gV2ViR0xcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGgg0KjQuNGA0LjQvdCwINCyINC/0LjQutGB0LXQu9GP0YVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0INCS0YvRgdC+0YLQsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICovXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBbXG4gICAgICAgICAgICB3aWR0aCAqIHRoaXMuX3BpeGVsUmF0aW8sXG4gICAgICAgICAgICBoZWlnaHQgKiB0aGlzLl9waXhlbFJhdGlvXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gdGhpcy5fY2FudmFzRWxlbWVudC53aWR0aCA9IHRoaXMuX3NpemVbMF07XG4gICAgICAgIC8vIHRoaXMuX2NhbnZhc0VsZW1lbnQuaGVpZ2h0ID0gdGhpcy5fc2l6ZVsxXTtcbiAgICAgICAgLy8gdGhpcy5fY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgLy8gdGhpcy5fY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICAvLyB0aGlzLl9nbC52aWV3cG9ydCgwLCAwLCB0aGlzLl9zaXplWzBdLCB0aGlzLl9zaXplWzFdKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgtC10LrRg9GJ0LjQuSB2aWV3cG9ydCBXZWJHTFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGH0LjRidCw0LXRgiDRgtC10LrRg9GJ0LjQuSDQutCw0LTRgCDQuCDQt9Cw0LvQuNCy0LDQtdGCINGG0LLQtdGC0L7QvCDRg9C60LDQt9Cw0L3QvdGL0Lwg0LIgY2xlYXJDb2xvclxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgICAgIGdsLmNsZWFyQ29sb3IuYXBwbHkoZ2wsIHRoaXMuY2xlYXJDb2xvcik7XG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10YIg0YHRhtC10L3Rg1xuICAgICAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lINCh0YbQtdC90LBcbiAgICAgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhINCa0LDQvNC10YDQsFxuICAgICAqL1xuICAgIHJlbmRlcihzY2VuZSwgY2FtZXJhKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGNvbnN0IHR5cGVkT2JqZWN0cyA9IHtcbiAgICAgICAgICAgIGNvbW1vbjogW10sXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogW10sXG4gICAgICAgICAgICBzcHJpdGVzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIHNjZW5lLnR5cGlmeUZvclJlbmRlcih0eXBlZE9iamVjdHMpO1xuXG4gICAgICAgIGdsLmNsZWFyRGVwdGgoMSk7XG4gICAgICAgIGdsLmNsZWFyU3RlbmNpbCgwKTtcblxuICAgICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xuXG4gICAgICAgIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICAgICAgICBnbC5jdWxsRmFjZShnbC5CQUNLKTtcbiAgICAgICAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW1lcmEudXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVdvcmxkTWF0cml4KCk7XG5cbiAgICAgICAgZ2wuZGlzYWJsZShnbC5CTEVORCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgICByZW5kZXJlcjogdGhpcyxcbiAgICAgICAgICAgIHNjZW5lLFxuICAgICAgICAgICAgY2FtZXJhLFxuICAgICAgICAgICAgZ2xcbiAgICAgICAgfTtcbiAgICAgICAgLy8gVE9ETzogbWFrZSBzdGF0ZSBpbW11dGFibGU/XG5cbiAgICAgICAgY29uc3QgcmVuZGVyT2JqZWN0cyA9IHR5cGVkT2JqZWN0cy5jb21tb247XG5cbiAgICAgICAgaWYgKHN0YXRlLnJlbmRlcmVyLnNvcnRPYmplY3RzKSB7XG4gICAgICAgICAgICByZW5kZXJPYmplY3RzLnNvcnQodGhpcy5fcmVuZGVyT3JkZXJTb3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlck9iamVjdHMuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LnJlbmRlcihzdGF0ZSkpO1xuXG4gICAgICAgIHRoaXMuX3RyYW5zcGFyZW50UmVuZGVyZXIucmVuZGVyKHN0YXRlLCB0eXBlZE9iamVjdHMudHJhbnNwYXJlbnQpO1xuXG4gICAgICAgIHRoaXMuX3Nwcml0ZVJlbmRlcmVyLnJlbmRlcihzdGF0ZSwgdHlwZWRPYmplY3RzLnNwcml0ZXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplQ2FudmFzKCkge1xuICAgICAgICB0aGlzLl9jYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXNFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgYW50aWFsaWFzOiB0aGlzLl9hbnRpYWxpYXNcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9nbCA9IHRoaXMuX2NhbnZhc0VsZW1lbnQuZ2V0Q29udGV4dCgnd2ViZ2wnLCBhdHRyaWJ1dGVzKSB8fFxuICAgICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyT3JkZXJTb3J0KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEucmVuZGVyT3JkZXIgLSBiLnJlbmRlck9yZGVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXI7XG5cbi8qKlxuICog0KHQvtGB0YLQvtGP0L3QuNC1INGA0LXQvdC00LXRgNCwLiDQn9C10YDQtdC00LDQtdGC0YHRjyDQvtCx0YrQtdC60YLQsNC8INC00LvRjyDQvtGC0YDQuNGB0L7QstC60LguXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdGVcbiAqIEBwcm9wZXJ0eSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICogQHByb3BlcnR5IHtTY2VuZX0gc2NlbmVcbiAqIEBwcm9wZXJ0eSB7Q2FtZXJhfSBjYW1lcmFcbiAqIEBwcm9wZXJ0eSB7UmVuZGVyZXJ9IHJlbmRlcmVyXG4gKi9cblxuLyoqXG4gKiDQntCx0YrQtdC60YIg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjRjyDQvtCx0YrQtdC60YLQvtCyINC/0L4g0YLQuNC/0LDQvCDRgNC10L3QtNC10YDQvtCyLFxuICog0YIu0LouINC/0YDQvtC30YDQsNGH0L3Ri9C1INC+0LHRitC10LrRgtGLINC4INGB0L/RgNCw0LnRgtGLINGA0LXQvdC00LXRgNGP0YLRgdGPINC+0YLQtNC10LvRjNC90L4uXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVHlwZWRPYmplY3RzXG4gKiBAcHJvcGVydHkge0FycmF5fSBjb21tb24g0KHRjtC00LAg0YHQutC70LDQtNGL0LLQsNGO0YLRgdGPINCy0YHQtSDQvtCx0YrQtdC60YLRiywg0LTQu9GPINC60L7RgtC+0YDRi9GFINC90LXRgiDRgdC/0LXRhtC40LDQu9GM0L3Ri9GFINGA0LXQvdC00LXRgNC+0LJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHRyYW5zcGFyZW50INCf0YDQvtC30YDQsNGH0L3Ri9C1INC+0LHRitC10LrRgtGLXG4gKiBAcHJvcGVydHkge0FycmF5fSBzcHJpdGVzINCh0L/RgNCw0LnRgtGLXG4gKi9cbiJdfQ==