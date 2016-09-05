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
 * Плагин для рендера прозрачных объектов.
 * Для того, чтобы он добавился к рендеру, его нужно создать и вызвать {@link Renderer#addPlugin}.
 *
 * @extends RendererPlugin
 */
var TransparentPlugin = function (_RendererPlugin) {
    _inherits(TransparentPlugin, _RendererPlugin);

    function TransparentPlugin() {
        _classCallCheck(this, TransparentPlugin);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransparentPlugin).call(this));

        _this.type = _libConstants.TRANSPARENT_RENDERER;
        return _this;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */


    _createClass(TransparentPlugin, [{
        key: 'render',
        value: function render(state) {
            var gl = state.gl;

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            if (state.renderer.sortObjects) {
                this._sortObjects(state);
            }

            this._objects.forEach(function (object) {
                return object.render(state);
            });
            this._objects = [];

            return this;
        }
    }, {
        key: '_sortObjects',
        value: function _sortObjects(_ref) {
            var camera = _ref.camera;

            var sorter = this._reversePainterSortStable.bind(this, camera);

            this._objects.sort(sorter);
        }
    }, {
        key: '_reversePainterSortStable',
        value: function _reversePainterSortStable(camera, a, b) {
            if (a.renderOrder !== b.renderOrder) {
                return a.renderOrder - b.renderOrder;
            }

            var aZ = camera.project(a.getWorldPosition())[2];
            var bZ = camera.project(b.getWorldPosition())[2];

            return bZ - aZ;
        }
    }]);

    return TransparentPlugin;
}(_RendererPlugin3.default);

