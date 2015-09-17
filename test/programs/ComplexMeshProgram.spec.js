import assert from 'assert';
import Program from '../../src/programs/Program';

import ComplexMeshProgram from '../../src/programs/ComplexMeshProgram';

describe('ComplexMeshProgram', () => {
    let program;

    beforeEach(() => {
        program = new ComplexMeshProgram();
    });

    describe('#constructor', () => {
        it('should inherited from Program', () => {
            assert.ok(program instanceof Program);
        });

        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
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
});
