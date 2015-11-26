import assert from 'assert';
import Light from '../../src/lights/Light';
import DirectionalLight from '../../src/lights/DirectionalLight';

describe('AmbientLight', () => {
    describe('#constructor', () => {
        it('should inherited from Light', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new DirectionalLight(color);
            assert.ok(light instanceof Light);
        });

        it('should have same field', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new DirectionalLight(color);
            assert.deepEqual(light.color, color);
        });
    });
});
