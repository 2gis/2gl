import * as mat4 from '@2gis/gl-matrix/mat4';
import Camera from './Camera';
import {degToRad} from '../math/Math';
import {PERSPECTIVE_CAMERA} from '../libConstants';

/**
 * Задаёт перспективную камеру
 *
 * @extends Camera
 */
class PerspectiveCamera extends Camera {
    /**
     * @param {Number} fov Угл обзора камеры в градусах
     * @param {Number} aspect Соотношение сторон
     * @param {Number} near Минимальное расстояние от камеры до объектов, которые будут отображаться
     * @param {Number} far Максимальное расстояние от камеры до объектов, которые будут отображаться
     */
    constructor(fov, aspect, near, far) {
        super();

        /**
         * Угл обзора камеры в градусах
         * @type {Number}
         */
        this.fov = fov;

        /**
         * Соотношение сторон
         * @type {Number}
         */
        this.aspect = aspect;

        /**
         * Минимальное расстояние от камеры до объектов, которые будут отображаться
         * @type {Number}
         */
        this.near = near;

        /**
         * Максимальное расстояние от камеры до объектов, которые будут отображаться
         * @type {Number}
         */
        this.far = far;

        /**
         * Используется для обозначения типа камеры
         * @type {Number}
         */
        this.type = PERSPECTIVE_CAMERA;
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, degToRad(this.fov), this.aspect, this.near, this.far);
    }
}

export default PerspectiveCamera;
