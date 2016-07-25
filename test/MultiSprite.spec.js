import assert from 'assert';
import {slice, getRenderState} from './utils';
import sinon from 'sinon';

import MultiSpriteMaterial from '../src/materials/MultiSpriteMaterial';
import ShaderProgram from '../src/ShaderProgram';
import Object3D from '../src/Object3D';
import Texture from '../src/Texture';
import {MULTI_SPRITE} from '../src/libConstants';

import MultiSprite from '../src/MultiSprite';

describe('MultiSprite', () => {
    let material, multiSprite;

    beforeEach(() => {
        material = new MultiSpriteMaterial();
        multiSprite = new MultiSprite([], material);
    });

    afterEach(() => {
        material = null;
    });

    describe('#constructor', () => {
        it('should be inherited from Object3D', () => {
            assert.ok(multiSprite instanceof Object3D);
        });

        it('should assign material param to material property', () => {
            assert.equal(material, multiSprite.material);
        });

        it('should create all needed buffers', () => {
            multiSprite = new MultiSprite([
                {position: [1, 2]}
            ], material);

            assert.ok(multiSprite._geometry.getBuffer('disposition'));
            assert.ok(multiSprite._geometry.getBuffer('texture'));
            assert.ok(multiSprite._geometry.getBuffer('position'));
            assert.ok(multiSprite._geometry.getBuffer('scale'));
            assert.ok(multiSprite._geometry.getBuffer('offset'));
            assert.ok(multiSprite._geometry.getBuffer('colorAlpha'));
        });

        it('should have right type', () => {
            assert.equal(MULTI_SPRITE, multiSprite.type);
        });
    });

    describe('#render', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = multiSprite;
            state.shaderProgram = new ShaderProgram({
                uniforms: [
                    {name: 'uPCamera', type: 'mat4'},
                    {name: 'uHalfSize', type: '2f'},
                    {name: 'uTexture', type: '1i'},
                    {name: 'uSmoothing', type: '1f'}
                ],
                attributes: [
                    {name: 'disposition'},
                    {name: 'texture'},
                    {name: 'position'},
                    {name: 'colorAlpha'},
                    {name: 'scale'},
                    {name: 'offset'}
                ]
            });
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

        it('should call material enable with texture', () => {
            const spy = sinon.spy(material, 'enable');
            const texture = new Texture({});
            multiSprite.material.setTexture(texture);

            multiSprite.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call material disable with texture', () => {
            const spy = sinon.spy(material, 'disable');
            const texture = new Texture({});
            multiSprite.material.setTexture(texture);

            multiSprite.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('setters', () => {
        beforeEach(() => {
            multiSprite = new MultiSprite([
                {position: [1, 2]}
            ], material);
        });

        describe('#setOpacity', () => {
            it('should update buffer', () => {
                multiSprite.setOpacity(0, 0.5);

                assert.deepEqual(multiSprite._data.colorAlpha.array, [
                    0.5, 0.5, 0.5, 0.5, 0.5, 0.5
                ]);
            });
        });

        describe('#setPosition', () => {
            it('should update buffer', () => {
                multiSprite.setPosition(0, [5, 7]);

                assert.deepEqual(multiSprite._data.position.array, [
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

                assert.deepEqual(multiSprite._data.position.array, [
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

                assert.deepEqual(multiSprite._data.scale.array, [
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

                assert.deepEqual(multiSprite._data.offset.array, [
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
