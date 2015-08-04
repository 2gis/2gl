import {vec3} from 'gl-matrix';
import Buffer from './Buffer';
import Box from './math/Box';

export default class Geometry {
    constructor() {
        this.buffers = {};
        this._boundingBox = null;
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

        for (let i = 0; i < positionBuffer.length; i += 3) {
            let triangle = positionBuffer.getTriangle(i);

            vec3.sub(ab, triangle[0], triangle[1]);
            vec3.sub(cb, triangle[2], triangle[1]);
            vec3.cross(n, ab, cb);
            vec3.normalize(n, n);

            n = Array.prototype.slice.call(n);
            normals = normals.concat(n, n, n);
        }

        this.setBuffer('normal', new Buffer(new Float32Array(normals), 3));
    }

    getBoundingBox() {
        if (!this._boundingBox) {
            this.computeBoundingBox();
        }

        return this._boundingBox;
    }

    computeBoundingBox() {
        let boundingBox = this._boundingBox = new Box();
        let positionBuffer = this.buffers.position;

        if (positionBuffer) {
            for (let i = 0; i < positionBuffer.length; i++) {
                boundingBox.expandByPoint(positionBuffer.getElement(i));
            }
        }
    }
}
