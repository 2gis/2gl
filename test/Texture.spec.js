import assert from 'assert';
import GlContext from './utils/GlContext';
import sinon from 'sinon';

import Texture from '../src/Texture';

describe('Texture', () => {
    let texture, src, gl;

    beforeEach(() => {
        src = {};
        texture = new Texture(src);
        gl = new GlContext();
    });

    describe('#enable', () => {
        it('should initialize texture in first call', () => {
            const spy = sinon.spy(gl, 'createTexture');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t initialize texture after first call', () => {
            const spy = sinon.spy(gl, 'createTexture');
            texture.enable(gl, 1);
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('should generate mipmaps by default', () => {
            const spy = sinon.spy(gl, 'generateMipmap');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t generate mipmaps if it disable', () => {
            const spy = sinon.spy(gl, 'generateMipmap');
            texture = new Texture(src, {generateMipmaps: false});
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('shouldn\'t generate mipmaps if min filter is linear', () => {
            texture = new Texture(src, {
                minFilter: Texture.LinearFilter,
            });
            const spy = sinon.spy(gl, 'generateMipmap');
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('shouldn\'t generate mipmaps if min filter is nearest', () => {
            texture = new Texture(src, {
                minFilter: Texture.NearestFilter,
            });
            const spy = sinon.spy(gl, 'generateMipmap');
            texture.enable(gl, 1);
            assert.ok(!spy.called);
        });

        it('should activate texture', () => {
            const spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl, 1);
            assert.ok(spy.calledOnce);
        });

        it('should activate texture twice after double enable', () => {
            const spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl, 1);
            texture.enable(gl, 1);
            assert.ok(spy.calledTwice);
        });

        it('shouldn\'t activate texture if not put active', () => {
            const spy = sinon.spy(gl, 'activeTexture');
            texture.enable(gl);
            assert.ok(!spy.called);
        });

        it('should call gl texImage2D', () => {
            const spy = sinon.spy(gl, 'texImage2D');
            texture.enable(gl);
            assert.ok(spy.calledOnce);
            assert.equal(spy.args[0].length, 6);
        });

        it('should call gl texImage2D with size', () => {
            texture = new Texture(src, {size: [16, 25]});
            const spy = sinon.spy(gl, 'texImage2D');
            texture.enable(gl);
            assert.ok(spy.calledOnce);
            const args = spy.args[0];
            assert.equal(args.length, 9);
            assert.equal(args[3], 16);
            assert.equal(args[4], 25);
        });
    });

    describe('#subImage', () => {
        it('should call gl.texSubImage2D with offset', () => {
            const spy = sinon.spy(gl, 'texSubImage2D');

            texture = new Texture(src, {size: [16, 25]});
            texture.enable(gl);
            texture.subImage(gl, src, 2, 3);

            assert.ok(spy.calledOnce);

            const args = spy.args[0];
            assert.equal(args.length, 7);
            assert.equal(args[2], 2);
            assert.equal(args[3], 3);
        });
    });

    describe('#remove', () => {
        it('shouldn\'t call deleteTexture', () => {
            const spy = sinon.spy(gl, 'deleteTexture');
            texture.remove(gl);
            assert.ok(!spy.called);
        });

        it('should call deleteTexture after enable', () => {
            const spy = sinon.spy(gl, 'deleteTexture');
            texture.enable(gl).remove(gl);
            assert.ok(spy.calledOnce);
        });
    });
});
