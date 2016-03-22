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
    }

    /**
     * Устанавливает плоскости frustum в соответствие с матрицей
     * @param {mat4} matrix
     */


    _createClass(Frustum, [{
        key: 'setFromMatrix',
        value: function setFromMatrix(matrix) {
            this.planes[0].setComponents(matrix[12] + matrix[0], matrix[13] + matrix[1], matrix[14] + matrix[2], matrix[15] + matrix[3]);

            this.planes[1].setComponents(matrix[12] - matrix[0], matrix[13] - matrix[1], matrix[14] - matrix[2], matrix[15] - matrix[3]);

            this.planes[2].setComponents(matrix[12] + matrix[4], matrix[13] + matrix[5], matrix[14] + matrix[6], matrix[15] + matrix[7]);

            this.planes[3].setComponents(matrix[12] - matrix[4], matrix[13] - matrix[5], matrix[14] - matrix[6], matrix[15] - matrix[7]);

            this.planes[4].setComponents(matrix[12] + matrix[8], matrix[13] + matrix[9], matrix[14] + matrix[10], matrix[15] + matrix[11]);

            this.planes[5].setComponents(matrix[12] - matrix[8], matrix[13] - matrix[9], matrix[14] - matrix[10], matrix[15] - matrix[11]);

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
            var p1 = _glMatrix.vec3.create();
            var p2 = _glMatrix.vec3.create();
            var planes = this.planes;

            for (var i = 0; i < 6; i++) {
                var plane = planes[i];

                p1[0] = plane.normal[0] > 0 ? box.min[0] : box.max[0];
                p2[0] = plane.normal[0] > 0 ? box.max[0] : box.min[0];
                p1[1] = plane.normal[1] > 0 ? box.min[1] : box.max[1];
                p2[1] = plane.normal[1] > 0 ? box.max[1] : box.min[1];
                p1[2] = plane.normal[2] > 0 ? box.min[2] : box.max[2];
                p2[2] = plane.normal[2] > 0 ? box.max[2] : box.min[2];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL0ZydXN0dW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFPTTs7Ozs7QUFJRixhQUpFLE9BSUYsQ0FBWSxNQUFaLEVBQW9COzhCQUpsQixTQUlrQjs7QUFDaEIsYUFBSyxNQUFMLEdBQWMsTUFBZCxDQURnQjs7QUFHaEIsWUFBSSxDQUFDLEtBQUssTUFBTCxJQUFlLEtBQUssTUFBTCxDQUFZLE1BQVosS0FBdUIsQ0FBdkIsRUFBMEI7QUFDMUMsaUJBQUssTUFBTCxHQUFjLENBQ1YscUJBRFUsRUFFVixxQkFGVSxFQUdWLHFCQUhVLEVBSVYscUJBSlUsRUFLVixxQkFMVSxFQU1WLHFCQU5VLENBQWQsQ0FEMEM7U0FBOUM7S0FISjs7Ozs7Ozs7aUJBSkU7O3NDQXVCWSxRQUFRO0FBQ2xCLGlCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsYUFBZixDQUE2QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUN4RSxPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixDQURMLENBRGtCOztBQUlsQixpQkFBSyxNQUFMLENBQVksQ0FBWixFQUFlLGFBQWYsQ0FBNkIsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsRUFBd0IsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsRUFBd0IsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsRUFDeEUsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsQ0FETCxDQUprQjs7QUFPbEIsaUJBQUssTUFBTCxDQUFZLENBQVosRUFBZSxhQUFmLENBQTZCLE9BQU8sRUFBUCxJQUFhLE9BQU8sQ0FBUCxDQUFiLEVBQXdCLE9BQU8sRUFBUCxJQUFhLE9BQU8sQ0FBUCxDQUFiLEVBQXdCLE9BQU8sRUFBUCxJQUFhLE9BQU8sQ0FBUCxDQUFiLEVBQ3hFLE9BQU8sRUFBUCxJQUFhLE9BQU8sQ0FBUCxDQUFiLENBREwsQ0FQa0I7O0FBVWxCLGlCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsYUFBZixDQUE2QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUN4RSxPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixDQURMLENBVmtCOztBQWFsQixpQkFBSyxNQUFMLENBQVksQ0FBWixFQUFlLGFBQWYsQ0FBNkIsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsRUFBd0IsT0FBTyxFQUFQLElBQWEsT0FBTyxDQUFQLENBQWIsRUFBd0IsT0FBTyxFQUFQLElBQWEsT0FBTyxFQUFQLENBQWIsRUFDeEUsT0FBTyxFQUFQLElBQWEsT0FBTyxFQUFQLENBQWIsQ0FETCxDQWJrQjs7QUFnQmxCLGlCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsYUFBZixDQUE2QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLENBQVAsQ0FBYixFQUF3QixPQUFPLEVBQVAsSUFBYSxPQUFPLEVBQVAsQ0FBYixFQUN4RSxPQUFPLEVBQVAsSUFBYSxPQUFPLEVBQVAsQ0FBYixDQURMLENBaEJrQjs7QUFtQmxCLG1CQUFPLElBQVAsQ0FuQmtCOzs7Ozs7Ozs7OztzQ0EyQlIsS0FBSztBQUNmLGdCQUFNLEtBQUssZUFBSyxNQUFMLEVBQUwsQ0FEUztBQUVmLGdCQUFNLEtBQUssZUFBSyxNQUFMLEVBQUwsQ0FGUztBQUdmLGdCQUFNLFNBQVMsS0FBSyxNQUFMLENBSEE7O0FBS2YsaUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLENBQUosRUFBTyxHQUF2QixFQUE0QjtBQUN4QixvQkFBTSxRQUFRLE9BQU8sQ0FBUCxDQUFSLENBRGtCOztBQUd4QixtQkFBRyxDQUFILElBQVEsTUFBTSxNQUFOLENBQWEsQ0FBYixJQUFrQixDQUFsQixHQUFzQixJQUFJLEdBQUosQ0FBUSxDQUFSLENBQXRCLEdBQW1DLElBQUksR0FBSixDQUFRLENBQVIsQ0FBbkMsQ0FIZ0I7QUFJeEIsbUJBQUcsQ0FBSCxJQUFRLE1BQU0sTUFBTixDQUFhLENBQWIsSUFBa0IsQ0FBbEIsR0FBc0IsSUFBSSxHQUFKLENBQVEsQ0FBUixDQUF0QixHQUFtQyxJQUFJLEdBQUosQ0FBUSxDQUFSLENBQW5DLENBSmdCO0FBS3hCLG1CQUFHLENBQUgsSUFBUSxNQUFNLE1BQU4sQ0FBYSxDQUFiLElBQWtCLENBQWxCLEdBQXNCLElBQUksR0FBSixDQUFRLENBQVIsQ0FBdEIsR0FBbUMsSUFBSSxHQUFKLENBQVEsQ0FBUixDQUFuQyxDQUxnQjtBQU14QixtQkFBRyxDQUFILElBQVEsTUFBTSxNQUFOLENBQWEsQ0FBYixJQUFrQixDQUFsQixHQUFzQixJQUFJLEdBQUosQ0FBUSxDQUFSLENBQXRCLEdBQW1DLElBQUksR0FBSixDQUFRLENBQVIsQ0FBbkMsQ0FOZ0I7QUFPeEIsbUJBQUcsQ0FBSCxJQUFRLE1BQU0sTUFBTixDQUFhLENBQWIsSUFBa0IsQ0FBbEIsR0FBc0IsSUFBSSxHQUFKLENBQVEsQ0FBUixDQUF0QixHQUFtQyxJQUFJLEdBQUosQ0FBUSxDQUFSLENBQW5DLENBUGdCO0FBUXhCLG1CQUFHLENBQUgsSUFBUSxNQUFNLE1BQU4sQ0FBYSxDQUFiLElBQWtCLENBQWxCLEdBQXNCLElBQUksR0FBSixDQUFRLENBQVIsQ0FBdEIsR0FBbUMsSUFBSSxHQUFKLENBQVEsQ0FBUixDQUFuQyxDQVJnQjs7QUFVeEIsb0JBQU0sS0FBSyxNQUFNLGVBQU4sQ0FBc0IsRUFBdEIsQ0FBTCxDQVZrQjtBQVd4QixvQkFBTSxLQUFLLE1BQU0sZUFBTixDQUFzQixFQUF0QixDQUFMOzs7QUFYa0Isb0JBY3BCLEtBQUssQ0FBTCxJQUFVLEtBQUssQ0FBTCxFQUFRO0FBQ2xCLDJCQUFPLEtBQVAsQ0FEa0I7aUJBQXRCO2FBZEo7O0FBbUJBLG1CQUFPLElBQVAsQ0F4QmU7Ozs7V0FsRGpCOzs7a0JBOEVTIiwiZmlsZSI6IkZydXN0dW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlYzN9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgUGxhbmUgZnJvbSAnLi9QbGFuZSc7XG5cbi8qKlxuICog0JfQsNC00LDRkdGCIGZydXN0dW0g0LIg0YLRgNGR0YXQvNC10YDQvdC+0Lwg0L/RgNC+0YHRgtGA0LDQvdGB0YLQstC1XG4gKlxuICog0JLQt9GP0YLQviDQuNC3IFt0aHJlZS5qc10oaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbWF0aC9GcnVzdHVtLmpzKVxuICovXG5jbGFzcyBGcnVzdHVtIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwbGFuZXMg0JzQsNGB0YHQuNCyINC40Lcg0YjQtdGB0YLQuCDQv9C70L7RgdC60L7RgdGC0LXQuSwg0YTQvtGA0LzQuNGA0YPRjtGJ0LjRhSBmcnVzdHVtXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGxhbmVzKSB7XG4gICAgICAgIHRoaXMucGxhbmVzID0gcGxhbmVzO1xuXG4gICAgICAgIGlmICghdGhpcy5wbGFuZXMgfHwgdGhpcy5wbGFuZXMubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgICAgICB0aGlzLnBsYW5lcyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKSxcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKSxcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKSxcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKSxcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKSxcbiAgICAgICAgICAgICAgICBuZXcgUGxhbmUoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC/0LvQvtGB0LrQvtGB0YLQuCBmcnVzdHVtINCyINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQtSDRgSDQvNCw0YLRgNC40YbQtdC5XG4gICAgICogQHBhcmFtIHttYXQ0fSBtYXRyaXhcbiAgICAgKi9cbiAgICBzZXRGcm9tTWF0cml4KG1hdHJpeCkge1xuICAgICAgICB0aGlzLnBsYW5lc1swXS5zZXRDb21wb25lbnRzKG1hdHJpeFsxMl0gKyBtYXRyaXhbMF0sIG1hdHJpeFsxM10gKyBtYXRyaXhbMV0sIG1hdHJpeFsxNF0gKyBtYXRyaXhbMl0sXG4gICAgICAgICAgICAgbWF0cml4WzE1XSArIG1hdHJpeFszXSk7XG5cbiAgICAgICAgdGhpcy5wbGFuZXNbMV0uc2V0Q29tcG9uZW50cyhtYXRyaXhbMTJdIC0gbWF0cml4WzBdLCBtYXRyaXhbMTNdIC0gbWF0cml4WzFdLCBtYXRyaXhbMTRdIC0gbWF0cml4WzJdLFxuICAgICAgICAgICAgIG1hdHJpeFsxNV0gLSBtYXRyaXhbM10pO1xuXG4gICAgICAgIHRoaXMucGxhbmVzWzJdLnNldENvbXBvbmVudHMobWF0cml4WzEyXSArIG1hdHJpeFs0XSwgbWF0cml4WzEzXSArIG1hdHJpeFs1XSwgbWF0cml4WzE0XSArIG1hdHJpeFs2XSxcbiAgICAgICAgICAgICBtYXRyaXhbMTVdICsgbWF0cml4WzddKTtcblxuICAgICAgICB0aGlzLnBsYW5lc1szXS5zZXRDb21wb25lbnRzKG1hdHJpeFsxMl0gLSBtYXRyaXhbNF0sIG1hdHJpeFsxM10gLSBtYXRyaXhbNV0sIG1hdHJpeFsxNF0gLSBtYXRyaXhbNl0sXG4gICAgICAgICAgICAgbWF0cml4WzE1XSAtIG1hdHJpeFs3XSk7XG5cbiAgICAgICAgdGhpcy5wbGFuZXNbNF0uc2V0Q29tcG9uZW50cyhtYXRyaXhbMTJdICsgbWF0cml4WzhdLCBtYXRyaXhbMTNdICsgbWF0cml4WzldLCBtYXRyaXhbMTRdICsgbWF0cml4WzEwXSxcbiAgICAgICAgICAgICBtYXRyaXhbMTVdICsgbWF0cml4WzExXSk7XG5cbiAgICAgICAgdGhpcy5wbGFuZXNbNV0uc2V0Q29tcG9uZW50cyhtYXRyaXhbMTJdIC0gbWF0cml4WzhdLCBtYXRyaXhbMTNdIC0gbWF0cml4WzldLCBtYXRyaXhbMTRdIC0gbWF0cml4WzEwXSxcbiAgICAgICAgICAgICBtYXRyaXhbMTVdIC0gbWF0cml4WzExXSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LLQtdGA0Y/QtdGCLCDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCB7QGxpbmsgQm94fSDQsiDQvtCx0LvQsNGB0YLQuCBmcnVzdHVtXG4gICAgICogQHBhcmFtIHtCb3h9IGJveFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGludGVyc2VjdHNCb3goYm94KSB7XG4gICAgICAgIGNvbnN0IHAxID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgcDIgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBwbGFuZXMgPSB0aGlzLnBsYW5lcztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGxhbmUgPSBwbGFuZXNbaV07XG5cbiAgICAgICAgICAgIHAxWzBdID0gcGxhbmUubm9ybWFsWzBdID4gMCA/IGJveC5taW5bMF0gOiBib3gubWF4WzBdO1xuICAgICAgICAgICAgcDJbMF0gPSBwbGFuZS5ub3JtYWxbMF0gPiAwID8gYm94Lm1heFswXSA6IGJveC5taW5bMF07XG4gICAgICAgICAgICBwMVsxXSA9IHBsYW5lLm5vcm1hbFsxXSA+IDAgPyBib3gubWluWzFdIDogYm94Lm1heFsxXTtcbiAgICAgICAgICAgIHAyWzFdID0gcGxhbmUubm9ybWFsWzFdID4gMCA/IGJveC5tYXhbMV0gOiBib3gubWluWzFdO1xuICAgICAgICAgICAgcDFbMl0gPSBwbGFuZS5ub3JtYWxbMl0gPiAwID8gYm94Lm1pblsyXSA6IGJveC5tYXhbMl07XG4gICAgICAgICAgICBwMlsyXSA9IHBsYW5lLm5vcm1hbFsyXSA+IDAgPyBib3gubWF4WzJdIDogYm94Lm1pblsyXTtcblxuICAgICAgICAgICAgY29uc3QgZDEgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQocDEpO1xuICAgICAgICAgICAgY29uc3QgZDIgPSBwbGFuZS5kaXN0YW5jZVRvUG9pbnQocDIpO1xuXG4gICAgICAgICAgICAvLyBpZiBib3RoIG91dHNpZGUgcGxhbmUsIG5vIGludGVyc2VjdGlvblxuICAgICAgICAgICAgaWYgKGQxIDwgMCAmJiBkMiA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZydXN0dW07XG4iXX0=