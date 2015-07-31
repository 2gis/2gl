import {vec3} from 'gl-matrix';

export default class Ray {
    constructor(origin, direction) {
        this.origin = origin || vec3.create();
        this.direction = direction || vec3.create();
    }

    at(t) {
        let result = vec3.create();
        vec3.scaleAndAdd(result, this.direction, this.origin, vec3.fromValues(t, t, t));
        return result;
    }

    intersectBox(box) {
        // from https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js

        let tmin, tmax, tymin, tymax, tzmin, tzmax;

        let invdirx = 1 / this.direction[0],
            invdiry = 1 / this.direction[1],
            invdirz = 1 / this.direction[2];

        let origin = this.origin;

        if (invdirx >= 0) {
            tmin = (box.min[0] - origin[0]) * invdirx;
            tmax = (box.max[0] - origin[0]) * invdirx;
        } else {
            tmin = (box.max[0] - origin[0]) * invdirx;
            tmax = (box.min[0] - origin[0]) * invdirx;
        }

        if ( invdiry >= 0 ) {
            tymin = (box.min[1] - origin[1]) * invdiry;
            tymax = (box.max[1] - origin[1]) * invdiry;
        } else {
            tymin = (box.max[1] - origin[1]) * invdiry;
            tymax = (box.min[1] - origin[1]) * invdiry;
        }

        if ((tmin > tymax) || (tymin > tmax)) { return null; }

        // These lines also handle the case where tmin or tmax is NaN
        // (result of 0 * Infinity). x !== x returns true if x is NaN
        if (tymin > tmin || tmin !== tmin) { tmin = tymin; }

        if (tymax < tmax || tmax !== tmax) { tmax = tymax; }

        if (invdirz >= 0) {
            tzmin = (box.min[2] - origin[2]) * invdirz;
            tzmax = (box.max[2] - origin[2]) * invdirz;
        } else {
            tzmin = (box.max[2] - origin[2]) * invdirz;
            tzmax = (box.min[2] - origin[2]) * invdirz;
        }

        if ((tmin > tzmax) || (tzmin > tmax)) { return null; }

        if (tzmin > tmin || tmin !== tmin) { tmin = tzmin; }

        if (tzmax < tmax || tmax !== tmax) { tmax = tzmax; }

        //return point closest to the ray (positive side)
        if (tmax < 0) { return null; }

        return this.at(tmin >= 0 ? tmin : tmax);

    }
}
