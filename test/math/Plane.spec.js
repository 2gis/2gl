import assert from 'assert';
import {slice} from '../utils';
import {vec3} from 'gl-matrix';

import Plane from '../../src/math/Plane';

describe('Plane', () => {
    let plane, normal, constant;

    beforeEach(() => {
        normal = vec3.fromValues(1, 0, 0);
        constant = -5;
        plane = new Plane(normal, constant);
    });

    afterEach(() => {
        plane = normal = constant = null;
    });

    describe('#constructor', () => {
        it('should have same normal field', () => {
            assert.deepEqual(slice(normal), slice(plane.normal));
        });

        it('should have same constant field', () => {
            assert.equal(constant, plane.constant);
        });

        it('should init without second field', () => {
            plane = new Plane(normal);
            assert.deepEqual(slice(normal), slice(plane.normal));
            assert.equal(0, plane.constant);
        });

        it('should init without argruments', () => {
            plane = new Plane();
            assert.deepEqual(slice(plane.normal), [0, 0, 0]);
            assert.equal(0, plane.constant);
        });
    });

    describe('#distanceToPoint', () => {
        it('should return 0', () => {
            const distance = plane.distanceToPoint([5, 0, 0]);
            assert.equal(distance, 0);
        });

        it('should return 1', () => {
            const distance = plane.distanceToPoint([6, 1, 2]);
            assert.equal(distance, 1);
        });
    });
});
