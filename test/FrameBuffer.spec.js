import assert from 'assert';
import {getNewGlContext} from './utils';
import sinon from 'sinon';

import FrameBuffer from '../src/FrameBuffer';

describe('FrameBuffer', () => {
    let frameBuffer, gl;

    beforeEach(() => {
        frameBuffer = new FrameBuffer();
        gl = getNewGlContext();
    });

    describe('#bind', () => {
        it('should call gl bindFramebuffer', () => {
            const spy = sinon.spy(gl, 'bindFramebuffer');
            frameBuffer.bind(gl);
            assert.ok(spy.called);
        });

        it('should createFramebuffer in first call', () => {
            const spy = sinon.spy(gl, 'createFramebuffer');
            frameBuffer.bind(gl);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t createFramebuffer in second call', () => {
            frameBuffer.bind(gl);
            const spy = sinon.spy(gl, 'createFramebuffer');
            frameBuffer.bind(gl);
            assert.ok(!spy.called);
        });
    });

    describe('#unbind', () => {
        it('should call gl bindFramebuffer with null', () => {
            const spy = sinon.spy(gl, 'bindFramebuffer');
            frameBuffer.unbind(gl);
            assert.ok(spy.calledOnce);
            assert.ok(spy.calledWith(gl.FRAMEBUFFER, null));
        });
    });
});
