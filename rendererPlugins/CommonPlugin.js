'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RendererPlugin2 = require('../RendererPlugin');

var _RendererPlugin3 = _interopRequireDefault(_RendererPlugin2);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Плагин для рендера простых объектов.
 * Для того, чтобы он добавился к рендеру, его нужно создать и вызвать {@link Renderer#addPlugin}.
 *
 * @extends RendererPlugin
 */
var CommonPlugin = function (_RendererPlugin) {
    _inherits(CommonPlugin, _RendererPlugin);

    function CommonPlugin() {
        _classCallCheck(this, CommonPlugin);

        /**
         * Используется для обозначения типа плагина
         * @type {Number}
         */
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommonPlugin).call(this));

        _this.type = _libConstants.COMMON_RENDERER;
        return _this;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */


    _createClass(CommonPlugin, [{
        key: 'render',
        value: function render(state) {
            var gl = state.gl;

            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);

            gl.frontFace(gl.CCW);
            gl.cullFace(gl.BACK);
            gl.enable(gl.CULL_FACE);
            gl.disable(gl.BLEND);

            if (state.renderer.sortObjects) {
                this._objects.sort(this._renderOrderSort);
            }

            this._objects.forEach(function (object) {
                return object.render(state);
            });
            this._objects = [];

            return this;
        }
    }, {
        key: '_renderOrderSort',
        value: function _renderOrderSort(a, b) {
            return a.renderOrder - b.renderOrder;
        }
    }]);

    return CommonPlugin;
}(_RendererPlugin3.default);

exports.default = CommonPlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlclBsdWdpbnMvQ29tbW9uUGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7Ozs7SUFNTSxZOzs7QUFDRiw0QkFBYztBQUFBOztBQUdWOzs7O0FBSFU7O0FBT1YsY0FBSyxJQUFMO0FBUFU7QUFRYjs7QUFFRDs7Ozs7Ozs7K0JBSU8sSyxFQUFPO0FBQ1YsZ0JBQU0sS0FBSyxNQUFNLEVBQWpCOztBQUVBLGVBQUcsTUFBSCxDQUFVLEdBQUcsVUFBYjtBQUNBLGVBQUcsU0FBSCxDQUFhLEdBQUcsTUFBaEI7O0FBRUEsZUFBRyxTQUFILENBQWEsR0FBRyxHQUFoQjtBQUNBLGVBQUcsUUFBSCxDQUFZLEdBQUcsSUFBZjtBQUNBLGVBQUcsTUFBSCxDQUFVLEdBQUcsU0FBYjtBQUNBLGVBQUcsT0FBSCxDQUFXLEdBQUcsS0FBZDs7QUFFQSxnQkFBSSxNQUFNLFFBQU4sQ0FBZSxXQUFuQixFQUFnQztBQUM1QixxQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLGdCQUF4QjtBQUNIOztBQUVELGlCQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO0FBQUEsdUJBQVUsT0FBTyxNQUFQLENBQWMsS0FBZCxDQUFWO0FBQUEsYUFBdEI7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7O3lDQUVnQixDLEVBQUcsQyxFQUFHO0FBQ25CLG1CQUFPLEVBQUUsV0FBRixHQUFnQixFQUFFLFdBQXpCO0FBQ0g7Ozs7OztrQkFHVSxZIiwiZmlsZSI6IkNvbW1vblBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZW5kZXJlclBsdWdpbiBmcm9tICcuLi9SZW5kZXJlclBsdWdpbic7XG5pbXBvcnQge0NPTU1PTl9SRU5ERVJFUn0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcblxuLyoqXG4gKiDQn9C70LDQs9C40L0g0LTQu9GPINGA0LXQvdC00LXRgNCwINC/0YDQvtGB0YLRi9GFINC+0LHRitC10LrRgtC+0LIuXG4gKiDQlNC70Y8g0YLQvtCz0L4sINGH0YLQvtCx0Ysg0L7QvSDQtNC+0LHQsNCy0LjQu9GB0Y8g0Log0YDQtdC90LTQtdGA0YMsINC10LPQviDQvdGD0LbQvdC+INGB0L7Qt9C00LDRgtGMINC4INCy0YvQt9Cy0LDRgtGMIHtAbGluayBSZW5kZXJlciNhZGRQbHVnaW59LlxuICpcbiAqIEBleHRlbmRzIFJlbmRlcmVyUGx1Z2luXG4gKi9cbmNsYXNzIENvbW1vblBsdWdpbiBleHRlbmRzIFJlbmRlcmVyUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC/0LvQsNCz0LjQvdCwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBDT01NT05fUkVOREVSRVI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdGCINGB0YbQtdC90YMg0YEg0L/QvtC80L7RidGM0Y4g0Y3RgtC+0LPQviDQv9C70LDQs9C40L3QsFxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAgICovXG4gICAgcmVuZGVyKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IGdsID0gc3RhdGUuZ2w7XG5cbiAgICAgICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcblxuICAgICAgICBnbC5mcm9udEZhY2UoZ2wuQ0NXKTtcbiAgICAgICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgICAgIGdsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xuICAgICAgICBnbC5kaXNhYmxlKGdsLkJMRU5EKTtcblxuICAgICAgICBpZiAoc3RhdGUucmVuZGVyZXIuc29ydE9iamVjdHMpIHtcbiAgICAgICAgICAgIHRoaXMuX29iamVjdHMuc29ydCh0aGlzLl9yZW5kZXJPcmRlclNvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb2JqZWN0cy5mb3JFYWNoKG9iamVjdCA9PiBvYmplY3QucmVuZGVyKHN0YXRlKSk7XG4gICAgICAgIHRoaXMuX29iamVjdHMgPSBbXTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBfcmVuZGVyT3JkZXJTb3J0KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEucmVuZGVyT3JkZXIgLSBiLnJlbmRlck9yZGVyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uUGx1Z2luO1xuIl19