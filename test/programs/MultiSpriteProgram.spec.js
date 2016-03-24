import assert from 'assert';
import Program from '../../src/programs/Program';
import MultiSprite from '../../src/MultiSprite';

import MultiSpriteProgram from '../../src/programs/MultiSpriteProgram';

describe('MultiSpriteProgram', () => {
    let program;

    beforeEach(() => {
        program = new MultiSpriteProgram();
    });

    describe('#constructor', () => {
        it('shouldn\'t inherited from Program', () => {
            assert.ok(!(program instanceof Program));
        });

        it('should have smoothing field', () => {
            assert.equal(program.smoothing, 1);
        });
    });

    describe('#setTexture and #getTexture', () => {
        it('should return null', () => {
            assert.equal(program.getTexture(), null);
        });

        it('should return same texture', () => {
            const texture = {};
            program.setTexture(texture);
            assert.equal(program.getTexture(), texture);
        });
    });

    describe('#typifyForRender', () => {
        it('should identify as multiSprite', () => {
            const object = new MultiSprite([], program);
            const typedObjects = {multiSprites: []};

            program.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.multiSprites[0], object);
        });
    });
});
