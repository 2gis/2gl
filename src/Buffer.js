export default class Buffer {
    constructor(array, itemSize) {
        this._array = array;
        this.itemSize = itemSize;
        this.length = array.length / itemSize;
        this.type = Buffer.ArrayBuffer;
        this._preparedGlContext = null;
    }

    bind(gl, attribute) {
        if (this._preparedGlContext !== gl) {
            this._unprepare(this._preparedGlContext);
        }

        if (!this._glBuffer) {
            this._prepare(gl);
        }

        if (this.type === Buffer.ArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);
            gl.vertexAttribPointer(attribute, this.itemSize, gl.FLOAT, false, 0, 0);
        } else if (this.type === Buffer.ElementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBuffer);
        }

        return this;
    }

    remove(gl) {
        this._unprepare(gl);

        return this;
    }

    getArray() {
        return this._array;
    }

    getElement(index) {
        return this._array.subarray(index * this.itemSize, (index + 1) * this.itemSize);
    }

    getTriangle(index) {
        return [
            this.getElement(index),
            this.getElement(index + 1),
            this.getElement(index + 2)
        ];
    }

    concat(buffer) {
        let addArray = buffer.getArray();
        let newArray = new this._array.constructor(this._array.length + addArray.length);
        newArray.set(this._array, 0);
        newArray.set(addArray, this._array.length);

        this._array = newArray;
        this.length = newArray.length / this.itemSize;
    }

    _prepare(gl) {
        this._glBuffer = gl.createBuffer();
        gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
        gl.bufferData(this._toGlParam(gl, this.type), this._array, gl.STATIC_DRAW);
        this._preparedGlContext = gl;
    }

    _unprepare(gl) {
        if (!gl) { return; }

        if (this._glBuffer) {
            gl.deleteBuffer(this._glBuffer);
        }
        this._glBuffer = null;
    }

    _toGlParam(gl, param) {
        if (param === Buffer.ArrayBuffer) { return gl.ARRAY_BUFFER; }
        if (param === Buffer.ElementArrayBuffer) { return gl.ELEMENT_ARRAY_BUFFER; }
    }
}

Buffer.ArrayBuffer = 1;
Buffer.ElementArrayBuffer = 2;
