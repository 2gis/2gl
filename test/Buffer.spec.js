import assert from 'assert';
import {slice, flatten, getNewGlContext} from './utils';
import sinon from 'sinon';

import Buffer from '../src/Buffer';

describe('Buffer', () => {
    let squareVertices, buffer;

    beforeEach(() => {
        squareVertices = [
            -1, 0, -1,
            1, 0, -1,
            -1, 0, 1,
            1, 0, 1,
            -1, 0, 1,
            1, 0, -1
        ];

        buffer = new Buffer(new Float32Array(squareVertices), 3);
    });

    afterEach(() => {
        squareVertices = buffer = null;
    });

    describe('#constructor', () => {
        it('should have right itemSize field', () => {
            assert.equal(buffer.itemSize, 3);
        });

        it('should calculate right length field', () => {
            assert.equal(buffer.length, 6);
        });

        it('should have right default field', () => {
            assert.equal(buffer.type, Buffer.ArrayBuffer);
        });
    });

    describe('#bind', () => {
        let gl;

        beforeEach(() => {
            gl = getNewGlContext();
        });

        afterEach(() => {
            gl = null;
        });

        it('should call gl.vertexAttribPointer by default', () => {
            const spy = sinon.spy(gl, 'vertexAttribPointer');

            buffer.bind(gl, 1);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call gl.vertexAttribPointer if buffer for indices', () => {
            const spy = sinon.spy(gl, 'vertexAttribPointer');

            buffer.type = Buffer.ElementArrayBuffer;
            buffer.bind(gl);

            assert.ok(!spy.called);
        });

        it('should delete and init buffer if gl context changed', () => {
            buffer.bind(gl, 1);

            const newGlContext = getNewGlContext();
            const spy = sinon.spy(newGlContext, 'createBuffer');

            buffer.bind(newGlContext);

            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t delete and init buffer if gl context not changed', () => {
            const spy = sinon.spy(gl, 'createBuffer');
            buffer.bind(gl, 1);
            buffer.bind(gl, 1);

            assert.ok(spy.calledOnce);
        });
    });

    describe('#getArray', () => {
        it('should return same squareVertices', () => {
            assert.deepEqual(squareVertices, slice(buffer.getArray()));
        });
    });

    describe('#getElement', () => {
        it('should return second element', () => {
            const element = squareVertices.slice(3, 6);
            assert.deepEqual(element, slice(buffer.getElement(1)));
        });
    });

    describe('#getTriangle', () => {
        it('should return second triangle', () => {
            const triangle = squareVertices.slice(9, 18);
            assert.deepEqual(triangle, flatten(buffer.getTriangle(1)));
        });
    });

    describe('#concat', () => {
        it('should concat buffer', () => {
            const anotherVertexBuffer = new Buffer([9, 9, 9], 3);

            buffer.concat(anotherVertexBuffer);

            assert.equal(buffer.getArray().length, 21);
        });
    });

    describe('#remove', () => {
        it('should call gl.deleteBuffer if initialize', () => {
            const gl = getNewGlContext();
            const spy = sinon.spy(gl, 'deleteBuffer');

            buffer.bind(gl, 1);
            buffer.remove(gl);

            assert.ok(spy.called);
        });

        it('shouldn\'t call gl.deleteBuffer', () => {
            const gl = getNewGlContext();
            const spy = sinon.spy(gl, 'deleteBuffer');

            buffer.remove();

            assert.ok(!spy.called);
        });
    });
});
