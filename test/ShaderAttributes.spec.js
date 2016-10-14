import ShaderAttribute from '../src/ShaderAttribute';
import GlContext from './utils/GlContext';
import Buffer from '../src/Buffer';
import assert from 'assert';
import sinon from 'sinon';

describe('ShaderAttribute', () => {
    let gl, buffer;

    beforeEach(() => {
        gl = new GlContext();
        buffer = new Buffer(new Float32Array([0, 0, 0]));
    });

    describe('#bind', () => {
        it('should call gl enableVertexAttribArray by default', () => {
            const spy = sinon.spy(gl, 'enableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName'
            });

            shaderAttribute.bind(gl, buffer);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call gl enableVertexAttribArray if type = index', () => {
            const spy = sinon.spy(gl, 'enableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName',
                index: true
            });

            shaderAttribute.bind(gl, buffer);

            assert.ok(!spy.called);
        });
    });

    describe('#disable', () => {
        it('should call gl disableVertexAttribArray by default', () => {
            const spy = sinon.spy(gl, 'disableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName'
            });

            shaderAttribute.bind(gl, buffer);
            shaderAttribute.disable(gl);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call gl disableVertexAttribArray if do not enabled', () => {
            const spy = sinon.spy(gl, 'disableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName'
            });

            shaderAttribute.disable(gl);

            assert.ok(!spy.called);
        });

        it('shouldn\'t call gl disableVertexAttribArray if type = index', () => {
            const spy = sinon.spy(gl, 'disableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName',
                index: true
            });

            shaderAttribute.disable(gl);

            assert.ok(!spy.called);
        });
    });
});
