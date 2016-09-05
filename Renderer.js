'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3DPlugin = require('./rendererPlugins/Object3DPlugin');

var _Object3DPlugin2 = _interopRequireDefault(_Object3DPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 * @param {Array} [options.clearColor=true] Цвет заливки в формате RGBA
 * @param {Object} [options.sortObjects=true] Нужно ли сортировать прозрачные объекты по удаленности
 * или по renderOrder
 * */
var Renderer = function () {
    function Renderer(options) {
        _classCallCheck(this, Renderer);

        options = options || {};

        if (options.canvas) {
            this._canvasElement = typeof options.canvas === 'string' ? document.getElementById(options.canvas) : options.canvas;

            var attributes = {
                antialias: options.antialias !== undefined ? options.antialias : true,
                stencil: options.stencil !== undefined ? options.stencil : false,
                failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat !== undefined ? options.failIfMajorPerformanceCaveat : false
            };

            this._gl = this._canvasElement.getContext('webgl', attributes) || this._canvasElement.getContext('experimental-webgl', attributes);
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

        this.addPlugin(new _Object3DPlugin2.default(), 0);

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


    _createClass(Renderer, [{
        key: 'addPlugin',
        value: function addPlugin(plugin, order) {
            if (order === undefined) {
                order = this._maxPluginOrder + 1;
            }

            this._plugins.push({
                plugin: plugin,
                order: order
            });
            this._plugins.sort(function (a, b) {
                return a.order - b.order;
            });
            this._pluginsByType[plugin.type] = plugin;

            this._maxPluginOrder = Math.max.apply(Math, this._plugins.map(function (p) {
                return p.order;
            }));

            return this;
        }

        /**
         * Удаляет {@link RendererPlugin} из рендера.
         * @param {Plugin} Plugin Класс плагина
         */

    }, {
        key: 'removePlugin',
        value: function removePlugin(Plugin) {
            var _this = this;

            this._plugins.some(function (el, i) {
                if (el.plugin instanceof Plugin) {
                    delete _this._pluginsByType[_this._plugins[i].plugin.type];
                    _this._plugins.splice(i, 1);
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

    }, {
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

    }, {
        key: 'setViewport',
        value: function setViewport(width, height) {
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

    }, {
        key: 'getSize',
        value: function getSize() {
            return this._size;
        }

        /**
         * Устанавливает RenderTarget
         * @param {?RenderTarget} renderTarget
         */

    }, {
        key: 'setRenderTarget',
        value: function setRenderTarget(renderTarget) {
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

    }, {
        key: 'readPixels',
        value: function readPixels(x, y, width, height, array) {
            var gl = this._gl;

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
         * @param {*} userData Дополнительная информация, которая будет передана всем плагинам и объектам
         */

    }, {
        key: 'render',
        value: function render(scene, camera, userData) {
            var gl = this._gl;

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

            var state = {
                renderer: this,
                extensions: this.webGlExtensions,
                scene: scene,
                camera: camera,
                gl: gl,
                userData: userData
            };
            // TODO: make state immutable?

            var pluginsToRender = this._plugins.map(function (item) {
                return item.plugin;
            }).filter(function (plugin) {
                return plugin.hasObjects();
            });

            for (var i = 0; i < pluginsToRender.length; i++) {
                pluginsToRender[i].render(state, pluginsToRender[i - 1], pluginsToRender[i + 1]);
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

    }, {
        key: 'addExtension',
        value: function addExtension(name) {
            this.webGlExtensions[name] = this._gl.getExtension(name);
            return this;
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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LENBQW1CLElBQW5CLENBQXdCLEVBQXhCO0FBQ0g7O0FBRUQsZUFBRyxVQUFILENBQWMsQ0FBZDtBQUNBLGVBQUcsWUFBSCxDQUFnQixDQUFoQjs7QUFFQSxnQkFBSSxLQUFLLFNBQVQsRUFBb0I7QUFDaEIscUJBQUssS0FBTDtBQUNIOztBQUVELG1CQUFPLGlCQUFQO0FBQ0EsbUJBQU8saUJBQVA7O0FBRUEsZ0JBQU0sUUFBUTtBQUNWLDBCQUFVLElBREE7QUFFViw0QkFBWSxLQUFLLGVBRlA7QUFHViw0QkFIVTtBQUlWLDhCQUpVO0FBS1Ysc0JBTFU7QUFNVjtBQU5VLGFBQWQ7QUFRQTs7QUFFQSxnQkFBTSxrQkFBa0IsS0FBSyxRQUFMLENBQ25CLEdBRG1CLENBQ2Y7QUFBQSx1QkFBUSxLQUFLLE1BQWI7QUFBQSxhQURlLEVBRW5CLE1BRm1CLENBRVo7QUFBQSx1QkFBVSxPQUFPLFVBQVAsRUFBVjtBQUFBLGFBRlksQ0FBeEI7O0FBSUEsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxnQkFBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDN0MsZ0NBQWdCLENBQWhCLEVBQW1CLE1BQW5CLENBQ0ksS0FESixFQUVJLGdCQUFnQixJQUFJLENBQXBCLENBRkosRUFHSSxnQkFBZ0IsSUFBSSxDQUFwQixDQUhKO0FBS0g7O0FBRUQsZ0JBQUksS0FBSyxhQUFULEVBQXdCO0FBQ3BCLHFCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsRUFBMUI7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3FDQUthLEksRUFBTTtBQUNmLGlCQUFLLGVBQUwsQ0FBcUIsSUFBckIsSUFBNkIsS0FBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixJQUF0QixDQUE3QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLFE7O0FBRWYiLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2JqZWN0M0RQbHVnaW4gZnJvbSAnLi9yZW5kZXJlclBsdWdpbnMvT2JqZWN0M0RQbHVnaW4nO1xuXG4vKipcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8gV2ViR0wg0LrQvtC90YLQtdC60YHRgtCwINC4INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQvtCyLlxuICog0JTQu9GPINC90LXQutC+0YLQvtGA0YvRhSDQvtCx0YrQtdC60YLQvtCyINC80L7QttC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGB0L/QtdGG0LjRhNC40YfQvdGL0LUg0YDQtdC90LTQtdGA0YsuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtvcHRpb25zLmNhbnZhc10g0K3Qu9C10LzQtdC90YIgY2FudmFzXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gW29wdGlvbnMuZ2xdINCV0YHQu9C4INGN0LvQtdC80LXQvdGCIGNhbnZhcyDQvdC1INGD0LrQsNC30LDQvSwg0YLQviDQvNC+0LbQvdC+INC90LDQv9GA0Y/QvNGD0Y4g0L/QtdGA0LXQtNCw0YLRjCBXZWJHTCDQutC+0L3RgtC10LrRgdGCXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucGl4ZWxSYXRpbz0xXSBQaXhlbCByYXRpbyDRjdC60YDQsNC90LBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYW50aWFsaWFzPXRydWVdINCY0YHQv9C+0LvRjNC30L7QstCw0YLRjCDQu9C4INCw0L3RgtC40LDQu9C40LDRgdC40L3Qs1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5zdGVuY2lsPWZhbHNlXSDQmNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LvQuCBzdGVuY2lsIGJ1ZmZlclxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hdXRvQ2xlYXI9dHJ1ZV0g0KHRgtC40YDQsNGC0Ywg0LvQuCDQv9GA0L7RiNC70YvQuSDQutCw0LTRgCDQv9C10YDQtdC0INC90L7QstGL0Lkg0YDQtdC90LTQtdGA0LjQvdCz0L7QvFxuICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuY2xlYXJDb2xvcj10cnVlXSDQptCy0LXRgiDQt9Cw0LvQuNCy0LrQuCDQsiDRhNC+0YDQvNCw0YLQtSBSR0JBXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuc29ydE9iamVjdHM9dHJ1ZV0g0J3Rg9C20L3QviDQu9C4INGB0L7RgNGC0LjRgNC+0LLQsNGC0Ywg0L/RgNC+0LfRgNCw0YfQvdGL0LUg0L7QsdGK0LXQutGC0Ysg0L/QviDRg9C00LDQu9C10L3QvdC+0YHRgtC4XG4gKiDQuNC70Lgg0L/QviByZW5kZXJPcmRlclxuICogKi9cbmNsYXNzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmIChvcHRpb25zLmNhbnZhcykge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudCA9IHR5cGVvZiBvcHRpb25zLmNhbnZhcyA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdGlvbnMuY2FudmFzKSA6IG9wdGlvbnMuY2FudmFzO1xuXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgICAgIGFudGlhbGlhczogb3B0aW9ucy5hbnRpYWxpYXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYW50aWFsaWFzIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGVuY2lsOiBvcHRpb25zLnN0ZW5jaWwgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuc3RlbmNpbCA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZhaWxJZk1ham9yUGVyZm9ybWFuY2VDYXZlYXQ6IG9wdGlvbnMuZmFpbElmTWFqb3JQZXJmb3JtYW5jZUNhdmVhdCAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5mYWlsSWZNYWpvclBlcmZvcm1hbmNlQ2F2ZWF0IDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuX2dsID0gdGhpcy5fY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCd3ZWJnbCcsIGF0dHJpYnV0ZXMpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gb3B0aW9ucy5nbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BpeGVsUmF0aW8gPSBvcHRpb25zLnBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J7Qv9GA0LXQtNC10LvRj9C10YIg0YHRgtC40YDQsNGC0Ywg0LvQuCDQv9GA0L7RiNC70YvQuSDQutCw0LTRgCDQv9C10YDQtdC0INC90L7QstGL0Lwg0YDQtdC90LTQtdGA0LjQvdCz0L7QvFxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXV0b0NsZWFyID0gb3B0aW9ucy5hdXRvQ2xlYXIgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXV0b0NsZWFyIDogdHJ1ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KbQstC10YIg0LfQsNC70LjQstC60Lgg0LIg0YTQvtGA0LzQsNGC0LUgUkdCQVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsZWFyQ29sb3IgPSBvcHRpb25zLmNsZWFyQ29sb3IgfHwgWzEsIDEsIDEsIDFdO1xuICAgICAgICB0aGlzLnNvcnRPYmplY3RzID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9wbHVnaW5zID0gW107XG4gICAgICAgIHRoaXMuX3BsdWdpbnNCeVR5cGUgPSB7fTtcbiAgICAgICAgdGhpcy5fbWF4UGx1Z2luT3JkZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuYWRkUGx1Z2luKG5ldyBPYmplY3QzRFBsdWdpbigpLCAwKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KHQv9C40YHQvtC6INCy0LrQu9GO0YfQtdC90L3Ri9GFIFdlYkdMINGA0LDRgdGI0LjRgNC10L3QuNC5XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndlYkdsRXh0ZW5zaW9ucyA9IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCU0L7QsdCw0LLQu9GP0LXRgiB7QGxpbmsgUmVuZGVyZXJQbHVnaW59INC6INGA0LXQvdC00LXRgNGDLiDQmiDRgNC10L3QtNC10YDRgyDQvNC+0LbQtdGCINCx0YvRgtGMINC00L7QsdCw0LLQu9C10L0g0YLQvtC70YzQutC+INC+0LTQuNC9INC/0LvQsNCz0LjQvSDQutCw0LbQtNC+0LPQviDRgtC40L/QsC5cbiAgICAgKiBAcGFyYW0ge1BsdWdpbn0gcGx1Z2luINCf0LvQsNCz0LjQvVxuICAgICAqIEBwYXJhbSB7P051bWJlcn0gb3JkZXIg0JrQsNC20LTRi9C5INC/0LvQsNCz0LjQvSDQstGL0L/QvtC70L3Rj9C10YLRgdGPINC/0YDQuCDRgNC10L3QtNC10YDQuNC90LPQtSDQv9C+INCy0L7Qt9GA0LDRgdGC0LDQvdC40Y4gb3JkZXIsXG4gICAgICog0LXRgdC70Lgg0LXQs9C+INC90LXRgiwg0YLQviDQstGL0LHQuNGA0LDQtdGC0YHRjyDQvNCw0LrRgdC40LzQsNC70YzQvdGL0Lkgb3JkZXIgKyAxLlxuICAgICAqL1xuICAgIGFkZFBsdWdpbihwbHVnaW4sIG9yZGVyKSB7XG4gICAgICAgIGlmIChvcmRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcmRlciA9IHRoaXMuX21heFBsdWdpbk9yZGVyICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BsdWdpbnMucHVzaCh7XG4gICAgICAgICAgICBwbHVnaW4sXG4gICAgICAgICAgICBvcmRlclxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcGx1Z2lucy5zb3J0KChhLCBiKSA9PiBhLm9yZGVyIC0gYi5vcmRlcik7XG4gICAgICAgIHRoaXMuX3BsdWdpbnNCeVR5cGVbcGx1Z2luLnR5cGVdID0gcGx1Z2luO1xuXG4gICAgICAgIHRoaXMuX21heFBsdWdpbk9yZGVyID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdGhpcy5fcGx1Z2lucy5tYXAocCA9PiBwLm9yZGVyKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPQtNCw0LvRj9C10YIge0BsaW5rIFJlbmRlcmVyUGx1Z2lufSDQuNC3INGA0LXQvdC00LXRgNCwLlxuICAgICAqIEBwYXJhbSB7UGx1Z2lufSBQbHVnaW4g0JrQu9Cw0YHRgSDQv9C70LDQs9C40L3QsFxuICAgICAqL1xuICAgIHJlbW92ZVBsdWdpbihQbHVnaW4pIHtcbiAgICAgICAgdGhpcy5fcGx1Z2lucy5zb21lKChlbCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsLnBsdWdpbiBpbnN0YW5jZW9mIFBsdWdpbikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wbHVnaW5zQnlUeXBlW3RoaXMuX3BsdWdpbnNbaV0ucGx1Z2luLnR5cGVdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsdWdpbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQv9Cw0YDQsNC80LXRgtGAIHBpeGVsIHJhdGlvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICovXG4gICAgc2V0UGl4ZWxSYXRpbyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9waXhlbFJhdGlvID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YLQtdC60YPRidC40LkgcGl4ZWwgcmF0aW9cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGA0LDQt9C80LXRgNGLINGN0LvQtdC80LXQvdGC0YMgY2FudmFzINC4IHZpZXdwb3J0INC00LvRjyBXZWJHTFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCDQqNC40YDQuNC90LAg0LIg0L/QuNC60YHQtdC70Y/RhVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQg0JLRi9GB0L7RgtCwINCyINC/0LjQutGB0LXQu9GP0YVcbiAgICAgKi9cbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgIHdpZHRoICogdGhpcy5fcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIGhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW9cbiAgICAgICAgXTtcblxuICAgICAgICBpZiAodGhpcy5fY2FudmFzRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC53aWR0aCA9IHRoaXMuX3NpemVbMF07XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNFbGVtZW50LmhlaWdodCA9IHRoaXMuX3NpemVbMV07XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCIHZpZXdwb3J0INC00LvRjyBXZWJHTFxuICAgICAqINCV0YHQu9C4INGA0LDQt9C80LXRgNGLINC90LUg0YPQutCw0LfQsNC90YssINGC0L4g0LLRi9GB0YLQsNCy0LvRj9C10YIg0YDQsNC30LzQtdGA0Ysg0YPQutCw0LfQsNC90L3Ri9C1INCyINGE0YPQvdC60YbQuNC4IHtAbGluayBSZW5kZXJlciNzZXRTaXplfVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGhdINCo0LjRgNC40L3QsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdINCS0YvRgdC+0YLQsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICovXG4gICAgc2V0Vmlld3BvcnQod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2lkdGggIT09IHVuZGVmaW5lZCAmJiBoZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9nbC52aWV3cG9ydCgwLCAwLCB0aGlzLl9zaXplWzBdLCB0aGlzLl9zaXplWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0LXQutGD0YnQuNC5IHZpZXdwb3J0IFdlYkdMXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCIFJlbmRlclRhcmdldFxuICAgICAqIEBwYXJhbSB7P1JlbmRlclRhcmdldH0gcmVuZGVyVGFyZ2V0XG4gICAgICovXG4gICAgc2V0UmVuZGVyVGFyZ2V0KHJlbmRlclRhcmdldCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJUYXJnZXQgPSByZW5kZXJUYXJnZXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0YfQuNGC0YvQstCw0LXRgiDRg9C60LDQt9Cw0L3QvdGD0Y4g0L7QsdC70LDRgdGC0Ywg0L/QuNC60YHQtdC70LXQuSDQsiDQvNCw0YHRgdC40LJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geCDQmtC+0L7RgNC00LjQvdCw0YLRiyDQvdCw0YfQsNC70LAg0L7QsdC70LDRgdGC0LhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSDQmtC+0L7RgNC00LjQvdCw0YLRiyDQvdCw0YfQsNC70LAg0L7QsdC70LDRgdGC0LhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGgg0KjQuNGA0LjQvdCwINC+0LHQu9Cw0YHRgtC4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCDQktGL0YHQvtGC0LAg0L7QsdC70LDRgdGC0LhcbiAgICAgKiBAcGFyYW0ge1R5cGVkQXJyYXl9IGFycmF5INCc0LDRgdGB0LjQsiDQtNC70Y8g0LfQsNC/0LjRgdC4INC00LDQvdC90YvRhVxuICAgICAqL1xuICAgIHJlYWRQaXhlbHMoeCwgeSwgd2lkdGgsIGhlaWdodCwgYXJyYXkpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgICAgICBpZiAodGhpcy5fcmVuZGVyVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJUYXJnZXQuYmluZChnbCk7XG4gICAgICAgICAgICBnbC5yZWFkUGl4ZWxzKHgsIHksIHdpZHRoLCBoZWlnaHQsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGFycmF5KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclRhcmdldC51bmJpbmQoZ2wpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2wucmVhZFBpeGVscyh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBhcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGH0LjRidCw0LXRgiDRgtC10LrRg9GJ0LjQuSDQutCw0LTRgCDQuCDQt9Cw0LvQuNCy0LDQtdGCINGG0LLQtdGC0L7QvCDRg9C60LDQt9Cw0L3QvdGL0Lwg0LIgY2xlYXJDb2xvclxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgICAgIGdsLmNsZWFyQ29sb3IuYXBwbHkoZ2wsIHRoaXMuY2xlYXJDb2xvcik7XG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10YIg0YHRhtC10L3Rg1xuICAgICAqIEBwYXJhbSB7U2NlbmV9IHNjZW5lINCh0YbQtdC90LBcbiAgICAgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhINCa0LDQvNC10YDQsFxuICAgICAqIEBwYXJhbSB7Kn0gdXNlckRhdGEg0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjywg0LrQvtGC0L7RgNCw0Y8g0LHRg9C00LXRgiDQv9C10YDQtdC00LDQvdCwINCy0YHQtdC8INC/0LvQsNCz0LjQvdCw0Lwg0Lgg0L7QsdGK0LXQutGC0LDQvFxuICAgICAqL1xuICAgIHJlbmRlcihzY2VuZSwgY2FtZXJhLCB1c2VyRGF0YSkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgICAgIHNjZW5lLnR5cGlmeUZvclJlbmRlcih0aGlzLl9wbHVnaW5zQnlUeXBlKTtcblxuICAgICAgICBpZiAodGhpcy5fcmVuZGVyVGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJUYXJnZXQuYmluZChnbCk7XG4gICAgICAgIH1cblxuICAgICAgICBnbC5jbGVhckRlcHRoKDEpO1xuICAgICAgICBnbC5jbGVhclN0ZW5jaWwoMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0b0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYW1lcmEudXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVdvcmxkTWF0cml4KCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgICByZW5kZXJlcjogdGhpcyxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHRoaXMud2ViR2xFeHRlbnNpb25zLFxuICAgICAgICAgICAgc2NlbmUsXG4gICAgICAgICAgICBjYW1lcmEsXG4gICAgICAgICAgICBnbCxcbiAgICAgICAgICAgIHVzZXJEYXRhXG4gICAgICAgIH07XG4gICAgICAgIC8vIFRPRE86IG1ha2Ugc3RhdGUgaW1tdXRhYmxlP1xuXG4gICAgICAgIGNvbnN0IHBsdWdpbnNUb1JlbmRlciA9IHRoaXMuX3BsdWdpbnNcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLnBsdWdpbilcbiAgICAgICAgICAgIC5maWx0ZXIocGx1Z2luID0+IHBsdWdpbi5oYXNPYmplY3RzKCkpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGx1Z2luc1RvUmVuZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwbHVnaW5zVG9SZW5kZXJbaV0ucmVuZGVyKFxuICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgIHBsdWdpbnNUb1JlbmRlcltpIC0gMV0sXG4gICAgICAgICAgICAgICAgcGx1Z2luc1RvUmVuZGVyW2kgKyAxXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclRhcmdldC51bmJpbmQoZ2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQutC70Y7Rh9Cw0LXRgiDRgNCw0YHRiNC40YDQtdC90LjQtSBXZWJHTFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUg0J3QsNC30LLQsNC90LjQtSDRgNCw0YHRiNC40YDQtdC90LjRj1xuICAgICAqL1xuICAgIGFkZEV4dGVuc2lvbihuYW1lKSB7XG4gICAgICAgIHRoaXMud2ViR2xFeHRlbnNpb25zW25hbWVdID0gdGhpcy5fZ2wuZ2V0RXh0ZW5zaW9uKG5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlcmVyO1xuXG4vKipcbiAqINCh0L7RgdGC0L7Rj9C90LjQtSDRgNC10L3QtNC10YDQsC4g0J/QtdGA0LXQtNCw0LXRgtGB0Y8g0L7QsdGK0LXQutGC0LDQvCDQtNC70Y8g0L7RgtGA0LjRgdC+0LLQutC4LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXRlXG4gKiBAcHJvcGVydHkge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAqIEBwcm9wZXJ0eSB7U2NlbmV9IHNjZW5lXG4gKiBAcHJvcGVydHkge0NhbWVyYX0gY2FtZXJhXG4gKiBAcHJvcGVydHkge1JlbmRlcmVyfSByZW5kZXJlclxuICovXG4iXX0=