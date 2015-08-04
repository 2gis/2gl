import {vec3} from 'gl-matrix';

export default class Plane {
    constructor(normal, constant) {
        this.normal = normal || vec3.create();
        this.constant = constant || 0;
    }

    distanceToPoint(point) {
        return vec3.dot(this.normal, point) + this.constant;
    }
}
