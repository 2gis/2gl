import {vec3} from 'gl-matrix';
import math from './Math.js';

export default class Line3 {
    constructor(start, end) {
        this.start = start || vec3.create();
        this.end = end || vec3.create();
    }

    closestPointToPointParameter(point, clampToLine) {
        let startP = vec3.create();
        let startEnd = vec3.create();

        vec3.sub(startP, point, this.start);
        vec3.sub(startEnd, this.end, this.start);

        let startEnd2 = vec3.dot(startEnd, startEnd);
        let startEnd_startP = vec3.dot(startEnd, startP);

        let t = startEnd_startP / startEnd2;

        if (clampToLine) {
            t = math.clamp(t, 0, 1);
        }

        return t;
    }

    closestPointToPoint(point, clampToLine, optionalTarget) {
        let t = this.closestPointToPointParameter(point, clampToLine);

        let result = optionalTarget || vec3.create();
        result = this.delta(result);
        vec3.scale(result, t);
        vec3.add(result, this.start);

        return result;

    }

    delta(optionalTarget) {
        let result = optionalTarget || vec3.create();
        vec3.sub(result, this.end, this.start);
        return result;
    }
}
