'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _glMatrix = require('gl-matrix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для отрисовки 3D объектов. Каждому мешу необходимо задать программу и геометрию.
 *
 * @extends {Object3D}
 */

var Mesh = function (_Object3D) {
    _inherits(Mesh, _Object3D);

    /**
     * @param {Geometry} geometry Геометрия меша
     * @param {Program} program Программа для отрисовки меша
     */

    function Mesh(geometry, program) {
        _classCallCheck(this, Mesh);

        /**
         * Геометрия меша
         * @type {Geometry}
         */

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mesh).call(this));

        _this.geometry = geometry;

        /**
         * Программа для отрисовки меша
         * @type {Program}
         */
        _this.program = program;
        return _this;
    }

    /**
     * Вызывается рендером для подготовки и отрисовки объекта.
     * @param {State} state Текущие состояние рендера
     */


    _createClass(Mesh, [{
        key: 'render',
        value: function render(state) {
            var gl = state.gl;

            if (!this.visible) {
                return this;
            }

            if (this.worldMatrixNeedsUpdate) {
                this.updateWorldMatrix();
            }

            state.object = this;
            this.program.enable(state);

            gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

            this.program.disable(gl);

            return this;
        }

        /**
         * Проверяет пересекает ли {@link Raycaster} данный объект, вносит все пересечения в массив intersects.
         * @param {Raycaster} raycaster
         * @param {Intersect[]} intersects
         * @param {Boolean} recursive Проверять ли пересечения с дочерними объектами
         */

    }, {
        key: 'raycast',
        value: function raycast(raycaster, intersects, recursive) {
            // get from https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js

            var inverseMatrix = _glMatrix.mat4.create();
            _glMatrix.mat4.invert(inverseMatrix, this.worldMatrix);

            var ray = raycaster.ray.clone();
            ray.applyMatrix4(inverseMatrix);

            var boundingBox = this.geometry.getBoundingBox();

            if (!ray.intersectBox(boundingBox)) {
                return this;
            }

            var positionBuffer = this.geometry.buffers.position;

            for (var i = 0; i < positionBuffer.length; i += 3) {
                var triangle = positionBuffer.getTriangle(i / 3);

                var intersectionPoint = ray.intersectTriangle(triangle, false);

                if (!intersectionPoint) {
                    continue;
                }

                _glMatrix.vec3.transformMat4(intersectionPoint, intersectionPoint, this.worldMatrix);

                var distance = _glMatrix.vec3.dist(raycaster.ray.origin, intersectionPoint);

                if (distance < raycaster.precision || distance < raycaster.near || distance > raycaster.far) {
                    continue;
                }

                intersects.push({
                    distance: distance,
                    point: intersectionPoint,
                    object: this
                });
            }

            if (recursive) {
                this.children.forEach(function (child) {
                    return child.raycast(raycaster, intersects, recursive);
                });
            }

            return this;
        }

        /**
         * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
         * Меши разделяются на прозрачные и нет.
         *
         * @param {TypedObjects} typedObjects
         */

    }, {
        key: 'typifyForRender',
        value: function typifyForRender(typedObjects) {
            if (!this.visible) {
                return this;
            }

            this.program.typifyForRender(typedObjects, this);

            this.children.forEach(function (child) {
                return child.typifyForRender(typedObjects);
            });

            return this;
        }
    }]);

    return Mesh;
}(_Object3D3.default);

