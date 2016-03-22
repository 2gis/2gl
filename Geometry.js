'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Buffer = require('./Buffer');

var _Buffer2 = _interopRequireDefault(_Buffer);

var _Box = require('./math/Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Используется для задания геометрий объектов.
 * В качестве данных используются {@link Buffer}.
 */

var Geometry = function () {
    function Geometry() {
        _classCallCheck(this, Geometry);

        /**
         * Словарь вида: название буфера - Buffer
         * @type {Object}
         */
        this.buffers = {};

        /**
         * Параллелепипед описывающий данную геометрию
         * @type {?Box}
         * @ignore
         */
        this._boundingBox = null;
    }

    /**
     * Сохраняет буфер в геометрию
     * @param {String} name Название буфера
     * @param {Buffer} buffer
     */


    _createClass(Geometry, [{
        key: 'setBuffer',
        value: function setBuffer(name, buffer) {
            this.buffers[name] = buffer;

            return this;
        }

        /**
         * Возвращает буфер из геометрии
         * @param {String} name Название буфера
         * @returns {Buffer}
         */

    }, {
        key: 'getBuffer',
        value: function getBuffer(name) {
            return this.buffers[name];
        }

        /**
         * Вычисляет буфер нормалей на основе буфера координат вершин (position)
         */

    }, {
        key: 'computeNormals',
        value: function computeNormals() {
            var positionBuffer = this.buffers.position;

            if (!positionBuffer) {
                return this;
            }

            var normals = new Float32Array(positionBuffer.length * positionBuffer.itemSize);

            var ab = _glMatrix.vec3.create();
            var cb = _glMatrix.vec3.create();
            var n = _glMatrix.vec3.create();

            for (var i = 0; i < positionBuffer.length; i += 3) {
                var triangle = positionBuffer.getTriangle(i / 3);

                _glMatrix.vec3.sub(ab, triangle[0], triangle[1]);
                _glMatrix.vec3.sub(cb, triangle[2], triangle[1]);
                _glMatrix.vec3.cross(n, ab, cb);
                _glMatrix.vec3.normalize(n, n);

                normals.set(n, i * 3);
                normals.set(n, (i + 1) * 3);
                normals.set(n, (i + 2) * 3);
            }

            this.setBuffer('normal', new _Buffer2.default(normals, 3));

            return this;
        }

        /**
         * Возвращает параллелепипед описывающий данную геометрию
         * @returns {Box}
         */

    }, {
        key: 'getBoundingBox',
        value: function getBoundingBox() {
            if (!this._boundingBox) {
                this.computeBoundingBox();
            }

            return this._boundingBox;
        }

        /**
         * Вычисляет параллелепипед описывающий данную геометрию на основе буфера координат вершин (position)
         * @returns {Box}
         */

    }, {
        key: 'computeBoundingBox',
        value: function computeBoundingBox() {
            var boundingBox = this._boundingBox = new _Box2.default();
            var positionBuffer = this.buffers.position;

            if (positionBuffer) {
                for (var i = 0; i < positionBuffer.length; i++) {
                    boundingBox.expandByPoint(positionBuffer.getElement(i));
                }
            }
        }

        /**
         * Соединяет данную геометрию с другой.
         * Осторожно, геометрии должны быть подобны, т.е. содержать одинаковые буферы.
         * @param {Geometry} geometry
         */

    }, {
        key: 'concat',
        value: function concat(geometry) {
            for (var type in this.buffers) {
                this.buffers[type].concat(geometry.buffers[type]);
            }
        }
    }]);

    return Geometry;
}();

exports.default = Geometry;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LEVBQW1CLE1BQW5CLENBQTBCLFNBQVMsT0FBVCxDQUFpQixJQUFqQixDQUExQixFQUQ2QjthQUFqQzs7OztXQXJHRjs7O2tCQTJHUyIsImZpbGUiOiJHZW9tZXRyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjM30gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi9CdWZmZXInO1xuaW1wb3J0IEJveCBmcm9tICcuL21hdGgvQm94JztcblxuLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC30LDQtNCw0L3QuNGPINCz0LXQvtC80LXRgtGA0LjQuSDQvtCx0YrQtdC60YLQvtCyLlxuICog0JIg0LrQsNGH0LXRgdGC0LLQtSDQtNCw0L3QvdGL0YUg0LjRgdC/0L7Qu9GM0LfRg9GO0YLRgdGPIHtAbGluayBCdWZmZXJ9LlxuICovXG5jbGFzcyBHZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQodC70L7QstCw0YDRjCDQstC40LTQsDog0L3QsNC30LLQsNC90LjQtSDQsdGD0YTQtdGA0LAgLSBCdWZmZXJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYnVmZmVycyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9Cw0YDQsNC70LvQtdC70LXQv9C40L/QtdC0INC+0L/QuNGB0YvQstCw0Y7RidC40Lkg0LTQsNC90L3Rg9GOINCz0LXQvtC80LXRgtGA0LjRjlxuICAgICAgICAgKiBAdHlwZSB7P0JveH1cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYm91bmRpbmdCb3ggPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0L7RhdGA0LDQvdGP0LXRgiDQsdGD0YTQtdGAINCyINCz0LXQvtC80LXRgtGA0LjRjlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lINCd0LDQt9Cy0LDQvdC40LUg0LHRg9GE0LXRgNCwXG4gICAgICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlclxuICAgICAqL1xuICAgIHNldEJ1ZmZlcihuYW1lLCBidWZmZXIpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzW25hbWVdID0gYnVmZmVyO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINCx0YPRhNC10YAg0LjQtyDQs9C10L7QvNC10YLRgNC40LhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSDQndCw0LfQstCw0L3QuNC1INCx0YPRhNC10YDQsFxuICAgICAqIEByZXR1cm5zIHtCdWZmZXJ9XG4gICAgICovXG4gICAgZ2V0QnVmZmVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0YfQuNGB0LvRj9C10YIg0LHRg9GE0LXRgCDQvdC+0YDQvNCw0LvQtdC5INC90LAg0L7RgdC90L7QstC1INCx0YPRhNC10YDQsCDQutC+0L7RgNC00LjQvdCw0YIg0LLQtdGA0YjQuNC9IChwb3NpdGlvbilcbiAgICAgKi9cbiAgICBjb21wdXRlTm9ybWFscygpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25CdWZmZXIgPSB0aGlzLmJ1ZmZlcnMucG9zaXRpb247XG5cbiAgICAgICAgaWYgKCFwb3NpdGlvbkJ1ZmZlcikgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGNvbnN0IG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9uQnVmZmVyLmxlbmd0aCAqIHBvc2l0aW9uQnVmZmVyLml0ZW1TaXplKTtcblxuICAgICAgICBjb25zdCBhYiA9IHZlYzMuY3JlYXRlKCk7XG4gICAgICAgIGNvbnN0IGNiID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgbiA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbkJ1ZmZlci5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgICAgY29uc3QgdHJpYW5nbGUgPSBwb3NpdGlvbkJ1ZmZlci5nZXRUcmlhbmdsZShpIC8gMyk7XG5cbiAgICAgICAgICAgIHZlYzMuc3ViKGFiLCB0cmlhbmdsZVswXSwgdHJpYW5nbGVbMV0pO1xuICAgICAgICAgICAgdmVjMy5zdWIoY2IsIHRyaWFuZ2xlWzJdLCB0cmlhbmdsZVsxXSk7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKG4sIGFiLCBjYik7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZShuLCBuKTtcblxuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgaSAqIDMpO1xuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgKGkgKyAxKSAqIDMpO1xuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgKGkgKyAyKSAqIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRCdWZmZXIoJ25vcm1hbCcsIG5ldyBCdWZmZXIobm9ybWFscywgMykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0LDRgNCw0LvQu9C10LvQtdC/0LjQv9C10LQg0L7Qv9C40YHRi9Cy0LDRjtGJ0LjQuSDQtNCw0L3QvdGD0Y4g0LPQtdC+0LzQtdGC0YDQuNGOXG4gICAgICogQHJldHVybnMge0JveH1cbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0JveCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ib3VuZGluZ0JveCkge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlQm91bmRpbmdCb3goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZGluZ0JveDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0YfQuNGB0LvRj9C10YIg0L/QsNGA0LDQu9C70LXQu9C10L/QuNC/0LXQtCDQvtC/0LjRgdGL0LLQsNGO0YnQuNC5INC00LDQvdC90YPRjiDQs9C10L7QvNC10YLRgNC40Y4g0L3QsCDQvtGB0L3QvtCy0LUg0LHRg9GE0LXRgNCwINC60L7QvtGA0LTQuNC90LDRgiDQstC10YDRiNC40L0gKHBvc2l0aW9uKVxuICAgICAqIEByZXR1cm5zIHtCb3h9XG4gICAgICovXG4gICAgY29tcHV0ZUJvdW5kaW5nQm94KCkge1xuICAgICAgICBjb25zdCBib3VuZGluZ0JveCA9IHRoaXMuX2JvdW5kaW5nQm94ID0gbmV3IEJveCgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IHRoaXMuYnVmZmVycy5wb3NpdGlvbjtcblxuICAgICAgICBpZiAocG9zaXRpb25CdWZmZXIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25CdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib3VuZGluZ0JveC5leHBhbmRCeVBvaW50KHBvc2l0aW9uQnVmZmVyLmdldEVsZW1lbnQoaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHQvtC10LTQuNC90Y/QtdGCINC00LDQvdC90YPRjiDQs9C10L7QvNC10YLRgNC40Y4g0YEg0LTRgNGD0LPQvtC5LlxuICAgICAqINCe0YHRgtC+0YDQvtC20L3Qviwg0LPQtdC+0LzQtdGC0YDQuNC4INC00L7Qu9C20L3RiyDQsdGL0YLRjCDQv9C+0LTQvtCx0L3Riywg0YIu0LUuINGB0L7QtNC10YDQttCw0YLRjCDQvtC00LjQvdCw0LrQvtCy0YvQtSDQsdGD0YTQtdGA0YsuXG4gICAgICogQHBhcmFtIHtHZW9tZXRyeX0gZ2VvbWV0cnlcbiAgICAgKi9cbiAgICBjb25jYXQoZ2VvbWV0cnkpIHtcbiAgICAgICAgZm9yIChjb25zdCB0eXBlIGluIHRoaXMuYnVmZmVycykge1xuICAgICAgICAgICAgdGhpcy5idWZmZXJzW3R5cGVdLmNvbmNhdChnZW9tZXRyeS5idWZmZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2VvbWV0cnk7XG4iXX0=