import assert from 'assert';
import GlContext from '../utils/GlContext';
import sinon from 'sinon';

import Scene from '../../src/Scene';
import Camera from '../../src/cameras/Camera';
import FrameBuffer from '../../src/FrameBuffer';

import Renderer from '../../src/renderer/Renderer';

describe('Renderer', () => {
    let renderer, options, gl, scene, camera;

    beforeEach(() => {
        gl = new GlContext();

        options = {
            pixelRatio: 2,
            gl
        };

        renderer = new Renderer(options);
        scene = new Scene();
        camera = new Camera();
    });

    describe('#constructor', () => {
        it('should have same fields as in options', () => {
            const options = {
                autoClear: false,
                clearColor: [0.5, 0.3, 0.1, 1],
                pixelRatio: 3
            };

            renderer = new Renderer(options);

            assert.equal(options.autoClear, renderer.autoClear);
            assert.equal(options.pixelRatio, renderer.getPixelRatio());
            assert.deepEqual(options.clearColor, renderer.clearColor);
        });

        it('should set pixel ratio 1 by default', () => {
            renderer = new Renderer();
            assert.equal(renderer.getPixelRatio(), 1);
        });
    });

    describe('#setPixelRation', () => {
        it('should change pixel ration', () => {
            renderer.setPixelRatio(1);
            assert.equal(renderer.getPixelRatio(), 1);
        });
    });

    describe('#setSize', () => {
        describe('with canvas element', () => {
            beforeEach(() => {
                renderer._canvasElement = {
                    style: {}
                };
            });

            it('should change canvas size with pixel ration 2', () => {
                renderer.setSize(100, 50);

                assert.equal(renderer._canvasElement.width, 200);
                assert.equal(renderer._canvasElement.height, 100);
            });

            it('should change canvas style without pixel ration 2', () => {
                renderer.setSize(100, 50);

                assert.equal(renderer._canvasElement.style.width, '100px');
                assert.equal(renderer._canvasElement.style.height, '50px');
            });

            it('should call gl viewport with pixel ration 2', () => {
                const spy = sinon.spy(gl, 'viewport');

                renderer.setSize(100, 50);

                assert.ok(spy.calledOnce);
                assert.ok(spy.calledWith(0, 0, 200, 100));
            });
        });

        describe('without canvas element', () => {
            it('should call gl viewport with pixel ration 2', () => {
                const spy = sinon.spy(gl, 'viewport');

                renderer.setSize(100, 50);

                assert.ok(spy.calledOnce);
                assert.ok(spy.calledWith(0, 0, 200, 100));
            });
        });
    });

    describe('#setViewport', () => {
        it('should call gl viewport', () => {
            const spy = sinon.spy(gl, 'viewport');

            renderer.setViewport(100, 50);

            assert.ok(spy.calledOnce);
            assert.ok(spy.calledWith(0, 0, 100, 50));
        });

        it('should restore viewport from setSize with empty arguments', () => {
            const spy = sinon.spy(gl, 'viewport');

            renderer.setSize(100, 50);
            renderer.setViewport(11, 22);
            renderer.setViewport();

            assert.ok(spy.calledThrice);
            assert.ok(spy.calledWith(0, 0, 200, 100));
        });
    });

    describe('#getSize', () => {
        it('should return new size', () => {
            const size = [111, 222];

            renderer.setSize(size[0], size[1]);
            assert.deepEqual(renderer.getSize(), size.map(c => c * 2));
        });
    });

    describe('#setFrameBuffer', () => {
        it('should setFrameBuffer', () => {
            const frameBuffer = new FrameBuffer();
            renderer.setFrameBuffer(frameBuffer);
            assert.equal(renderer._frameBuffer, frameBuffer);
        });
    });

    describe('#readPixels', () => {
        let array;

        beforeEach(() => {
            array = new Uint8Array(2 * 3 * 4);
        });

        it('should call gl readPixels', () => {
            const spy = sinon.spy(gl, 'readPixels');
            renderer.readPixels(1, 0, 2, 3, array);
            assert.ok(spy.calledOnce);
        });

        it('should call gl readPixels with same arguments', () => {
            const spy = sinon.spy(gl, 'readPixels');
            renderer.readPixels(1, 0, 2, 3, array);
            assert.ok(spy.calledWith(1, 0, 2, 3));
        });

        it('should bind frame buffer', () => {
            const frameBuffer = new FrameBuffer();
            renderer.setFrameBuffer(frameBuffer);
            const spy = sinon.spy(frameBuffer, 'bind');
            renderer.readPixels(1, 0, 2, 3, array);

            assert.ok(spy.calledOnce);
        });

        it('should unbind frame buffer', () => {
            const frameBuffer = new FrameBuffer();
            renderer.setFrameBuffer(frameBuffer);
            const spy = sinon.spy(frameBuffer, 'unbind');
            renderer.readPixels(1, 0, 2, 3, array);

            assert.ok(spy.calledOnce);
        });
    });

    describe('#render', () => {
        beforeEach(() => {
            renderer.setSize([800, 600]);
        });

        it('should call scene typifyForRender', () => {
            const spy = sinon.spy(scene, 'typifyForRender');
            renderer.render(scene, camera);
            assert.ok(spy.calledOnce);
        });

        it('should call #clear by default', () => {
            const spy = sinon.spy(renderer, 'clear');
            renderer.render(scene, camera);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call #clear if autoClear is false', () => {
            const spy = sinon.spy(renderer, 'clear');
            renderer.autoClear = false;
            renderer.render(scene, camera);
            assert.ok(!spy.called);
        });

        it('should call camera updateLocalMatrix method', () => {
            const spy = sinon.spy(camera, 'updateLocalMatrix');
            renderer.render(scene, camera);
            assert.ok(spy.calledOnce);
        });

        it('should call camera updateWorldMatrix method', () => {
            const spy = sinon.spy(camera, 'updateWorldMatrix');
            renderer.render(scene, camera);
            assert.ok(spy.calledOnce);
        });

        it('should bind frame buffer', () => {
            const frameBuffer = new FrameBuffer();
            renderer.setFrameBuffer(frameBuffer);
            const spy = sinon.spy(frameBuffer, 'bind');
            renderer.render(scene, camera);

            assert.ok(spy.calledOnce);
        });

        it('should unbind frame buffer', () => {
            const frameBuffer = new FrameBuffer();
            renderer.setFrameBuffer(frameBuffer);
            const spy = sinon.spy(frameBuffer, 'unbind');
            renderer.render(scene, camera);

            assert.ok(spy.calledOnce);
        });
    });
});
