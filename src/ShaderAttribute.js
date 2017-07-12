/**
 * Шейдерный атрибут, используется только {@link ShaderProgram}
 *
 * @param {AttributeDefinition} options
 * @ignore
 */
class ShaderAttribute {
    constructor(options) {
        this.name = options.name;
        this.index = options.index;
        this.location = options.location !== undefined ? options.location : -1;

        this._enable = false;
    }

    bindLocation(gl, shaderProgram) {
        if (this.location !== -1 && this.index !== true) {
            gl.bindAttribLocation(shaderProgram, this.location, this.name);
        }
        return this;
    }

    getLocation(gl, shaderProgram) {
        if (this.location === -1 && this.index !== true) {
            this.location = gl.getAttribLocation(shaderProgram, this.name);
        }
        return this;
    }

    bind(gl, buffer) {
        if (!this._enable && this.index !== true) {
            gl.enableVertexAttribArray(this.location);
            this._enable = true;
        }

        buffer.bind(gl, this.location);
        return this;
    }

    disable(gl) {
        if (this._enable && this.index !== true) {
            gl.disableVertexAttribArray(this.location);
            this._enable = false;
        }
        return this;
    }
}

export default ShaderAttribute;

/**
 * Описание шейдерного атрибута
 *
 * @typedef {Object} AttributeDefinition
 * @property {String} name Название атрибута
 * @property {Boolean} [index] Если атрибут используется для передачи индексов, то true
 * @property {Number} location Можно напрямую выставить location атрибуту, чтобы не вызывался getAttributeLocation
 */
