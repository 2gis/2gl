import assert from 'assert';
import {slice, cubeVertices, getRenderState} from './utils';
import sinon from 'sinon';

import Geometry from '../src/Geometry';
import Buffer from '../src/Buffer';
import BasicMeshProgram from '../src/programs/BasicMeshProgram';
import Raycaster from '../src/Raycaster';
import {vec3} from 'gl-matrix';
import Object3D from '../src/Object3D';

import Mesh from '../src/Mesh';

describe('Mesh', () => {
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
        it('should inherited from Object3D', () => {
            assert.ok(mesh instanceof Object3D);
        });

        it('should be equal mesh.program and passed program as argument', () => {
            assert.equal(program, mesh.program);
        });

        it('should be equal mesh.geometry and passed geometry as argument', () => {
            assert.equal(geometry, mesh.geometry);
        });
    });

    describe('#render', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = mesh;
        });

        it('should update world matrix', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.render(state);

            assert.notDeepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.visible = false;
            mesh.render(state);

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            let oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.render(state);

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('should call program enable', () => {
            let spy = sinon.spy(program, 'enable');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call program disable', () => {
            let spy = sinon.spy(program, 'disable');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call gl drawArrays', () => {
            let spy = sinon.spy(state.gl, 'drawArrays');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#raycast', () => {
        let raycaster, intersects;

        beforeEach(() => {
            raycaster = new Raycaster(vec3.create(), vec3.fromValues(1, 0, 0));
            intersects = [];
        });

        afterEach(() => {
            raycaster = intersects = null;
        });

        it('should intersect ray in two places', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();

            mesh.raycast(raycaster, intersects);

            assert.equal(intersects.length, 2);
        });

        it('shouldn\'t intersect ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 10;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();

            mesh.raycast(raycaster, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\t intersect far ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();
            raycaster.far = 5;

            mesh.raycast(raycaster, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\t intersect near ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();
            raycaster.near = 15;

            mesh.raycast(raycaster, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\'t call raycast of child', () => {
            let child = new Object3D();
            mesh.add(child);
            let spy = sinon.spy(child, 'raycast');
            mesh.raycast(raycaster, intersects);
            assert.ok(!spy.called);
        });

        it('should call raycast of child if recursive is true', () => {
            let child = new Object3D();
            mesh.add(child);
            let spy = sinon.spy(child, 'raycast');
            mesh.raycast(raycaster, intersects, true);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#typifyForRender', () => {
        let typedObjects, spy;

        beforeEach(() => {
            spy = sinon.spy(program, 'typifyForRender');
            typedObjects = {common: [], transparent: []};
        });

        afterEach(() => {
            spy.restore();
            typedObjects = spy = null;
        });

        it('should call typifyForRender method from mesh program', () => {
            mesh.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });

        it('should call twice typifyForRender method from mesh and child program', () => {
            let b = new Mesh(geometry, program);

            mesh.add(b);
            mesh.typifyForRender(typedObjects);
            assert.ok(spy.calledTwice);
        });

        it('should not call if object invisible', () => {
            mesh.visible = false;
            mesh.typifyForRender(typedObjects);
            assert.ok(!spy.called);
        });

        it('should call once from object and not call from invisible child', () => {
            let b = new Mesh(geometry, program);
            b.visible = false;

            mesh.add(b);
            mesh.typifyForRender(typedObjects);
            assert.ok(spy.calledOnce);
        });
    });
});
