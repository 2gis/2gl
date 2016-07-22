import assert from 'assert';
import Material from '../../src/materials/Material';
import {COMPLEX_MESH_MATERIAL} from '../../src/libConstants';

import ComplexMeshMaterial from '../../src/materials/ComplexMeshMaterial';

describe('ComplexMeshMaterial', () => {
    let material;

    beforeEach(() => {
        material = new ComplexMeshMaterial();
    });

    describe('#constructor', () => {
        it('should inherited from Material', () => {
            assert.ok(material instanceof Material);
        });

        it('should have opacity field', () => {
            assert.equal(material.opacity, 1);
        });

        it('should have right type', () => {
            assert.equal(COMPLEX_MESH_MATERIAL, material.type);
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
