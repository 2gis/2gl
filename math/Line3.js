'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Math = require('./Math.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс для линий
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Line3.js)
 */
var Line3 = function () {
    /**
     * @param {vec3} start Начало
     * @param {vec3} end Конец
     */
    function Line3(start, end) {
        _classCallCheck(this, Line3);

        this.start = start || _glMatrix.vec3.create();
        this.end = end || _glMatrix.vec3.create();
    }

    /**
     * Возвращает параметр основанный на проекции ближайшей точки к линии.
     * Если clampToLine = true, возвращает параметр между 0 и 1.
     * @param {vec3} point
     * @param {Boolean} clampToLine
     * @returns {number}
     */


    _createClass(Line3, [{
        key: 'closestPointToPointParameter',
        value: function closestPointToPointParameter(point, clampToLine) {
            var startP = _glMatrix.vec3.create();
            var startEnd = _glMatrix.vec3.create();

            _glMatrix.vec3.sub(startP, point, this.start);
            _glMatrix.vec3.sub(startEnd, this.end, this.start);

            var startEnd2 = _glMatrix.vec3.dot(startEnd, startEnd);
            var startEndStartP = _glMatrix.vec3.dot(startEnd, startP);

            var t = startEndStartP / startEnd2;

            if (clampToLine) {
                t = (0, _Math.clamp)(t, 0, 1);
            }

            return t;
        }

        /**
         * Возвращает ближайшую точку на прямой заданную линией. Если clampToLine = true, возвращает точку
         * лежащую в пределах линии.
         * @param {vec3} point
         * @param {Boolean} clampToLine
         * @param {?vec3} optionalTarget Если указать параметр, то результат будет записан в него
         * @returns {vec3}
         */

    }, {
        key: 'closestPointToPoint',
        value: function closestPointToPoint(point, clampToLine, optionalTarget) {
            var t = this.closestPointToPointParameter(point, clampToLine);

            var result = optionalTarget || _glMatrix.vec3.create();
            result = this.delta(result);
            _glMatrix.vec3.scale(result, result, t);
            _glMatrix.vec3.add(result, result, this.start);

            return result;
        }

        /**
         * Вычитает вектор начала линии из конца
         * @param {?vec3} optionalTarget Если указать параметр, то результат будет записан в него
         * @returns {vec3}
         */

    }, {
        key: 'delta',
        value: function delta(optionalTarget) {
            var result = optionalTarget || _glMatrix.vec3.create();
            _glMatrix.vec3.sub(result, this.end, this.start);
            return result;
        }
    }]);

    return Line3;
}();

