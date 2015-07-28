import {vec3} from 'gl-matrix';
import Buffer from './Buffer';

export default class Geometry {
    constructor() {
        this.buffers = {};
    }

    setBuffer(name, attribute) {
        this.buffers[name] = attribute;

        return this;
    }

    getBuffer(name) {
        return this.buffers[name];
    }

    computeNormals() {
        let positionBuffer = this.buffers.position;
        let normals = [];

        let ab = vec3.create();
        let cb = vec3.create();
        let n = vec3.create();

        for (let i = 0; i < positionBuffer.length / 3; i++) {
/*            let a = positionBuffer.getElement(i * 3);
            let b = positionBuffer.getElement(i * 3 + 1);
            let c = positionBuffer.getElement(i * 3 + 2);

            vec3.sub(ab, a, b);
            vec3.sub(cb, c ,b);
            vec3.cross(n, ab, cb);
            vec3.normalize(n, n);*/

            n = [0, 0, 1];
            normals = normals.concat(Array.prototype.slice.call(n));
            normals = normals.concat(Array.prototype.slice.call(n));
            normals = normals.concat(Array.prototype.slice.call(n));
        }

        this.setBuffer('normal', new Buffer(new Float32Array(normals), 3));

    }
}
