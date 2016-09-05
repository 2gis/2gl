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
//# sourceMappingURL=data:application/json;base64,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QSxnQkFBSSxNQUFNLElBQVYsRUFBZ0I7QUFDWix1QkFBTyxJQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBSyxFQUFMLENBQVEsQ0FBUixDQUFQO0FBQ0g7Ozs7OztrQkFHVSxHIiwiZmlsZSI6IlJheS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjM30gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQm9GD0YdcbiAqXG4gKiDQktC30Y/RgtC+INC40LcgW3RocmVlLmpzXShodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9tYXRoL1JheS5qcylcbiAqL1xuY2xhc3MgUmF5IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IG9yaWdpbiDQn9C+0LfQuNGG0LjRjyDQvdCw0YfQsNC70LAg0LvRg9GH0LBcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IGRpcmVjdGlvbiDQndCw0L/RgNCw0LLQu9C10L3QuNC1INC70YPRh9CwXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3JpZ2luLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCd0LDRh9Cw0LvQvlxuICAgICAgICAgKiBAdHlwZSB7dmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3JpZ2luID0gb3JpZ2luIHx8IHZlYzMuY3JlYXRlKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCd0LDQv9GA0LDQstC70LXQvdC40LVcbiAgICAgICAgICogQHR5cGUge3ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC60L7Qv9C40Y4g0LvRg9GH0LBcbiAgICAgKiBAcmV0dXJucyB7UmF5fVxuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IFJheSh2ZWMzLmNsb25lKHRoaXMub3JpZ2luKSwgdmVjMy5jbG9uZSh0aGlzLmRpcmVjdGlvbikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0YnRkdGCINGC0L7Rh9C60YMg0L3QsCDQu9GD0YfQtSDRgSDQt9Cw0LTQsNC90L3Ri9C8INC80L3QvtC20LjRgtC10LvQtdC8XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQg0JzQvdC+0LbQuNGC0LXQu9GMXG4gICAgICogQHJldHVybnMge3ZlYzN9XG4gICAgICovXG4gICAgYXQodCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB2ZWMzLnNjYWxlQW5kQWRkKHJlc3VsdCwgdGhpcy5vcmlnaW4sIHRoaXMuZGlyZWN0aW9uLCB0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0L7QstC10YDRj9C10YIg0L/QtdGA0LXRgdC10LrQsNC10YIg0LvQuCDQu9GD0Ycg0L/QsNGA0LDQu9C10LvQtdC/0LjQv9C10LRcbiAgICAgKiBAcGFyYW0ge0JveH0gYm94XG4gICAgICogQHJldHVybnMgez92ZWMzfSDQotC+0YfQutCwINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LjQu9C4IG51bGxcbiAgICAgKi9cbiAgICBpbnRlcnNlY3RCb3goYm94KSB7XG4gICAgICAgIGxldCB0bWluLCB0bWF4LCB0eW1pbiwgdHltYXgsIHR6bWluLCB0em1heDtcblxuICAgICAgICBjb25zdCBpbnZkaXJ4ID0gMSAvIHRoaXMuZGlyZWN0aW9uWzBdO1xuICAgICAgICBjb25zdCBpbnZkaXJ5ID0gMSAvIHRoaXMuZGlyZWN0aW9uWzFdO1xuICAgICAgICBjb25zdCBpbnZkaXJ6ID0gMSAvIHRoaXMuZGlyZWN0aW9uWzJdO1xuXG4gICAgICAgIGNvbnN0IG9yaWdpbiA9IHRoaXMub3JpZ2luO1xuXG4gICAgICAgIGlmIChpbnZkaXJ4ID49IDApIHtcbiAgICAgICAgICAgIHRtaW4gPSAoYm94Lm1pblswXSAtIG9yaWdpblswXSkgKiBpbnZkaXJ4O1xuICAgICAgICAgICAgdG1heCA9IChib3gubWF4WzBdIC0gb3JpZ2luWzBdKSAqIGludmRpcng7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0bWluID0gKGJveC5tYXhbMF0gLSBvcmlnaW5bMF0pICogaW52ZGlyeDtcbiAgICAgICAgICAgIHRtYXggPSAoYm94Lm1pblswXSAtIG9yaWdpblswXSkgKiBpbnZkaXJ4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGludmRpcnkgPj0gMCkge1xuICAgICAgICAgICAgdHltaW4gPSAoYm94Lm1pblsxXSAtIG9yaWdpblsxXSkgKiBpbnZkaXJ5O1xuICAgICAgICAgICAgdHltYXggPSAoYm94Lm1heFsxXSAtIG9yaWdpblsxXSkgKiBpbnZkaXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHltaW4gPSAoYm94Lm1heFsxXSAtIG9yaWdpblsxXSkgKiBpbnZkaXJ5O1xuICAgICAgICAgICAgdHltYXggPSAoYm94Lm1pblsxXSAtIG9yaWdpblsxXSkgKiBpbnZkaXJ5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0bWluID4gdHltYXgpIHx8ICh0eW1pbiA+IHRtYXgpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgLy8gVGhlc2UgbGluZXMgYWxzbyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdG1pbiBvciB0bWF4IGlzIE5hTlxuICAgICAgICAvLyAocmVzdWx0IG9mIDAgKiBJbmZpbml0eSkuIHggIT09IHggcmV0dXJucyB0cnVlIGlmIHggaXMgTmFOXG4gICAgICAgIGlmICh0eW1pbiA+IHRtaW4gfHwgdG1pbiAhPT0gdG1pbikgeyB0bWluID0gdHltaW47IH1cblxuICAgICAgICBpZiAodHltYXggPCB0bWF4IHx8IHRtYXggIT09IHRtYXgpIHsgdG1heCA9IHR5bWF4OyB9XG5cbiAgICAgICAgaWYgKGludmRpcnogPj0gMCkge1xuICAgICAgICAgICAgdHptaW4gPSAoYm94Lm1pblsyXSAtIG9yaWdpblsyXSkgKiBpbnZkaXJ6O1xuICAgICAgICAgICAgdHptYXggPSAoYm94Lm1heFsyXSAtIG9yaWdpblsyXSkgKiBpbnZkaXJ6O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHptaW4gPSAoYm94Lm1heFsyXSAtIG9yaWdpblsyXSkgKiBpbnZkaXJ6O1xuICAgICAgICAgICAgdHptYXggPSAoYm94Lm1pblsyXSAtIG9yaWdpblsyXSkgKiBpbnZkaXJ6O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0bWluID4gdHptYXgpIHx8ICh0em1pbiA+IHRtYXgpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgaWYgKHR6bWluID4gdG1pbiB8fCB0bWluICE9PSB0bWluKSB7IHRtaW4gPSB0em1pbjsgfVxuXG4gICAgICAgIGlmICh0em1heCA8IHRtYXggfHwgdG1heCAhPT0gdG1heCkgeyB0bWF4ID0gdHptYXg7IH1cblxuICAgICAgICAvLyByZXR1cm4gcG9pbnQgY2xvc2VzdCB0byB0aGUgcmF5IChwb3NpdGl2ZSBzaWRlKVxuICAgICAgICBpZiAodG1heCA8IDApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hdCh0bWluID49IDAgPyB0bWluIDogdG1heCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjQt9C80LXQvdGP0LXRgiDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC70YPRh9CwINGBINC/0L7QvNC+0YnRjNGOINC80LDRgtGA0LjRhtGLXG4gICAgICogQHBhcmFtIHttYXQ0fSBtYXRyaXhcbiAgICAgKi9cbiAgICBhcHBseU1hdHJpeDQobWF0cml4KSB7XG4gICAgICAgIHZlYzMuYWRkKHRoaXMuZGlyZWN0aW9uLCB0aGlzLmRpcmVjdGlvbiwgdGhpcy5vcmlnaW4pO1xuICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDQodGhpcy5kaXJlY3Rpb24sIHRoaXMuZGlyZWN0aW9uLCBtYXRyaXgpO1xuICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDQodGhpcy5vcmlnaW4sIHRoaXMub3JpZ2luLCBtYXRyaXgpO1xuICAgICAgICB2ZWMzLnN1Yih0aGlzLmRpcmVjdGlvbiwgdGhpcy5kaXJlY3Rpb24sIHRoaXMub3JpZ2luKTtcbiAgICAgICAgdmVjMy5ub3JtYWxpemUodGhpcy5kaXJlY3Rpb24sIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0L7QstC10YDRj9C10YIg0L/QtdGA0LXRgdC10LrQsNC10YIg0LvQuCDQu9GD0Ycg0LfQsNC00LDQvdC90YvQuSDRgtGA0LXRg9Cz0L7Qu9GM0L3QuNC6XG4gICAgICogQHBhcmFtIHt2ZWMzW119IHRyaWFuZ2xlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYmFja2ZhY2VDdWxsaW5nPWZhbHNlXSDQldGB0LvQuCB0cnVlLCDRgtC+INC70YPRhyDQvNC+0LbQtdGCINC/0LXRgNC10YHQtdGH0Ywg0YLQvtC70YzQutC+INC/0LXRgNC10LTQvdGO0Y4g0YHRgtC+0YDQvtC90YMg0YLRgNC10YPQs9C+0LvRjNC90LjQutCwXG4gICAgICogQHJldHVybnMgez92ZWMzfSDQotC+0YfQutCwINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LjQu9C4IG51bGxcbiAgICAgKi9cbiAgICBpbnRlcnNlY3RUcmlhbmdsZSh0cmlhbmdsZSwgYmFja2ZhY2VDdWxsaW5nKSB7XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIG9mZnNldCBvcmlnaW4sIGVkZ2VzLCBhbmQgbm9ybWFsLlxuICAgICAgICBjb25zdCBlZGdlMSA9IHZlYzMuY3JlYXRlKCk7XG4gICAgICAgIGNvbnN0IGVkZ2UyID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gdmVjMy5jcmVhdGUoKTtcblxuICAgICAgICB2ZWMzLnN1YihlZGdlMSwgdHJpYW5nbGVbMV0sIHRyaWFuZ2xlWzBdKTtcbiAgICAgICAgdmVjMy5zdWIoZWRnZTIsIHRyaWFuZ2xlWzJdLCB0cmlhbmdsZVswXSk7XG4gICAgICAgIHZlYzMuY3Jvc3Mobm9ybWFsLCBlZGdlMSwgZWRnZTIpO1xuXG4gICAgICAgIC8vIFNvbHZlIFEgKyB0KkQgPSBiMSpFMSArIGIyKkUyIChRID0ga0RpZmYsIEQgPSByYXkgZGlyZWN0aW9uLFxuICAgICAgICAvLyBFMSA9IGtFZGdlMSwgRTIgPSBrRWRnZTIsIE4gPSBDcm9zcyhFMSxFMikpIGJ5XG4gICAgICAgIC8vICAgfERvdChELE4pfCAqIGIxID0gc2lnbihEb3QoRCwgTikpICogRG90KEQsIENyb3NzKFEsIEUyKSlcbiAgICAgICAgLy8gICB8RG90KEQsTil8ICogYjIgPSBzaWduKERvdChELCBOKSkgKiBEb3QoRCwgQ3Jvc3MoRTEsIFEpKVxuICAgICAgICAvLyAgIHxEb3QoRCxOKXwgKiB0ID0gLXNpZ24oRG90KEQsIE4pKSAqIERvdChRLCBOKVxuICAgICAgICBsZXQgRGROID0gdmVjMy5kb3QodGhpcy5kaXJlY3Rpb24sIG5vcm1hbCk7XG4gICAgICAgIGxldCBzaWduO1xuXG4gICAgICAgIGlmIChEZE4gPiAwKSB7XG4gICAgICAgICAgICBpZiAoYmFja2ZhY2VDdWxsaW5nKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgICAgICBzaWduID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChEZE4gPCAwKSB7XG4gICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICBEZE4gPSAtRGROO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaWZmID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdmVjMy5zdWIoZGlmZiwgdGhpcy5vcmlnaW4sIHRyaWFuZ2xlWzBdKTtcblxuICAgICAgICBjb25zdCBjZGUyID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdmVjMy5jcm9zcyhjZGUyLCBkaWZmLCBlZGdlMik7XG5cbiAgICAgICAgY29uc3QgRGRReEUyID0gc2lnbiAqIHZlYzMuZG90KHRoaXMuZGlyZWN0aW9uLCBjZGUyKTtcblxuICAgICAgICAvLyBiMSA8IDAsIG5vIGludGVyc2VjdGlvblxuICAgICAgICBpZiAoRGRReEUyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjZGUxID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdmVjMy5jcm9zcyhjZGUxLCBlZGdlMSwgZGlmZik7XG4gICAgICAgIGNvbnN0IERkRTF4USA9IHNpZ24gKiB2ZWMzLmRvdCh0aGlzLmRpcmVjdGlvbiwgY2RlMSk7XG5cbiAgICAgICAgLy8gYjIgPCAwLCBubyBpbnRlcnNlY3Rpb25cbiAgICAgICAgaWYgKERkRTF4USA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYjErYjIgPiAxLCBubyBpbnRlcnNlY3Rpb25cbiAgICAgICAgaWYgKERkUXhFMiArIERkRTF4USA+IERkTikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMaW5lIGludGVyc2VjdHMgdHJpYW5nbGUsIGNoZWNrIGlmIHJheSBkb2VzLlxuICAgICAgICBjb25zdCBRZE4gPSAtc2lnbiAqIHZlYzMuZG90KGRpZmYsIG5vcm1hbCk7XG5cbiAgICAgICAgLy8gdCA8IDAsIG5vIGludGVyc2VjdGlvblxuICAgICAgICBpZiAoUWROIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSYXkgaW50ZXJzZWN0cyB0cmlhbmdsZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXQoUWROIC8gRGROKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNGJ0LXRgiDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC90LDRh9Cw0LvQsCDQu9GD0YfQsCDQtNC+INC/0LvQvtGB0LrQvtGB0YLQuFxuICAgICAqIEBwYXJhbSB7UGxhbmV9IHBsYW5lXG4gICAgICogQHJldHVybnMgez9OdW1iZXJ9XG4gICAgICovXG4gICAgZGlzdGFuY2VUb1BsYW5lKHBsYW5lKSB7XG4gICAgICAgIGNvbnN0IGRlbm9taW5hdG9yID0gdmVjMy5kb3QocGxhbmUubm9ybWFsLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XG4gICAgICAgICAgICAvLyBsaW5lIGlzIGNvcGxhbmFyLCByZXR1cm4gb3JpZ2luXG4gICAgICAgICAgICBpZiAocGxhbmUuZGlzdGFuY2VUb1BvaW50KHRoaXMub3JpZ2luKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOdWxsIGlzIHByZWZlcmFibGUgdG8gdW5kZWZpbmVkIHNpbmNlIHVuZGVmaW5lZCBtZWFucy4uLi4gaXQgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHQgPSAtKHZlYzMuZG90KHRoaXMub3JpZ2luLCBwbGFuZS5ub3JtYWwpICsgcGxhbmUuY29uc3RhbnQpIC8gZGVub21pbmF0b3I7XG5cbiAgICAgICAgLy8gUmV0dXJuIGlmIHRoZSByYXkgbmV2ZXIgaW50ZXJzZWN0cyB0aGUgcGxhbmVcbiAgICAgICAgcmV0dXJuIHQgPj0gMCA/IHQgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXRgiDQv9C10YDQtdGB0LXQutCw0LXRgiDQu9C4INC70YPRhyDQt9Cw0LTQsNC90L3Rg9GOINC/0LvQvtGB0LrQvtGB0YLRjFxuICAgICAqIEBwYXJhbSB7UGxhbmV9IHBsYW5lXG4gICAgICogQHJldHVybnMgez92ZWMzfSDQotC+0YfQutCwINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LjQu9C4IG51bGxcbiAgICAgKi9cbiAgICBpbnRlcnNlY3RQbGFuZShwbGFuZSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5kaXN0YW5jZVRvUGxhbmUocGxhbmUpO1xuXG4gICAgICAgIGlmICh0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmF0KHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmF5O1xuIl19