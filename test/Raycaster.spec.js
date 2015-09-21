import assert from 'assert';
import {slice} from './utils';
import {vec3} from 'gl-matrix';
import Ray from '../src/math/Ray';

import Raycaster from '../src/Raycaster';

describe('Raycaster', () => {
    let raycaster, origin, direction,
        object1, object1Intersect,
        object2, object2Intersect1, object2Intersect2,
        object3, object3Intersect;

    beforeEach(() => {
        origin = vec3.fromValues(0, 0, 0);
        direction = vec3.fromValues(1, 0, 0);
        raycaster = new Raycaster(origin, direction);

        object1 = {
            children: []
        };
        object1Intersect = {
            distance: 5,
            point: vec3.fromValues(5, 0, 0),
            object: object1
        };
        object1.raycast = (_, intersects) => {
            intersects.push(object1Intersect);
        };

        object2 = {
            children: []
        };
        object2Intersect1 = {
            distance: 10,
            point: vec3.fromValues(10, 0, 0),
            object: object2
        };
        object2Intersect2 = {
            distance: 15,
            point: vec3.fromValues(15, 0, 0),
            object: object2
        };
        object2.raycast = (_, intersects) => {
            intersects.push(object2Intersect2, object2Intersect1);
        };

        object3 = {
            children: []
        };
        object3Intersect = {
            distance: 1,
            point: vec3.fromValues(1, 0, 0),
            object: object1
        };
        object3.raycast = (_, intersects) => {
            intersects.push(object3Intersect);
        };
    });

    describe('#constructor', () => {
        it('should have ray with same origin and direction', () => {
            assert.ok(raycaster.ray instanceof Ray);
            assert.deepEqual(slice(raycaster.ray.origin), slice(origin));
            assert.deepEqual(slice(raycaster.ray.direction), slice(direction));
        });

        it('should have near 0 by default', () => {
            assert.equal(raycaster.near, 0);
        });

        it('should have far Infinity by default', () => {
            assert.equal(raycaster.far, Infinity);
        });

        it('should have same near field', () => {
            raycaster = new Raycaster(origin, direction, 5);
            assert.equal(raycaster.near, 5);
        });

        it('should have same far field', () => {
            raycaster = new Raycaster(origin, direction, 0, 10);
            assert.equal(raycaster.far, 10);
        });
    });

    describe('#intersectObject', () => {
        it('should return object1', () => {
            let intersects = raycaster.intersectObject(object1);
            assert.equal(intersects.length, 1);
            assert.equal(intersects[0], object1Intersect);
        });

        it('should return sorted by distance intersects', () => {
            let intersects = raycaster.intersectObject(object2);
            assert.equal(intersects.length, 2);
            assert.equal(intersects[0], object2Intersect1);
            assert.equal(intersects[1], object2Intersect2);
        });
    });

    describe('#intersectObjects', () => {
        it('should return object1', () => {
            let intersects = raycaster.intersectObjects([object1]);
            assert.equal(intersects.length, 1);
            assert.equal(intersects[0], object1Intersect);
        });

        it('should return sorted by distance intersects', () => {
            let intersects = raycaster.intersectObjects([object1, object2, object3]);
            assert.equal(intersects.length, 4);
            assert.equal(intersects[0], object3Intersect);
            assert.equal(intersects[1], object1Intersect);
            assert.equal(intersects[2], object2Intersect1);
            assert.equal(intersects[3], object2Intersect2);
        });
    });
});
