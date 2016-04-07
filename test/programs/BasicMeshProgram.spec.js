import assert from 'assert';
import {getRenderState, cubeVertices} from '../utils';
import Mesh from '../../src/Mesh';
import Program from '../../src/programs/Program';
import Geometry from '../../src/Geometry';
import Buffer from '../../src/Buffer';

import BasicMeshProgram from '../../src/programs/BasicMeshProgram';

describe('BasicMeshProgram', () => {
    let program, geometry, mesh, state;

    beforeEach(() => {
        state = getRenderState();
        program = new BasicMeshProgram();

        geometry = new Geometry();
        geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

        mesh = new Mesh(geometry, program);

        state.object = mesh;
    });

    describe('#constructor', () => {
        it('should inherited from Program', () => {
            assert.ok(program instanceof Program);
        });

        it('should have opacity field', () => {
            assert.equal(program.opacity, 1);
        });

        it('should have color field', () => {
            assert.deepEqual(program.color, [0, 0, 0]);
        });
    });

    describe('#enable', () => {
        it('should exist', () => {
            program.enable(state);
        });
    });

    describe('#disable', () => {
        it('should exist', () => {
            program.disable(state.gl);
        });
    });
});
