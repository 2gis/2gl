import * as mat4 from '@2gis/gl-matrix/mat4';
import Camera from './Camera';
import {ORTHOGRAPHIC_CAMERA} from '../libConstants';

/**
 * Задаёт орфографическую камеру
 *
 * @extends Camera
 */
class OrthographicCamera extends Camera {
    /**
     * @param {Number} left Левая плоскость камеры
     * @param {Number} right Правая плоскость камеры
     * @param {Number} top Верхняя плоскость камеры
     * @param {Number} bottom Нижняя плоскость камеры
     * @param {Number} near Минимальное расстояние от камеры до объектов, которые будут отображаться
     * @param {Number} far Максимальное расстояние от камеры до объектов, которые будут отображаться
     */
    constructor(left, right, top, bottom, near, far) {
        super();

        /**
         * Левая плоскость камеры
         * @type {Number}
         */
        this.left = left;

        /**
         * Правая плоскость камеры
         * @type {Number}
         */
        this.right = right;

        /**
         * Верхняя плоскость камеры
         * @type {Number}
         */
        this.top = top;

        /**
         * Нижняя плоскость камеры
         * @type {Number}
         */
        this.bottom = bottom;

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
        this.type = ORTHOGRAPHIC_CAMERA;
    }

    updateProjectionMatrix() {
        mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);
    }
}

export default OrthographicCamera;
