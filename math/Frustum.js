'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Plane = require('./Plane');

var _Plane2 = _interopRequireDefault(_Plane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Задаёт frustum в трёхмерном пространстве
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Frustum.js)
 */
var Frustum = function () {
    /**
     * @param {Array} planes Массив из шести плоскостей, формирующих frustum
     */
    function Frustum(planes) {
        _classCallCheck(this, Frustum);

        this.planes = planes;

        if (!this.planes || this.planes.length !== 6) {
            this.planes = [new _Plane2.default(), new _Plane2.default(), new _Plane2.default(), new _Plane2.default(), new _Plane2.default(), new _Plane2.default()];
        }

        // Векторы для метода intersectsBox
        this._v1 = _glMatrix.vec3.create();
        this._v2 = _glMatrix.vec3.create();
    }

    /**
     * Устанавливает плоскости frustum в соответствие с матрицей
     * @param {mat4} m
     */


    _createClass(Frustum, [{
        key: 'setFromMatrix',
        value: function setFromMatrix(m) {
            var planes = this.planes;

            planes[0].setComponents(m[3] - m[0], m[7] - m[4], m[11] - m[8], m[15] - m[12]).normalize();
            planes[1].setComponents(m[3] + m[0], m[7] + m[4], m[11] + m[8], m[15] + m[12]).normalize();
            planes[2].setComponents(m[3] + m[1], m[7] + m[5], m[11] + m[9], m[15] + m[13]).normalize();
            planes[3].setComponents(m[3] - m[1], m[7] - m[5], m[11] - m[9], m[15] - m[13]).normalize();
            planes[4].setComponents(m[3] - m[2], m[7] - m[6], m[11] - m[10], m[15] - m[14]).normalize();
            planes[5].setComponents(m[3] + m[2], m[7] + m[6], m[11] + m[10], m[15] + m[14]).normalize();

            return this;
        }

        /**
         * Проверяет, находится ли {@link Box} в области frustum
         * @param {Box} box
         * @returns {Boolean}
         */

    }, {
        key: 'intersectsBox',
        value: function intersectsBox(box) {
            var p1 = this._v1;
            var p2 = this._v2;
            var planes = this.planes;
            var min = box.min;
            var max = box.max;


            for (var i = 0; i < 6; i++) {
                var plane = planes[i];
                var normal = plane.normal;

                p1[0] = normal[0] > 0 ? min[0] : max[0];
                p2[0] = normal[0] > 0 ? max[0] : min[0];
                p1[1] = normal[1] > 0 ? min[1] : max[1];
                p2[1] = normal[1] > 0 ? max[1] : min[1];
                p1[2] = normal[2] > 0 ? min[2] : max[2];
                p2[2] = normal[2] > 0 ? max[2] : min[2];

                var d1 = plane.distanceToPoint(p1);
                var d2 = plane.distanceToPoint(p2);

                // if both outside plane, no intersection
                if (d1 < 0 && d2 < 0) {
                    return false;
                }
            }

            return true;
        }
    }]);

    return Frustum;
}();

