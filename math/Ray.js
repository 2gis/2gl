'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Луч
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js)
 */

var Ray = function () {
    /**
     * @param {vec3} origin Позиция начала луча
     * @param {vec3} direction Направление луча
     */

    function Ray(origin, direction) {
        _classCallCheck(this, Ray);

        /**
         * Начало
         * @type {vec3}
         */
        this.origin = origin || _glMatrix.vec3.create();

        /**
         * Направление
         * @type {vec3}
         */
        this.direction = direction || _glMatrix.vec3.create();
    }

    /**
     * Возвращает копию луча
     * @returns {Ray}
     */


    _createClass(Ray, [{
        key: 'clone',
        value: function clone() {
            return new Ray(_glMatrix.vec3.clone(this.origin), _glMatrix.vec3.clone(this.direction));
        }

        /**
         * Ищёт точку на луче с заданным множителем
         * @param {Number} t Множитель
         * @returns {vec3}
         */

    }, {
        key: 'at',
        value: function at(t) {
            var result = _glMatrix.vec3.create();
            _glMatrix.vec3.scaleAndAdd(result, this.origin, this.direction, t);
            return result;
        }

        /**
         * Проверяет пересекает ли луч паралелепипед
         * @param {Box} box
         * @returns {?vec3} Точка пересечения или null
         */

    }, {
        key: 'intersectBox',
        value: function intersectBox(box) {
            var tmin = void 0,
                tmax = void 0,
                tymin = void 0,
                tymax = void 0,
                tzmin = void 0,
                tzmax = void 0;

            var invdirx = 1 / this.direction[0];
            var invdiry = 1 / this.direction[1];
            var invdirz = 1 / this.direction[2];

            var origin = this.origin;

            if (invdirx >= 0) {
                tmin = (box.min[0] - origin[0]) * invdirx;
                tmax = (box.max[0] - origin[0]) * invdirx;
            } else {
                tmin = (box.max[0] - origin[0]) * invdirx;
                tmax = (box.min[0] - origin[0]) * invdirx;
            }

            if (invdiry >= 0) {
                tymin = (box.min[1] - origin[1]) * invdiry;
                tymax = (box.max[1] - origin[1]) * invdiry;
            } else {
                tymin = (box.max[1] - origin[1]) * invdiry;
                tymax = (box.min[1] - origin[1]) * invdiry;
            }

            if (tmin > tymax || tymin > tmax) {
                return null;
            }

            // These lines also handle the case where tmin or tmax is NaN
            // (result of 0 * Infinity). x !== x returns true if x is NaN
            if (tymin > tmin || tmin !== tmin) {
                tmin = tymin;
            }

            if (tymax < tmax || tmax !== tmax) {
                tmax = tymax;
            }

            if (invdirz >= 0) {
                tzmin = (box.min[2] - origin[2]) * invdirz;
                tzmax = (box.max[2] - origin[2]) * invdirz;
            } else {
                tzmin = (box.max[2] - origin[2]) * invdirz;
                tzmax = (box.min[2] - origin[2]) * invdirz;
            }

            if (tmin > tzmax || tzmin > tmax) {
                return null;
            }

            if (tzmin > tmin || tmin !== tmin) {
                tmin = tzmin;
            }

            if (tzmax < tmax || tmax !== tmax) {
                tmax = tzmax;
            }

            // return point closest to the ray (positive side)
            if (tmax < 0) {
                return null;
            }

            return this.at(tmin >= 0 ? tmin : tmax);
        }

        /**
         * Изменяет направление луча с помощью матрицы
         * @param {mat4} matrix
         */

    }, {
        key: 'applyMatrix4',
        value: function applyMatrix4(matrix) {
            _glMatrix.vec3.add(this.direction, this.direction, this.origin);
            _glMatrix.vec3.transformMat4(this.direction, this.direction, matrix);
            _glMatrix.vec3.transformMat4(this.origin, this.origin, matrix);
            _glMatrix.vec3.sub(this.direction, this.direction, this.origin);
            _glMatrix.vec3.normalize(this.direction, this.direction);

            return this;
        }

        /**
         * Проверяет пересекает ли луч заданный треугольник
         * @param {vec3[]} triangle
         * @param {Boolean} [backfaceCulling=false] Если true, то луч может пересечь только переднюю сторону треугольника
         * @returns {?vec3} Точка пересечения или null
         */

    }, {
        key: 'intersectTriangle',
        value: function intersectTriangle(triangle, backfaceCulling) {
            // Compute the offset origin, edges, and normal.
            var edge1 = _glMatrix.vec3.create();
            var edge2 = _glMatrix.vec3.create();
            var normal = _glMatrix.vec3.create();

            _glMatrix.vec3.sub(edge1, triangle[1], triangle[0]);
            _glMatrix.vec3.sub(edge2, triangle[2], triangle[0]);
            _glMatrix.vec3.cross(normal, edge1, edge2);

            // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
            // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
            //   |Dot(D,N)| * b1 = sign(Dot(D, N)) * Dot(D, Cross(Q, E2))
            //   |Dot(D,N)| * b2 = sign(Dot(D, N)) * Dot(D, Cross(E1, Q))
            //   |Dot(D,N)| * t = -sign(Dot(D, N)) * Dot(Q, N)
            var DdN = _glMatrix.vec3.dot(this.direction, normal);
            var sign = void 0;

            if (DdN > 0) {
                if (backfaceCulling) {
                    return null;
                }
                sign = 1;
            } else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            } else {
                return null;
            }

            var diff = _glMatrix.vec3.create();
            _glMatrix.vec3.sub(diff, this.origin, triangle[0]);

            var cde2 = _glMatrix.vec3.create();
            _glMatrix.vec3.cross(cde2, diff, edge2);

            var DdQxE2 = sign * _glMatrix.vec3.dot(this.direction, cde2);

            // b1 < 0, no intersection
            if (DdQxE2 < 0) {
                return null;
            }

            var cde1 = _glMatrix.vec3.create();
            _glMatrix.vec3.cross(cde1, edge1, diff);
            var DdE1xQ = sign * _glMatrix.vec3.dot(this.direction, cde1);

            // b2 < 0, no intersection
            if (DdE1xQ < 0) {
                return null;
            }

            // b1+b2 > 1, no intersection
            if (DdQxE2 + DdE1xQ > DdN) {
                return null;
            }

            // Line intersects triangle, check if ray does.
            var QdN = -sign * _glMatrix.vec3.dot(diff, normal);

            // t < 0, no intersection
            if (QdN < 0) {
                return null;
            }

            // Ray intersects triangle.
            return this.at(QdN / DdN);
        }

        /**
         * Ищет расстояние от начала луча до плоскости
         * @param {Plane} plane
         * @returns {?Number}
         */

    }, {
        key: 'distanceToPlane',
        value: function distanceToPlane(plane) {
            var denominator = _glMatrix.vec3.dot(plane.normal, this.direction);

            if (denominator === 0) {
                // line is coplanar, return origin
                if (plane.distanceToPoint(this.origin) === 0) {
                    return 0;
                }

                // Null is preferable to undefined since undefined means.... it is undefined
                return null;
            }

            var t = -(_glMatrix.vec3.dot(this.origin, plane.normal) + plane.constant) / denominator;

            // Return if the ray never intersects the plane
            return t >= 0 ? t : null;
        }

        /**
         * Проверяет пересекает ли луч заданную плоскость
         * @param {Plane} plane
         * @returns {?vec3} Точка пересечения или null
         */

    }, {
        key: 'intersectPlane',
        value: function intersectPlane(plane) {
            var t = this.distanceToPlane(plane);

            if (t === null) {
                return null;
            }

            return this.at(t);
        }
    }]);

    return Ray;
}();

