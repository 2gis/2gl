import assert from 'assert';
import {AMBIENT_LIGHT} from '../../src/libConstants';
import Light from '../../src/lights/Light';
import AmbientLight from '../../src/lights/AmbientLight';

describe('AmbientLight', () => {
    describe('#constructor', () => {
        it('should inherited from Light', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new AmbientLight(color);
            assert.ok(light instanceof Light);
        });

        it('should have same field', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new AmbientLight(color);
            assert.deepEqual(light.color, color);
        });

        it('should have right type', () => {
            const color = [0.1, 0.5, 0.7];
            const light = new AmbientLight(color);
            assert.equal(AMBIENT_LIGHT, light.type);
        });
    });
});
