"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Отдельный рендер, используется для отрисовки прозрачных объектов.
 * @ignore
 */

var TransparentRenderer = function () {
    function TransparentRenderer() {
        _classCallCheck(this, TransparentRenderer);
    }

    _createClass(TransparentRenderer, [{
        key: "render",
        value: function render(state, renderObjects) {
            var gl = state.gl;

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            if (state.renderer.sortObjects) {
                this._sortObjects(state, renderObjects);
            }

            renderObjects.forEach(function (object) {
                return object.render(state);
            });
        }
    }, {
        key: "_sortObjects",
        value: function _sortObjects(_ref, renderObjects) {
            var camera = _ref.camera;

            var sorter = this._reversePainterSortStable.bind(this, camera);

            renderObjects.sort(sorter);
        }
    }, {
        key: "_reversePainterSortStable",
        value: function _reversePainterSortStable(camera, a, b) {
            if (a.renderOrder !== b.renderOrder) {
                return a.renderOrder - b.renderOrder;
            }

            var aZ = camera.project(a.getWorldPosition())[2];
            var bZ = camera.project(b.getWorldPosition())[2];

            return bZ - aZ;
        }
    }]);

    return TransparentRenderer;
}();

exports.default = TransparentRenderer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlci9UcmFuc3BhcmVudFJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQUlNO0FBQ0YsYUFERSxtQkFDRixHQUFjOzhCQURaLHFCQUNZO0tBQWQ7O2lCQURFOzsrQkFHSyxPQUFPLGVBQWU7QUFDekIsZ0JBQU0sS0FBSyxNQUFNLEVBQU4sQ0FEYzs7QUFHekIsZUFBRyxNQUFILENBQVUsR0FBRyxLQUFILENBQVYsQ0FIeUI7QUFJekIsZUFBRyxhQUFILENBQWlCLEdBQUcsUUFBSCxDQUFqQixDQUp5QjtBQUt6QixlQUFHLFNBQUgsQ0FBYSxHQUFHLFNBQUgsRUFBYyxHQUFHLG1CQUFILENBQTNCLENBTHlCOztBQU96QixlQUFHLHFCQUFILENBQXlCLEdBQUcsUUFBSCxFQUFhLEdBQUcsUUFBSCxDQUF0QyxDQVB5QjtBQVF6QixlQUFHLGlCQUFILENBQXFCLEdBQUcsU0FBSCxFQUFjLEdBQUcsbUJBQUgsRUFBd0IsR0FBRyxHQUFILEVBQVEsR0FBRyxtQkFBSCxDQUFuRSxDQVJ5Qjs7QUFVekIsZ0JBQUksTUFBTSxRQUFOLENBQWUsV0FBZixFQUE0QjtBQUM1QixxQkFBSyxZQUFMLENBQWtCLEtBQWxCLEVBQXlCLGFBQXpCLEVBRDRCO2FBQWhDOztBQUlBLDBCQUFjLE9BQWQsQ0FBc0I7dUJBQVUsT0FBTyxNQUFQLENBQWMsS0FBZDthQUFWLENBQXRCLENBZHlCOzs7OzJDQWlCTixlQUFlO2dCQUF4QixxQkFBd0I7O0FBQ2xDLGdCQUFNLFNBQVMsS0FBSyx5QkFBTCxDQUErQixJQUEvQixDQUFvQyxJQUFwQyxFQUEwQyxNQUExQyxDQUFULENBRDRCOztBQUdsQywwQkFBYyxJQUFkLENBQW1CLE1BQW5CLEVBSGtDOzs7O2tEQU1aLFFBQVEsR0FBRyxHQUFHO0FBQ3BDLGdCQUFJLEVBQUUsV0FBRixLQUFrQixFQUFFLFdBQUYsRUFBZTtBQUNqQyx1QkFBTyxFQUFFLFdBQUYsR0FBZ0IsRUFBRSxXQUFGLENBRFU7YUFBckM7O0FBSUEsZ0JBQU0sS0FBSyxPQUFPLE9BQVAsQ0FBZSxFQUFFLGdCQUFGLEVBQWYsRUFBcUMsQ0FBckMsQ0FBTCxDQUw4QjtBQU1wQyxnQkFBTSxLQUFLLE9BQU8sT0FBUCxDQUFlLEVBQUUsZ0JBQUYsRUFBZixFQUFxQyxDQUFyQyxDQUFMLENBTjhCOztBQVFwQyxtQkFBTyxLQUFLLEVBQUwsQ0FSNkI7Ozs7V0ExQnRDOzs7a0JBc0NTIiwiZmlsZSI6IlRyYW5zcGFyZW50UmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqINCe0YLQtNC10LvRjNC90YvQuSDRgNC10L3QtNC10YAsINC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7RgtGA0LjRgdC+0LLQutC4INC/0YDQvtC30YDQsNGH0L3Ri9GFINC+0LHRitC10LrRgtC+0LIuXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIFRyYW5zcGFyZW50UmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHJlbmRlcihzdGF0ZSwgcmVuZGVyT2JqZWN0cykge1xuICAgICAgICBjb25zdCBnbCA9IHN0YXRlLmdsO1xuXG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgICBnbC5ibGVuZEVxdWF0aW9uU2VwYXJhdGUoZ2wuRlVOQ19BREQsIGdsLkZVTkNfQUREKTtcbiAgICAgICAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBLCBnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgICAgIGlmIChzdGF0ZS5yZW5kZXJlci5zb3J0T2JqZWN0cykge1xuICAgICAgICAgICAgdGhpcy5fc29ydE9iamVjdHMoc3RhdGUsIHJlbmRlck9iamVjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyT2JqZWN0cy5mb3JFYWNoKG9iamVjdCA9PiBvYmplY3QucmVuZGVyKHN0YXRlKSk7XG4gICAgfVxuXG4gICAgX3NvcnRPYmplY3RzKHtjYW1lcmF9LCByZW5kZXJPYmplY3RzKSB7XG4gICAgICAgIGNvbnN0IHNvcnRlciA9IHRoaXMuX3JldmVyc2VQYWludGVyU29ydFN0YWJsZS5iaW5kKHRoaXMsIGNhbWVyYSk7XG5cbiAgICAgICAgcmVuZGVyT2JqZWN0cy5zb3J0KHNvcnRlcik7XG4gICAgfVxuXG4gICAgX3JldmVyc2VQYWludGVyU29ydFN0YWJsZShjYW1lcmEsIGEsIGIpIHtcbiAgICAgICAgaWYgKGEucmVuZGVyT3JkZXIgIT09IGIucmVuZGVyT3JkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnJlbmRlck9yZGVyIC0gYi5yZW5kZXJPcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFaID0gY2FtZXJhLnByb2plY3QoYS5nZXRXb3JsZFBvc2l0aW9uKCkpWzJdO1xuICAgICAgICBjb25zdCBiWiA9IGNhbWVyYS5wcm9qZWN0KGIuZ2V0V29ybGRQb3NpdGlvbigpKVsyXTtcblxuICAgICAgICByZXR1cm4gYlogLSBhWjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zcGFyZW50UmVuZGVyZXI7XG4iXX0=