exports.default = Ray;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LEtBQXVDLENBQXZDLEVBQTBDO0FBQzFDLDJCQUFPLENBQVAsQ0FEMEM7aUJBQTlDOzs7QUFGbUIsdUJBT1osSUFBUCxDQVBtQjthQUF2Qjs7QUFVQSxnQkFBTSxJQUFJLEVBQUUsZUFBSyxHQUFMLENBQVMsS0FBSyxNQUFMLEVBQWEsTUFBTSxNQUFOLENBQXRCLEdBQXNDLE1BQU0sUUFBTixDQUF4QyxHQUEwRCxXQUExRDs7O0FBYlMsbUJBZ0JaLEtBQUssQ0FBTCxHQUFTLENBQVQsR0FBYSxJQUFiLENBaEJZOzs7Ozs7Ozs7Ozt1Q0F3QlIsT0FBTztBQUNsQixnQkFBTSxJQUFJLEtBQUssZUFBTCxDQUFxQixLQUFyQixDQUFKLENBRFk7O0FBR2xCLGdCQUFJLE1BQU0sSUFBTixFQUFZO0FBQ1osdUJBQU8sSUFBUCxDQURZO2FBQWhCOztBQUlBLG1CQUFPLEtBQUssRUFBTCxDQUFRLENBQVIsQ0FBUCxDQVBrQjs7OztXQXBOcEI7OztrQkErTlMiLCJmaWxlIjoiUmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vKipcbiAqINCb0YPRh1xuICpcbiAqINCS0LfRj9GC0L4g0LjQtyBbdGhyZWUuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL21hdGgvUmF5LmpzKVxuICovXG5jbGFzcyBSYXkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7dmVjM30gb3JpZ2luINCf0L7Qt9C40YbQuNGPINC90LDRh9Cw0LvQsCDQu9GD0YfQsFxuICAgICAqIEBwYXJhbSB7dmVjM30gZGlyZWN0aW9uINCd0LDQv9GA0LDQstC70LXQvdC40LUg0LvRg9GH0LBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcmlnaW4sIGRpcmVjdGlvbikge1xuICAgICAgICAvKipcbiAgICAgICAgICog0J3QsNGH0LDQu9C+XG4gICAgICAgICAqIEB0eXBlIHt2ZWMzfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW4gfHwgdmVjMy5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J3QsNC/0YDQsNCy0LvQtdC90LjQtVxuICAgICAgICAgKiBAdHlwZSB7dmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uIHx8IHZlYzMuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LrQvtC/0LjRjiDQu9GD0YfQsFxuICAgICAqIEByZXR1cm5zIHtSYXl9XG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmF5KHZlYzMuY2xvbmUodGhpcy5vcmlnaW4pLCB2ZWMzLmNsb25lKHRoaXMuZGlyZWN0aW9uKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjRidGR0YIg0YLQvtGH0LrRgyDQvdCwINC70YPRh9C1INGBINC30LDQtNCw0L3QvdGL0Lwg0LzQvdC+0LbQuNGC0LXQu9C10LxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCDQnNC90L7QttC40YLQtdC70YxcbiAgICAgKiBAcmV0dXJucyB7dmVjM31cbiAgICAgKi9cbiAgICBhdCh0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHZlYzMuY3JlYXRlKCk7XG4gICAgICAgIHZlYzMuc2NhbGVBbmRBZGQocmVzdWx0LCB0aGlzLm9yaWdpbiwgdGhpcy5kaXJlY3Rpb24sIHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXRgiDQv9C10YDQtdGB0LXQutCw0LXRgiDQu9C4INC70YPRhyDQv9Cw0YDQsNC70LXQu9C10L/QuNC/0LXQtFxuICAgICAqIEBwYXJhbSB7Qm94fSBib3hcbiAgICAgKiBAcmV0dXJucyB7P3ZlYzN9INCi0L7Rh9C60LAg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDQuNC70LggbnVsbFxuICAgICAqL1xuICAgIGludGVyc2VjdEJveChib3gpIHtcbiAgICAgICAgbGV0IHRtaW4sIHRtYXgsIHR5bWluLCB0eW1heCwgdHptaW4sIHR6bWF4O1xuXG4gICAgICAgIGNvbnN0IGludmRpcnggPSAxIC8gdGhpcy5kaXJlY3Rpb25bMF07XG4gICAgICAgIGNvbnN0IGludmRpcnkgPSAxIC8gdGhpcy5kaXJlY3Rpb25bMV07XG4gICAgICAgIGNvbnN0IGludmRpcnogPSAxIC8gdGhpcy5kaXJlY3Rpb25bMl07XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5vcmlnaW47XG5cbiAgICAgICAgaWYgKGludmRpcnggPj0gMCkge1xuICAgICAgICAgICAgdG1pbiA9IChib3gubWluWzBdIC0gb3JpZ2luWzBdKSAqIGludmRpcng7XG4gICAgICAgICAgICB0bWF4ID0gKGJveC5tYXhbMF0gLSBvcmlnaW5bMF0pICogaW52ZGlyeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRtaW4gPSAoYm94Lm1heFswXSAtIG9yaWdpblswXSkgKiBpbnZkaXJ4O1xuICAgICAgICAgICAgdG1heCA9IChib3gubWluWzBdIC0gb3JpZ2luWzBdKSAqIGludmRpcng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW52ZGlyeSA+PSAwKSB7XG4gICAgICAgICAgICB0eW1pbiA9IChib3gubWluWzFdIC0gb3JpZ2luWzFdKSAqIGludmRpcnk7XG4gICAgICAgICAgICB0eW1heCA9IChib3gubWF4WzFdIC0gb3JpZ2luWzFdKSAqIGludmRpcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eW1pbiA9IChib3gubWF4WzFdIC0gb3JpZ2luWzFdKSAqIGludmRpcnk7XG4gICAgICAgICAgICB0eW1heCA9IChib3gubWluWzFdIC0gb3JpZ2luWzFdKSAqIGludmRpcnk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHRtaW4gPiB0eW1heCkgfHwgKHR5bWluID4gdG1heCkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAvLyBUaGVzZSBsaW5lcyBhbHNvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0bWluIG9yIHRtYXggaXMgTmFOXG4gICAgICAgIC8vIChyZXN1bHQgb2YgMCAqIEluZmluaXR5KS4geCAhPT0geCByZXR1cm5zIHRydWUgaWYgeCBpcyBOYU5cbiAgICAgICAgaWYgKHR5bWluID4gdG1pbiB8fCB0bWluICE9PSB0bWluKSB7IHRtaW4gPSB0eW1pbjsgfVxuXG4gICAgICAgIGlmICh0eW1heCA8IHRtYXggfHwgdG1heCAhPT0gdG1heCkgeyB0bWF4ID0gdHltYXg7IH1cblxuICAgICAgICBpZiAoaW52ZGlyeiA+PSAwKSB7XG4gICAgICAgICAgICB0em1pbiA9IChib3gubWluWzJdIC0gb3JpZ2luWzJdKSAqIGludmRpcno7XG4gICAgICAgICAgICB0em1heCA9IChib3gubWF4WzJdIC0gb3JpZ2luWzJdKSAqIGludmRpcno7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0em1pbiA9IChib3gubWF4WzJdIC0gb3JpZ2luWzJdKSAqIGludmRpcno7XG4gICAgICAgICAgICB0em1heCA9IChib3gubWluWzJdIC0gb3JpZ2luWzJdKSAqIGludmRpcno7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHRtaW4gPiB0em1heCkgfHwgKHR6bWluID4gdG1heCkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBpZiAodHptaW4gPiB0bWluIHx8IHRtaW4gIT09IHRtaW4pIHsgdG1pbiA9IHR6bWluOyB9XG5cbiAgICAgICAgaWYgKHR6bWF4IDwgdG1heCB8fCB0bWF4ICE9PSB0bWF4KSB7IHRtYXggPSB0em1heDsgfVxuXG4gICAgICAgIC8vIHJldHVybiBwb2ludCBjbG9zZXN0IHRvIHRoZSByYXkgKHBvc2l0aXZlIHNpZGUpXG4gICAgICAgIGlmICh0bWF4IDwgMCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmF0KHRtaW4gPj0gMCA/IHRtaW4gOiB0bWF4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNC30LzQtdC90Y/QtdGCINC90LDQv9GA0LDQstC70LXQvdC40LUg0LvRg9GH0LAg0YEg0L/QvtC80L7RidGM0Y4g0LzQsNGC0YDQuNGG0YtcbiAgICAgKiBAcGFyYW0ge21hdDR9IG1hdHJpeFxuICAgICAqL1xuICAgIGFwcGx5TWF0cml4NChtYXRyaXgpIHtcbiAgICAgICAgdmVjMy5hZGQodGhpcy5kaXJlY3Rpb24sIHRoaXMuZGlyZWN0aW9uLCB0aGlzLm9yaWdpbik7XG4gICAgICAgIHZlYzMudHJhbnNmb3JtTWF0NCh0aGlzLmRpcmVjdGlvbiwgdGhpcy5kaXJlY3Rpb24sIG1hdHJpeCk7XG4gICAgICAgIHZlYzMudHJhbnNmb3JtTWF0NCh0aGlzLm9yaWdpbiwgdGhpcy5vcmlnaW4sIG1hdHJpeCk7XG4gICAgICAgIHZlYzMuc3ViKHRoaXMuZGlyZWN0aW9uLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy5vcmlnaW4pO1xuICAgICAgICB2ZWMzLm5vcm1hbGl6ZSh0aGlzLmRpcmVjdGlvbiwgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXRgiDQv9C10YDQtdGB0LXQutCw0LXRgiDQu9C4INC70YPRhyDQt9Cw0LTQsNC90L3Ri9C5INGC0YDQtdGD0LPQvtC70YzQvdC40LpcbiAgICAgKiBAcGFyYW0ge3ZlYzNbXX0gdHJpYW5nbGVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtiYWNrZmFjZUN1bGxpbmc9ZmFsc2VdINCV0YHQu9C4IHRydWUsINGC0L4g0LvRg9GHINC80L7QttC10YIg0L/QtdGA0LXRgdC10YfRjCDRgtC+0LvRjNC60L4g0L/QtdGA0LXQtNC90Y7RjiDRgdGC0L7RgNC+0L3RgyDRgtGA0LXRg9Cz0L7Qu9GM0L3QuNC60LBcbiAgICAgKiBAcmV0dXJucyB7P3ZlYzN9INCi0L7Rh9C60LAg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDQuNC70LggbnVsbFxuICAgICAqL1xuICAgIGludGVyc2VjdFRyaWFuZ2xlKHRyaWFuZ2xlLCBiYWNrZmFjZUN1bGxpbmcpIHtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgb2Zmc2V0IG9yaWdpbiwgZWRnZXMsIGFuZCBub3JtYWwuXG4gICAgICAgIGNvbnN0IGVkZ2UxID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgZWRnZTIgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBub3JtYWwgPSB2ZWMzLmNyZWF0ZSgpO1xuXG4gICAgICAgIHZlYzMuc3ViKGVkZ2UxLCB0cmlhbmdsZVsxXSwgdHJpYW5nbGVbMF0pO1xuICAgICAgICB2ZWMzLnN1YihlZGdlMiwgdHJpYW5nbGVbMl0sIHRyaWFuZ2xlWzBdKTtcbiAgICAgICAgdmVjMy5jcm9zcyhub3JtYWwsIGVkZ2UxLCBlZGdlMik7XG5cbiAgICAgICAgLy8gU29sdmUgUSArIHQqRCA9IGIxKkUxICsgYjIqRTIgKFEgPSBrRGlmZiwgRCA9IHJheSBkaXJlY3Rpb24sXG4gICAgICAgIC8vIEUxID0ga0VkZ2UxLCBFMiA9IGtFZGdlMiwgTiA9IENyb3NzKEUxLEUyKSkgYnlcbiAgICAgICAgLy8gICB8RG90KEQsTil8ICogYjEgPSBzaWduKERvdChELCBOKSkgKiBEb3QoRCwgQ3Jvc3MoUSwgRTIpKVxuICAgICAgICAvLyAgIHxEb3QoRCxOKXwgKiBiMiA9IHNpZ24oRG90KEQsIE4pKSAqIERvdChELCBDcm9zcyhFMSwgUSkpXG4gICAgICAgIC8vICAgfERvdChELE4pfCAqIHQgPSAtc2lnbihEb3QoRCwgTikpICogRG90KFEsIE4pXG4gICAgICAgIGxldCBEZE4gPSB2ZWMzLmRvdCh0aGlzLmRpcmVjdGlvbiwgbm9ybWFsKTtcbiAgICAgICAgbGV0IHNpZ247XG5cbiAgICAgICAgaWYgKERkTiA+IDApIHtcbiAgICAgICAgICAgIGlmIChiYWNrZmFjZUN1bGxpbmcpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgICAgIHNpZ24gPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKERkTiA8IDApIHtcbiAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgICAgIERkTiA9IC1EZE47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpZmYgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB2ZWMzLnN1YihkaWZmLCB0aGlzLm9yaWdpbiwgdHJpYW5nbGVbMF0pO1xuXG4gICAgICAgIGNvbnN0IGNkZTIgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB2ZWMzLmNyb3NzKGNkZTIsIGRpZmYsIGVkZ2UyKTtcblxuICAgICAgICBjb25zdCBEZFF4RTIgPSBzaWduICogdmVjMy5kb3QodGhpcy5kaXJlY3Rpb24sIGNkZTIpO1xuXG4gICAgICAgIC8vIGIxIDwgMCwgbm8gaW50ZXJzZWN0aW9uXG4gICAgICAgIGlmIChEZFF4RTIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNkZTEgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB2ZWMzLmNyb3NzKGNkZTEsIGVkZ2UxLCBkaWZmKTtcbiAgICAgICAgY29uc3QgRGRFMXhRID0gc2lnbiAqIHZlYzMuZG90KHRoaXMuZGlyZWN0aW9uLCBjZGUxKTtcblxuICAgICAgICAvLyBiMiA8IDAsIG5vIGludGVyc2VjdGlvblxuICAgICAgICBpZiAoRGRFMXhRIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBiMStiMiA+IDEsIG5vIGludGVyc2VjdGlvblxuICAgICAgICBpZiAoRGRReEUyICsgRGRFMXhRID4gRGROKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExpbmUgaW50ZXJzZWN0cyB0cmlhbmdsZSwgY2hlY2sgaWYgcmF5IGRvZXMuXG4gICAgICAgIGNvbnN0IFFkTiA9IC1zaWduICogdmVjMy5kb3QoZGlmZiwgbm9ybWFsKTtcblxuICAgICAgICAvLyB0IDwgMCwgbm8gaW50ZXJzZWN0aW9uXG4gICAgICAgIGlmIChRZE4gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJheSBpbnRlcnNlY3RzIHRyaWFuZ2xlLlxuICAgICAgICByZXR1cm4gdGhpcy5hdChRZE4gLyBEZE4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0YnQtdGCINGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0L3QsNGH0LDQu9CwINC70YPRh9CwINC00L4g0L/Qu9C+0YHQutC+0YHRgtC4XG4gICAgICogQHBhcmFtIHtQbGFuZX0gcGxhbmVcbiAgICAgKiBAcmV0dXJucyB7P051bWJlcn1cbiAgICAgKi9cbiAgICBkaXN0YW5jZVRvUGxhbmUocGxhbmUpIHtcbiAgICAgICAgY29uc3QgZGVub21pbmF0b3IgPSB2ZWMzLmRvdChwbGFuZS5ub3JtYWwsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGVub21pbmF0b3IgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGxpbmUgaXMgY29wbGFuYXIsIHJldHVybiBvcmlnaW5cbiAgICAgICAgICAgIGlmIChwbGFuZS5kaXN0YW5jZVRvUG9pbnQodGhpcy5vcmlnaW4pID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE51bGwgaXMgcHJlZmVyYWJsZSB0byB1bmRlZmluZWQgc2luY2UgdW5kZWZpbmVkIG1lYW5zLi4uLiBpdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdCA9IC0odmVjMy5kb3QodGhpcy5vcmlnaW4sIHBsYW5lLm5vcm1hbCkgKyBwbGFuZS5jb25zdGFudCkgLyBkZW5vbWluYXRvcjtcblxuICAgICAgICAvLyBSZXR1cm4gaWYgdGhlIHJheSBuZXZlciBpbnRlcnNlY3RzIHRoZSBwbGFuZVxuICAgICAgICByZXR1cm4gdCA+PSAwID8gdCA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LLQtdGA0Y/QtdGCINC/0LXRgNC10YHQtdC60LDQtdGCINC70Lgg0LvRg9GHINC30LDQtNCw0L3QvdGD0Y4g0L/Qu9C+0YHQutC+0YHRgtGMXG4gICAgICogQHBhcmFtIHtQbGFuZX0gcGxhbmVcbiAgICAgKiBAcmV0dXJucyB7P3ZlYzN9INCi0L7Rh9C60LAg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDQuNC70LggbnVsbFxuICAgICAqL1xuICAgIGludGVyc2VjdFBsYW5lKHBsYW5lKSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmRpc3RhbmNlVG9QbGFuZShwbGFuZSk7XG5cbiAgICAgICAgaWYgKHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXQodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYXk7XG4iXX0=