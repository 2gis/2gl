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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL0JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0lBT007Ozs7Ozs7QUFNRixXQU5FLEdBTUYsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCOzBCQU5wQixLQU1vQjs7QUFDbEIsU0FBSyxHQUFMLEdBQVcsT0FBTyxlQUFLLE1BQUwsRUFBUCxDQURPO0FBRWxCLFNBQUssR0FBTCxHQUFXLE9BQU8sZUFBSyxNQUFMLEVBQVAsQ0FGTztHQUF0Qjs7Ozs7Ozs7O2VBTkU7O2tDQWdCWSxPQUFPO0FBQ2pCLGFBQU8sTUFBTSxDQUFOLElBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFYLElBQTBCLE1BQU0sQ0FBTixJQUFXLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FBWCxJQUM3QixNQUFNLENBQU4sSUFBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVgsSUFBMEIsTUFBTSxDQUFOLElBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxDQUFYLElBQzFCLE1BQU0sQ0FBTixJQUFXLEtBQUssR0FBTCxDQUFTLENBQVQsQ0FBWCxJQUEwQixNQUFNLENBQU4sSUFBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULENBQVgsQ0FIYjs7Ozs7Ozs7OztrQ0FVUCxPQUFPO0FBQ2pCLHFCQUFLLEdBQUwsQ0FBUyxLQUFLLEdBQUwsRUFBVSxLQUFLLEdBQUwsRUFBVSxLQUE3QixFQURpQjtBQUVqQixxQkFBSyxHQUFMLENBQVMsS0FBSyxHQUFMLEVBQVUsS0FBSyxHQUFMLEVBQVUsS0FBN0IsRUFGaUI7O0FBSWpCLGFBQU8sSUFBUCxDQUppQjs7OztTQTFCbkI7OztrQkFrQ1MiLCJmaWxlIjoiQm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vKipcbiAqINCe0LHRitC10LrRgiDQv9Cw0YDQsNC70LvQtdC70LXQv9C40L/QtdC00LBcbiAqXG4gKiDQktC30Y/RgtC+INC40LcgW3RocmVlLmpzXShodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2Jsb2IvbWFzdGVyL3NyYy9tYXRoL0JveDMuanMpXG4gKi9cbmNsYXNzIEJveCB7XG4gICAgLyoqXG4gICAgICog0J/QsNGA0LDQu9C70LXQu9C10L/QuNC/0LXQtCDQt9Cw0LTQsNGR0YLRgdGPINC00LLRg9C80Y8g0YLQvtGH0LrQsNC80LhcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IG1pbiDQnNC40L3QuNC80LDQu9GM0L3QsNGPXG4gICAgICogQHBhcmFtIHt2ZWMzfSBtYXgg0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWluLCBtYXgpIHtcbiAgICAgICAgdGhpcy5taW4gPSBtaW4gfHwgdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5tYXggPSBtYXggfHwgdmVjMy5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0L7QstC10YDRj9C10YIg0YHQvtC00LXRgNC20LjRgiDQu9C4INC/0LDRgNCw0LvQu9C10LvQtdC/0LjQv9C10LQg0LfQsNC00LDQvdC90YPRjiDRgtC+0YfQutGDXG4gICAgICogQHBhcmFtIHt2ZWMzfSBwb2ludFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNvbnRhaW5zUG9pbnQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50WzBdID4gdGhpcy5taW5bMF0gJiYgcG9pbnRbMF0gPCB0aGlzLm1heFswXSAmJlxuICAgICAgICAgICAgcG9pbnRbMV0gPiB0aGlzLm1pblsxXSAmJiBwb2ludFsxXSA8IHRoaXMubWF4WzFdICYmXG4gICAgICAgICAgICBwb2ludFsyXSA+IHRoaXMubWluWzJdICYmIHBvaW50WzJdIDwgdGhpcy5tYXhbMl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KDQsNGB0YjQuNGA0Y/QtdGCINC/0LDRgNCw0LvQu9C10LvQtdC/0LjQv9C10LQg0LTQviDQt9Cw0LTQsNC90L3QvtC5INGC0L7Rh9C60LhcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHBvaW50XG4gICAgICovXG4gICAgZXhwYW5kQnlQb2ludChwb2ludCkge1xuICAgICAgICB2ZWMzLm1pbih0aGlzLm1pbiwgdGhpcy5taW4sIHBvaW50KTtcbiAgICAgICAgdmVjMy5tYXgodGhpcy5tYXgsIHRoaXMubWF4LCBwb2ludCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3g7XG4iXX0=