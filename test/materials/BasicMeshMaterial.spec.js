import assert from 'assert';
import {getRenderState, cubeVertices} from '../utils';
import Mesh from '../../src/Mesh';
import Material from '../../src/materials/Material';
import Geometry from '../../src/Geometry';
import Buffer from '../../src/Buffer';
import enums from '../../src/enums';

import BasicMeshMaterial from '../../src/materials/BasicMeshMaterial';

describe('BasicMeshMaterial', () => {
    let material, geometry, mesh, state;

    beforeEach(() => {
        state = getRenderState();
        material = new BasicMeshMaterial();

        geometry = new Geometry();
        geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

        mesh = new Mesh(geometry, material);

        state.object = mesh;
    });

    describe('#constructor', () => {
        it('should inherited from Material', () => {
            assert.ok(material instanceof Material);
        });

        it('should have opacity field', () => {
            assert.equal(material.opacity, 1);
        });

        it('should have color field', () => {
            assert.deepEqual(material.color, [0, 0, 0]);
        });

        it('should have right type', () => {
            assert.equal(enums.BASIC_MESH_MATERIAL, material.type);
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
});
