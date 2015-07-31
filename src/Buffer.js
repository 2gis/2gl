export default class Buffer {
    constructor(array, itemSize) {
        this._array = array;
        this.itemSize = itemSize;
        this.length = array.length / itemSize;
    }

    bind(gl, attribute) {
        if (!this._glBuffer) {
            this._prepare(gl);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);
        gl.vertexAttribPointer(attribute, this.itemSize, gl.FLOAT, false, 0, 0);

        return this;
    }

    remove(gl) {
        if (this._glBuffer) {
            gl.deleteBuffer(this._glBuffer);
        }

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

    _prepare(gl) {
        this._glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._array, gl.STATIC_DRAW);
    }
}
