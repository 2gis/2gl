import Object3D from './Object3D';
import {vec3, mat4} from 'gl-matrix';

export default class Camera extends Object3D {
    constructor() {
        super();

        this.projectionMatrix = mat4.create();
        this.worldInverseMatrix = mat4.create();

        this.updateProjectionMatrix();
    }

    updateProjectionMatrix() {
        mat4.perspective(this.projectionMatrix, 45, window.innerWidth / window.innerHeight, 10, 100000);
    }

    updateWorldMatrix() {
        super.updateWorldMatrix();

        mat4.invert(this.worldInverseMatrix, this.worldMatrix);
        mat4.multiply(this.worldInverseMatrix, this.projectionMatrix, this.worldInverseMatrix);
    }

    project(vector) {
        let matrix = mat4.create();
        let inverseMatrix = mat4.create();
        let result = vec3.create();

        mat4.invert(inverseMatrix, this.worldMatrix);
        mat4.mul(matrix, this.projectionMatrix, inverseMatrix);
        vec3.transformMat4(result, vector, matrix);

        return result;
    }

    unproject(vector) {
        let matrix = mat4.create();
        let inverseMatrix = mat4.create();
        let result = vec3.create();

        mat4.invert(inverseMatrix, this.projectionMatrix);
        mat4.mul(matrix, this.worldMatrix, inverseMatrix);
        vec3.transformMat4(result, vector, matrix);

        return result;
    }
}
