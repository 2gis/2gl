import assert from 'assert';
import GlContext from '../utils/GlContext';
import sinon from 'sinon';

import Scene from '../../src/Scene';
import Camera from '../../src/cameras/Camera';

import Renderer from '../../src/renderer/Renderer';

describe('Renderer', () => {
    let renderer, options, initializeCanvas, gl,
        scene, camera;

    beforeEach(() => {
        options = {
            container: {},
            pixelRatio: 2
        };

        initializeCanvas = Renderer.prototype._initializeCanvas;

        gl = new GlContext();

        // mock for non-browser context
        Renderer.prototype._initializeCanvas = function() {
            this._canvasElement = {
                style: {}
            };
            this._gl = gl;
        };

        renderer = new Renderer(options);
        scene = new Scene();
        camera = new Camera();
    });

    after(() => {
        Renderer.prototype._initializeCanvas = initializeCanvas;
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
            renderer = new Renderer({container: {}});
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

    describe('#getSize', () => {
        it('should return new size', () => {
            const size = [111, 222];

            renderer.setSize(size[0], size[1]);
            assert.deepEqual(renderer.getSize(), size.map(c => c * 2));
        });
    });

    describe('#render', () => {
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
    });
});
