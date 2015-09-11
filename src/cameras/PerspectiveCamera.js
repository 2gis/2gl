import {mat4} from 'gl-matrix';
import Camera from './Camera';
import {degToRad} from '../math/Math';

/**
 * Задаёт перспективную камеру
 *
 * @extends Camera
 */
class PerspectiveCamera extends Camera {
    /**
     * @param {Number} fov Угл обзора камеры, задаётся в градусах
     * @param {Number} aspect Соотношение сторон
     * @param {Number} near Минимальное расстояние от камеры до объектов, которые будут отображаться
     * @param {Number} far Максимальное расстояние от камеры до объектов, которые будут отображаться
     */
    constructor(fov, aspect, near, far) {
        super();

        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, degToRad(this.fov), this.aspect, this.near, this.far);
    }
}

export default PerspectiveCamera;
