import assert from 'assert';
import sinon from 'sinon';
import {getRenderState, cubeVertices} from '../utils';
import Mesh from '../../src/Mesh';
import Program from '../../src/programs/Program';
import Geometry from '../../src/Geometry';
import Buffer from '../../src/Buffer';

import BasicMeshProgram from '../../src/programs/BasicMeshProgram';

describe('BasicMeshProgram', () => {
    let program, geometry, mesh;

    beforeEach(() => {
        program = new BasicMeshProgram();

        geometry = new Geometry();
        geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

        mesh = new Mesh(geometry, program);
    });

    describe('#constructor', () => {
        it('should inherited from Program', () => {
            assert.ok(program instanceof Program);
        });

        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
        });

        it('should have color field', () => {
            assert.deepEqual(program.color, [0, 0, 0]);
        });
    });

    describe('#enable', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = mesh;
        });

        it('should create two shaders', () => {
            const spy = sinon.spy(state.gl, 'createShader');
            program.enable(state);
            assert.ok(spy.calledTwice);
        });

        it('should create program', () => {
            const spy = sinon.spy(state.gl, 'createProgram');
            program.enable(state);
            assert.ok(spy.calledOnce);
        });

        it('should use program', () => {
            const spy = sinon.spy(state.gl, 'useProgram');
            program.enable(state);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t create shaders after first call', () => {
            const spy = sinon.spy(state.gl, 'createShader');
            program.enable(state);
            program.enable(state);
            assert.ok(spy.calledTwice);
        });

        it('shouldn\'t create program after first call', () => {
            const spy = sinon.spy(state.gl, 'createProgram');
            program.enable(state);
            program.enable(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#disable', () => {
        it('should call disableVertexAttribArray once', () => {
            const state = getRenderState();
            state.object = mesh;

            program.enable(state);

            const spy = sinon.spy(state.gl, 'disableVertexAttribArray');
            program.disable(state.gl);

            assert.ok(spy.calledOnce);
        });
    });
});
