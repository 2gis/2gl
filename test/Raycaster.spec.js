import assert from 'assert';
import sinon from 'sinon';
import {slice, cubeVertices} from './utils';
import {vec3} from 'gl-matrix';

import Ray from '../src/math/Ray';
import Object3D from '../src/Object3D';
import Geometry from '../src/Geometry';
import Buffer from '../src/Buffer';
import BasicMeshMaterial from '../src/materials/BasicMeshMaterial';
import Mesh from '../src/Mesh';

import Raycaster from '../src/Raycaster';

describe('Raycaster', () => {
    let raycaster, origin, direction, intersects;

    beforeEach(() => {
        origin = vec3.fromValues(0, 0, 0);
        direction = vec3.fromValues(1, 0, 0);
        raycaster = new Raycaster(origin, direction);
        intersects = [];
    });

    describe('#constructor', () => {
        it('should have ray with same origin and direction', () => {
            assert.ok(raycaster.ray instanceof Ray);
            assert.deepEqual(slice(raycaster.ray.origin), slice(origin));
            assert.deepEqual(slice(raycaster.ray.direction), slice(direction));
        });

        it('should have near 0 by default', () => {
            assert.equal(raycaster.near, 0);
        });

        it('should have far Infinity by default', () => {
            assert.equal(raycaster.far, Infinity);
        });

        it('should have same near field', () => {
            raycaster = new Raycaster(origin, direction, 5);
            assert.equal(raycaster.near, 5);
        });

        it('should have same far field', () => {
            raycaster = new Raycaster(origin, direction, 0, 10);
            assert.equal(raycaster.far, 10);
        });
    });

    describe('#intersectObject', () => {
        it('should call intersectMesh with mesh', () => {
            const material = new BasicMeshMaterial();
            const geometry = new Geometry();
            geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));
            const mesh = new Mesh(geometry, material);

            const spy = sinon.spy(raycaster, 'intersectMesh');
            raycaster.intersectObject(mesh, false);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call intersectMesh with Object3D', () => {
            const object = new Object3D();
            const spy = sinon.spy(raycaster, 'intersectMesh');
            raycaster.intersectObject(object, false);
            assert.ok(!spy.called);
        });

        it('should return same intersect array', () => {
            const intersect = [];
            const object = new Object3D();
            const result = raycaster.intersectObject(object, false, intersect);
            assert.equal(intersect, result);
        });

        it('should call intersectObjects with object children', () => {
            const object = new Object3D();
            const spy = sinon.spy(raycaster, 'intersectObjects');

            raycaster.intersectObject(object, true);
            assert.ok(spy.calledOnce);
        });

        it('should\'t call intersectObjects with object children', () => {
            const object = new Object3D();
            const spy = sinon.spy(raycaster, 'intersectObjects');

            raycaster.intersectObject(object, false);
            assert.ok(!spy.called);
        });
    });

    describe('#intersectObjects', () => {
        it('should call intersect with each object', () => {
            const childA = new Object3D();
            const childB = new Object3D();

            const spy = sinon.spy(raycaster, 'intersectObject');
            raycaster.intersectObjects([childA, childB], false);
            assert.ok(spy.calledTwice);
        });

        it('should return same intersect array', () => {
            const intersect = [];
            const childA = new Object3D();
            const childB = new Object3D();
            const result = raycaster.intersectObjects([childA, childB], false, intersect);
            assert.equal(intersect, result);
        });
    });

    describe('#intersectMesh', () => {
        let mesh;

        beforeEach(() => {
            const material = new BasicMeshMaterial();
            const geometry = new Geometry();
            geometry.setBuffer('position', new Buffer(new Float32Array(cubeVertices), 3));

            mesh = new Mesh(geometry, material);
        });

        it('should intersect ray in two places', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();

            raycaster.intersectMesh(mesh, false, intersects);

            assert.equal(intersects.length, 2);
        });

        it('should return array with two places', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();

            const result = raycaster.intersectMesh(mesh, false);

            assert.equal(result.length, 2);
        });

        it('shouldn\'t intersect ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 10;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();

            raycaster.intersectMesh(mesh, false, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\t intersect far ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();
            raycaster.far = 5;

            raycaster.intersectMesh(mesh, false, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\t intersect near ray', () => {
            mesh.position[0] = 10;
            mesh.position[1] = 0.25;
            mesh.updateLocalMatrix();
            mesh.updateWorldMatrix();
            raycaster.near = 15;

            raycaster.intersectMesh(mesh, false, intersects);

            assert.equal(intersects.length, 0);
        });

        it('shouldn\'t call intersectObject with child', () => {
            const child = new Object3D();
            mesh.add(child);
            const spy = sinon.spy(raycaster, 'intersectObject');
            raycaster.intersectMesh(mesh, false, intersects);
            assert.ok(!spy.called);
        });

        it('should call raycast of child if recursive is true', () => {
            const child = new Object3D();
            mesh.add(child);
            const spy = sinon.spy(raycaster, 'intersectObject');
            raycaster.intersectMesh(mesh, true, intersects);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#setFromCamera', () => {
        //
    });
});
