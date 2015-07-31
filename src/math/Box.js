import {vec3} from 'gl-matrix';

export default class Box {
    constructor(min, max) {
        this.min = min || vec3.create();
        this.max = max || vec3.create();
    }

    containsPoint(point) {
        return point[0] > this.min[0] && point[0] < this.max[0] &&
            point[1] > this.min[1] && point[1] < this.max[1] &&
            point[2] > this.min[2] && point[2] < this.max[2];
    }

    expandByPoint(point) {
        vec3.min(this.min, this.min, point);
        vec3.max(this.max, this.max, point);

        return this;

    }
}
