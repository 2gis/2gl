import assert from 'assert';
import {slice, cubeVertices, getRenderState} from './utils';
import sinon from 'sinon';

import Geometry from '../src/Geometry';
import Buffer from '../src/Buffer';
import BasicMeshMaterial from '../src/materials/BasicMeshMaterial';
import Object3D from '../src/Object3D';
import enums from '../src/enums';
import Renderer from '../src/renderer/Renderer';

import Mesh from '../src/Mesh';

describe('Mesh', () => {
    let geometry, material, mesh;

    beforeEach(() => {
        material = new BasicMeshMaterial();

        geometry = new Geometry();
        geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

        mesh = new Mesh(geometry, material);
    });

    afterEach(() => {
        material = geometry = null;
    });

    describe('#constructor', () => {
        it('should inherited from Object3D', () => {
            assert.ok(mesh instanceof Object3D);
        });

        it('should be equal mesh.material and passed material as argument', () => {
            assert.equal(material, mesh.material);
        });

        it('should be equal mesh.geometry and passed geometry as argument', () => {
            assert.equal(geometry, mesh.geometry);
        });

        it('should have right type', () => {
            assert.equal(enums.MESH, mesh.type);
        });
    });

    describe('#render', () => {
        let state;

        beforeEach(() => {
            state = getRenderState();
            state.object = mesh;
        });

        it('should update world matrix', () => {
            const oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.render(state);

            assert.notDeepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            const oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.updateLocalMatrix();
            mesh.visible = false;
            mesh.render(state);

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            const oldMatrix = slice(mesh.worldMatrix);

            mesh.position[1] = 123;
            mesh.render(state);

            assert.deepEqual(oldMatrix, slice(mesh.worldMatrix));
        });

        it('should call material enable', () => {
            const spy = sinon.spy(material, 'enable');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call material disable', () => {
            const spy = sinon.spy(material, 'disable');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });

        it('should call gl drawArrays', () => {
            const spy = sinon.spy(state.gl, 'drawArrays');
            mesh.render(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#typifyForRender', () => {
        let renderer, spy;

        beforeEach(() => {
            spy = sinon.spy(material, 'typifyForRender');
            renderer = new Renderer();
        });

        afterEach(() => {
            spy.restore();
            renderer = spy = null;
        });

        it('should call typifyForRender method from mesh material', () => {
            mesh.typifyForRender(renderer._pluginsByType);
            assert.ok(spy.calledOnce);
        });

        it('should call twice typifyForRender method from mesh and child material', () => {
            const b = new Mesh(geometry, material);
            mesh.add(b);
            mesh.typifyForRender(renderer._pluginsByType);
            assert.ok(spy.calledTwice);
        });

        it('should not call if object invisible', () => {
            mesh.visible = false;
            mesh.typifyForRender(renderer._pluginsByType);
            assert.ok(!spy.called);
        });

        it('should call once from object and not call from invisible child', () => {
            const b = new Mesh(geometry, material);
            b.visible = false;

            mesh.add(b);
            mesh.typifyForRender(renderer._pluginsByType);
            assert.ok(spy.calledOnce);
        });
    });
});
