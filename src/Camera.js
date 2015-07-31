import Object3D from './Object3D';
import {mat4} from 'gl-matrix';

export default class Camera extends Object3D {
    constructor() {
        super();

        this.projectionMatrix = mat4.create();

        this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, 45, window.innerWidth / window.innerHeight, 10, 100000);
    }

    updateLocalMatrix() {
        super.updateLocalMatrix();

        mat4.multiply(this.localMatrix, this.projectionMatrix, this.localMatrix);
    }
}
