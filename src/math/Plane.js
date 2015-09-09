import {vec3} from 'gl-matrix';

/**
 * Задаёт плоскость в трёхмерном пространстве
 */
class Plane {
    /**
     * @param {vec3} normal Нормаль к плоскости
     * @param {Number} [constant=0] Смещение плоскости вдоль нормали
     */
    constructor(normal, constant) {
        this.normal = normal || vec3.create();
        this.constant = constant || 0;
    }

    /**
     * Ищёт минимальное расстояние между точкой и плоскостью
     * @param {vec3} point
     * @returns {Number}
     */
    distanceToPoint(point) {
        return vec3.dot(this.normal, point) + this.constant;
    }
}

export default Plane;
