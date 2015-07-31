import {vec3, mat4, quat} from 'gl-matrix';
import Ray from './math/Ray';

export default class Raycaster {
    constructor(origin, direction, near, far) {
        this.precision = 0.0001;
        this.ray = new Ray(origin, direction);
        this.near = near || 0;
        this.far = far || Infinity;
    }

    setFromCamera() {

    }

    intersectObject(object, recursive) {
        var intersects = [];

        this._intersectObject(object, intersects, recursive);

        intersects.sort(this._descSort);

        return intersects;
    }

    intersectObjects(objects, recursive) {
        let intersects = [];

        for (let i = 0; i < objects.length; i++) {
            this._intersectObject(objects[i], intersects, recursive );
        }

        intersects.sort(this._descSort);

        return intersects;
    }

    _descSort(a, b) {
        return a.distance - b.distance;
    }

    _intersectObject(object, intersects, recursive) {
        object.raycast(this, intersects);

        if (recursive) {
            let children = object.children;

            for (let i = 0; i < children.length; i++) {
                this._intersectObject(children[i], intersects, true);
            }
        }
    }
}
