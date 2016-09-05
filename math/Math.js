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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRoL01hdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFpQmdCLEssR0FBQSxLO1FBc0JBLFEsR0FBQSxRO0FBdkNoQjs7OztBQUlBOzs7Ozs7Ozs7Ozs7O0FBYU8sU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QjtBQUMzQixRQUFJLElBQUksQ0FBUixFQUFXO0FBQ1AsZUFBTyxDQUFQO0FBQ0g7O0FBRUQsUUFBSSxJQUFJLENBQVIsRUFBVztBQUNQLGVBQU8sQ0FBUDtBQUNIOztBQUVELFdBQU8sQ0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBVU8sU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCO0FBQzlCLFdBQU8sVUFBVSxLQUFLLEVBQWYsR0FBb0IsR0FBM0I7QUFDSCIsImZpbGUiOiJNYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbmFtZXNwYWNlIE1hdGhcbiAqL1xuXG4vKipcbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0LXRgNC10LTQsNC90L3QvtC1INC30L3QsNGH0LXQvdC40LUsINC10YHQu9C4INC+0L3QviDQv9C+0L/QsNC00LDQtdGCINCyINC/0LXRgNC10LTQsNC90L3Ri9C1INCz0YDQsNC90LjRhtGLLFxuICog0LjQu9C4INCx0LvQuNC20LDQudGI0YPRjiDQuNC3INCz0YDQsNC90LjRhi5cbiAqXG4gKiBAbWVtYmVyb2YgTWF0aFxuICogQG5hbWUgY2xhbXBcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4INCX0L3QsNGH0LXQvdC40LVcbiAqIEBwYXJhbSB7TnVtYmVyfSBhINCc0LjQvdC40LzQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxuICogQHBhcmFtIHtOdW1iZXJ9IGIg0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC30L3QsNGH0LXQvdC40LVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh4LCBhLCBiKSB7XG4gICAgaWYgKHggPCBhKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cblxuICAgIGlmICh4ID4gYikge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn1cblxuLyoqXG4gKiDQn9C10YDQtdCy0L7QtNC40YIg0LPRgNCw0LTRg9GB0Ysg0LIg0YDQsNC00LjQsNC90YtcbiAqXG4gKiBAbWVtYmVyb2YgTWF0aFxuICogQG5hbWUgZGVnVG9SYWRcbiAqIEBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWdyZWVzXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVnVG9SYWQoZGVncmVlcykge1xuICAgIHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbn1cbiJdfQ==