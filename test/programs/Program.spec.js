import assert from 'assert';
import {getRenderState} from '../utils';
import Object3D from '../../src/Object3D';

import Program from '../../src/programs/Program';

describe('Program', () => {
    let program, state;

    beforeEach(() => {
        program = new Program();
        program._shader = {
            fragment: '',
            vertex: ''
        };
        state = getRenderState();
    });

    describe('#constructor', () => {
        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
        });
    });

    describe('#enable', () => {
        it('should exist', () => {
            program.enable(state);
        });
    });

    describe('#disable', () => {
        it('should exist', () => {
            program.disable(state.gl);
        });
    });

    describe('#typifyForRender', () => {
        let object, typedObjects;

        beforeEach(() => {
            object = new Object3D();
            typedObjects = {common: [], transparent: []};
        });

        it('should identify as common', () => {
            program.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.common[0], object);
            assert.equal(typedObjects.transparent.length, 0);
        });

        it('should identify as transparent', () => {
            program.opacity = 0.5;
            program.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.transparent[0], object);
            assert.equal(typedObjects.common.length, 0);
        });
    });
});
