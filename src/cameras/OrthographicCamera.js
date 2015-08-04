import {mat4} from 'gl-matrix';
import Camera from './Camera';

export default class OrthographicCamera extends Camera {
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
