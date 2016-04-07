/**
 * Шейдерная юниформа, используется только {@link ShaderProgram}
 *
 * @param {UniformDefinition} options
 * @ignore
 */
class ShaderUniform {
    constructor(options) {
        this.name = options.name;
        this.type = options.type;
        this.location = -1;
    }

    setLocation(gl, webglProgram) {
        this.location = gl.getUniformLocation(webglProgram, this.name);
        return this;
    }

    bind(gl, value) {
        const type = this.type;

        if (type === 'mat2') {
            gl.uniformMatrix2fv(this.location, false, value);
        } else if (type === 'mat3') {
            gl.uniformMatrix3fv(this.location, false, value);
        } else if (type === 'mat4') {
            gl.uniformMatrix4fv(this.location, false, value);
        } else if (type === '2f') {
            gl.uniform2f(this.location, value[0], value[1]);
        } else if (type === '3f') {
            gl.uniform3f(this.location, value[0], value[1], value[2]);
        } else if (type === '4f') {
            gl.uniform4f(this.location, value[0], value[1], value[2], value[3]);
        } else if (type === '2i') {
            gl.uniform2i(this.location, value[0], value[1]);
        } else if (type === '3i') {
            gl.uniform3i(this.location, value[0], value[1], value[2]);
        } else if (type === '4i') {
            gl.uniform4i(this.location, value[0], value[1], value[2], value[3]);
        } else {
            gl['uniform' + type](this.location, value);
        }

        return this;
    }
}

module.exports = ShaderUniform;

/**
 * Описание шейдерной юниформы
 *
 * @typedef {Object} UniformDefinition
 * @property {String} name Название юниформы
 * @property {String} type Тип юниформы, может быть: mat[234], [1234][fi], [1234][fi]v
 */
