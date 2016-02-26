import {vec3} from 'gl-matrix';

/**
 * Задаёт плоскость в трёхмерном пространстве
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Plane.js)
 */
class Plane {
    /**
     * @param {vec3} normal Нормаль к плоскости
     * @param {Number} [constant=0] Отрицательное смещение плоскости вдоль нормали
     */
    constructor(normal, constant) {
        this.normal = normal || vec3.create();
        this.constant = constant || 0;
    }

    /**
     * Ищет минимальное расстояние между точкой и плоскостью
     * @param {vec3} point
     * @returns {Number}
     */
    distanceToPoint(point) {
        return vec3.dot(this.normal, point) + this.constant;
    }

    /**
     * Устанавливает значения нормали и смешение плоскости
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} w
     */
    setComponents(x, y, z, w) {
        vec3.set(this.normal, x, y, z);
        this.constant = w;
        return this;
    }
}

export default Plane;
