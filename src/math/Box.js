import {vec3} from 'gl-matrix';

/**
 * Объект параллелепипеда
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Box3.js)
 */
class Box {
    /**
     * Параллелепипед задаётся двумя точками
     * @param {vec3} min Минимальная
     * @param {vec3} max Максимальная
     */
    constructor(min, max) {
        this.min = min || vec3.create();
        this.max = max || vec3.create();
    }

    /**
     * Проверяет содержит ли параллелепипед заданную точку
     * @param {vec3} point
     * @returns {Boolean}
     */
    containsPoint(point) {
        return point[0] > this.min[0] && point[0] < this.max[0] &&
            point[1] > this.min[1] && point[1] < this.max[1] &&
            point[2] > this.min[2] && point[2] < this.max[2];
    }

    /**
     * Расширяет параллелепипед до заданной точки
     * @param {vec3} point
     */
    expandByPoint(point) {
        vec3.min(this.min, this.min, point);
        vec3.max(this.max, this.max, point);

        return this;
    }
}

export default Box;
