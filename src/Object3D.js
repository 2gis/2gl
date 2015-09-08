import {vec3, mat4, quat} from 'gl-matrix';

export default class Object3D {
    constructor() {
        this.children = [];
        this.parent = null;
        this.opacity = 1;
        this.visible = true;

        this.scale = vec3.fromValues(1, 1, 1);
        this.position = vec3.create();
        this.quaternion = quat.create();
        this.localMatrix = mat4.create();
        this.worldMatrix = mat4.create();

        this.worldMatrixNeedsUpdate = false;
    }

    add(object) {
        if (object.parent) {
            object.parent.remove(object);
        }

        object.parent = this;
        this.children.push(object);

        return this;
    }

    remove(object) {
        let index = this.children.indexOf(object);

        if (index != -1) {
            object.parent = null;
            this.children.splice(index, 1);
        }

        return this;
    }

    raycast() {}

    render(state) {
        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        this.children.forEach(object => object.render(state));
    }

    updateLocalMatrix() {
        mat4.fromRotationTranslationScale(this.localMatrix, this.quaternion, this.position, this.scale);

        this.worldMatrixNeedsUpdate = true;
    }

    updateWorldMatrix() {
        if (this.parent) {
            mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        } else {
            mat4.copy(this.worldMatrix, this.localMatrix);
        }

        this.children.forEach(child => child.updateWorldMatrix());

        this.worldMatrixNeedsUpdate = false;
    }
}
