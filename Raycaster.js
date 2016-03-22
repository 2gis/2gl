'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Ray = require('./math/Ray');

var _Ray2 = _interopRequireDefault(_Ray);

var _OrthographicCamera = require('./cameras/OrthographicCamera');

var _OrthographicCamera2 = _interopRequireDefault(_OrthographicCamera);

var _PerspectiveCamera = require('./cameras/PerspectiveCamera');

var _PerspectiveCamera2 = _interopRequireDefault(_PerspectiveCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            if (camera instanceof _PerspectiveCamera2.default) {
                this.ray.origin = _glMatrix.vec3.clone(camera.position);

                var direction = _glMatrix.vec3.fromValues(coordinates[0], coordinates[1], 0.5);
                direction = camera.unproject(direction);
                _glMatrix.vec3.sub(direction, direction, camera.position);
                _glMatrix.vec3.normalize(direction, direction);
                this.ray.direction = direction;
            } else if (camera instanceof _OrthographicCamera2.default) {
                var origin = _glMatrix.vec3.fromValues(coordinates[0], coordinates[1], -1);
                this.ray.origin = camera.unproject(origin);

                this.ray.direction = _glMatrix.vec3.fromValues(0, 0, -1);

                var matrix3 = _glMatrix.mat3.create();
                _glMatrix.mat3.fromMat4(matrix3, camera.worldMatrix);
                _glMatrix.vec3.transformMat3(this.ray.direction, this.ray.direction, matrix3);
                _glMatrix.vec3.normalize(this.ray.direction, this.ray.direction);
            }
        }

        /**
         * Ищет точки пересечения луча с объектом
         * @param {Object3D} object
         * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
         * @returns {Intersect[]}
         */

    }, {
        key: 'intersectObject',
        value: function intersectObject(object, recursive) {
            var intersects = [];

            object.raycast(this, intersects, recursive);

            intersects.sort(this._descSort);

            return intersects;
        }

        /**
         * Ищет точки пересечения луча с массивом объектов
         * @param {Object3D[]} objects
         * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
         * @returns {Intersect[]}
         */

    }, {
        key: 'intersectObjects',
        value: function intersectObjects(objects, recursive) {
            var _this = this;

            var intersects = [];

            objects.forEach(function (obj) {
                return obj.raycast(_this, intersects, recursive);
            });

            intersects.sort(this._descSort);

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
//# sourceMappingURL=data:application/json;base64,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QUUsUUFBRixDQURSOzs7O1dBNUVkOzs7a0JBaUZTIiwiZmlsZSI6IlJheWNhc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjMywgbWF0M30gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCBSYXkgZnJvbSAnLi9tYXRoL1JheSc7XG5pbXBvcnQgT3J0aG9ncmFwaGljQ2FtZXJhIGZyb20gJy4vY2FtZXJhcy9PcnRob2dyYXBoaWNDYW1lcmEnO1xuaW1wb3J0IFBlcnNwZWN0aXZlQ2FtZXJhIGZyb20gJy4vY2FtZXJhcy9QZXJzcGVjdGl2ZUNhbWVyYSc7XG5cbi8qKlxuICog0J/QvtC30LLQvtC70Y/QtdGCINC70LXQs9C60L4g0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDQu9GD0YfQsCDRgSDQvtCx0YrQtdC60YLQsNC80LguXG4gKiDQndCw0L/RgNC40LzQtdGALCDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC70LjQutCwINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjy5cbiAqL1xuY2xhc3MgUmF5Y2FzdGVyIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IG9yaWdpbiDQotC+0YfQutCwINC90LDRh9Cw0LvQsCDQu9GD0YfQsFxuICAgICAqIEBwYXJhbSB7dmVjM30gZGlyZWN0aW9uINCd0LDQv9GA0LDQstC70LXQvdC40LUg0LvRg9GH0LBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW25lYXI9MF0g0JzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC90LDRh9Cw0LvQsCDQtNC+INGC0L7Rh9C60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRj1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZmFyPUluZmluaXR5XSDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQvdCw0YfQsNC70LAg0LTQviDRgtC+0YfQutC4INC/0LXRgNC10YHQtdGH0LXQvdC40Y9cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcmlnaW4sIGRpcmVjdGlvbiwgbmVhciwgZmFyKSB7XG4gICAgICAgIHRoaXMucHJlY2lzaW9uID0gMC4wMDAxO1xuICAgICAgICB0aGlzLnJheSA9IG5ldyBSYXkob3JpZ2luLCBkaXJlY3Rpb24pO1xuICAgICAgICB0aGlzLm5lYXIgPSBuZWFyIHx8IDA7XG4gICAgICAgIHRoaXMuZmFyID0gZmFyIHx8IEluZmluaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINC90LDRh9Cw0LvQviDQu9GD0YfQsCDQsiDQv9C+0LvQvtC20LXQvdC40LUg0LrQsNC80LXRgNGLLCDQsCDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC/0YDQvtC10YbQuNGA0YPQtdGCINGBINC/0LXRgNC10LTQsNC90L3Ri9GFINC60L7QvtGA0LTQuNC90LDRglxuICAgICAqINGN0LrRgNCw0L3QsCDQsiDRgdC40YHRgtC10LzRgyDQutC+0L7RgNC00LjQvdCw0YIg0LrQsNC80LXRgNGLLlxuICAgICAqXG4gICAgICogQHBhcmFtIHt2ZWMzfSBjb29yZGluYXRlc1xuICAgICAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmFcbiAgICAgKi9cbiAgICBzZXRGcm9tQ2FtZXJhKGNvb3JkaW5hdGVzLCBjYW1lcmEpIHtcbiAgICAgICAgaWYgKGNhbWVyYSBpbnN0YW5jZW9mIFBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgICAgICAgICB0aGlzLnJheS5vcmlnaW4gPSB2ZWMzLmNsb25lKGNhbWVyYS5wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSB2ZWMzLmZyb21WYWx1ZXMoY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCAwLjUpO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gY2FtZXJhLnVucHJvamVjdChkaXJlY3Rpb24pO1xuICAgICAgICAgICAgdmVjMy5zdWIoZGlyZWN0aW9uLCBkaXJlY3Rpb24sIGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZShkaXJlY3Rpb24sIGRpcmVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnJheS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgfSBlbHNlIGlmIChjYW1lcmEgaW5zdGFuY2VvZiBPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbiA9IHZlYzMuZnJvbVZhbHVlcyhjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0sIC0xKTtcbiAgICAgICAgICAgIHRoaXMucmF5Lm9yaWdpbiA9IGNhbWVyYS51bnByb2plY3Qob3JpZ2luKTtcblxuICAgICAgICAgICAgdGhpcy5yYXkuZGlyZWN0aW9uID0gdmVjMy5mcm9tVmFsdWVzKDAsIDAsIC0xKTtcblxuICAgICAgICAgICAgY29uc3QgbWF0cml4MyA9IG1hdDMuY3JlYXRlKCk7XG4gICAgICAgICAgICBtYXQzLmZyb21NYXQ0KG1hdHJpeDMsIGNhbWVyYS53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDModGhpcy5yYXkuZGlyZWN0aW9uLCB0aGlzLnJheS5kaXJlY3Rpb24sIG1hdHJpeDMpO1xuICAgICAgICAgICAgdmVjMy5ub3JtYWxpemUodGhpcy5yYXkuZGlyZWN0aW9uLCB0aGlzLnJheS5kaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjRidC10YIg0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC70YPRh9CwINGBINC+0LHRitC10LrRgtC+0LxcbiAgICAgKiBAcGFyYW0ge09iamVjdDNEfSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZWN1cnNpdmU9ZmFsc2VdINCf0YDQvtCy0LXRgNGP0YLRjCDQu9C4INC00L7Rh9C10YDQvdC40LUg0L7QsdGK0LXQutGC0YtcbiAgICAgKiBAcmV0dXJucyB7SW50ZXJzZWN0W119XG4gICAgICovXG4gICAgaW50ZXJzZWN0T2JqZWN0KG9iamVjdCwgcmVjdXJzaXZlKSB7XG4gICAgICAgIGNvbnN0IGludGVyc2VjdHMgPSBbXTtcblxuICAgICAgICBvYmplY3QucmF5Y2FzdCh0aGlzLCBpbnRlcnNlY3RzLCByZWN1cnNpdmUpO1xuXG4gICAgICAgIGludGVyc2VjdHMuc29ydCh0aGlzLl9kZXNjU29ydCk7XG5cbiAgICAgICAgcmV0dXJuIGludGVyc2VjdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjRidC10YIg0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPINC70YPRh9CwINGBINC80LDRgdGB0LjQstC+0Lwg0L7QsdGK0LXQutGC0L7QslxuICAgICAqIEBwYXJhbSB7T2JqZWN0M0RbXX0gb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JlY3Vyc2l2ZT1mYWxzZV0g0J/RgNC+0LLQtdGA0Y/RgtGMINC70Lgg0LTQvtGH0LXRgNC90LjQtSDQvtCx0YrQtdC60YLRi1xuICAgICAqIEByZXR1cm5zIHtJbnRlcnNlY3RbXX1cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RPYmplY3RzKG9iamVjdHMsIHJlY3Vyc2l2ZSkge1xuICAgICAgICBjb25zdCBpbnRlcnNlY3RzID0gW107XG5cbiAgICAgICAgb2JqZWN0cy5mb3JFYWNoKG9iaiA9PiBvYmoucmF5Y2FzdCh0aGlzLCBpbnRlcnNlY3RzLCByZWN1cnNpdmUpKTtcblxuICAgICAgICBpbnRlcnNlY3RzLnNvcnQodGhpcy5fZGVzY1NvcnQpO1xuXG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RzO1xuICAgIH1cblxuICAgIF9kZXNjU29ydChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJheWNhc3RlcjtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSDQvNC10YLQvtC00L7QsiByYXljYXN0LiDQodC+0LTQtdGA0LbQuNGCINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INGC0L7Rh9C60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDRgSDQvtCx0YrQtdC60YLQvtC8LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEludGVyc2VjdFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpc3RhbmNlINCg0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0L3QsNGH0LDQu9CwINC70YPRh9CwINC00L4g0YLQvtGH0LrQuCDQv9C10YDQtdGB0LXRh9C10L3QuNGPXG4gKiBAcHJvcGVydHkge3ZlYzN9IHBvaW50INCa0L7QvtGA0LTQuNC90LDRgtGLINGC0L7Rh9C60Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRj1xuICogQHByb3BlcnR5IHtPYmplY3QzRH0gb2JqZWN0INCe0LHRitC10LrRgiDRgSDQutC+0YLQvtGA0YvQvCDQv9C10YDQtdGB0LXQutGB0Y8g0LvRg9GHXG4gKi9cbiJdfQ==