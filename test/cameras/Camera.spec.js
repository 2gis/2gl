import assert from 'assert';
import {slice} from '../utils';
import {mat4} from 'gl-matrix';
import Object3D from '../../src/Object3D';

import Camera from '../../src/cameras/Camera';

describe('Camera', () => {
    let camera;

    beforeEach(() => {
        camera = new Camera();
    });

    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            assert.ok(camera instanceof Object3D);
        });

        it('should have default up vector', () => {
            assert.deepEqual(slice(camera.up), [0, 1, 0]);
        });

        it('should have default projectionMatrix', () => {
            const matrix = mat4.create();
            assert.deepEqual(slice(camera.projectionMatrix), slice(matrix));
        });

        it('should have default modelViewMatrix', () => {
            const matrix = mat4.create();
            assert.deepEqual(slice(camera.modelViewMatrix), slice(matrix));
        });

        it('should have default worldInverseMatrix', () => {
            const matrix = mat4.create();
            assert.deepEqual(slice(camera.worldInverseMatrix), slice(matrix));
        });
    });

    describe('#updateProjectionMatrix', () => {
        it('should never did', () => {
            camera.updateProjectionMatrix();
        });
    });

    describe('#updateWorldMatrix', () => {
        let oldMatrix;

        beforeEach(() => {
            oldMatrix = slice(camera.worldMatrix);
        });

        it('old world matrix should be equal new after update', () => {
            camera.updateWorldMatrix();
            assert.deepEqual(oldMatrix, slice(camera.worldMatrix));
        });

        it('shouldn\'t change matrix after change position and update', () => {
            camera.position[1] = 123;
            camera.updateWorldMatrix();
            assert.deepEqual(oldMatrix, slice(camera.worldMatrix));
        });

        it('should update if local matrix changed', () => {
            camera.position[1] = 123;
            camera.updateLocalMatrix();
            camera.updateWorldMatrix();
            assert.notDeepEqual(oldMatrix, slice(camera.worldMatrix));
        });

        it('should update modelViewMatrix matrix', () => {
            oldMatrix = slice(camera.modelViewMatrix);
            camera.position[1] = 123;
            camera.updateLocalMatrix();
            camera.updateWorldMatrix();
            assert.notDeepEqual(oldMatrix, slice(camera.modelViewMatrix));
        });
    });
});