exports.default = Mesh;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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dkNzQzs7Ozs7Ozs7Ozs7O3dDQWdEMUIsY0FBYztBQUMxQixnQkFBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQUUsdUJBQU8sSUFBUCxDQUFGO2FBQW5COztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCLFlBQTdCLEVBQTJDLElBQTNDLEVBSDBCOztBQUsxQixpQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjt1QkFBUyxNQUFNLGVBQU4sQ0FBc0IsWUFBdEI7YUFBVCxDQUF0QixDQUwwQjs7QUFPMUIsbUJBQU8sSUFBUCxDQVAwQjs7OztXQWxHNUI7OztrQkE2R1MiLCJmaWxlIjoiTWVzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPYmplY3QzRCBmcm9tICcuL09iamVjdDNEJztcbmltcG9ydCB7dmVjMywgbWF0NH0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCAzRCDQvtCx0YrQtdC60YLQvtCyLiDQmtCw0LbQtNC+0LzRgyDQvNC10YjRgyDQvdC10L7QsdGF0L7QtNC40LzQviDQt9Cw0LTQsNGC0Ywg0L/RgNC+0LPRgNCw0LzQvNGDINC4INCz0LXQvtC80LXRgtGA0LjRji5cbiAqXG4gKiBAZXh0ZW5kcyB7T2JqZWN0M0R9XG4gKi9cbmNsYXNzIE1lc2ggZXh0ZW5kcyBPYmplY3QzRCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtHZW9tZXRyeX0gZ2VvbWV0cnkg0JPQtdC+0LzQtdGC0YDQuNGPINC80LXRiNCwXG4gICAgICogQHBhcmFtIHtQcm9ncmFtfSBwcm9ncmFtINCf0YDQvtCz0YDQsNC80LzQsCDQtNC70Y8g0L7RgtGA0LjRgdC+0LLQutC4INC80LXRiNCwXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ2VvbWV0cnksIHByb2dyYW0pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JPQtdC+0LzQtdGC0YDQuNGPINC80LXRiNCwXG4gICAgICAgICAqIEB0eXBlIHtHZW9tZXRyeX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LPRgNCw0LzQvNCwINC00LvRjyDQvtGC0YDQuNGB0L7QstC60Lgg0LzQtdGI0LBcbiAgICAgICAgICogQHR5cGUge1Byb2dyYW19XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YLRgdGPINGA0LXQvdC00LXRgNC+0Lwg0LTQu9GPINC/0L7QtNCz0L7RgtC+0LLQutC4INC4INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQsC5cbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZSDQotC10LrRg9GJ0LjQtSDRgdC+0YHRgtC+0Y/QvdC40LUg0YDQtdC90LTQtdGA0LBcbiAgICAgKi9cbiAgICByZW5kZXIoc3RhdGUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSBzdGF0ZS5nbDtcblxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGlmICh0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLm9iamVjdCA9IHRoaXM7XG4gICAgICAgIHRoaXMucHJvZ3JhbS5lbmFibGUoc3RhdGUpO1xuXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLmdlb21ldHJ5LmdldEJ1ZmZlcigncG9zaXRpb24nKS5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbS5kaXNhYmxlKGdsKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0L7QstC10YDRj9C10YIg0L/QtdGA0LXRgdC10LrQsNC10YIg0LvQuCB7QGxpbmsgUmF5Y2FzdGVyfSDQtNCw0L3QvdGL0Lkg0L7QsdGK0LXQutGCLCDQstC90L7RgdC40YIg0LLRgdC1INC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LIg0LzQsNGB0YHQuNCyIGludGVyc2VjdHMuXG4gICAgICogQHBhcmFtIHtSYXljYXN0ZXJ9IHJheWNhc3RlclxuICAgICAqIEBwYXJhbSB7SW50ZXJzZWN0W119IGludGVyc2VjdHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlY3Vyc2l2ZSDQn9GA0L7QstC10YDRj9GC0Ywg0LvQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINGBINC00L7Rh9C10YDQvdC40LzQuCDQvtCx0YrQtdC60YLQsNC80LhcbiAgICAgKi9cbiAgICByYXljYXN0KHJheWNhc3RlciwgaW50ZXJzZWN0cywgcmVjdXJzaXZlKSB7XG4gICAgICAgIC8vIGdldCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL29iamVjdHMvTWVzaC5qc1xuXG4gICAgICAgIGNvbnN0IGludmVyc2VNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBtYXQ0LmludmVydChpbnZlcnNlTWF0cml4LCB0aGlzLndvcmxkTWF0cml4KTtcblxuICAgICAgICBjb25zdCByYXkgPSByYXljYXN0ZXIucmF5LmNsb25lKCk7XG4gICAgICAgIHJheS5hcHBseU1hdHJpeDQoaW52ZXJzZU1hdHJpeCk7XG5cbiAgICAgICAgY29uc3QgYm91bmRpbmdCb3ggPSB0aGlzLmdlb21ldHJ5LmdldEJvdW5kaW5nQm94KCk7XG5cbiAgICAgICAgaWYgKCFyYXkuaW50ZXJzZWN0Qm94KGJvdW5kaW5nQm94KSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gdGhpcy5nZW9tZXRyeS5idWZmZXJzLnBvc2l0aW9uO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25CdWZmZXIubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyaWFuZ2xlID0gcG9zaXRpb25CdWZmZXIuZ2V0VHJpYW5nbGUoaSAvIDMpO1xuXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb25Qb2ludCA9IHJheS5pbnRlcnNlY3RUcmlhbmdsZSh0cmlhbmdsZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoIWludGVyc2VjdGlvblBvaW50KSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIHZlYzMudHJhbnNmb3JtTWF0NChpbnRlcnNlY3Rpb25Qb2ludCwgaW50ZXJzZWN0aW9uUG9pbnQsIHRoaXMud29ybGRNYXRyaXgpO1xuXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHZlYzMuZGlzdChyYXljYXN0ZXIucmF5Lm9yaWdpbiwgaW50ZXJzZWN0aW9uUG9pbnQpO1xuXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCByYXljYXN0ZXIucHJlY2lzaW9uIHx8IGRpc3RhbmNlIDwgcmF5Y2FzdGVyLm5lYXIgfHwgZGlzdGFuY2UgPiByYXljYXN0ZXIuZmFyKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGludGVyc2VjdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgICAgICAgICAgIHBvaW50OiBpbnRlcnNlY3Rpb25Qb2ludCxcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnJheWNhc3QocmF5Y2FzdGVyLCBpbnRlcnNlY3RzLCByZWN1cnNpdmUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC90LAg0Y3RgtCw0L/QtSDRgNC10L3QtNC10YDQuNC90LPQsCwg0YfRgtC+0LHRiyDQvtC/0YDQtdC00LXQu9C40YLRjCDQuiDQutCw0LrQvtC80YMg0YLQuNC/0YMg0YDQtdC90LTQtdGA0LAg0L/RgNC40L3QsNC00LvQtdC20LjRgiDQvtCx0YrQtdC60YIuXG4gICAgICog0JzQtdGI0Lgg0YDQsNC30LTQtdC70Y/RjtGC0YHRjyDQvdCwINC/0YDQvtC30YDQsNGH0L3Ri9C1INC4INC90LXRgi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VHlwZWRPYmplY3RzfSB0eXBlZE9iamVjdHNcbiAgICAgKi9cbiAgICB0eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgdGhpcy5wcm9ncmFtLnR5cGlmeUZvclJlbmRlcih0eXBlZE9iamVjdHMsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNoO1xuIl19