import assert from 'assert';
import {slice, round, cubeVertices} from './utils';
import sinon from 'sinon';

import Mesh from '../src/Mesh';
import Geometry from '../src/Geometry';
import Buffer from '../src/Buffer';
import BasicMeshProgram from '../src/programs/BasicMeshProgram';

describe.skip('Mesh', () => {
    let geometry, program, mesh;

    beforeEach(() => {
        program = new BasicMeshProgram();

        geometry = new Geometry();
        geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

        mesh = new Mesh(geometry, program);
    });

    afterEach(() => {
        program = geometry = null;
    });

    describe('#constructor', () => {
        it('should be equal mesh.program and passed program as argument', () => {
            assert.equal(program, mesh.program);
        });

        it('should be equal mesh.geometry and passed geometry as argument', () => {
            assert.equal(geometry, mesh.geometry);
        });
    });

    describe('#render', () => {
        it('should update world matrix', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.render();

            assert.notDeepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.visible = false;
            mesh.render();

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.render();

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });
    });
});