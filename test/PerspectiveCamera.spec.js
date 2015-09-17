import assert from 'assert';
import {slice} from './utils';

import Camera from '../src/cameras/Camera';

import PerspectiveCamera from '../src/cameras/PerspectiveCamera';

describe('PerspectiveCamera', () => {
    let camera, fov, aspect, near, far;

    beforeEach(() => {
        fov = 45;
        aspect = 1;
        near = 0.1;
        far = 1000;
        camera = new PerspectiveCamera(fov, aspect, near, far);
    });

    describe('#constructor', () => {
        it('should inherited from Camera', () => {
            assert.ok(camera instanceof Camera);
        });

        it('should have same fields', () => {
            assert.equal(fov, camera.fov);
            assert.equal(aspect, camera.aspect);
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
});
