import assert from 'assert';
import {slice} from '../utils';
import {vec3} from 'gl-matrix';

import Line3 from '../../src/math/Line3';

describe('Line3', () => {
    let line, start, end;

    beforeEach(() => {
        start = vec3.fromValues(0, 0, 0);
        end = vec3.fromValues(1, 0, 0);
        line = new Line3(start, end);
    });

    afterEach(() => {
        line = start = end = null;
    });

    describe('#constructor', () => {
        it('should have same start field', () => {
            assert.deepEqual(slice(start), slice(line.start));
        });

        it('should have same end field', () => {
            assert.deepEqual(slice(end), slice(line.end));
        });
    });

    describe('#closestPointToPoint', () => {
        it('should return closest point on line', () => {
            let point = line.closestPointToPoint([2, 1, 0]);
            assert.deepEqual(slice(point), [2, 0, 0]);
        });

        it('should return closest point on line segment', () => {
            let point = line.closestPointToPoint([2, 1, 0], true);
            assert.deepEqual(slice(point), [1, 0, 0]);
        });
    });

    describe('#closestPointToPointParameter', () => {
        it('should return closest point on line', () => {
            let parameter = line.closestPointToPointParameter([2, 1, 0]);
            assert.equal(parameter, 2);
        });

        it('should return closest point on line segment', () => {
            let parameter = line.closestPointToPointParameter([2, 1, 0], true);
            assert.equal(parameter, 1);
        });
    });

    describe('#delta', () => {
        it('should return unit vector', () => {
            assert.deepEqual(slice(line.delta()), [1, 0, 0]);
        });
    });
});
