import {vec3, mat4} from 'gl-matrix';

export default class Camera {
    constructor() {
        this.position = vec3.create();
        this.matrix = mat4.create();
    }

    updateMatrix() {
        mat4.perspective(this.matrix, 45, window.innerWidth / window.innerHeight, 10, 100000);
        mat4.translate(this.matrix, this.matrix, this.position);
        mat4.rotateX(this.matrix, this.matrix, -0.2);
    }
}
