import assert from 'assert';
import {slice, flatten} from './utils';

import GeometryBuffer from '../src/GeometryBuffer';

describe('GeometryBuffer', () => {
    let squareVertices, buffer;

    beforeEach(() => {
        squareVertices = [
            -1, 0, -1,
            1, 0, -1,
            -1, 0, 1,
            1, 0, 1,
            -1, 0, 1,
            1, 0, -1
        ];

        buffer = new GeometryBuffer(new Float32Array(squareVertices));
    });

    afterEach(() => {
        squareVertices = buffer = null;
    });

    describe('#getArray', () => {
        it('should return same squareVertices', () => {
            assert.deepEqual(squareVertices, slice(buffer.getArray()));
        });
    });

    describe('#getElement', () => {
        it('should return second element', () => {
            const element = squareVertices.slice(3, 6);
            assert.deepEqual(element, slice(buffer.getElement(1)));
        });
    });

    describe('#getTriangle', () => {
        it('should return second triangle', () => {
            const triangle = squareVertices.slice(9, 18);
            assert.deepEqual(triangle, flatten(buffer.getTriangle(1)));
        });
    });

    describe('#concat', () => {
        it('should concat buffer', () => {
            const anotherVertexBuffer = new GeometryBuffer([9, 9, 9]);

            buffer.concat(anotherVertexBuffer);

            assert.equal(buffer.getArray().length, 21);
        });
    });
});
