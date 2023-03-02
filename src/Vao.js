/**
 * Обертка над vertex array object.
 * https://developer.mozilla.org/ru/docs/Web/API/OES_vertex_array_object
 *
 * Для использования необходимо включить расширение renderer.addExtension('OES_vertex_array_object')
 *
 * @param {ShaderProgram} Шейдерная программа, каждый Vao привязан к одной шейдерной программе.
 * @param {Object} Key-value объект содержащий данные атрибутов.
 */
class Vao {
    constructor(shaderProgram, attributes = {}) {
        this._vao = null;
        this._attributes = attributes;
        this._shaderProgram = shaderProgram;

        /**
         * WebGL экстеншен, в котором был инициализирован буфер.
         */
        this._vaoExt = null;
    }

    /**
     * Связывает vao с контекстом WebGL.
     *
     * @param {State} Стейт рендера
     */
    bind(state) {
        const vaoExt = state.extensions.OES_vertex_array_object;
        const instancesExt = state.extensions.ANGLE_instanced_arrays;

        this._bind(state.gl, vaoExt, instancesExt);

        return this;
    }

    /**
     * Отвязывает vao от контекста WebGL.
     * ВНИМАНИЕ: Этот метод нужно вызывать всегда, перед тем как будет использоваться
     * стандартный подход для связывания атрибутов через {@link ShaderProgram#bind}.
     */
    unbind() {
        this._glBindVertexArray(null);

        return this;
    }

    setAttribute(name, buffer) {
        this._attributes[name] = buffer;
    }

    /**
     * Удаляет vao.
     */
    remove() {
        if (this._vao) {
            this._glDeleteVertexArray(this._vao);
            this._vao = undefined;
        }

        return this;
    }

    _bind(gl, vaoExt, instancesExt) {
        if (!this._vao) {
            this._prepare(gl, vaoExt, instancesExt);
        } else {
            this._glBindVertexArray(this._vao);
        }
    }

    _prepare(gl, vaoExt, instancesExt) {
        this._gl = gl;
        this._vaoExt = vaoExt;

        this._vao = this._glCreateVertexArray();
        this._glBindVertexArray(this._vao);

        const shaderAttributes = this._shaderProgram.attributes;
        const attributes = this._attributes;

        // Биндим атрибуты переданные в конструктор, их параметры берём из шейдерной программы
        for (const name in attributes) {
            const shaderAttribute = shaderAttributes[name];
            if (shaderAttribute.index !== true) {
                gl.enableVertexAttribArray(shaderAttribute.location);
            }
            attributes[name].bind(gl, shaderAttribute.location, instancesExt);
        }
    }

    _glCreateVertexArray() {
        const gl = this._gl;
        const ext = this._vaoExt;
        if (this._isWebGL2(gl)) {
            return gl.createVertexArray();
        } else if (ext) {
            return ext.createVertexArrayOES();
        }
        return undefined;
    }

    _glBindVertexArray(vao) {
        const gl = this._gl;
        const ext = this._vaoExt;
        if (this._isWebGL2(gl)) {
            gl.bindVertexArray(vao);
        } else if (ext) {
            ext.bindVertexArrayOES(vao);
        } else {
            // В случае фоллбека - биндим атрибуты прямо из шейдерной программы
            this._shaderProgram.bind(gl, null, this._attributes);
        }
    }

    _glDeleteVertexArray(vao) {
        const gl = this._gl;
        const ext = this._vaoExt;
        if (this._isWebGL2(gl)) {
            gl.deleteVertexArray(vao);
        } else if (ext) {
            ext.deleteVertexArrayOES(vao);
        }
    }

    _isWebGL2(gl) {
        return 'WebGL2RenderingContext' in window && gl instanceof WebGL2RenderingContext;
    }
}

export default Vao;
