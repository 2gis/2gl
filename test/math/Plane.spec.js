import * as vec3 from '@2gis/gl-matrix/vec3';
import assert from 'assert';
import {slice} from '../utils';

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

    describe('#setComponents', () => {
        let newNormal, newConstant;

        before(() => {
            newNormal = new Float64Array([0, 1, 2]);
            newConstant = 15;
        });

        after(() => {
            newNormal = newConstant = null;
        });

        it('should return self', () => {
            assert.equal(plane.setComponents(...newNormal, newConstant), plane);
        });

        it('should change planes\'s normal', () => {
            plane.setComponents(...newNormal, newConstant);
            assert.deepEqual(plane.normal, newNormal);
        });

        it('should change plane\'s constant', () => {
            plane.setComponents(...newNormal, newConstant);
            assert.equal(plane.constant, newConstant);
        });
    });

    describe('#normalize', () => {
        let plane;

        beforeEach(() => {
            const normal = vec3.fromValues(5, 0, 0);
            plane = new Plane(normal, 20);
        });

        it('should change constant right', () => {
            assert.equal(plane.constant, 20);
            plane.normalize();
            assert.equal(plane.constant, 4);
        });

        it('should change normal right', () => {
            assert.deepEqual(plane.normal, new Float64Array([5, 0, 0]));
            plane.normalize();
            assert.deepEqual(plane.normal, new Float64Array([1, 0, 0]));
        });
    });
});
