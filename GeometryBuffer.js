'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Buffer2 = require('./Buffer');

var _Buffer3 = _interopRequireDefault(_Buffer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера.
 * В отличие от {@link Buffer}, принимает в качестве аргумента типизированный массив.
 * Это позволяет работать с данными в {@link Geometry}, например, вычислять BoundingBox.
 *
 * @param {TypedArray} array Типизированный массив данных, например, координат вершин
 * @param {?BufferBindOptions} options Параметры передачи буфера в видеокарту
 */
var GeometryBuffer = function (_Buffer) {
    _inherits(GeometryBuffer, _Buffer);

    function GeometryBuffer(array, options) {
        _classCallCheck(this, GeometryBuffer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeometryBuffer).call(this, array, options));

        _this._array = array;

        /**
         * Количество элементов в массиве данных
         * @type {Number}
         */
        _this.length = array.length / _this.options.itemSize;
        return _this;
    }

    /**
     * Возвращает массив данных
     * @returns {TypedArray}
     */


    _createClass(GeometryBuffer, [{
        key: 'getArray',
        value: function getArray() {
            return this._array;
        }

        /**
         * Возвращает элемент из массива данных
         * @param {Number} index Номер элемента в массиве данных
         * @returns {TypedArray}
         */

    }, {
        key: 'getElement',
        value: function getElement(index) {
            return this._array.subarray(index * this.options.itemSize, (index + 1) * this.options.itemSize);
        }

        /**
         * Возвращает тройку элементов из массива данных
         * @param {Number} index Индекс
         * @returns {TypedArray[]}
         */

    }, {
        key: 'getTriangle',
        value: function getTriangle(index) {
            index *= 3;

            return [this.getElement(index), this.getElement(index + 1), this.getElement(index + 2)];
        }

        /**
         * Конкатенирует данный буфер с другим.
         * Осторожно, метод не проверяет одинаковой размерности данные или нет.
         * @param {GeometryBuffer} buffer
         */

    }, {
        key: 'concat',
        value: function concat(buffer) {
            var addArray = buffer.getArray();
            var newArray = new this._array.constructor(this._array.length + addArray.length);
            newArray.set(this._array, 0);
            newArray.set(addArray, this._array.length);

            this._array = newArray;
            this.length = newArray.length / this.options.itemSize;

            return this;
        }
    }]);

    return GeometryBuffer;
}(_Buffer3.default);

