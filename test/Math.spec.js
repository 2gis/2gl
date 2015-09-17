import assert from 'assert';
import * as math from '../src/math/Math';

describe('Math', () => {
    describe('#clamp', () => {
        it('should return same value', () => {
            assert.equal(math.clamp(1, 0, 2), 1);
        });

        it('should return left bound', () => {
            assert.equal(math.clamp(1, 3, 4), 3);
        });

        it('should return right bound', () => {
            assert.equal(math.clamp(1, -2, -1), -1);
        });
    });

    describe('#degToRad', () => {
        it('should return PI', () => {
            assert.equal(math.degToRad(180), Math.PI);
        });

        it('should return 0', () => {
            assert.equal(math.degToRad(0), 0);
        });
    });
});
