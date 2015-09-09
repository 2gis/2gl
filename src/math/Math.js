/**
 * @namespace Math
 */

/**
 * Возвращает переданное значение, если оно поподает в переданные границы,
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
export function clamp(x, a, b) {
    return (x < a) ? a : ((x > b) ? b : x);
}

export function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
