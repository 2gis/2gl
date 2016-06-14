import assert from 'assert';
import sinon from 'sinon';
import {getRenderState} from '../utils';
import Object3D from '../../src/Object3D';
import Renderer from '../../src/Renderer';
import libConstants from '../../src/libConstants';

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
        let object, renderer;

        beforeEach(() => {
            object = new Object3D();
            renderer = new Renderer();
        });

        it('should identify as common', () => {
            const spy1 = sinon.spy(renderer._pluginsByType[libConstants.COMMON_RENDERER], 'addObject');
            const spy2 = sinon.spy(renderer._pluginsByType[libConstants.TRANSPARENT_RENDERER], 'addObject');
            material.typifyForRender(renderer._pluginsByType, object);
            assert.ok(spy1.called);
            assert.ok(!spy2.called);
        });

        it('should identify as transparent', () => {
            const spy1 = sinon.spy(renderer._pluginsByType[libConstants.COMMON_RENDERER], 'addObject');
            const spy2 = sinon.spy(renderer._pluginsByType[libConstants.TRANSPARENT_RENDERER], 'addObject');
            material.opacity = 0.5;
            material.typifyForRender(renderer._pluginsByType, object);
            assert.ok(!spy1.called);
            assert.ok(spy2.called);
        });
    });
});
