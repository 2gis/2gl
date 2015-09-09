import {vec3, mat4, quat} from 'gl-matrix';

export default class Object3D {
    constructor() {
        this.children = [];
        this.parent = null;
        this.visible = true;
        this.renderOrder = 0;

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

    raycast() {
        return this;
    }

    render() {
        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        return this;
    }

    updateLocalMatrix() {
        mat4.fromRotationTranslationScale(this.localMatrix, this.quaternion, this.position, this.scale);

        this.worldMatrixNeedsUpdate = true;

        return this;
    }

    updateWorldMatrix() {
        if (this.parent) {
            mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        } else {
            mat4.copy(this.worldMatrix, this.localMatrix);
        }

        this.children.forEach(child => child.updateWorldMatrix());

        this.worldMatrixNeedsUpdate = false;

        return this;
    }

    getWorldPosition() {
        let result = vec3.create();
        vec3.transformMat4(result, this.position, this.worldMatrix);
        return result;
    }

    traverse(callback) {
        callback(this);

        this.children.forEach(child => child.traverse(callback));

        return this;
    }

    traverseVisible(callback) {
        if (!this.visible) { return this; }

        callback(this);

        this.children.forEach(child => child.traverseVisible(callback));

        return this;
    }

    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        typedObjects.common.push(this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}
