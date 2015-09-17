import assert from 'assert';
import {slice, round} from './utils';
import {vec3, mat4} from 'gl-matrix';
import Box from '../src/math/Box';
import Plane from '../src/math/Plane';

import Ray from '../src/math/Ray';

describe('Ray', () => {
    let ray, origin, direction;

    beforeEach(() => {
        origin = vec3.fromValues(0, 0, 0);
        direction = vec3.fromValues(1, 0, 0);
        ray = new Ray(origin, direction);
    });

    afterEach(() => {
        ray = origin = direction = null;
    });

    describe('#constructor', () => {
        it('should have same origin field', () => {
            assert.deepEqual(slice(origin), slice(ray.origin));
        });

        it('should have same direction field', () => {
            assert.deepEqual(slice(direction), slice(ray.direction));
        });
    });

    describe('#clone', () => {
        let clone;

        beforeEach(() => {
            clone = ray.clone();
        });

        afterEach(() => {
            clone = null;
        });

        it('should be Ray', () => {
            assert.ok(clone instanceof Ray);
        });

        it('should have same origin field', () => {
            assert.deepEqual(slice(clone.origin), slice(ray.origin));
        });

        it('should have same direction field', () => {
            assert.deepEqual(slice(clone.direction), slice(ray.direction));
        });
    });

    describe('#at', () => {
        it('should return right point', () => {
            assert.deepEqual(slice(ray.at(5)), [5, 0, 0]);
        });
    });

    describe('#intersectBox', () => {
        it('should intersect', () => {
            let box = new Box([2, -2, -2], [4, 2, 2]);

            assert.deepEqual(slice(ray.intersectBox(box)), [2, 0, 0]);
        });

        it('shouldn\'t intersect', () => {
            let box = new Box([2, -2, 1], [4, 2, 2]);

            assert.equal(slice(ray.intersectBox(box)), null);
        });

        it('shouldn\'t intersect behind box', () => {
            let box = new Box([-4, -2, -2], [-2, 2, 2]);

            assert.equal(slice(ray.intersectBox(box)), null);
        });
    });

    describe('#applyMatrix4', () => {
        it('should change direction', () => {
            let matrix = mat4.create();
            mat4.rotateZ(matrix, matrix, Math.PI);
            ray.applyMatrix4(matrix);

            assert.deepEqual(slice(ray.direction).map(c => round(c)), [-1, 0, 0]);
        });
    });

    describe('#distanceToPlane', () => {
        it('should return 0', () => {
            let plane = new Plane([1, 0, 0]);
            assert.equal(ray.distanceToPlane(plane), 0);
        });

        it('should return null if ray don\'t intersect plane', () => {
            let plane = new Plane([0, 1, 0], -0.5);
            assert.equal(ray.distanceToPlane(plane), null);
        });
    });

    describe('#intersectTriangle', () => {
        it('should intersect triangle', () => {
            let triangle = [[2, 1, -1], [2, -1, -1], [2, 0, 1]];
            assert.deepEqual(slice(ray.intersectTriangle(triangle)), [2, 0, 0]);
        });

        it('shouldn\'t intersect behind triangle', () => {
            let triangle = [[-2, 1, -1], [-2, -1, -1], [-2, 0, 1]];
            assert.equal(slice(ray.intersectTriangle(triangle)), null);
        });

        it('shouldn\'t intersect triangle on backface', () => {
            let triangle = [[2, 1, -1], [2, 0, 1], [2, -1, -1]];
            assert.equal(slice(ray.intersectTriangle(triangle, true)), null);
        });

        it('shouldn\'t intersect triangle', () => {
            let triangle = [[2, 1, -5], [2, 0, -3], [2, -1, -5]];
            assert.equal(slice(ray.intersectTriangle(triangle)), null);
        });
    });

    describe('#intersectPlane', () => {
        it('should intersect', () => {
            let plane = new Plane([1, 0, 0], -3);
            assert.deepEqual(slice(ray.intersectPlane(plane)), [3, 0, 0]);
        });

        it('shouldn\'t intersect', () => {
            let plane = new Plane([0, 1, 0], -0.5);
            assert.equal(slice(ray.intersectPlane(plane)), null);
        });
    });
});
