"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clamp = clamp;
exports.degToRad = degToRad;
/**
 * @namespace Math
 */

/**
 * Возвращает переданное значение, если оно попадает в переданные границы,
 * или ближайшую из границ.
 *
 * @memberof Math
 * @name clamp
 * @function
 *
 * @param {Number} x Значение
 * @param {Number} a Минимальное значение
 * @param {Number} b Максимальное значение
 * @returns {Number}
 */
function clamp(x, a, b) {
    if (x < a) {
        return a;
    }

    if (x > b) {
        return b;
    }

    return x;
}

/**
 * Переводит градусы в радианы
 *
 * @memberof Math
 * @name degToRad
 * @function
 *
 * @param {Number} degrees
 * @returns {Number}
 */
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL01hdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFpQmdCO1FBc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF0QlQsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QjtBQUMzQixRQUFJLElBQUksQ0FBSixFQUFPO0FBQ1AsZUFBTyxDQUFQLENBRE87S0FBWDs7QUFJQSxRQUFJLElBQUksQ0FBSixFQUFPO0FBQ1AsZUFBTyxDQUFQLENBRE87S0FBWDs7QUFJQSxXQUFPLENBQVAsQ0FUMkI7Q0FBeEI7Ozs7Ozs7Ozs7OztBQXNCQSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkI7QUFDOUIsV0FBTyxVQUFVLEtBQUssRUFBTCxHQUFVLEdBQXBCLENBRHVCO0NBQTNCIiwiZmlsZSI6Ik1hdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBuYW1lc3BhY2UgTWF0aFxuICovXG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0L/QtdGA0LXQtNCw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwg0LXRgdC70Lgg0L7QvdC+INC/0L7Qv9Cw0LTQsNC10YIg0LIg0L/QtdGA0LXQtNCw0L3QvdGL0LUg0LPRgNCw0L3QuNGG0YssXG4gKiDQuNC70Lgg0LHQu9C40LbQsNC50YjRg9GOINC40Lcg0LPRgNCw0L3QuNGGLlxuICpcbiAqIEBtZW1iZXJvZiBNYXRoXG4gKiBAbmFtZSBjbGFtcFxuICogQGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHgg0JfQvdCw0YfQtdC90LjQtVxuICogQHBhcmFtIHtOdW1iZXJ9IGEg0JzQuNC90LjQvNCw0LvRjNC90L7QtSDQt9C90LDRh9C10L3QuNC1XG4gKiBAcGFyYW0ge051bWJlcn0gYiDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHgsIGEsIGIpIHtcbiAgICBpZiAoeCA8IGEpIHtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgaWYgKHggPiBiKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIHJldHVybiB4O1xufVxuXG4vKipcbiAqINCf0LXRgNC10LLQvtC00LjRgiDQs9GA0LDQtNGD0YHRiyDQsiDRgNCw0LTQuNCw0L3Ri1xuICpcbiAqIEBtZW1iZXJvZiBNYXRoXG4gKiBAbmFtZSBkZWdUb1JhZFxuICogQGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlZ3JlZXNcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWdUb1JhZChkZWdyZWVzKSB7XG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwO1xufVxuIl19