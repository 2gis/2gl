import {mat4} from 'gl-matrix';
import Camera from './Camera';
import {degToRad} from '../math/Math';

export default class PerspectiveCamera extends Camera {
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