exports.default = Frustum;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL0ZydXN0dW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTSxPO0FBQ0Y7OztBQUdBLHFCQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQSxZQUFJLENBQUMsS0FBSyxNQUFOLElBQWdCLEtBQUssTUFBTCxDQUFZLE1BQVosS0FBdUIsQ0FBM0MsRUFBOEM7QUFDMUMsaUJBQUssTUFBTCxHQUFjLENBQ1YscUJBRFUsRUFFVixxQkFGVSxFQUdWLHFCQUhVLEVBSVYscUJBSlUsRUFLVixxQkFMVSxFQU1WLHFCQU5VLENBQWQ7QUFRSDs7QUFFRDtBQUNBLGFBQUssR0FBTCxHQUFXLGVBQUssTUFBTCxFQUFYO0FBQ0EsYUFBSyxHQUFMLEdBQVcsZUFBSyxNQUFMLEVBQVg7QUFDSDs7QUFFRDs7Ozs7Ozs7c0NBSWMsQyxFQUFHO0FBQ2IsZ0JBQU0sU0FBUyxLQUFLLE1BQXBCOztBQUVBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxDQUFGLENBQTFELEVBQWdFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF4RSxFQUErRSxTQUEvRTtBQUNBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxDQUFGLENBQTFELEVBQWdFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF4RSxFQUErRSxTQUEvRTtBQUNBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxDQUFGLENBQTFELEVBQWdFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF4RSxFQUErRSxTQUEvRTtBQUNBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxDQUFGLENBQTFELEVBQWdFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF4RSxFQUErRSxTQUEvRTtBQUNBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxFQUFGLENBQTFELEVBQWlFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF6RSxFQUFnRixTQUFoRjtBQUNBLG1CQUFPLENBQVAsRUFBVSxhQUFWLENBQXdCLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUEvQixFQUFxQyxFQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBNUMsRUFBa0QsRUFBRSxFQUFGLElBQVEsRUFBRSxFQUFGLENBQTFELEVBQWlFLEVBQUUsRUFBRixJQUFRLEVBQUUsRUFBRixDQUF6RSxFQUFnRixTQUFoRjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3NDQUtjLEcsRUFBSztBQUNmLGdCQUFNLEtBQUssS0FBSyxHQUFoQjtBQUNBLGdCQUFNLEtBQUssS0FBSyxHQUFoQjtBQUNBLGdCQUFNLFNBQVMsS0FBSyxNQUFwQjtBQUhlLGdCQUlSLEdBSlEsR0FJSSxHQUpKLENBSVIsR0FKUTtBQUFBLGdCQUlILEdBSkcsR0FJSSxHQUpKLENBSUgsR0FKRzs7O0FBTWYsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxDQUFwQixFQUF1QixHQUF2QixFQUE0QjtBQUN4QixvQkFBTSxRQUFRLE9BQU8sQ0FBUCxDQUFkO0FBQ0Esb0JBQU0sU0FBUyxNQUFNLE1BQXJCOztBQUVBLG1CQUFHLENBQUgsSUFBUSxPQUFPLENBQVAsSUFBWSxDQUFaLEdBQWdCLElBQUksQ0FBSixDQUFoQixHQUF5QixJQUFJLENBQUosQ0FBakM7QUFDQSxtQkFBRyxDQUFILElBQVEsT0FBTyxDQUFQLElBQVksQ0FBWixHQUFnQixJQUFJLENBQUosQ0FBaEIsR0FBeUIsSUFBSSxDQUFKLENBQWpDO0FBQ0EsbUJBQUcsQ0FBSCxJQUFRLE9BQU8sQ0FBUCxJQUFZLENBQVosR0FBZ0IsSUFBSSxDQUFKLENBQWhCLEdBQXlCLElBQUksQ0FBSixDQUFqQztBQUNBLG1CQUFHLENBQUgsSUFBUSxPQUFPLENBQVAsSUFBWSxDQUFaLEdBQWdCLElBQUksQ0FBSixDQUFoQixHQUF5QixJQUFJLENBQUosQ0FBakM7QUFDQSxtQkFBRyxDQUFILElBQVEsT0FBTyxDQUFQLElBQVksQ0FBWixHQUFnQixJQUFJLENBQUosQ0FBaEIsR0FBeUIsSUFBSSxDQUFKLENBQWpDO0FBQ0EsbUJBQUcsQ0FBSCxJQUFRLE9BQU8sQ0FBUCxJQUFZLENBQVosR0FBZ0IsSUFBSSxDQUFKLENBQWhCLEdBQXlCLElBQUksQ0FBSixDQUFqQzs7QUFFQSxvQkFBTSxLQUFLLE1BQU0sZUFBTixDQUFzQixFQUF0QixDQUFYO0FBQ0Esb0JBQU0sS0FBSyxNQUFNLGVBQU4sQ0FBc0IsRUFBdEIsQ0FBWDs7QUFFQTtBQUNBLG9CQUFJLEtBQUssQ0FBTCxJQUFVLEtBQUssQ0FBbkIsRUFBc0I7QUFDbEIsMkJBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBR1UsTyIsImZpbGUiOiJGcnVzdHVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xuaW1wb3J0IFBsYW5lIGZyb20gJy4vUGxhbmUnO1xuXG4vKipcbiAqINCX0LDQtNCw0ZHRgiBmcnVzdHVtINCyINGC0YDRkdGF0LzQtdGA0L3QvtC8INC/0YDQvtGB0YLRgNCw0L3RgdGC0LLQtVxuICpcbiAqINCS0LfRj9GC0L4g0LjQtyBbdGhyZWUuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL21hdGgvRnJ1c3R1bS5qcylcbiAqL1xuY2xhc3MgRnJ1c3R1bSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGxhbmVzINCc0LDRgdGB0LjQsiDQuNC3INGI0LXRgdGC0Lgg0L/Qu9C+0YHQutC+0YHRgtC10LksINGE0L7RgNC80LjRgNGD0Y7RidC40YUgZnJ1c3R1bVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBsYW5lcykge1xuICAgICAgICB0aGlzLnBsYW5lcyA9IHBsYW5lcztcblxuICAgICAgICBpZiAoIXRoaXMucGxhbmVzIHx8IHRoaXMucGxhbmVzLmxlbmd0aCAhPT0gNikge1xuICAgICAgICAgICAgdGhpcy5wbGFuZXMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKCksXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKCksXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKCksXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKCksXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKCksXG4gICAgICAgICAgICAgICAgbmV3IFBsYW5lKClcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQktC10LrRgtC+0YDRiyDQtNC70Y8g0LzQtdGC0L7QtNCwIGludGVyc2VjdHNCb3hcbiAgICAgICAgdGhpcy5fdjEgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl92MiA9IHZlYzMuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0L/Qu9C+0YHQutC+0YHRgtC4IGZydXN0dW0g0LIg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC1INGBINC80LDRgtGA0LjRhtC10LlcbiAgICAgKiBAcGFyYW0ge21hdDR9IG1cbiAgICAgKi9cbiAgICBzZXRGcm9tTWF0cml4KG0pIHtcbiAgICAgICAgY29uc3QgcGxhbmVzID0gdGhpcy5wbGFuZXM7XG5cbiAgICAgICAgcGxhbmVzWzBdLnNldENvbXBvbmVudHMobVszXSAtIG1bMF0sIG1bN10gLSBtWzRdLCBtWzExXSAtIG1bOF0sIG1bMTVdIC0gbVsxMl0pLm5vcm1hbGl6ZSgpO1xuICAgICAgICBwbGFuZXNbMV0uc2V0Q29tcG9uZW50cyhtWzNdICsgbVswXSwgbVs3XSArIG1bNF0sIG1bMTFdICsgbVs4XSwgbVsxNV0gKyBtWzEyXSkubm9ybWFsaXplKCk7XG4gICAgICAgIHBsYW5lc1syXS5zZXRDb21wb25lbnRzKG1bM10gKyBtWzFdLCBtWzddICsgbVs1XSwgbVsxMV0gKyBtWzldLCBtWzE1XSArIG1bMTNdKS5ub3JtYWxpemUoKTtcbiAgICAgICAgcGxhbmVzWzNdLnNldENvbXBvbmVudHMobVszXSAtIG1bMV0sIG1bN10gLSBtWzVdLCBtWzExXSAtIG1bOV0sIG1bMTVdIC0gbVsxM10pLm5vcm1hbGl6ZSgpO1xuICAgICAgICBwbGFuZXNbNF0uc2V0Q29tcG9uZW50cyhtWzNdIC0gbVsyXSwgbVs3XSAtIG1bNl0sIG1bMTFdIC0gbVsxMF0sIG1bMTVdIC0gbVsxNF0pLm5vcm1hbGl6ZSgpO1xuICAgICAgICBwbGFuZXNbNV0uc2V0Q29tcG9uZW50cyhtWzNdICsgbVsyXSwgbVs3XSArIG1bNl0sIG1bMTFdICsgbVsxMF0sIG1bMTVdICsgbVsxNF0pLm5vcm1hbGl6ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXRgiwg0L3QsNGF0L7QtNC40YLRgdGPINC70Lgge0BsaW5rIEJveH0g0LIg0L7QsdC70LDRgdGC0LggZnJ1c3R1bVxuICAgICAqIEBwYXJhbSB7Qm94fSBib3hcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RzQm94KGJveCkge1xuICAgICAgICBjb25zdCBwMSA9IHRoaXMuX3YxO1xuICAgICAgICBjb25zdCBwMiA9IHRoaXMuX3YyO1xuICAgICAgICBjb25zdCBwbGFuZXMgPSB0aGlzLnBsYW5lcztcbiAgICAgICAgY29uc3Qge21pbiwgbWF4fSA9IGJveDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBwbGFuZXNbaV07XG4gICAgICAgICAgICBjb25zdCBub3JtYWwgPSBwbGFuZS5ub3JtYWw7XG5cbiAgICAgICAgICAgIHAxWzBdID0gbm9ybWFsWzBdID4gMCA/IG1pblswXSA6IG1heFswXTtcbiAgICAgICAgICAgIHAyWzBdID0gbm9ybWFsWzBdID4gMCA/IG1heFswXSA6IG1pblswXTtcbiAgICAgICAgICAgIHAxWzFdID0gbm9ybWFsWzFdID4gMCA/IG1pblsxXSA6IG1heFsxXTtcbiAgICAgICAgICAgIHAyWzFdID0gbm9ybWFsWzFdID4gMCA/IG1heFsxXSA6IG1pblsxXTtcbiAgICAgICAgICAgIHAxWzJdID0gbm9ybWFsWzJdID4gMCA/IG1pblsyXSA6IG1heFsyXTtcbiAgICAgICAgICAgIHAyWzJdID0gbm9ybWFsWzJdID4gMCA/IG1heFsyXSA6IG1pblsyXTtcblxuICAgICAgICAgICAgY29uc3QgZDEgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQocDEpO1xuICAgICAgICAgICAgY29uc3QgZDIgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQocDIpO1xuXG4gICAgICAgICAgICAvLyBpZiBib3RoIG91dHNpZGUgcGxhbmUsIG5vIGludGVyc2VjdGlvblxuICAgICAgICAgICAgaWYgKGQxIDwgMCAmJiBkMiA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZydXN0dW07XG4iXX0=