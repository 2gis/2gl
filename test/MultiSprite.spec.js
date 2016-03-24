import assert from 'assert';
import {slice, getRenderState} from './utils';
import sinon from 'sinon';

import MultiSpriteProgram from '../src/programs/MultiSpriteProgram';
import Object3D from '../src/Object3D';
import Texture from '../src/Texture';

import MultiSprite from '../src/MultiSprite';

describe('MultiSprite', () => {
    let program, multiSprite;

    beforeEach(() => {
        program = new MultiSpriteProgram();
        multiSprite = new MultiSprite([], program);
    });

    afterEach(() => {
        program = null;
    });

    describe('#constructor', () => {
        it('should be inherited from Object3D', () => {
            assert.ok(multiSprite instanceof Object3D);
        });

        it('should assign program param to program property', () => {
            assert.equal(program, multiSprite.program);
        });

        it('should create all needed buffers', () => {
            multiSprite = new MultiSprite([
                {position: [1, 2]}
            ], program);

            assert.ok(multiSprite._geometry.getBuffer('position'));
            assert.ok(multiSprite._geometry.getBuffer('texture'));
            assert.ok(multiSprite._geometry.getBuffer('uPosition'));
            assert.ok(multiSprite._geometry.getBuffer('uScale'));
            assert.ok(multiSprite._geometry.getBuffer('uOffset'));
            assert.ok(multiSprite._geometry.getBuffer('uColorAlpha'));
        });
    });

    describe('#render', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = multiSprite;
            state.attributes = {
                texture: 1,
                uColorAlpha: 2,
                uOffset: 3,
                uScale: 4,
                uPosition: 5
            };
            state.uniforms = {
                uSmoothing: 3,
                uHalfSize: 4
            };
            state.renderer = {
                getSize: () => [100, 50]
            };
        });

        it('should call updateWorldMatrix', () => {
            const spy = sinon.spy(multiSprite, 'updateLocalMatrix');

            multiSprite.position[1] = 123;
            multiSprite.updateLocalMatrix();
            multiSprite.render(state);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            const oldMatrix = slice(multiSprite.worldMatrix);

            multiSprite.position[1] = 123;
            multiSprite.updateLocalMatrix();
            multiSprite.visible = false;
            multiSprite.render(state);

            assert.deepEqual(oldMatrix, slice(multiSprite.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            const oldMatrix = slice(multiSprite.worldMatrix);

            multiSprite.position[1] = 123;
            multiSprite.render(state);

            assert.deepEqual(oldMatrix, slice(multiSprite.worldMatrix));
        });

        it('should call program enable with texture', () => {
            const spy = sinon.spy(program, 'enable');
            const texture = new Texture({});
            multiSprite.program.setTexture(texture);

            multiSprite.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call program disable with texture', () => {
            const spy = sinon.spy(program, 'disable');
            const texture = new Texture({});
            multiSprite.program.setTexture(texture);

            multiSprite.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#typifyForRender', () => {
        let typedObjects, spy;

        beforeEach(() => {
            spy = sinon.spy(program, 'typifyForRender');
            typedObjects = {multiSprites: []};
        });

        afterEach(() => {
            spy.restore();
            typedObjects = spy = null;
        });

        it('should call typifyForRender method from multiSprite program', () => {
            const texture = new Texture({});
            multiSprite.program.setTexture(texture);

            multiSprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });

        it('should call twice typifyForRender method from multiSprite and child program', () => {
            const texture = new Texture({});
            program.setTexture(texture);
            const b = new MultiSprite([], program);

            multiSprite.add(b);
            multiSprite.typifyForRender(typedObjects);
            assert.ok(spy.calledTwice);
        });

        it('should not call if object invisible', () => {
            multiSprite.visible = false;
            multiSprite.typifyForRender(typedObjects);
            assert.ok(!spy.called);
        });

        it('should call once from object and not call from invisible child', () => {
            const texture = new Texture({});
            program.setTexture(texture);
            const b = new MultiSprite([], program);
            b.visible = false;

            multiSprite.add(b);
            multiSprite.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });
    });

    describe('setters', () => {
        beforeEach(() => {
            multiSprite = new MultiSprite([
                {position: [1, 2]}
            ], program);
        });

        describe('#setOpacity', () => {
            it('should update buffer', () => {
                multiSprite.setOpacity(0, 0.5);

                assert.deepEqual(multiSprite._data.uColorAlpha.array, [
                    0.5, 0.5, 0.5, 0.5, 0.5, 0.5
                ]);
            });
        });

        describe('#setPosition', () => {
            it('should update buffer', () => {
                multiSprite.setPosition(0, [5, 7]);

                assert.deepEqual(multiSprite._data.uPosition.array, [
                    5, 7, 0,
                    5, 7, 0,
                    5, 7, 0,
                    5, 7, 0,
                    5, 7, 0,
                    5, 7, 0
                ]);
            });
        });

        describe('#setElevation', () => {
            it('should update buffer', () => {
                multiSprite.setElevation(0, 5);

                assert.deepEqual(multiSprite._data.uPosition.array, [
                    1, 2, 5,
                    1, 2, 5,
                    1, 2, 5,
                    1, 2, 5,
                    1, 2, 5,
                    1, 2, 5
                ]);
            });
        });

        describe('#setSize', () => {
            it('should update buffer', () => {
                multiSprite.setSize(0, [5, 7]);

                assert.deepEqual(multiSprite._data.uScale.array, [
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7
                ]);
            });
        });

        describe('#setOffset', () => {
            it('should update buffer', () => {
                multiSprite.setOffset(0, [5, 7]);

                assert.deepEqual(multiSprite._data.uOffset.array, [
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7,
                    5, 7
                ]);
            });
        });

        describe('#setUV', () => {
            it('should update buffer', () => {
                multiSprite.setUV(0, [1, 2, 3, 4]);

                assert.deepEqual(multiSprite._data.texture.array, [
                    3, -3,
                    3, -1,
                    1, -3,
                    1, -1,
                    1, -3,
                    3, -1
                ]);
            });
        });
    });
});
