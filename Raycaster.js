'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Ray = require('./math/Ray');

var _Ray2 = _interopRequireDefault(_Ray);

var _libConstants = require('./libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Позволяет легко определять пересечения луча с объектами.
 * Например, для определения клика пользователя.
 */
var Raycaster = function () {
    /**
     * @param {vec3} origin Точка начала луча
     * @param {vec3} direction Направление луча
     * @param {Number} [near=0] Минимальное расстояние от начала до точки пересечения
     * @param {Number} [far=Infinity] Максимальное расстояние от начала до точки пересечения
     */
    function Raycaster(origin, direction, near, far) {
        _classCallCheck(this, Raycaster);

        this.precision = 0.0001;
        this.ray = new _Ray2.default(origin, direction);
        this.near = near || 0;
        this.far = far || Infinity;

        /**
         * Список методов проверки пересечений для разных типов объектов
         * @type {Object}
         */
        this.intersectMethodsByType = _defineProperty({}, _libConstants.MESH, 'intersectMesh');

        // Вспомогательные переменные для методов
        this._vec3 = _glMatrix.vec3.create();
        this._mat3 = _glMatrix.mat3.create();
    }

    /**
     * Устанавливает начало луча в положение камеры, а направление проецирует с переданных координат
     * экрана в систему координат камеры.
     *
     * @param {vec3} coordinates
     * @param {Camera} camera
     */


    _createClass(Raycaster, [{
        key: 'setFromCamera',
        value: function setFromCamera(coordinates, camera) {
            if (camera.type === _libConstants.PERSPECTIVE_CAMERA) {
                _glMatrix.vec3.copy(this.ray.origin, camera.position);

                var direction = _glMatrix.vec3.set(this._vec3, coordinates[0], coordinates[1], 0.5);
                direction = camera.unproject(direction);
                _glMatrix.vec3.sub(direction, direction, camera.position);
                _glMatrix.vec3.normalize(direction, direction);
                this.ray.direction = direction;
            } else if (camera.type === _libConstants.ORTHOGRAPHIC_CAMERA) {
                var origin = _glMatrix.vec3.set(this._vec3, coordinates[0], coordinates[1], -1);
                this.ray.origin = camera.unproject(origin);

                _glMatrix.vec3.set(this.ray.direction, 0, 0, -1);

                _glMatrix.mat3.fromMat4(this._mat3, camera.worldMatrix);
                _glMatrix.vec3.transformMat3(this.ray.direction, this.ray.direction, this._mat3);
                _glMatrix.vec3.normalize(this.ray.direction, this.ray.direction);
            }
        }

        /**
         * Ищет точки пересечения луча с объектом
         * @param {Object3D} object
         * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
         * @param {Intersect[]} [intersects]
         * @returns {Intersect[]}
         */

    }, {
        key: 'intersectObject',
        value: function intersectObject(object, recursive, intersects) {
            intersects = intersects || [];

            var intersectMethod = this.intersectMethodsByType[object.type];

            if (intersectMethod && this[intersectMethod]) {
                this[intersectMethod](object, recursive, intersects);
            } else if (recursive) {
                this.intersectObjects(object.children, recursive, intersects);
            }

            intersects.sort(this._descSort);

            return intersects;
        }

        /**
         * Ищет точки пересечения луча с массивом объектов
         * @param {Object3D[]} objects
         * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
         * @param {Intersect[]} [intersects]
         * @returns {Intersect[]}
         */

    }, {
        key: 'intersectObjects',
        value: function intersectObjects(objects, recursive, intersects) {
            var _this = this;

            intersects = intersects || [];

            objects.forEach(function (obj) {
                return _this.intersectObject(obj, recursive, intersects);
            });

            return intersects;
        }

        /**
         * Ищет точки пересечения луча с {@link Mesh}
         * @param {Mesh} mesh
         * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
         * @param {Intersect[]} [intersects]
         * @returns {Intersect[]}
         */

    }, {
        key: 'intersectMesh',
        value: function intersectMesh(mesh, recursive, intersects) {
            intersects = intersects || [];

            // get from https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js

            var inverseMatrix = _glMatrix.mat4.create();
            _glMatrix.mat4.invert(inverseMatrix, mesh.worldMatrix);

            var ray = this.ray.clone();
            ray.applyMatrix4(inverseMatrix);

            var boundingBox = mesh.geometry.getBoundingBox();

            if (!ray.intersectBox(boundingBox)) {
                return mesh;
            }

            var positionBuffer = mesh.geometry.buffers.position;

            for (var i = 0; i < positionBuffer.length; i += 3) {
                var triangle = positionBuffer.getTriangle(i / 3);

                var intersectionPoint = ray.intersectTriangle(triangle, false);

                if (!intersectionPoint) {
                    continue;
                }

                _glMatrix.vec3.transformMat4(intersectionPoint, intersectionPoint, mesh.worldMatrix);

                var distance = _glMatrix.vec3.dist(this.ray.origin, intersectionPoint);

                if (distance < this.precision || distance < this.near || distance > this.far) {
                    continue;
                }

                intersects.push({
                    distance: distance,
                    point: intersectionPoint,
                    object: mesh
                });
            }

            if (recursive) {
                this.intersectObjects(mesh.children, recursive, intersects);
            }

            return intersects;
        }
    }, {
        key: '_descSort',
        value: function _descSort(a, b) {
            return a.distance - b.distance;
        }
    }]);

    return Raycaster;
}();

exports.default = Raycaster;

/**
 * Возвращаемое значение методов raycast. Содержит информацию о точки пересечения с объектом.
 *
 * @typedef {Object} Intersect
 * @property {Number} distance Расстояние от начала луча до точки пересечения
 * @property {vec3} point Координаты точки пересечения
 * @property {Object3D} object Объект с которым пересекся луч
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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SUFBcUQsV0FBVyxLQUFLLEdBQXpFLEVBQThFO0FBQUU7QUFBVzs7QUFFM0YsMkJBQVcsSUFBWCxDQUFnQjtBQUNaLDhCQUFVLFFBREU7QUFFWiwyQkFBTyxpQkFGSztBQUdaLDRCQUFRO0FBSEksaUJBQWhCO0FBS0g7O0FBRUQsZ0JBQUksU0FBSixFQUFlO0FBQ1gscUJBQUssZ0JBQUwsQ0FBc0IsS0FBSyxRQUEzQixFQUFxQyxTQUFyQyxFQUFnRCxVQUFoRDtBQUNIOztBQUVELG1CQUFPLFVBQVA7QUFDSDs7O2tDQUVTLEMsRUFBRyxDLEVBQUc7QUFDWixtQkFBTyxFQUFFLFFBQUYsR0FBYSxFQUFFLFFBQXRCO0FBQ0g7Ozs7OztrQkFHVSxTOztBQUVmIiwiZmlsZSI6IlJheWNhc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjMywgbWF0MywgbWF0NH0gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCBSYXkgZnJvbSAnLi9tYXRoL1JheSc7XG5pbXBvcnQge01FU0gsIFBFUlNQRUNUSVZFX0NBTUVSQSwgT1JUSE9HUkFQSElDX0NBTUVSQX0gZnJvbSAnLi9saWJDb25zdGFudHMnO1xuXG4vKipcbiAqINCf0L7Qt9Cy0L7Qu9GP0LXRgiDQu9C10LPQutC+INC+0L/RgNC10LTQtdC70Y/RgtGMINC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LvRg9GH0LAg0YEg0L7QsdGK0LXQutGC0LDQvNC4LlxuICog0J3QsNC/0YDQuNC80LXRgCwg0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQu9C40LrQsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8uXG4gKi9cbmNsYXNzIFJheWNhc3RlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt2ZWMzfSBvcmlnaW4g0KLQvtGH0LrQsCDQvdCw0YfQsNC70LAg0LvRg9GH0LBcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IGRpcmVjdGlvbiDQndCw0L/RgNCw0LLQu9C10L3QuNC1INC70YPRh9CwXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtuZWFyPTBdINCc0LjQvdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQvdCw0YfQsNC70LAg0LTQviDRgtC+0YfQutC4INC/0LXRgNC10YHQtdGH0LXQvdC40Y9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2Zhcj1JbmZpbml0eV0g0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0L3QsNGH0LDQu9CwINC00L4g0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3JpZ2luLCBkaXJlY3Rpb24sIG5lYXIsIGZhcikge1xuICAgICAgICB0aGlzLnByZWNpc2lvbiA9IDAuMDAwMTtcbiAgICAgICAgdGhpcy5yYXkgPSBuZXcgUmF5KG9yaWdpbiwgZGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5uZWFyID0gbmVhciB8fCAwO1xuICAgICAgICB0aGlzLmZhciA9IGZhciB8fCBJbmZpbml0eTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KHQv9C40YHQvtC6INC80LXRgtC+0LTQvtCyINC/0YDQvtCy0LXRgNC60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjQuSDQtNC70Y8g0YDQsNC30L3Ri9GFINGC0LjQv9C+0LIg0L7QsdGK0LXQutGC0L7QslxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbnRlcnNlY3RNZXRob2RzQnlUeXBlID0ge1xuICAgICAgICAgICAgW01FU0hdOiAnaW50ZXJzZWN0TWVzaCdcbiAgICAgICAgfTtcblxuICAgICAgICAvLyDQktGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0L/QtdGA0LXQvNC10L3QvdGL0LUg0LTQu9GPINC80LXRgtC+0LTQvtCyXG4gICAgICAgIHRoaXMuX3ZlYzMgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl9tYXQzID0gbWF0My5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDQvdCw0YfQsNC70L4g0LvRg9GH0LAg0LIg0L/QvtC70L7QttC10L3QuNC1INC60LDQvNC10YDRiywg0LAg0L3QsNC/0YDQsNCy0LvQtdC90LjQtSDQv9GA0L7QtdGG0LjRgNGD0LXRgiDRgSDQv9C10YDQtdC00LDQvdC90YvRhSDQutC+0L7RgNC00LjQvdCw0YJcbiAgICAgKiDRjdC60YDQsNC90LAg0LIg0YHQuNGB0YLQtdC80YMg0LrQvtC+0YDQtNC40L3QsNGCINC60LDQvNC10YDRiy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7dmVjM30gY29vcmRpbmF0ZXNcbiAgICAgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhXG4gICAgICovXG4gICAgc2V0RnJvbUNhbWVyYShjb29yZGluYXRlcywgY2FtZXJhKSB7XG4gICAgICAgIGlmIChjYW1lcmEudHlwZSA9PT0gUEVSU1BFQ1RJVkVfQ0FNRVJBKSB7XG4gICAgICAgICAgICB2ZWMzLmNvcHkodGhpcy5yYXkub3JpZ2luLCBjYW1lcmEucG9zaXRpb24pO1xuXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gdmVjMy5zZXQodGhpcy5fdmVjMywgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCAwLjUpO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gY2FtZXJhLnVucHJvamVjdChkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdmVjMy5zdWIoZGlyZWN0aW9uLCBkaXJlY3Rpb24sIGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZShkaXJlY3Rpb24sIGRpcmVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJheS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgfSBlbHNlIGlmIChjYW1lcmEudHlwZSA9PT0gT1JUSE9HUkFQSElDX0NBTUVSQSkge1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luID0gdmVjMy5zZXQodGhpcy5fdmVjMywgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCAtMSk7XG4gICAgICAgICAgICB0aGlzLnJheS5vcmlnaW4gPSBjYW1lcmEudW5wcm9qZWN0KG9yaWdpbik7XG5cbiAgICAgICAgICAgIHZlYzMuc2V0KHRoaXMucmF5LmRpcmVjdGlvbiwgMCwgMCwgLTEpO1xuXG4gICAgICAgICAgICBtYXQzLmZyb21NYXQ0KHRoaXMuX21hdDMsIGNhbWVyYS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDModGhpcy5yYXkuZGlyZWN0aW9uLCB0aGlzLnJheS5kaXJlY3Rpb24sIHRoaXMuX21hdDMpO1xuICAgICAgICAgICAgdmVjMy5ub3JtYWxpemUodGhpcy5yYXkuZGlyZWN0aW9uLCB0aGlzLnJheS5kaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjRidC10YIg0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC70YPRh9CwINGBINC+0LHRitC10LrRgtC+0LxcbiAgICAgKiBAcGFyYW0ge09iamVjdDNEfSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZWN1cnNpdmU9ZmFsc2VdINCf0YDQvtCy0LXRgNGP0YLRjCDQu9C4INC00L7Rh9C10YDQvdC40LUg0L7QsdGK0LXQutGC0YtcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdFtdfSBbaW50ZXJzZWN0c11cbiAgICAgKiBAcmV0dXJucyB7SW50ZXJzZWN0W119XG4gICAgICovXG4gICAgaW50ZXJzZWN0T2JqZWN0KG9iamVjdCwgcmVjdXJzaXZlLCBpbnRlcnNlY3RzKSB7XG4gICAgICAgIGludGVyc2VjdHMgPSBpbnRlcnNlY3RzIHx8IFtdO1xuXG4gICAgICAgIGNvbnN0IGludGVyc2VjdE1ldGhvZCA9IHRoaXMuaW50ZXJzZWN0TWV0aG9kc0J5VHlwZVtvYmplY3QudHlwZV07XG5cbiAgICAgICAgaWYgKGludGVyc2VjdE1ldGhvZCAmJiB0aGlzW2ludGVyc2VjdE1ldGhvZF0pIHtcbiAgICAgICAgICAgIHRoaXNbaW50ZXJzZWN0TWV0aG9kXShvYmplY3QsIHJlY3Vyc2l2ZSwgaW50ZXJzZWN0cyk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVjdXJzaXZlKSB7XG4gICAgICAgICAgICB0aGlzLmludGVyc2VjdE9iamVjdHMob2JqZWN0LmNoaWxkcmVuLCByZWN1cnNpdmUsIGludGVyc2VjdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW50ZXJzZWN0cy5zb3J0KHRoaXMuX2Rlc2NTb3J0KTtcblxuICAgICAgICByZXR1cm4gaW50ZXJzZWN0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNGJ0LXRgiDRgtC+0YfQutC4INC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LvRg9GH0LAg0YEg0LzQsNGB0YHQuNCy0L7QvCDQvtCx0YrQtdC60YLQvtCyXG4gICAgICogQHBhcmFtIHtPYmplY3QzRFtdfSBvYmplY3RzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcmVjdXJzaXZlPWZhbHNlXSDQn9GA0L7QstC10YDRj9GC0Ywg0LvQuCDQtNC+0YfQtdGA0L3QuNC1INC+0LHRitC10LrRgtGLXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3RbXX0gW2ludGVyc2VjdHNdXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdFtdfVxuICAgICAqL1xuICAgIGludGVyc2VjdE9iamVjdHMob2JqZWN0cywgcmVjdXJzaXZlLCBpbnRlcnNlY3RzKSB7XG4gICAgICAgIGludGVyc2VjdHMgPSBpbnRlcnNlY3RzIHx8IFtdO1xuXG4gICAgICAgIG9iamVjdHMuZm9yRWFjaChvYmogPT4gdGhpcy5pbnRlcnNlY3RPYmplY3Qob2JqLCByZWN1cnNpdmUsIGludGVyc2VjdHMpKTtcblxuICAgICAgICByZXR1cm4gaW50ZXJzZWN0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNGJ0LXRgiDRgtC+0YfQutC4INC/0LXRgNC10YHQtdGH0LXQvdC40Y8g0LvRg9GH0LAg0YEge0BsaW5rIE1lc2h9XG4gICAgICogQHBhcmFtIHtNZXNofSBtZXNoXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcmVjdXJzaXZlPWZhbHNlXSDQn9GA0L7QstC10YDRj9GC0Ywg0LvQuCDQtNC+0YfQtdGA0L3QuNC1INC+0LHRitC10LrRgtGLXG4gICAgICogQHBhcmFtIHtJbnRlcnNlY3RbXX0gW2ludGVyc2VjdHNdXG4gICAgICogQHJldHVybnMge0ludGVyc2VjdFtdfVxuICAgICAqL1xuICAgIGludGVyc2VjdE1lc2gobWVzaCwgcmVjdXJzaXZlLCBpbnRlcnNlY3RzKSB7XG4gICAgICAgIGludGVyc2VjdHMgPSBpbnRlcnNlY3RzIHx8IFtdO1xuXG4gICAgICAgIC8vIGdldCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL29iamVjdHMvTWVzaC5qc1xuXG4gICAgICAgIGNvbnN0IGludmVyc2VNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBtYXQ0LmludmVydChpbnZlcnNlTWF0cml4LCBtZXNoLndvcmxkTWF0cml4KTtcblxuICAgICAgICBjb25zdCByYXkgPSB0aGlzLnJheS5jbG9uZSgpO1xuICAgICAgICByYXkuYXBwbHlNYXRyaXg0KGludmVyc2VNYXRyaXgpO1xuXG4gICAgICAgIGNvbnN0IGJvdW5kaW5nQm94ID0gbWVzaC5nZW9tZXRyeS5nZXRCb3VuZGluZ0JveCgpO1xuXG4gICAgICAgIGlmICghcmF5LmludGVyc2VjdEJveChib3VuZGluZ0JveCkpIHsgcmV0dXJuIG1lc2g7IH1cblxuICAgICAgICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IG1lc2guZ2VvbWV0cnkuYnVmZmVycy5wb3NpdGlvbjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9uQnVmZmVyLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgICAgICBjb25zdCB0cmlhbmdsZSA9IHBvc2l0aW9uQnVmZmVyLmdldFRyaWFuZ2xlKGkgLyAzKTtcblxuICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uUG9pbnQgPSByYXkuaW50ZXJzZWN0VHJpYW5nbGUodHJpYW5nbGUsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKCFpbnRlcnNlY3Rpb25Qb2ludCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDQoaW50ZXJzZWN0aW9uUG9pbnQsIGludGVyc2VjdGlvblBvaW50LCBtZXNoLndvcmxkTWF0cml4KTtcblxuICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSB2ZWMzLmRpc3QodGhpcy5yYXkub3JpZ2luLCBpbnRlcnNlY3Rpb25Qb2ludCk7XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMucHJlY2lzaW9uIHx8IGRpc3RhbmNlIDwgdGhpcy5uZWFyIHx8IGRpc3RhbmNlID4gdGhpcy5mYXIpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgaW50ZXJzZWN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgcG9pbnQ6IGludGVyc2VjdGlvblBvaW50LFxuICAgICAgICAgICAgICAgIG9iamVjdDogbWVzaFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVjdXJzaXZlKSB7XG4gICAgICAgICAgICB0aGlzLmludGVyc2VjdE9iamVjdHMobWVzaC5jaGlsZHJlbiwgcmVjdXJzaXZlLCBpbnRlcnNlY3RzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RzO1xuICAgIH1cblxuICAgIF9kZXNjU29ydChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJheWNhc3RlcjtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvNC10YLQvtC00L7QsiByYXljYXN0LiDQodC+0LTQtdGA0LbQuNGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INGC0L7Rh9C60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDRgSDQvtCx0YrQtdC60YLQvtC8LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEludGVyc2VjdFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpc3RhbmNlINCg0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0L3QsNGH0LDQu9CwINC70YPRh9CwINC00L4g0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPXG4gKiBAcHJvcGVydHkge3ZlYzN9IHBvaW50INCa0L7QvtGA0LTQuNC90LDRgtGLINGC0L7Rh9C60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRj1xuICogQHByb3BlcnR5IHtPYmplY3QzRH0gb2JqZWN0INCe0LHRitC10LrRgiDRgSDQutC+0YLQvtGA0YvQvCDQv9C10YDQtdGB0LXQutGB0Y8g0LvRg9GHXG4gKi9cbiJdfQ==