exports.default = Line3;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL0xpbmUzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7SUFLTSxLO0FBQ0Y7Ozs7QUFJQSxtQkFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCO0FBQUE7O0FBQ3BCLGFBQUssS0FBTCxHQUFhLFNBQVMsZUFBSyxNQUFMLEVBQXRCO0FBQ0EsYUFBSyxHQUFMLEdBQVcsT0FBTyxlQUFLLE1BQUwsRUFBbEI7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7cURBTzZCLEssRUFBTyxXLEVBQWE7QUFDN0MsZ0JBQU0sU0FBUyxlQUFLLE1BQUwsRUFBZjtBQUNBLGdCQUFNLFdBQVcsZUFBSyxNQUFMLEVBQWpCOztBQUVBLDJCQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWlCLEtBQWpCLEVBQXdCLEtBQUssS0FBN0I7QUFDQSwyQkFBSyxHQUFMLENBQVMsUUFBVCxFQUFtQixLQUFLLEdBQXhCLEVBQTZCLEtBQUssS0FBbEM7O0FBRUEsZ0JBQU0sWUFBWSxlQUFLLEdBQUwsQ0FBUyxRQUFULEVBQW1CLFFBQW5CLENBQWxCO0FBQ0EsZ0JBQU0saUJBQWlCLGVBQUssR0FBTCxDQUFTLFFBQVQsRUFBbUIsTUFBbkIsQ0FBdkI7O0FBRUEsZ0JBQUksSUFBSSxpQkFBaUIsU0FBekI7O0FBRUEsZ0JBQUksV0FBSixFQUFpQjtBQUNiLG9CQUFJLGlCQUFNLENBQU4sRUFBUyxDQUFULEVBQVksQ0FBWixDQUFKO0FBQ0g7O0FBRUQsbUJBQU8sQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs0Q0FRb0IsSyxFQUFPLFcsRUFBYSxjLEVBQWdCO0FBQ3BELGdCQUFNLElBQUksS0FBSyw0QkFBTCxDQUFrQyxLQUFsQyxFQUF5QyxXQUF6QyxDQUFWOztBQUVBLGdCQUFJLFNBQVMsa0JBQWtCLGVBQUssTUFBTCxFQUEvQjtBQUNBLHFCQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBVDtBQUNBLDJCQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLEVBQTJCLENBQTNCO0FBQ0EsMkJBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsS0FBSyxLQUE5Qjs7QUFFQSxtQkFBTyxNQUFQO0FBRUg7O0FBRUQ7Ozs7Ozs7OzhCQUtNLGMsRUFBZ0I7QUFDbEIsZ0JBQU0sU0FBUyxrQkFBa0IsZUFBSyxNQUFMLEVBQWpDO0FBQ0EsMkJBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsS0FBSyxHQUF0QixFQUEyQixLQUFLLEtBQWhDO0FBQ0EsbUJBQU8sTUFBUDtBQUNIOzs7Ozs7a0JBR1UsSyIsImZpbGUiOiJMaW5lMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjM30gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCB7Y2xhbXB9IGZyb20gJy4vTWF0aC5qcyc7XG5cbi8qKlxuICog0JrQu9Cw0YHRgSDQtNC70Y8g0LvQuNC90LjQuVxuICpcbiAqINCS0LfRj9GC0L4g0LjQtyBbdGhyZWUuanNdKGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL21hdGgvTGluZTMuanMpXG4gKi9cbmNsYXNzIExpbmUzIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHN0YXJ0INCd0LDRh9Cw0LvQvlxuICAgICAqIEBwYXJhbSB7dmVjM30gZW5kINCa0L7QvdC10YZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydCB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLmVuZCA9IGVuZCB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0LDRgNCw0LzQtdGC0YAg0L7RgdC90L7QstCw0L3QvdGL0Lkg0L3QsCDQv9GA0L7QtdC60YbQuNC4INCx0LvQuNC20LDQudGI0LXQuSDRgtC+0YfQutC4INC6INC70LjQvdC40LguXG4gICAgICog0JXRgdC70LggY2xhbXBUb0xpbmUgPSB0cnVlLCDQstC+0LfQstGA0LDRidCw0LXRgiDQv9Cw0YDQsNC80LXRgtGAINC80LXQttC00YMgMCDQuCAxLlxuICAgICAqIEBwYXJhbSB7dmVjM30gcG9pbnRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGNsYW1wVG9MaW5lXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBjbG9zZXN0UG9pbnRUb1BvaW50UGFyYW1ldGVyKHBvaW50LCBjbGFtcFRvTGluZSkge1xuICAgICAgICBjb25zdCBzdGFydFAgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBzdGFydEVuZCA9IHZlYzMuY3JlYXRlKCk7XG5cbiAgICAgICAgdmVjMy5zdWIoc3RhcnRQLCBwb2ludCwgdGhpcy5zdGFydCk7XG4gICAgICAgIHZlYzMuc3ViKHN0YXJ0RW5kLCB0aGlzLmVuZCwgdGhpcy5zdGFydCk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRFbmQyID0gdmVjMy5kb3Qoc3RhcnRFbmQsIHN0YXJ0RW5kKTtcbiAgICAgICAgY29uc3Qgc3RhcnRFbmRTdGFydFAgPSB2ZWMzLmRvdChzdGFydEVuZCwgc3RhcnRQKTtcblxuICAgICAgICBsZXQgdCA9IHN0YXJ0RW5kU3RhcnRQIC8gc3RhcnRFbmQyO1xuXG4gICAgICAgIGlmIChjbGFtcFRvTGluZSkge1xuICAgICAgICAgICAgdCA9IGNsYW1wKHQsIDAsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LHQu9C40LbQsNC50YjRg9GOINGC0L7Rh9C60YMg0L3QsCDQv9GA0Y/QvNC+0Lkg0LfQsNC00LDQvdC90YPRjiDQu9C40L3QuNC10LkuINCV0YHQu9C4IGNsYW1wVG9MaW5lID0gdHJ1ZSwg0LLQvtC30LLRgNCw0YnQsNC10YIg0YLQvtGH0LrRg1xuICAgICAqINC70LXQttCw0YnRg9GOINCyINC/0YDQtdC00LXQu9Cw0YUg0LvQuNC90LjQuC5cbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHBvaW50XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjbGFtcFRvTGluZVxuICAgICAqIEBwYXJhbSB7P3ZlYzN9IG9wdGlvbmFsVGFyZ2V0INCV0YHQu9C4INGD0LrQsNC30LDRgtGMINC/0LDRgNCw0LzQtdGC0YAsINGC0L4g0YDQtdC30YPQu9GM0YLQsNGCINCx0YPQtNC10YIg0LfQsNC/0LjRgdCw0L0g0LIg0L3QtdCz0L5cbiAgICAgKiBAcmV0dXJucyB7dmVjM31cbiAgICAgKi9cbiAgICBjbG9zZXN0UG9pbnRUb1BvaW50KHBvaW50LCBjbGFtcFRvTGluZSwgb3B0aW9uYWxUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuY2xvc2VzdFBvaW50VG9Qb2ludFBhcmFtZXRlcihwb2ludCwgY2xhbXBUb0xpbmUpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICByZXN1bHQgPSB0aGlzLmRlbHRhKHJlc3VsdCk7XG4gICAgICAgIHZlYzMuc2NhbGUocmVzdWx0LCByZXN1bHQsIHQpO1xuICAgICAgICB2ZWMzLmFkZChyZXN1bHQsIHJlc3VsdCwgdGhpcy5zdGFydCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YLQsNC10YIg0LLQtdC60YLQvtGAINC90LDRh9Cw0LvQsCDQu9C40L3QuNC4INC40Lcg0LrQvtC90YbQsFxuICAgICAqIEBwYXJhbSB7P3ZlYzN9IG9wdGlvbmFsVGFyZ2V0INCV0YHQu9C4INGD0LrQsNC30LDRgtGMINC/0LDRgNCw0LzQtdGC0YAsINGC0L4g0YDQtdC30YPQu9GM0YLQsNGCINCx0YPQtNC10YIg0LfQsNC/0LjRgdCw0L0g0LIg0L3QtdCz0L5cbiAgICAgKiBAcmV0dXJucyB7dmVjM31cbiAgICAgKi9cbiAgICBkZWx0YShvcHRpb25hbFRhcmdldCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBvcHRpb25hbFRhcmdldCB8fCB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICB2ZWMzLnN1YihyZXN1bHQsIHRoaXMuZW5kLCB0aGlzLnN0YXJ0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmUzO1xuIl19