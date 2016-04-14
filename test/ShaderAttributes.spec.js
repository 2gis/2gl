import ShaderAttribute from '../src/ShaderAttribute';
import GlContext from './utils/GlContext';
import assert from 'assert';
import sinon from 'sinon';

describe('ShaderAttribute', () => {
    let gl;

    beforeEach(() => {
        gl = new GlContext();
    });

    describe('#enable', () => {
        it('should call gl enableVertexAttribArray by default', () => {
            const spy = sinon.spy(gl, 'enableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName'
            });

            shaderAttribute.enable(gl);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call gl enableVertexAttribArray if type = index', () => {
            const spy = sinon.spy(gl, 'enableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName',
                index: true
            });

            shaderAttribute.enable(gl);

            assert.ok(!spy.called);
        });
    });

    describe('#disable', () => {
        it('should call gl disableVertexAttribArray by default', () => {
            const spy = sinon.spy(gl, 'disableVertexAttribArray');

            const shaderAttribute = new ShaderAttribute({
                name: 'testName'
            });

            shaderAttribute.disable(gl);

            assert.ok(spy.calledOnce);
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