exports.default = GeometryBuffer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9HZW9tZXRyeUJ1ZmZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFRTSxjOzs7QUFDRiw0QkFBWSxLQUFaLEVBQW1CLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUEsc0dBQ2xCLEtBRGtCLEVBQ1gsT0FEVzs7QUFHeEIsY0FBSyxNQUFMLEdBQWMsS0FBZDs7QUFFQTs7OztBQUlBLGNBQUssTUFBTCxHQUFjLE1BQU0sTUFBTixHQUFlLE1BQUssT0FBTCxDQUFhLFFBQTFDO0FBVHdCO0FBVTNCOztBQUVEOzs7Ozs7OzttQ0FJVztBQUNQLG1CQUFPLEtBQUssTUFBWjtBQUNIOztBQUVEOzs7Ozs7OzttQ0FLVyxLLEVBQU87QUFDZCxtQkFBTyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFFBQVEsS0FBSyxPQUFMLENBQWEsUUFBMUMsRUFBb0QsQ0FBQyxRQUFRLENBQVQsSUFBYyxLQUFLLE9BQUwsQ0FBYSxRQUEvRSxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O29DQUtZLEssRUFBTztBQUNmLHFCQUFTLENBQVQ7O0FBRUEsbUJBQU8sQ0FDSCxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FERyxFQUVILEtBQUssVUFBTCxDQUFnQixRQUFRLENBQXhCLENBRkcsRUFHSCxLQUFLLFVBQUwsQ0FBZ0IsUUFBUSxDQUF4QixDQUhHLENBQVA7QUFLSDs7QUFFRDs7Ozs7Ozs7K0JBS08sTSxFQUFRO0FBQ1gsZ0JBQU0sV0FBVyxPQUFPLFFBQVAsRUFBakI7QUFDQSxnQkFBTSxXQUFXLElBQUksS0FBSyxNQUFMLENBQVksV0FBaEIsQ0FBNEIsS0FBSyxNQUFMLENBQVksTUFBWixHQUFxQixTQUFTLE1BQTFELENBQWpCO0FBQ0EscUJBQVMsR0FBVCxDQUFhLEtBQUssTUFBbEIsRUFBMEIsQ0FBMUI7QUFDQSxxQkFBUyxHQUFULENBQWEsUUFBYixFQUF1QixLQUFLLE1BQUwsQ0FBWSxNQUFuQzs7QUFFQSxpQkFBSyxNQUFMLEdBQWMsUUFBZDtBQUNBLGlCQUFLLE1BQUwsR0FBYyxTQUFTLE1BQVQsR0FBa0IsS0FBSyxPQUFMLENBQWEsUUFBN0M7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBR1UsYyIsImZpbGUiOiJHZW9tZXRyeUJ1ZmZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdWZmZXIgZnJvbSAnLi9CdWZmZXInO1xuXG4vKipcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuCDQv9C+0LTQs9C+0YLQvtCy0LrQuCDQtNCw0L3QvdGL0YUg0LTQu9GPINC/0LXRgNC10LTQsNGH0Lgg0LIg0LDRgtGA0LjQsdGD0YLRiyDRiNC10LnQtNC10YDQsC5cbiAqINCSINC+0YLQu9C40YfQuNC1INC+0YIge0BsaW5rIEJ1ZmZlcn0sINC/0YDQuNC90LjQvNCw0LXRgiDQsiDQutCw0YfQtdGB0YLQstC1INCw0YDQs9GD0LzQtdC90YLQsCDRgtC40L/QuNC30LjRgNC+0LLQsNC90L3Ri9C5INC80LDRgdGB0LjQsi5cbiAqINCt0YLQviDQv9C+0LfQstC+0LvRj9C10YIg0YDQsNCx0L7RgtCw0YLRjCDRgSDQtNCw0L3QvdGL0LzQuCDQsiB7QGxpbmsgR2VvbWV0cnl9LCDQvdCw0L/RgNC40LzQtdGALCDQstGL0YfQuNGB0LvRj9GC0YwgQm91bmRpbmdCb3guXG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fSBhcnJheSDQotC40L/QuNC30LjRgNC+0LLQsNC90L3Ri9C5INC80LDRgdGB0LjQsiDQtNCw0L3QvdGL0YUsINC90LDQv9GA0LjQvNC10YAsINC60L7QvtGA0LTQuNC90LDRgiDQstC10YDRiNC40L1cbiAqIEBwYXJhbSB7P0J1ZmZlckJpbmRPcHRpb25zfSBvcHRpb25zINCf0LDRgNCw0LzQtdGC0YDRiyDQv9C10YDQtdC00LDRh9C4INCx0YPRhNC10YDQsCDQsiDQstC40LTQtdC+0LrQsNGA0YLRg1xuICovXG5jbGFzcyBHZW9tZXRyeUJ1ZmZlciBleHRlbmRzIEJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoYXJyYXksIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQsiDQvNCw0YHRgdC40LLQtSDQtNCw0L3QvdGL0YVcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoIC8gdGhpcy5vcHRpb25zLml0ZW1TaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC80LDRgdGB0LjQsiDQtNCw0L3QvdGL0YVcbiAgICAgKiBAcmV0dXJucyB7VHlwZWRBcnJheX1cbiAgICAgKi9cbiAgICBnZXRBcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGN0LvQtdC80LXQvdGCINC40Lcg0LzQsNGB0YHQuNCy0LAg0LTQsNC90L3Ri9GFXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4INCd0L7QvNC10YAg0Y3Qu9C10LzQtdC90YLQsCDQsiDQvNCw0YHRgdC40LLQtSDQtNCw0L3QvdGL0YVcbiAgICAgKiBAcmV0dXJucyB7VHlwZWRBcnJheX1cbiAgICAgKi9cbiAgICBnZXRFbGVtZW50KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheS5zdWJhcnJheShpbmRleCAqIHRoaXMub3B0aW9ucy5pdGVtU2l6ZSwgKGluZGV4ICsgMSkgKiB0aGlzLm9wdGlvbnMuaXRlbVNpemUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0YDQvtC50LrRgyDRjdC70LXQvNC10L3RgtC+0LIg0LjQtyDQvNCw0YHRgdC40LLQsCDQtNCw0L3QvdGL0YVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXgg0JjQvdC00LXQutGBXG4gICAgICogQHJldHVybnMge1R5cGVkQXJyYXlbXX1cbiAgICAgKi9cbiAgICBnZXRUcmlhbmdsZShpbmRleCkge1xuICAgICAgICBpbmRleCAqPSAzO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoaW5kZXgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KGluZGV4ICsgMSksXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoaW5kZXggKyAyKVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCa0L7QvdC60LDRgtC10L3QuNGA0YPQtdGCINC00LDQvdC90YvQuSDQsdGD0YTQtdGAINGBINC00YDRg9Cz0LjQvC5cbiAgICAgKiDQntGB0YLQvtGA0L7QttC90L4sINC80LXRgtC+0LQg0L3QtSDQv9GA0L7QstC10YDRj9C10YIg0L7QtNC40L3QsNC60L7QstC+0Lkg0YDQsNC30LzQtdGA0L3QvtGB0YLQuCDQtNCw0L3QvdGL0LUg0LjQu9C4INC90LXRgi5cbiAgICAgKiBAcGFyYW0ge0dlb21ldHJ5QnVmZmVyfSBidWZmZXJcbiAgICAgKi9cbiAgICBjb25jYXQoYnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGFkZEFycmF5ID0gYnVmZmVyLmdldEFycmF5KCk7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gbmV3IHRoaXMuX2FycmF5LmNvbnN0cnVjdG9yKHRoaXMuX2FycmF5Lmxlbmd0aCArIGFkZEFycmF5Lmxlbmd0aCk7XG4gICAgICAgIG5ld0FycmF5LnNldCh0aGlzLl9hcnJheSwgMCk7XG4gICAgICAgIG5ld0FycmF5LnNldChhZGRBcnJheSwgdGhpcy5fYXJyYXkubGVuZ3RoKTtcblxuICAgICAgICB0aGlzLl9hcnJheSA9IG5ld0FycmF5O1xuICAgICAgICB0aGlzLmxlbmd0aCA9IG5ld0FycmF5Lmxlbmd0aCAvIHRoaXMub3B0aW9ucy5pdGVtU2l6ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlb21ldHJ5QnVmZmVyO1xuIl19