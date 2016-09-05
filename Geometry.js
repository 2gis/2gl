'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _GeometryBuffer = require('./GeometryBuffer');

var _GeometryBuffer2 = _interopRequireDefault(_GeometryBuffer);

var _Box = require('./math/Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Используется для задания геометрий объектов.
 * В качестве данных используются {@link GeometryBuffer}.
 */
var Geometry = function () {
    function Geometry() {
        _classCallCheck(this, Geometry);

        /**
         * Словарь вида: название буфера - GeometryBuffer
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
     * @param {GeometryBuffer} buffer
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
         * @returns {GeometryBuffer}
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

            var normals = new Float32Array(positionBuffer.length * positionBuffer.options.itemSize);

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

            this.setBuffer('normal', new _GeometryBuffer2.default(normals, { itemSize: 3 }));

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
//# sourceMappingURL=data:application/json;base64,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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlYzN9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgR2VvbWV0cnlCdWZmZXIgZnJvbSAnLi9HZW9tZXRyeUJ1ZmZlcic7XG5pbXBvcnQgQm94IGZyb20gJy4vbWF0aC9Cb3gnO1xuXG4vKipcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0LfQsNC00LDQvdC40Y8g0LPQtdC+0LzQtdGC0YDQuNC5INC+0LHRitC10LrRgtC+0LIuXG4gKiDQkiDQutCw0YfQtdGB0YLQstC1INC00LDQvdC90YvRhSDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8ge0BsaW5rIEdlb21ldHJ5QnVmZmVyfS5cbiAqL1xuY2xhc3MgR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICog0KHQu9C+0LLQsNGA0Ywg0LLQuNC00LA6INC90LDQt9Cy0LDQvdC40LUg0LHRg9GE0LXRgNCwIC0gR2VvbWV0cnlCdWZmZXJcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYnVmZmVycyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9Cw0YDQsNC70LvQtdC70LXQv9C40L/QtdC0INC+0L/QuNGB0YvQstCw0Y7RidC40Lkg0LTQsNC90L3Rg9GOINCz0LXQvtC80LXRgtGA0LjRjlxuICAgICAgICAgKiBAdHlwZSB7P0JveH1cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYm91bmRpbmdCb3ggPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0L7RhdGA0LDQvdGP0LXRgiDQsdGD0YTQtdGAINCyINCz0LXQvtC80LXRgtGA0LjRjlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lINCd0LDQt9Cy0LDQvdC40LUg0LHRg9GE0LXRgNCwXG4gICAgICogQHBhcmFtIHtHZW9tZXRyeUJ1ZmZlcn0gYnVmZmVyXG4gICAgICovXG4gICAgc2V0QnVmZmVyKG5hbWUsIGJ1ZmZlcikge1xuICAgICAgICB0aGlzLmJ1ZmZlcnNbbmFtZV0gPSBidWZmZXI7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LHRg9GE0LXRgCDQuNC3INCz0LXQvtC80LXRgtGA0LjQuFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lINCd0LDQt9Cy0LDQvdC40LUg0LHRg9GE0LXRgNCwXG4gICAgICogQHJldHVybnMge0dlb21ldHJ5QnVmZmVyfVxuICAgICAqL1xuICAgIGdldEJ1ZmZlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZlcnNbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdGCINCx0YPRhNC10YAg0L3QvtGA0LzQsNC70LXQuSDQvdCwINC+0YHQvdC+0LLQtSDQsdGD0YTQtdGA0LAg0LrQvtC+0YDQtNC40L3QsNGCINCy0LXRgNGI0LjQvSAocG9zaXRpb24pXG4gICAgICovXG4gICAgY29tcHV0ZU5vcm1hbHMoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gdGhpcy5idWZmZXJzLnBvc2l0aW9uO1xuXG4gICAgICAgIGlmICghcG9zaXRpb25CdWZmZXIpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICBjb25zdCBub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbkJ1ZmZlci5sZW5ndGggKiBwb3NpdGlvbkJ1ZmZlci5vcHRpb25zLml0ZW1TaXplKTtcblxuICAgICAgICBjb25zdCBhYiA9IHZlYzMuY3JlYXRlKCk7XG4gICAgICAgIGNvbnN0IGNiID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgbiA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbkJ1ZmZlci5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgICAgY29uc3QgdHJpYW5nbGUgPSBwb3NpdGlvbkJ1ZmZlci5nZXRUcmlhbmdsZShpIC8gMyk7XG5cbiAgICAgICAgICAgIHZlYzMuc3ViKGFiLCB0cmlhbmdsZVswXSwgdHJpYW5nbGVbMV0pO1xuICAgICAgICAgICAgdmVjMy5zdWIoY2IsIHRyaWFuZ2xlWzJdLCB0cmlhbmdsZVsxXSk7XG4gICAgICAgICAgICB2ZWMzLmNyb3NzKG4sIGFiLCBjYik7XG4gICAgICAgICAgICB2ZWMzLm5vcm1hbGl6ZShuLCBuKTtcblxuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgaSAqIDMpO1xuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgKGkgKyAxKSAqIDMpO1xuICAgICAgICAgICAgbm9ybWFscy5zZXQobiwgKGkgKyAyKSAqIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRCdWZmZXIoJ25vcm1hbCcsIG5ldyBHZW9tZXRyeUJ1ZmZlcihub3JtYWxzLCB7aXRlbVNpemU6IDN9KSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0L/QsNGA0LDQu9C70LXQu9C10L/QuNC/0LXQtCDQvtC/0LjRgdGL0LLQsNGO0YnQuNC5INC00LDQvdC90YPRjiDQs9C10L7QvNC10YLRgNC40Y5cbiAgICAgKiBAcmV0dXJucyB7Qm94fVxuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQm94KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2JvdW5kaW5nQm94KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kaW5nQm94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXRgiDQv9Cw0YDQsNC70LvQtdC70LXQv9C40L/QtdC0INC+0L/QuNGB0YvQstCw0Y7RidC40Lkg0LTQsNC90L3Rg9GOINCz0LXQvtC80LXRgtGA0LjRjiDQvdCwINC+0YHQvdC+0LLQtSDQsdGD0YTQtdGA0LAg0LrQvtC+0YDQtNC40L3QsNGCINCy0LXRgNGI0LjQvSAocG9zaXRpb24pXG4gICAgICogQHJldHVybnMge0JveH1cbiAgICAgKi9cbiAgICBjb21wdXRlQm91bmRpbmdCb3goKSB7XG4gICAgICAgIGNvbnN0IGJvdW5kaW5nQm94ID0gdGhpcy5fYm91bmRpbmdCb3ggPSBuZXcgQm94KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQnVmZmVyID0gdGhpcy5idWZmZXJzLnBvc2l0aW9uO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbkJ1ZmZlcikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbkJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGJvdW5kaW5nQm94LmV4cGFuZEJ5UG9pbnQocG9zaXRpb25CdWZmZXIuZ2V0RWxlbWVudChpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodC+0LXQtNC40L3Rj9C10YIg0LTQsNC90L3Rg9GOINCz0LXQvtC80LXRgtGA0LjRjiDRgSDQtNGA0YPQs9C+0LkuXG4gICAgICog0J7RgdGC0L7RgNC+0LbQvdC+LCDQs9C10L7QvNC10YLRgNC40Lgg0LTQvtC70LbQvdGLINCx0YvRgtGMINC/0L7QtNC+0LHQvdGLLCDRgi7QtS4g0YHQvtC00LXRgNC20LDRgtGMINC+0LTQuNC90LDQutC+0LLRi9C1INCx0YPRhNC10YDRiy5cbiAgICAgKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeVxuICAgICAqL1xuICAgIGNvbmNhdChnZW9tZXRyeSkge1xuICAgICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gdGhpcy5idWZmZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcnNbdHlwZV0uY29uY2F0KGdlb21ldHJ5LmJ1ZmZlcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZW9tZXRyeTtcbiJdfQ==