import {mat4} from 'gl-matrix';
import Camera from './Camera';

export default class PerspectiveCamera extends Camera {
    constructor(fov, aspect, near, far) {
        super();

        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
    }
}
