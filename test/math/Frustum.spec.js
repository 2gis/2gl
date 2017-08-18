import * as vec3 from '@2gis/gl-matrix/vec3';
import * as mat4 from '@2gis/gl-matrix/mat4';
import assert from 'assert';

import Plane from '../../src/math/Plane';
import Frustum from '../../src/math/Frustum';
import Box from '../../src/math/Box';

describe('Frustum', () => {
    let frustum, planes;

    beforeEach(() => {
        const left = new Plane(vec3.fromValues(1, 0, 0), 0);
        const right = new Plane(vec3.fromValues(-1, 0, 0), 10);
        const bottom = new Plane(vec3.fromValues(0, 0, 1), 0);
        const top = new Plane(vec3.fromValues(0, 0, -1), 10);
        const near = new Plane(vec3.fromValues(0, 1, 0), 0);
        const far = new Plane(vec3.fromValues(0, -1, 0), 10);

        planes = [left, right, bottom, top, near, far];
        frustum = new Frustum(planes);
    });

    afterEach(() => {
        frustum = planes = null;
    });

    describe('#constructor', () => {
        it('should have same planes', () => {
            assert.deepEqual(planes, frustum.planes);
        });

        it('should have default planes with empty arguments', () => {
            const frustum = new Frustum();
            const defaultPlane = new Plane();

            frustum.planes.forEach(plane => {
                assert.deepEqual(plane, defaultPlane);
            });
        });

        it('should have default planes with wrong arguments', () => {
            const wrongPlanes = planes.slice(0, -1);
            const frustum = new Frustum(wrongPlanes);
            const defaultPlane = new Plane();

            frustum.planes.forEach(plane => {
                assert.deepEqual(plane, defaultPlane);
            });
        });
    });

    describe('#setFromMatrix', () => {
        it('should return self', () => {
            assert.equal(frustum.setFromMatrix(mat4.create()), frustum);
        });

        it('should have same planes', () => {
            const m = mat4.create();
            m[0] = -1; m[4] = 0; m[8] = 0; m[12] = 5;
            m[1] = 0; m[5] = 0; m[9] = 1; m[13] = -5;
            m[2] = 0; m[6] = -1; m[10] = 0; m[14] = 5;
            m[3] = 0; m[7] = 0; m[11] = 0; m[15] = 5;

            const anotherFrustum = new Frustum();
            anotherFrustum.setFromMatrix(m);

            assert.deepEqual(anotherFrustum, frustum);
        });
    });

    describe('#intersectsBox', () => {
        it('should contain box', () => {
            const min = vec3.fromValues(2, 2, 2);
            const max = vec3.fromValues(5, 5, 5);
            const box = new Box(min, max);

            assert.ok(frustum.intersectsBox(box));
        });

        it('shouldn\'t contain far box', () => {
            const min = vec3.fromValues(2, 12, 2);
            const max = vec3.fromValues(5, 15, 5);
            const box = new Box(min, max);

            assert.ok(!frustum.intersectsBox(box));
        });

        it('shouldn\'t contain box from left', () => {
            const min = vec3.fromValues(-2, 2, 2);
            const max = vec3.fromValues(-5, 5, 5);
            const box = new Box(min, max);

            assert.ok(!frustum.intersectsBox(box));
        });

        it('shouldn\'t contain box from TOP', () => {
            const min = vec3.fromValues(2, 2, 12);
            const max = vec3.fromValues(5, 5, 15);
            const box = new Box(min, max);

            assert.ok(!frustum.intersectsBox(box));
        });

        it('should contain box in bound', () => {
            const min = vec3.fromValues(2, 9, 2);
            const max = vec3.fromValues(5, 12, 5);
            const box = new Box(min, max);

            assert.ok(frustum.intersectsBox(box));
        });
    });
});
