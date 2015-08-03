import {vec3, mat4, quat} from 'gl-matrix';
import Ray from './math/Ray';

export default class Raycaster {
    constructor(origin, direction, near, far) {
        this.precision = 0.0001;
        this.ray = new Ray(origin, direction);
        this.near = near || 0;
        this.far = far || Infinity;
    }

    setFromCamera(coords, camera) {
        // TODO: camera may be orphographic

        this.ray.origin = vec3.clone(camera.position);

        let direction = vec3.fromValues(coords[0], coords[1], 0.5);
        direction = camera.unproject(direction);
        vec3.sub(direction, direction, camera.position);
        vec3.normalize(direction, direction);
        this.ray.direction = direction;
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
            let childs = object.childs;

            for (let i = 0; i < childs.length; i++) {
                this._intersectObject(childs[i], intersects, true);
            }
        }
    }
}