exports.default = TransparentPlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlclBsdWdpbnMvVHJhbnNwYXJlbnRQbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7OztJQU1NLGlCOzs7QUFDRixpQ0FBYztBQUFBOztBQUFBOztBQUdWLGNBQUssSUFBTDtBQUhVO0FBSWI7O0FBRUQ7Ozs7Ozs7OytCQUlPLEssRUFBTztBQUNWLGdCQUFNLEtBQUssTUFBTSxFQUFqQjs7QUFFQSxlQUFHLE1BQUgsQ0FBVSxHQUFHLEtBQWI7QUFDQSxlQUFHLGFBQUgsQ0FBaUIsR0FBRyxRQUFwQjtBQUNBLGVBQUcsU0FBSCxDQUFhLEdBQUcsU0FBaEIsRUFBMkIsR0FBRyxtQkFBOUI7O0FBRUEsZUFBRyxxQkFBSCxDQUF5QixHQUFHLFFBQTVCLEVBQXNDLEdBQUcsUUFBekM7QUFDQSxlQUFHLGlCQUFILENBQXFCLEdBQUcsU0FBeEIsRUFBbUMsR0FBRyxtQkFBdEMsRUFBMkQsR0FBRyxHQUE5RCxFQUFtRSxHQUFHLG1CQUF0RTs7QUFFQSxnQkFBSSxNQUFNLFFBQU4sQ0FBZSxXQUFuQixFQUFnQztBQUM1QixxQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0g7O0FBRUQsaUJBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0I7QUFBQSx1QkFBVSxPQUFPLE1BQVAsQ0FBYyxLQUFkLENBQVY7QUFBQSxhQUF0QjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7MkNBRXNCO0FBQUEsZ0JBQVQsTUFBUyxRQUFULE1BQVM7O0FBQ25CLGdCQUFNLFNBQVMsS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFvQyxJQUFwQyxFQUEwQyxNQUExQyxDQUFmOztBQUVBLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLE1BQW5CO0FBQ0g7OztrREFFeUIsTSxFQUFRLEMsRUFBRyxDLEVBQUc7QUFDcEMsZ0JBQUksRUFBRSxXQUFGLEtBQWtCLEVBQUUsV0FBeEIsRUFBcUM7QUFDakMsdUJBQU8sRUFBRSxXQUFGLEdBQWdCLEVBQUUsV0FBekI7QUFDSDs7QUFFRCxnQkFBTSxLQUFLLE9BQU8sT0FBUCxDQUFlLEVBQUUsZ0JBQUYsRUFBZixFQUFxQyxDQUFyQyxDQUFYO0FBQ0EsZ0JBQU0sS0FBSyxPQUFPLE9BQVAsQ0FBZSxFQUFFLGdCQUFGLEVBQWYsRUFBcUMsQ0FBckMsQ0FBWDs7QUFFQSxtQkFBTyxLQUFLLEVBQVo7QUFDSDs7Ozs7O2tCQUdVLGlCIiwiZmlsZSI6IlRyYW5zcGFyZW50UGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbmRlcmVyUGx1Z2luIGZyb20gJy4uL1JlbmRlcmVyUGx1Z2luJztcbmltcG9ydCB7VFJBTlNQQVJFTlRfUkVOREVSRVJ9IGZyb20gJy4uL2xpYkNvbnN0YW50cyc7XG5cbi8qKlxuICog0J/Qu9Cw0LPQuNC9INC00LvRjyDRgNC10L3QtNC10YDQsCDQv9GA0L7Qt9GA0LDRh9C90YvRhSDQvtCx0YrQtdC60YLQvtCyLlxuICog0JTQu9GPINGC0L7Qs9C+LCDRh9GC0L7QsdGLINC+0L0g0LTQvtCx0LDQstC40LvRgdGPINC6INGA0LXQvdC00LXRgNGDLCDQtdCz0L4g0L3Rg9C20L3QviDRgdC+0LfQtNCw0YLRjCDQuCDQstGL0LfQstCw0YLRjCB7QGxpbmsgUmVuZGVyZXIjYWRkUGx1Z2lufS5cbiAqXG4gKiBAZXh0ZW5kcyBSZW5kZXJlclBsdWdpblxuICovXG5jbGFzcyBUcmFuc3BhcmVudFBsdWdpbiBleHRlbmRzIFJlbmRlcmVyUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBUUkFOU1BBUkVOVF9SRU5ERVJFUjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10YIg0YHRhtC10L3RgyDRgSDQv9C+0LzQvtGJ0YzRjiDRjdGC0L7Qs9C+INC/0LvQsNCz0LjQvdCwXG4gICAgICogQHBhcmFtIHtTdGF0ZX0gc3RhdGVcbiAgICAgKi9cbiAgICByZW5kZXIoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSBzdGF0ZS5nbDtcblxuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgICBnbC5ibGVuZEVxdWF0aW9uKGdsLkZVTkNfQUREKTtcbiAgICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICAgICAgZ2wuYmxlbmRFcXVhdGlvblNlcGFyYXRlKGdsLkZVTkNfQURELCBnbC5GVU5DX0FERCk7XG4gICAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgICBpZiAoc3RhdGUucmVuZGVyZXIuc29ydE9iamVjdHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRPYmplY3RzKHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29iamVjdHMuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LnJlbmRlcihzdGF0ZSkpO1xuICAgICAgICB0aGlzLl9vYmplY3RzID0gW107XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX3NvcnRPYmplY3RzKHtjYW1lcmF9KSB7XG4gICAgICAgIGNvbnN0IHNvcnRlciA9IHRoaXMuX3JldmVyc2VQYWludGVyU29ydFN0YWJsZS5iaW5kKHRoaXMsIGNhbWVyYSk7XG5cbiAgICAgICAgdGhpcy5fb2JqZWN0cy5zb3J0KHNvcnRlcik7XG4gICAgfVxuXG4gICAgX3JldmVyc2VQYWludGVyU29ydFN0YWJsZShjYW1lcmEsIGEsIGIpIHtcbiAgICAgICAgaWYgKGEucmVuZGVyT3JkZXIgIT09IGIucmVuZGVyT3JkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnJlbmRlck9yZGVyIC0gYi5yZW5kZXJPcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFaID0gY2FtZXJhLnByb2plY3QoYS5nZXRXb3JsZFBvc2l0aW9uKCkpWzJdO1xuICAgICAgICBjb25zdCBiWiA9IGNhbWVyYS5wcm9qZWN0KGIuZ2V0V29ybGRQb3NpdGlvbigpKVsyXTtcblxuICAgICAgICByZXR1cm4gYlogLSBhWjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zcGFyZW50UGx1Z2luO1xuIl19