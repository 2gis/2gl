import assert from 'assert';
import {getNewGlContext} from './utils';
import sinon from 'sinon';

import Buffer from '../src/Buffer';

describe('Buffer', () => {
    let buffer;

    beforeEach(() => {
        const squareVertices = [
            -1, 0, -1,
            1, 0, -1,
            -1, 0, 1,
            1, 0, 1,
            -1, 0, 1,
            1, 0, -1
        ];

        buffer = new Buffer(new Float32Array(squareVertices));
    });

    afterEach(() => {
        buffer = null;
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

        it('should init buffer with float type', () => {
            const spy = sinon.spy(gl, 'vertexAttribPointer');
            buffer.bind(gl, 1);
            const args = spy.args[0];
            assert.equal(args[2], gl.FLOAT);
        });

        it('should init buffer with unsigned byte type', () => {
            const buffer = new Buffer(new Float32Array(), {
                dataType: Buffer.UnsignedByte
            });
            const spy = sinon.spy(gl, 'vertexAttribPointer');
            buffer.bind(gl, 1);
            const args = spy.args[0];
            assert.equal(args[2], gl.UNSIGNED_BYTE);
        });

        it('should init with normalized = false', () => {
            const spy = sinon.spy(gl, 'vertexAttribPointer');
            buffer.bind(gl, 1);
            const args = spy.args[0];
            assert.equal(args[3], false);
        });

        it('should call vertexAttribPointer with arguments from options', () => {
            const options = {
                itemSize: 20,
                dataType: Buffer.UnsignedByte,
                normalized: true,
                stride: 21,
                offset: 22
            };
            const spy = sinon.spy(gl, 'vertexAttribPointer');
            buffer.bind(gl, 1, options);

            const args = spy.args[0];
            assert.equal(args[1], options.itemSize);
            assert.equal(args[2], gl.UNSIGNED_BYTE);
            assert.equal(args[3], options.normalized);
            assert.equal(args[4], options.stride);
            assert.equal(args[5], options.offset);
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
