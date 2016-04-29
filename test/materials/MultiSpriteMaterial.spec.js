import assert from 'assert';
import Material from '../../src/materials/Material';
import enums from '../../src/enums';

import MultiSpriteMaterial from '../../src/materials/MultiSpriteMaterial';

describe('MultiSpriteMaterial', () => {
    let material;

    beforeEach(() => {
        material = new MultiSpriteMaterial();
    });

    describe('#constructor', () => {
        it('shouldn\'t inherited from Material', () => {
            assert.ok(!(material instanceof Material));
        });

        it('should have smoothing field', () => {
            assert.equal(material.smoothing, 1);
        });

        it('should have right type', () => {
            assert.equal(enums.MULTI_SPRITE_MATERIAL, material.type);
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
