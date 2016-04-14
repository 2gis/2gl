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
        this.location = -1;
    }

    setLocation(gl, shaderProgram) {
        this.location = gl.getAttribLocation(shaderProgram, this.name);
        return this;
    }

    enable(gl) {
        if (this.index !== true) {
            gl.enableVertexAttribArray(this.location);
        }
        return this;
    }

    bind(gl, buffer) {
        buffer.bind(gl, this.location);
        return this;
    }

    disable(gl) {
        if (this.index !== true) {
            gl.disableVertexAttribArray(this.location);
        }
        return this;
    }
}

module.exports = ShaderAttribute;

/**
 * Описание шейдерного атрибута
 *
 * @typedef {Object} AttributeDefinition
 * @property {String} name Название атрибута
 * @property {Boolean} [index] Если атрибут используется для передачи индексов, то true
 */
