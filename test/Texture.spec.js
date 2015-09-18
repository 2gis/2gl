import assert from 'assert';
import GlContext from './utils/GlContext';
import sinon from 'sinon';

import Texture from '../src/Texture';

describe('Texture', () => {
    let texture, src;

    beforeEach(() => {
        src = {};
        texture = new Texture(src);
    });

    describe('#enable', () => {
        let gl;

        beforeEach(() => {
            gl = new GlContext();
        });

        it('should initialize texture in first call', () => {
            let spy = sinon.spy(gl, 'createTexture');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t initialize texture after first call', () => {
            let spy = sinon.spy(gl, 'createTexture');
            texture.enable(gl, 1);
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('should generate mipmaps by default', () => {
            let spy = sinon.spy(gl, 'generateMipmap');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t generate mipmaps if it disable', () => {
            let spy = sinon.spy(gl, 'generateMipmap');
            texture.generateMipmaps = false;
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('shouldn\'t generate mipmaps if min filter is linear', () => {
            let spy = sinon.spy(gl, 'generateMipmap');
            texture.minFilter = Texture.LinearFilter;
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('shouldn\'t generate mipmaps if min filter is nearest', () => {
            let spy = sinon.spy(gl, 'generateMipmap');
            texture.minFilter = Texture.NearestFilter;
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('should activate texture', () => {
            let spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('should activate texture twice after double enable', () => {
            let spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl, 1);
            texture.enable(gl, 1);
            assert.ok(spy.calledTwice);
        });

        it('shouldn\'t activate texture if not put uniform', () => {
            let spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl);
            assert.ok(!spy.called);
        });
    });
});
