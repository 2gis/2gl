import assert from 'assert';
import {slice, getRenderState} from './utils';
import sinon from 'sinon';

import SpriteMaterial from '../src/materials/SpriteMaterial';
import ShaderProgram from '../src/ShaderProgram';
import Object3D from '../src/Object3D';
import Texture from '../src/Texture';

import Sprite from '../src/Sprite';

describe('Sprite', () => {
    let material, sprite;

    beforeEach(() => {
        material = new SpriteMaterial();

        sprite = new Sprite(material);
    });

    afterEach(() => {
        material = null;
    });

    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            assert.ok(sprite instanceof Object3D);
        });

        it('should be equal sprite.material and passed material as argument', () => {
            assert.equal(material, sprite.material);
        });
    });

    describe('#render', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = sprite;
            state.shaderProgram = new ShaderProgram({
                uniforms: [
                    {name: 'uPCamera', type: 'mat4'},
                    {name: 'uPosition', type: '3f'},
                    {name: 'uColorAlpha', type: '1f'},
                    {name: 'uScale', type: '2f'},
                    {name: 'uTexture', type: '1i'},
                    {name: 'uHalfSize', type: '2f'},
                    {name: 'uOffset', type: '2f'},
                    {name: 'uSmoothing', type: '1f'}
                ],
                attributes: [
                    {name: 'position'},
                    {name: 'texture'},
                    {name: 'index', index: true}
                ]
            });
            state.renderer = {
                getSize: () => [100, 50]
            };
        });

        it('should call updateWorldMatrix', () => {
            const spy = sinon.spy(sprite, 'updateLocalMatrix');

            sprite.position[1] = 123;
            sprite.updateLocalMatrix();
            sprite.render(state);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            const oldMatrix = slice(sprite.worldMatrix);

            sprite.position[1] = 123;
            sprite.updateLocalMatrix();
            sprite.visible = false;
            sprite.render(state);

            assert.deepEqual(oldMatrix, slice(sprite.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            const oldMatrix = slice(sprite.worldMatrix);

            sprite.position[1] = 123;
            sprite.render(state);

            assert.deepEqual(oldMatrix, slice(sprite.worldMatrix));
        });

        it('should\'t call material enable without texture', () => {
            const spy = sinon.spy(material, 'enable');
            sprite.render(state);
            assert.ok(!spy.called);
        });

        it('should\'t call material disable without texture', () => {
            const spy = sinon.spy(material, 'disable');
            sprite.render(state);
            assert.ok(!spy.called);
        });

        it('should call material enable with texture', () => {
            const spy = sinon.spy(material, 'enable');
            const texture = new Texture({});
            sprite.material.setTexture(texture);

            sprite.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call material disable with texture', () => {
            const spy = sinon.spy(material, 'disable');
            const texture = new Texture({});
            sprite.material.setTexture(texture);

            sprite.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#typifyForRender', () => {
        let typedObjects, spy;

        beforeEach(() => {
            spy = sinon.spy(material, 'typifyForRender');
            typedObjects = {sprites: []};
        });

        afterEach(() => {
            spy.restore();
            typedObjects = spy = null;
        });

        it('should call typifyForRender method from sprite material', () => {
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });

        it('should call twice typifyForRender method from sprite and child material', () => {
            const b = new Sprite(material);

            sprite.add(b);
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledTwice);
        });

        it('should not call if object invisible', () => {
            sprite.visible = false;
            sprite.typifyForRender(typedObjects);
            assert.ok(!spy.called);
        });

        it('should call once from object and not call from invisible child', () => {
            const b = new Sprite(material);
            b.visible = false;

            sprite.add(b);
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });
    });
});
