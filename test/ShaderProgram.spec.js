import ShaderProgram from '../src/ShaderProgram';
import GlContext from './utils/GlContext';
import assert from 'assert';
import sinon from 'sinon';

describe('ShaderProgram', () => {
    let gl;

    beforeEach(() => {
        gl = new GlContext();
    });

    describe('#constructor', () => {
        it('should work with empty options', () => {
            const program = new ShaderProgram();
            assert.ok(program);
        });
    });

    describe('#enable', () => {
        let program;

        beforeEach(() => {
            program = new ShaderProgram();
        });

        it('should create program', () => {
            const spy = sinon.spy(gl, 'createProgram');
            program.enable(gl);
            assert.ok(spy.calledOnce);
        });

        it('should use program', () => {
            const spy = sinon.spy(gl, 'useProgram');
            program.enable(gl);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t create program after first call', () => {
            const spy = sinon.spy(gl, 'createProgram');
            program.enable(gl);
            program.enable(gl);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#bind', () => {
        it('should work with different arguments', () => {
            const program = new ShaderProgram();
            program.bind(gl);
            program.bind(gl, {});
            program.bind(gl, {}, {});
            program.bind(gl, null, {});
        });
    });

    describe('#disable', () => {
        it('should work', () => {
            const program = new ShaderProgram();
            program.disable(gl);
            program.enable(gl);
            program.disable(gl);
        });
    });
});
