import * as vec3 from '@2gis/gl-matrix/vec3';
import assert from 'assert';
import {slice} from '../utils';

import Box from '../../src/math/Box';

describe('Box', () => {
    let box, min, max;

    beforeEach(() => {
        min = vec3.fromValues(-1, -1, -1);
        max = vec3.fromValues(1, 1, 1);
        box = new Box(min, max);
    });

    afterEach(() => {
        box = null;
    });

    describe('#constructor', () => {
        it('should have min field same as in arguments', () => {
            assert.deepEqual(slice(min), slice(box.min));
        });

        it('should have max field same as in arguments', () => {
            assert.deepEqual(slice(max), slice(box.max));
        });
    });

    describe('#containsPoint', () => {
        it('should contain [0, 0, 0]', () => {
            const point = vec3.fromValues(0, 0, 0);
            assert.ok(box.containsPoint(point));
        });

        [
            [2, 0, 0],
            [0, 2, 0],
            [0, 0, 2],
            [-2, 0, 0],
            [0, -2, 0],
            [0, 0, -2]
        ].forEach((point) => {
            it('shouldn\'t contain [' + point.join(', ') + ']', () => {
                assert.ok(!box.containsPoint(point));
            });
        });
    });

    describe('#expandByPoint', () => {
        it('should expand max bound', () => {
            const point = vec3.fromValues(2, 2, 2);
            box.expandByPoint(point);
            assert.deepEqual(slice(point), slice(box.max));
        });

        it('should expand min bound', () => {
            const point = vec3.fromValues(-2, -2, -2);
            box.expandByPoint(point);
            assert.deepEqual(slice(point), slice(box.min));
        });

        it('shouldn\'t expand', () => {
            const point = vec3.fromValues(0, 0, 0);
            const oldBounds = {
                max: slice(box.max),
                min: slice(box.min)
            };

            box.expandByPoint(point);
            assert.deepEqual(oldBounds.min, slice(box.min));
            assert.deepEqual(oldBounds.max, slice(box.max));
        });
    });
});
