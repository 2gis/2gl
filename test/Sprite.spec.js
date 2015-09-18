import assert from 'assert';
import {slice, getRenderState} from './utils';
import sinon from 'sinon';

import SpriteProgram from '../src/programs/SpriteProgram';
import Object3D from '../src/Object3D';

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
            state.uniforms = {
                uColorAlpha: 1,
                uSmoothing: 2,
                uHalfSize: 3,
                uOffset: 4,
                uScale: 5,
                uPosition: 6
            };
            state.renderer = {
                getSize: () => [100, 50]
            }
        });

        it('should call updateWorldMatrix', () => {
            let spy = sinon.spy(sprite, 'updateLocalMatrix');

            sprite.position[1] = 123;
            sprite.updateLocalMatrix();
            sprite.render(state);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            let oldMatrix = slice(sprite.worldMatrix);

            sprite.position[1] = 123;
            sprite.updateLocalMatrix();
            sprite.visible = false;
            sprite.render(state);

            assert.deepEqual(oldMatrix, slice(sprite.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            let oldMatrix = slice(sprite.worldMatrix);

            sprite.position[1] = 123;
            sprite.render(state);

            assert.deepEqual(oldMatrix, slice(sprite.worldMatrix));
        });

        it('should call program enable', () => {
            let spy = sinon.spy(program, 'enable');
            sprite.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call program disable', () => {
            let spy = sinon.spy(program, 'disable');
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
            let b = new Sprite(program);

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
            let b = new Sprite(program);
            b.visible = false;

            sprite.add(b);
            sprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });
    });
});
