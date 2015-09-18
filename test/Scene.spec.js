import assert from 'assert';

import Object3D from '../src/Object3D';
import Light from '../src/lights/Light';

import Scene from '../src/Scene';

describe('Scene', () => {
    let scene;

    beforeEach(() => {
        scene = new Scene();
    });

    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            assert.ok(scene instanceof Object3D);
        });
    });

    describe('#addLight and #getLights', () => {
        it('should return empty array', () => {
            assert.equal(scene.getLights().length, 0);
        });

        it('should add and return light', () => {
            let light = new Light();
            scene.addLight(light);
            assert.equal(scene.getLights().length, 1);
            assert.equal(scene.getLights()[0], light);
        });
    });
});
