import assert from 'assert';
import sinon from 'sinon';
import {getRenderState} from '../utils';
import Mesh from '../../src/Mesh';
import Renderer from '../../src/Renderer';
import {COMMON_RENDERER, TRANSPARENT_RENDERER} from '../../src/libConstants';
import CommonPlugin from '../../src/rendererPlugins/CommonPlugin';
import TransparentPlugin from '../../src/rendererPlugins/TransparentPlugin';

import Material from '../../src/materials/Material';

describe('Material', () => {
    let material, state;

    beforeEach(() => {
        material = new Material();
        material._shader = {
            fragment: '',
            vertex: ''
        };
        state = getRenderState();
    });

    describe('#constructor', () => {
        it('should have opacity field', () => {
            assert.equal(material.opacity, 1);
        });
    });

    describe('#enable', () => {
        it('should exist', () => {
            material.enable(state);
        });
    });

    describe('#disable', () => {
        it('should exist', () => {
            material.disable(state.gl);
        });
    });

    describe('#typifyForRender', () => {
        let mesh, renderer;

        beforeEach(() => {
            mesh = new Mesh();
            renderer = new Renderer();
            renderer
                .addPlugin(new CommonPlugin())
                .addPlugin(new TransparentPlugin());
        });

        it('should identify as common', () => {
            const spy1 = sinon.spy(renderer._pluginsByType[COMMON_RENDERER], 'addObject');
            const spy2 = sinon.spy(renderer._pluginsByType[TRANSPARENT_RENDERER], 'addObject');
            material.typifyForRender(renderer._pluginsByType, mesh);
            assert.ok(spy1.called);
            assert.ok(!spy2.called);
        });

        it('should identify as transparent', () => {
            const spy1 = sinon.spy(renderer._pluginsByType[COMMON_RENDERER], 'addObject');
            const spy2 = sinon.spy(renderer._pluginsByType[TRANSPARENT_RENDERER], 'addObject');
            material.opacity = 0.5;
            material.typifyForRender(renderer._pluginsByType, mesh);
            assert.ok(!spy1.called);
            assert.ok(spy2.called);
        });
    });
});
