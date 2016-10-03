import assert from 'assert';
import {slice, cubeVertices} from './utils';

import GeometryBuffer from '../src/GeometryBuffer';
import Box from '../src/math/Box';

import Geometry from '../src/Geometry';

describe('Geometry', () => {
    let geometry, buffer;

    beforeEach(() => {
        geometry = new Geometry();
        buffer = new GeometryBuffer(new Float32Array(cubeVertices));
    });

    describe('#constructor', () => {
        it('should have empty buffers', () => {
            assert.equal(Object.keys(geometry.buffers).length, 0);
        });
    });

    describe('#setBuffer', () => {
        it('should add to buffers', () => {
            geometry.setBuffer('position', buffer);
            assert.equal(geometry.buffers.position, buffer);
        });
    });

    describe('#getBuffer', () => {
        it('should return added buffer', () => {
            geometry.setBuffer('position', buffer);
            assert.equal(geometry.getBuffer('position'), buffer);
        });
    });

    describe('#computeNormals', () => {
        it('should compute triangle normal', () => {
            const triangle = [
                0, 1, 0,
                0, -1, 0,
                0, 0, 1
            ];

            const buffer = new GeometryBuffer(new Float32Array(triangle));

            geometry.setBuffer('position', buffer);
            geometry.computeNormals();

            const normals = slice(geometry.getBuffer('normal').getArray());

            assert.deepEqual(normals, [
                1, 0, 0,
                1, 0, 0,
                1, 0, 0
            ]);
        });

        it('shouldn\'t compute normal without position buffer', () => {
            geometry.computeNormals();

            assert.ok(!geometry.getBuffer('normal'));
        });
    });

    describe('#computeBoundingBox and #getBoundingBox', () => {
        it('should return unit box by default', () => {
            const defaultBox = new Box();
            assert.deepEqual(slice(geometry.getBoundingBox().min), slice(defaultBox.min));
            assert.deepEqual(slice(geometry.getBoundingBox().max), slice(defaultBox.max));
        });

        it('should compute box wrapped cube', () => {
            geometry.setBuffer('position', buffer);
            geometry.computeBoundingBox();

            assert.ok(geometry.getBoundingBox() instanceof Box);
            assert.deepEqual(slice(geometry.getBoundingBox().min), [-1, -1, -1]);
            assert.deepEqual(slice(geometry.getBoundingBox().max), [1, 1, 1]);
        });

        it('should default compute box', () => {
            geometry.computeBoundingBox();

            const defaultBox = new Box();

            assert.deepEqual(slice(geometry.getBoundingBox().min), slice(defaultBox.min));
            assert.deepEqual(slice(geometry.getBoundingBox().max), slice(defaultBox.max));
        });
    });

    describe('#concat', () => {
        it('should concat geometries', () => {
            geometry.setBuffer('position', buffer);

            const anotherGeometry = new Geometry();
            const triangleVertices = [
                0, 1, 0,
                0, -1, 0,
                0, 0, 1
            ];
            const anotherBuffer = new GeometryBuffer(new Float32Array(triangleVertices));
            anotherGeometry.setBuffer('position', anotherBuffer);

            geometry.concat(anotherGeometry);

            assert.deepEqual(
                slice(geometry.getBuffer('position').getArray()),
                slice([].concat(cubeVertices, triangleVertices))
            );
        });
    });
});
