import {mat4} from 'gl-matrix';
import Camera from './Camera';

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

        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.near = near;
        this.far = far;
    }

    updateProjectionMatrix() {
        mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);
    }
}

export default OrthographicCamera;
