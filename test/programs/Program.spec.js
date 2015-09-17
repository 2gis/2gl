import assert from 'assert';
import sinon from 'sinon';
import {getRenderState} from '../utils';
import Object3D from '../../src/Object3D';

import Program from '../../src/programs/Program';

describe('Program', () => {
    let program;

    beforeEach(() => {
        program = new Program();
        program._shader = {
            fragment: '',
            vertex: ''
        };
    });

    describe('#constructor', () => {
        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
        });
    });

    describe('#enable', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = new Object3D();
        });

        it('should create two shaders', () => {
            let spy = sinon.spy(state.gl, 'createShader');
            program.enable(state);
            assert.ok(spy.calledTwice);
        });

        it('should create program', () => {
            let spy = sinon.spy(state.gl, 'createProgram');
            program.enable(state);
            assert.ok(spy.calledOnce);
        });

        it('should use program', () => {
            let spy = sinon.spy(state.gl, 'useProgram');
            program.enable(state);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t create shaders after first call', () => {
            let spy = sinon.spy(state.gl, 'createShader');
            program.enable(state);
            program.enable(state);
            assert.ok(spy.calledTwice);
        });

        it('shouldn\'t create program after first call', () => {
            let spy = sinon.spy(state.gl, 'createProgram');
            program.enable(state);
            program.enable(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#disable', () => {
        it('should never do', () => {
            program.disable();
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
