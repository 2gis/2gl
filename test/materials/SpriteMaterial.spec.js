import assert from 'assert';
import Material from '../../src/materials/Material';
import enums from '../../src/enums';

import SpriteMaterial from '../../src/materials/SpriteMaterial';

describe('SpriteMaterial', () => {
    let material;

    beforeEach(() => {
        material = new SpriteMaterial();
    });

    describe('#constructor', () => {
        it('shouldn\'t inherited from Material', () => {
            assert.ok(!(material instanceof Material));
        });

        it('should have opacity field', () => {
            assert.equal(material.opacity, 1);
        });

        it('should have smoothing field', () => {
            assert.equal(material.smoothing, 0);
        });

        it('should have right type', () => {
            assert.equal(enums.SPRITE_MATERIAL, material.type);
        });
    });

    describe('#setTexture and #getTexture', () => {
        it('should return null', () => {
            assert.equal(material.getTexture(), null);
        });

        it('should return same texture', () => {
            const texture = {};
            material.setTexture(texture);
            assert.equal(material.getTexture(), texture);
        });
    });
});
