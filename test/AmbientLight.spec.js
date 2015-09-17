import assert from 'assert';
import Light from '../src/lights/Light';
import AmbientLight from '../src/lights/AmbientLight';

describe('AmbientLight', () => {
    describe('#constructor', () => {
        it('should inherited from Light', () => {
            let color = [0.1, 0.5, 0.7];
            let light = new AmbientLight(color);
            assert.ok(light instanceof Light);
        });

        it('should have same field', () => {
            let color = [0.1, 0.5, 0.7];
            let light = new AmbientLight(color);
            assert.deepEqual(light.color, color);
        });
    });
});
