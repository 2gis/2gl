import assert from 'assert';
import {getNewGlContext} from './utils';
import sinon from 'sinon';

import RenderTarget from '../src/RenderTarget';

describe('RenderTarget', () => {
    let renderTarget, gl;

    beforeEach(() => {
        renderTarget = new RenderTarget({
            size: [32, 64]
        });
        gl = getNewGlContext();
    });

    describe('#bind', () => {
        it('should call gl bindFramebuffer', () => {
            const spy = sinon.spy(gl, 'bindFramebuffer');
            renderTarget.bind(gl);
            assert.ok(spy.called);
        });

        it('should createFramebuffer in first call', () => {
            const spy = sinon.spy(gl, 'createFramebuffer');
            renderTarget.bind(gl);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t createFramebuffer in second call', () => {
            renderTarget.bind(gl);
            const spy = sinon.spy(gl, 'createFramebuffer');
            renderTarget.bind(gl);
            assert.ok(!spy.called);
        });
    });

    describe('#unbind', () => {
        it('should call gl bindFramebuffer with null', () => {
            const spy = sinon.spy(gl, 'bindFramebuffer');
            renderTarget.unbind(gl);
            assert.ok(spy.calledOnce);
            assert.ok(spy.calledWith(gl.FRAMEBUFFER, null));
        });
    });

    describe('#remove', () => {
        it('should\'n call gl deleteFramebuffer', () => {
            const spy = sinon.spy(gl, 'deleteFramebuffer');
            renderTarget.remove(gl);
            assert.ok(!spy.called);
        });

        it('should call gl deleteFramebuffer after bind', () => {
            const spy = sinon.spy(gl, 'deleteFramebuffer');
            renderTarget.bind(gl).remove(gl);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#setSize', () => {
        it('should\'n change texture', () => {
            const spy = sinon.spy(gl, 'createTexture');
            renderTarget.setSize([128, 256]);
            assert.ok(!spy.called);
        });

        it('should change texture after bind', () => {
            const spy = sinon.spy(gl, 'createTexture');
            renderTarget.setSize([128, 256]).bind(gl);
            assert.ok(spy.calledOnce);
        });
    });
});
