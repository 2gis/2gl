import assert from 'assert';
import Light from '../../src/lights/Light';
import Object3D from '../../src/Object3D';

describe('Light', () => {
    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new Light(color);
            assert.ok(light instanceof Object3D);
        });

        it('should have same field', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new Light(color);
            assert.deepEqual(light.color, color);
        });
    });
});
