'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Объект параллелепипеда
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Box3.js)
 */
var Box = function () {
  /**
   * Параллелепипед задаётся двумя точками
   * @param {vec3} min Минимальная
   * @param {vec3} max Максимальная
   */
  function Box(min, max) {
    _classCallCheck(this, Box);

    this.min = min || _glMatrix.vec3.create();
    this.max = max || _glMatrix.vec3.create();
  }

  /**
   * Проверяет содержит ли параллелепипед заданную точку
   * @param {vec3} point
   * @returns {Boolean}
   */


  _createClass(Box, [{
    key: 'containsPoint',
    value: function containsPoint(point) {
      return point[0] > this.min[0] && point[0] < this.max[0] && point[1] > this.min[1] && point[1] < this.max[1] && point[2] > this.min[2] && point[2] < this.max[2];
    }

    /**
     * Расширяет параллелепипед до заданной точки
     * @param {vec3} point
     */

  }, {
    key: 'expandByPoint',
    value: function expandByPoint(point) {
      _glMatrix.vec3.min(this.min, this.min, point);
      _glMatrix.vec3.max(this.max, this.max, point);

      return this;
    }
  }]);

  return Box;
}();

exports.default = Box;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL0JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7O0lBS00sRztBQUNGOzs7OztBQUtBLGVBQVksR0FBWixFQUFpQixHQUFqQixFQUFzQjtBQUFBOztBQUNsQixTQUFLLEdBQUwsR0FBVyxPQUFPLGVBQUssTUFBTCxFQUFsQjtBQUNBLFNBQUssR0FBTCxHQUFXLE9BQU8sZUFBSyxNQUFMLEVBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztrQ0FLYyxLLEVBQU87QUFDakIsYUFBTyxNQUFNLENBQU4sSUFBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVgsSUFBMEIsTUFBTSxDQUFOLElBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFyQyxJQUNILE1BQU0sQ0FBTixJQUFXLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FEUixJQUN1QixNQUFNLENBQU4sSUFBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBRGxDLElBRUgsTUFBTSxDQUFOLElBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUZSLElBRXVCLE1BQU0sQ0FBTixJQUFXLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FGekM7QUFHSDs7QUFFRDs7Ozs7OztrQ0FJYyxLLEVBQU87QUFDakIscUJBQUssR0FBTCxDQUFTLEtBQUssR0FBZCxFQUFtQixLQUFLLEdBQXhCLEVBQTZCLEtBQTdCO0FBQ0EscUJBQUssR0FBTCxDQUFTLEtBQUssR0FBZCxFQUFtQixLQUFLLEdBQXhCLEVBQTZCLEtBQTdCOztBQUVBLGFBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBR1UsRyIsImZpbGUiOiJCb3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlYzN9IGZyb20gJ2dsLW1hdHJpeCc7XG5cbi8qKlxuICog0J7QsdGK0LXQutGCINC/0LDRgNCw0LvQu9C10LvQtdC/0LjQv9C10LTQsFxuICpcbiAqINCS0LfRj9GC0L4g0LjQtyBbdGhyZWUuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL21hdGgvQm94My5qcylcbiAqL1xuY2xhc3MgQm94IHtcbiAgICAvKipcbiAgICAgKiDQn9Cw0YDQsNC70LvQtdC70LXQv9C40L/QtdC0INC30LDQtNCw0ZHRgtGB0Y8g0LTQstGD0LzRjyDRgtC+0YfQutCw0LzQuFxuICAgICAqIEBwYXJhbSB7dmVjM30gbWluINCc0LjQvdC40LzQsNC70YzQvdCw0Y9cbiAgICAgKiBAcGFyYW0ge3ZlYzN9IG1heCDQnNCw0LrRgdC40LzQsNC70YzQvdCw0Y9cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCkge1xuICAgICAgICB0aGlzLm1pbiA9IG1pbiB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLm1heCA9IG1heCB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXRgiDRgdC+0LTQtdGA0LbQuNGCINC70Lgg0L/QsNGA0LDQu9C70LXQu9C10L/QuNC/0LXQtCDQt9Cw0LTQsNC90L3Rg9GOINGC0L7Rh9C60YNcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHBvaW50XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnNQb2ludChwb2ludCkge1xuICAgICAgICByZXR1cm4gcG9pbnRbMF0gPiB0aGlzLm1pblswXSAmJiBwb2ludFswXSA8IHRoaXMubWF4WzBdICYmXG4gICAgICAgICAgICBwb2ludFsxXSA+IHRoaXMubWluWzFdICYmIHBvaW50WzFdIDwgdGhpcy5tYXhbMV0gJiZcbiAgICAgICAgICAgIHBvaW50WzJdID4gdGhpcy5taW5bMl0gJiYgcG9pbnRbMl0gPCB0aGlzLm1heFsyXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQoNCw0YHRiNC40YDRj9C10YIg0L/QsNGA0LDQu9C70LXQu9C10L/QuNC/0LXQtCDQtNC+INC30LDQtNCw0L3QvdC+0Lkg0YLQvtGH0LrQuFxuICAgICAqIEBwYXJhbSB7dmVjM30gcG9pbnRcbiAgICAgKi9cbiAgICBleHBhbmRCeVBvaW50KHBvaW50KSB7XG4gICAgICAgIHZlYzMubWluKHRoaXMubWluLCB0aGlzLm1pbiwgcG9pbnQpO1xuICAgICAgICB2ZWMzLm1heCh0aGlzLm1heCwgdGhpcy5tYXgsIHBvaW50KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJveDtcbiJdfQ==