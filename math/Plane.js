'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Задаёт плоскость в трёхмерном пространстве
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Plane.js)
 */

var Plane = function () {
  /**
   * @param {vec3} normal Нормаль к плоскости
   * @param {Number} [constant=0] Отрицательное смещение плоскости вдоль нормали
   */

  function Plane(normal, constant) {
    _classCallCheck(this, Plane);

    this.normal = normal || _glMatrix.vec3.create();
    this.constant = constant || 0;
  }

  /**
   * Ищет минимальное расстояние между точкой и плоскостью
   * @param {vec3} point
   * @returns {Number}
   */


  _createClass(Plane, [{
    key: 'distanceToPoint',
    value: function distanceToPoint(point) {
      return _glMatrix.vec3.dot(this.normal, point) + this.constant;
    }

    /**
     * Устанавливает значения нормали и смешение плоскости
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     */

  }, {
    key: 'setComponents',
    value: function setComponents(x, y, z, w) {
      _glMatrix.vec3.set(this.normal, x, y, z);
      this.constant = w;
      return this;
    }
  }]);

  return Plane;
}();

exports.default = Plane;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL1BsYW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7SUFPTTs7Ozs7O0FBS0YsV0FMRSxLQUtGLENBQVksTUFBWixFQUFvQixRQUFwQixFQUE4QjswQkFMNUIsT0FLNEI7O0FBQzFCLFNBQUssTUFBTCxHQUFjLFVBQVUsZUFBSyxNQUFMLEVBQVYsQ0FEWTtBQUUxQixTQUFLLFFBQUwsR0FBZ0IsWUFBWSxDQUFaLENBRlU7R0FBOUI7Ozs7Ozs7OztlQUxFOztvQ0FlYyxPQUFPO0FBQ25CLGFBQU8sZUFBSyxHQUFMLENBQVMsS0FBSyxNQUFMLEVBQWEsS0FBdEIsSUFBK0IsS0FBSyxRQUFMLENBRG5COzs7Ozs7Ozs7Ozs7O2tDQVdULEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDdEIscUJBQUssR0FBTCxDQUFTLEtBQUssTUFBTCxFQUFhLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBRHNCO0FBRXRCLFdBQUssUUFBTCxHQUFnQixDQUFoQixDQUZzQjtBQUd0QixhQUFPLElBQVAsQ0FIc0I7Ozs7U0ExQnhCOzs7a0JBaUNTIiwiZmlsZSI6IlBsYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2ZWMzfSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vKipcbiAqINCX0LDQtNCw0ZHRgiDQv9C70L7RgdC60L7RgdGC0Ywg0LIg0YLRgNGR0YXQvNC10YDQvdC+0Lwg0L/RgNC+0YHRgtGA0LDQvdGB0YLQstC1XG4gKlxuICog0JLQt9GP0YLQviDQuNC3IFt0aHJlZS5qc10oaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9zcmMvbWF0aC9QbGFuZS5qcylcbiAqL1xuY2xhc3MgUGxhbmUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7dmVjM30gbm9ybWFsINCd0L7RgNC80LDQu9GMINC6INC/0LvQvtGB0LrQvtGB0YLQuFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uc3RhbnQ9MF0g0J7RgtGA0LjRhtCw0YLQtdC70YzQvdC+0LUg0YHQvNC10YnQtdC90LjQtSDQv9C70L7RgdC60L7RgdGC0Lgg0LLQtNC+0LvRjCDQvdC+0YDQvNCw0LvQuFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vcm1hbCwgY29uc3RhbnQpIHtcbiAgICAgICAgdGhpcy5ub3JtYWwgPSBub3JtYWwgfHwgdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5jb25zdGFudCA9IGNvbnN0YW50IHx8IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjRidC10YIg0LzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvNC10LbQtNGDINGC0L7Rh9C60L7QuSDQuCDQv9C70L7RgdC60L7RgdGC0YzRjlxuICAgICAqIEBwYXJhbSB7dmVjM30gcG9pbnRcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGRpc3RhbmNlVG9Qb2ludChwb2ludCkge1xuICAgICAgICByZXR1cm4gdmVjMy5kb3QodGhpcy5ub3JtYWwsIHBvaW50KSArIHRoaXMuY29uc3RhbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0LfQvdCw0YfQtdC90LjRjyDQvdC+0YDQvNCw0LvQuCDQuCDRgdC80LXRiNC10L3QuNC1INC/0LvQvtGB0LrQvtGB0YLQuFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gelxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3XG4gICAgICovXG4gICAgc2V0Q29tcG9uZW50cyh4LCB5LCB6LCB3KSB7XG4gICAgICAgIHZlYzMuc2V0KHRoaXMubm9ybWFsLCB4LCB5LCB6KTtcbiAgICAgICAgdGhpcy5jb25zdGFudCA9IHc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxhbmU7XG4iXX0=