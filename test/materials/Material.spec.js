import assert from 'assert';
import {getRenderState} from '../utils';
import Object3D from '../../src/Object3D';

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
        let object, typedObjects;

        beforeEach(() => {
            object = new Object3D();
            typedObjects = {common: [], transparent: []};
        });

        it('should identify as common', () => {
            material.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.common[0], object);
            assert.equal(typedObjects.transparent.length, 0);
        });

        it('should identify as transparent', () => {
            material.opacity = 0.5;
            material.typifyForRender(typedObjects, object);
            assert.equal(typedObjects.transparent[0], object);
            assert.equal(typedObjects.common.length, 0);
        });
    });
});
