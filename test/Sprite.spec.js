import assert from 'assert';
import {slice, getRenderState} from './utils';
import sinon from 'sinon';

import SpriteProgram from '../src/programs/SpriteProgram';
import ShaderProgram from '../src/ShaderProgram';
import Object3D from '../src/Object3D';
import Texture from '../src/Texture';

import Sprite from '../src/Sprite';

describe('Sprite', () => {
    let program, sprite;

    beforeEach(() => {
        program = new SpriteProgram();

        sprite = new Sprite(program);
    });

    afterEach(() => {
        program = null;
    });

    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            assert.ok(sprite instanceof Object3D);
        });

        it('should be equal sprite.program and passed program as argument', () => {
            assert.equal(program, sprite.program);
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

        it('should\'t call program enable without texture', () => {
            const spy = sinon.spy(program, 'enable');
            sprite.render(state);
            assert.ok(!spy.called);
        });

        it('should\'t call program disable without texture', () => {
            const spy = sinon.spy(program, 'disable');
            sprite.render(state);
            assert.ok(!spy.called);
        });

        it('should call program enable with texture', () => {
            const spy = sinon.spy(program, 'enable');
            const texture = new Texture({});
            sprite.program.setTexture(texture);

            sprite.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call program disable with texture', () => {
            const spy = sinon.spy(program, 'disable');
            const texture = new Texture({});
            sprite.program.setTexture(texture);

            sprite.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#typifyForRender', () => {
        let typedObjects, spy;

        beforeEach(() => {
            spy = sinon.spy(program, 'typifyForRender');
            typedObjects = {sprites: []};
        });

        afterEach(() => {
            spy.restore();
            typedObjects = spy = null;
        });

        it('should call typifyForRender method from sprite program', () => {
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });

        it('should call twice typifyForRender method from sprite and child program', () => {
            const b = new Sprite(program);

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
            const b = new Sprite(program);
            b.visible = false;

            sprite.add(b);
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });
    });
});
