'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Buffer = require('./Buffer');

var _Buffer2 = _interopRequireDefault(_Buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс BufferChannel используется, если данные в обычном буфере имееют разные типы
 * и предназначены для разных атрибутов шейдера, т.е. нужно использовать webgl параметры stride и offset.
 * При инициализации классу передаётся {@link Buffer}. Несколько BufferChannel могут использовать один и тот же Buffer.
 * Во время рендеринга BufferChannel связывает полученный буфер с нужными параметрами.
 *
 * @param {Buffer} buffer Типизированный массив данных, например, координат вершин
 * @param {BufferBindOptions} options
 */
var BufferChannel = function () {
  function BufferChannel(buffer) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, BufferChannel);

    /**
     * Исходный буфер
     * @type {Buffer}
     * @ignore
     */
    this._buffer = buffer;

    /**
     * Параметры для связывания буфера
     * @type {BufferBindOptions}
     * @ignore
     */
    this.options = Object.assign({}, _Buffer2.default.defaultOptions, options);
  }

  /**
   * Связывает данные с контекстом WebGL с нужными параметрами.
   * Вызывает {@link Buffer#bind} исходного буфера.
   */


  _createClass(BufferChannel, [{
    key: 'bind',
    value: function bind(gl, location) {
      this._buffer.bind(gl, location, this.options);
    }
  }]);

  return BufferChannel;
}();

exports.default = BufferChannel;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9CdWZmZXJDaGFubmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7OztJQVNNLGE7QUFDRix5QkFBWSxNQUFaLEVBQWtDO0FBQUEsUUFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQUE7O0FBQzlCOzs7OztBQUtBLFNBQUssT0FBTCxHQUFlLE1BQWY7O0FBRUE7Ozs7O0FBS0EsU0FBSyxPQUFMLEdBQWUsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixpQkFBTyxjQUF6QixFQUF5QyxPQUF6QyxDQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3lCQUlLLEUsRUFBSSxRLEVBQVU7QUFDZixXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLFFBQXRCLEVBQWdDLEtBQUssT0FBckM7QUFDSDs7Ozs7O2tCQUdVLGEiLCJmaWxlIjoiQnVmZmVyQ2hhbm5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCdWZmZXIgZnJvbSAnLi9CdWZmZXInO1xuXG4vKipcbiAqINCa0LvQsNGB0YEgQnVmZmVyQ2hhbm5lbCDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8sINC10YHQu9C4INC00LDQvdC90YvQtSDQsiDQvtCx0YvRh9C90L7QvCDQsdGD0YTQtdGA0LUg0LjQvNC10LXRjtGCINGA0LDQt9C90YvQtSDRgtC40L/Ri1xuICog0Lgg0L/RgNC10LTQvdCw0LfQvdCw0YfQtdC90Ysg0LTQu9GPINGA0LDQt9C90YvRhSDQsNGC0YDQuNCx0YPRgtC+0LIg0YjQtdC50LTQtdGA0LAsINGCLtC1LiDQvdGD0LbQvdC+INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCB3ZWJnbCDQv9Cw0YDQsNC80LXRgtGA0Ysgc3RyaWRlINC4IG9mZnNldC5cbiAqINCf0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQutC70LDRgdGB0YMg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8ge0BsaW5rIEJ1ZmZlcn0uINCd0LXRgdC60L7Qu9GM0LrQviBCdWZmZXJDaGFubmVsINC80L7Qs9GD0YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC+0LTQuNC9INC4INGC0L7RgiDQttC1IEJ1ZmZlci5cbiAqINCS0L4g0LLRgNC10LzRjyDRgNC10L3QtNC10YDQuNC90LPQsCBCdWZmZXJDaGFubmVsINGB0LLRj9C30YvQstCw0LXRgiDQv9C+0LvRg9GH0LXQvdC90YvQuSDQsdGD0YTQtdGAINGBINC90YPQttC90YvQvNC4INC/0LDRgNCw0LzQtdGC0YDQsNC80LguXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciDQotC40L/QuNC30LjRgNC+0LLQsNC90L3Ri9C5INC80LDRgdGB0LjQsiDQtNCw0L3QvdGL0YUsINC90LDQv9GA0LjQvNC10YAsINC60L7QvtGA0LTQuNC90LDRgiDQstC10YDRiNC40L1cbiAqIEBwYXJhbSB7QnVmZmVyQmluZE9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuY2xhc3MgQnVmZmVyQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IoYnVmZmVyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0YHRhdC+0LTQvdGL0Lkg0LHRg9GE0LXRgFxuICAgICAgICAgKiBAdHlwZSB7QnVmZmVyfVxuICAgICAgICAgKiBAaWdub3JlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCf0LDRgNCw0LzQtdGC0YDRiyDQtNC70Y8g0YHQstGP0LfRi9Cy0LDQvdC40Y8g0LHRg9GE0LXRgNCwXG4gICAgICAgICAqIEB0eXBlIHtCdWZmZXJCaW5kT3B0aW9uc31cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgQnVmZmVyLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCy0Y/Qt9GL0LLQsNC10YIg0LTQsNC90L3Ri9C1INGBINC60L7QvdGC0LXQutGB0YLQvtC8IFdlYkdMINGBINC90YPQttC90YvQvNC4INC/0LDRgNCw0LzQtdGC0YDQsNC80LguXG4gICAgICog0JLRi9C30YvQstCw0LXRgiB7QGxpbmsgQnVmZmVyI2JpbmR9INC40YHRhdC+0LTQvdC+0LPQviDQsdGD0YTQtdGA0LAuXG4gICAgICovXG4gICAgYmluZChnbCwgbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5fYnVmZmVyLmJpbmQoZ2wsIGxvY2F0aW9uLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyQ2hhbm5lbDtcbiJdfQ==