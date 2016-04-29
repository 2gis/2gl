import assert from 'assert';
import {slice, round} from './utils';
import sinon from 'sinon';

import Object3D from '../src/Object3D';

describe('Object3D', () => {
    let a, b, c;

    beforeEach(() => {
        a = new Object3D();
        b = new Object3D();
        c = new Object3D();
    });

    afterEach(() => {
        a = b = c = null;
    });

    it('#constructor', () => {
        assert.equal(typeof Object3D, 'function', 'Object3D is a class');

        const a = new Object3D();

        assert.ok(a instanceof Object3D, 'a is instance of Object3D');

        assert.equal(a.children.length, 0, 'a.children is empty');
    });

    describe('#add', () => {
        it('should have 1 child after add', () => {
            a.add(b);

            assert.equal(a.children.length, 1, 'a.children.length == 1');
            assert.equal(a.children[0], b, 'a.children[0] == b');
        });

        it('should have 2 child after add 2 objects', () => {
            a.add(b);
            a.add(c);

            assert.equal(a.children.length, 2, 'a.children.length == 2');
            assert.equal(a.children[1], c, 'a.children[1] == c');
        });

        it('should have 1 child after add twice object', () => {
            a.add(b);
            a.add(b);

            assert.equal(a.children.length, 1, 'a.children length == 1');
            assert.equal(a.children[0], b, 'a.children have b');
        });
    });

    describe('#remove', () => {
        it('should have 0 children after remove', () => {
            a.add(b);
            a.remove(b);

            assert.equal(a.children.length, 0);
        });

        it('should don\'t remove not own child', () => {
            a.add(b);
            a.remove(c);

            assert.equal(a.children.length, 1);
        });
    });

    it('#updateLocalMatrix', () => {
        const oldMatrix = slice(a.localMatrix);

        a.updateLocalMatrix();

        assert.deepEqual(oldMatrix, slice(a.localMatrix), 'old local matrix should be equal new after update');

        a.position[1] = 123;
        a.updateLocalMatrix();
        assert.notDeepEqual(oldMatrix, slice(a.localMatrix), 'matrix not equal after change position');

        assert.ok(a.worldMatrixNeedsUpdate, 'worldMatrixNeedsUpdate == true after updateLocalMatrix');
    });

    describe('#updateWorldMatrix', () => {
        let oldMatrix;

        beforeEach(() => {
            oldMatrix = slice(a.worldMatrix);
        });

        it('old world matrix should be equal new after update', () => {
            const oldMatrix = slice(a.worldMatrix);
            a.updateWorldMatrix();
            assert.deepEqual(oldMatrix, slice(a.worldMatrix));
        });

        it('shouldn\'t change matrix after change position and update', () => {
            const oldMatrix = slice(a.worldMatrix);
            a.position[1] = 123;
            a.updateWorldMatrix();
            assert.deepEqual(oldMatrix, slice(a.worldMatrix));
        });

        it('should update if local matrix changed', () => {
            a.position[1] = 123;
            a.updateLocalMatrix();
            a.updateWorldMatrix();
            assert.notDeepEqual(oldMatrix, slice(a.worldMatrix));
        });
    });

    describe('#render', () => {
        it('should update world matrix', () => {
            const oldMatrix = slice(a.worldMatrix);

            a.position[1] = 123;
            a.updateLocalMatrix();
            a.render();

            assert.notDeepEqual(oldMatrix, slice(a.worldMatrix));
        });

        it('shouldn\'t update world matrix if object is invisible', () => {
            const oldMatrix = slice(a.worldMatrix);

            a.position[1] = 123;
            a.updateLocalMatrix();
            a.visible = false;
            a.render();

            assert.deepEqual(oldMatrix, slice(a.worldMatrix));
        });

        it('shouldn\'t update world matrix if worldMatrixNeedsUpdate property is false', () => {
            const oldMatrix = slice(a.worldMatrix);

            a.position[1] = 123;
            a.render();

            assert.deepEqual(oldMatrix, slice(a.worldMatrix));
        });
    });

    it('#getWorldPosition', () => {
        a.add(b);

        assert.deepEqual(slice(b.getWorldPosition()), [0, 0, 0]);

        a.position[0] = 5;
        a.updateLocalMatrix();
        a.updateWorldMatrix();

        b.position[0] = 2.7;
        b.updateLocalMatrix();
        b.updateWorldMatrix();

        assert.deepEqual(slice(b.getWorldPosition()).map(c => round(c)), [7.7, 0, 0]);
    });

    it('#traverse', () => {
        const spy = sinon.spy();

        a.add(b);
        a.traverse(spy);

        assert.ok(spy.calledTwice);
    });

    describe('#traverseVisible', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
        });

        afterEach(() => {
            spy = null;
        });

        it('should call if object visible', () => {
            a.traverseVisible(spy);

            assert.ok(spy.calledOnce);
        });

        it('should not call if object invisible', () => {
            a.visible = false;
            a.traverseVisible(spy);

            assert.ok(!spy.called);
        });

        it('should call twice if have one visible children', () => {
            a.add(b);
            a.traverseVisible(spy);

            assert.ok(spy.calledTwice);
        });

        it('should call one if have all children are invisible', () => {
            a.add(b);
            b.visible = false;
            a.traverseVisible(spy);

            assert.ok(spy.calledOnce);
        });
    });
});
