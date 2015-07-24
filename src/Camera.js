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

    updateMatrix() {
        super.updateMatrix();

        mat4.multiply(this.matrix, this.projectionMatrix, this.matrix);
    }
}
