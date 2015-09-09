import Object3D from '../Object3D';
import {vec3, mat3, mat4, quat} from 'gl-matrix';

export default class Camera extends Object3D {
    constructor() {
        super();

        this.up = vec3.fromValues(0, 1, 0);
        this.projectionMatrix = mat4.create();
        this.projectionInverseMatrix = mat4.create();
        this.worldInverseMatrix = mat4.create();
    }

    updateProjectionMatrix() {}

    updateWorldMatrix() {
        super.updateWorldMatrix();

        mat4.invert(this.worldInverseMatrix, this.worldMatrix);
        mat4.multiply(this.projectionInverseMatrix, this.projectionMatrix, this.worldInverseMatrix);
    }

    project(vector) {
        let result = vec3.create();
        vec3.transformMat4(result, vector, this.projectionInverseMatrix);
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

    lookAt(vector) {
        let matrix4 = mat4.create();
        let matrix3 = mat3.create();
        mat4.lookAt(matrix4, this.position, vector, this.up);
        mat4.transpose(matrix4, matrix4);
        mat3.fromMat4(matrix3, matrix4);
        quat.fromMat3(this.quaternion, matrix3);

        return this;
    }
}
