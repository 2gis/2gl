import {vec3, mat4, quat} from 'gl-matrix';

export default class Object3D {
    constructor() {
        this.childs = [];
        this.parent = null;
        this.opacity = 1;

        this.scale = vec3.fromValues(1, 1, 1);
        this.position = vec3.create();
        this.quaternion = quat.create();
        this.localMatrix = mat4.create();
        this.worldMatrix = mat4.create();
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

    raycast() {}

    render(gl, scene, camera, renderTransparent) {
        this.childs.forEach(object => object.render(gl, scene, camera, renderTransparent));
    }

    updateLocalMatrix() {
        mat4.fromRotationTranslationScale(this.localMatrix, this.quaternion, this.position, this.scale);
    }

    updateWorldMatrix() {
        if (this.parent) {
            mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        } else {
            mat4.copy(this.worldMatrix, this.localMatrix);
        }

        this.childs.forEach(child => child.updateWorldMatrix());
    }
}
