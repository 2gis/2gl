export default class Buffer {
    constructor(array, itemSize) {
        this.array = array;
        this.itemSize = itemSize;
        this.length = array.length / itemSize;
    }

    bind(gl, attribute) {
        if (!this.glBuffer) {
            this._prepare(gl);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
        gl.vertexAttribPointer(attribute, this.itemSize, gl.FLOAT, false, 0, 0);

        return this;
    }

    remove(gl) {
        if (this.glBuffer) {
            gl.deleteBuffer(this.glBuffer);
        }

        return this;
    }

    _prepare(gl) {
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);
    }
}
