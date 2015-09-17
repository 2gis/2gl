import assert from 'assert';
import Program from '../../src/programs/Program';
import Sprite from '../../src/Sprite';

import SpriteProgram from '../../src/programs/SpriteProgram';

describe('SpriteProgram', () => {
    let program;

    beforeEach(() => {
        program = new SpriteProgram();
    });

    describe('#constructor', () => {
        it('shouldn\'t inherited from Program', () => {
            assert.ok(!(program instanceof Program));
        });

        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
        });

        it('should have smoothing field', () => {
            assert.equal(program.smoothing, false);
        });
    });

    describe('#setTexture and #getTexture', () => {
        it('should return null', () => {
            assert.equal(program.getTexture(), null);
        });

        it('should return same texture', () => {
            let texture = {};
            program.setTexture(texture);
            assert.equal(program.getTexture(), texture);
        });
    });

    describe('#typifyForRender', () => {
        it('should identify as sprite', () => {
            let object = new Sprite();
            let typedObjects = {sprites: []};

            program.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.sprites[0], object);
        });
    });
});
