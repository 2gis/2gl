import assert from 'assert';
import {slice, round} from '../utils';

import Camera from '../../src/cameras/Camera';

import OrthographicCamera from '../../src/cameras/OrthographicCamera';

describe('OrthographicCamera', () => {
    let camera, left, right, top, bottom, near, far;

    beforeEach(() => {
        left = -10;
        right = 10;
        top = 10;
        bottom = -10;
        near = 0.1;
        far = 1000;
        camera = new OrthographicCamera(left, right, top, bottom, near, far);
    });

    describe('#constructor', () => {
        it('should inherited from Camera', () => {
            assert.ok(camera instanceof Camera);
        });

        it('should have same fields', () => {
            assert.equal(left, camera.left);
            assert.equal(right, camera.right);
            assert.equal(top, camera.top);
            assert.equal(bottom, camera.bottom);
            assert.equal(near, camera.near);
            assert.equal(far, camera.far);
        });
    });

    describe('#updateProjectionMatrix', () => {
        it('should update projection matrix', () => {
            let oldMatrix = slice(camera.projectionMatrix);
            camera.updateProjectionMatrix();
            assert.notDeepEqual(slice(camera.projectionMatrix), oldMatrix);
        });
    });

    describe('#project', () => {
        it('should return right', () => {
            camera.position[2] = 10;
            camera.updateLocalMatrix();
            camera.updateWorldMatrix();
            camera.updateProjectionMatrix();
            assert.deepEqual(slice(camera.project([1, 0.5, 0])), [1, 0.5, -10]);
        });
    });

    describe('#unproject', () => {
        it('should return right', () => {
            camera.position[2] = 10;
            camera.updateLocalMatrix();
            camera.updateWorldMatrix();
            camera.updateProjectionMatrix();
            assert.deepEqual(slice(camera.unproject([10, 25, 0])).map(c => round(c, 3)), [100, 250, -490.05]);
        });
    });
});
