import {vec3, mat4, quat} from 'gl-matrix';

export default class Object3D {
    constructor() {
        this.childs = [];
        this.parent = null;

        this.position = vec3.create();
        this.quaternion = quat.create();
        this.matrix = mat4.create();
    }

    add(object) {
        object.parent = this;
        this.childs.push(object);

        return this;
    }

    remove(object) {
        let index = this.childs.indexOf(object);

        if (index != -1) {
            object.parent = null;
            this.childs.splice(index, 1);
        }

        return this;
    }

    updateMatrix() {
        mat4.fromRotationTranslation(this.matrix, this.quaternion, this.position);
    }
}