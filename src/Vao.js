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
         * Используется только для удаления vao, подумать хорошо, прежде чем использовать для чего-то ещё.
         */
        this._ext = null;
    }

    /**
     * Связывает vao с контекстом WebGL.
     *
     * @param {State} Стейт рендера
     */
    bind(state) {
        const ext = state.extensions.OES_vertex_array_object;

        this._bind(state.gl, ext);

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

    _bind(gl, ext) {
        if (!this._vao) {
            this._prepare(gl, ext);
        } else {
            this._glBindVertexArray(this._vao);
        }
    }

    _prepare(gl, ext) {
        this._gl = gl;
        this._ext = ext;

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
            attributes[name].bind(gl, shaderAttribute.location, undefined);
        }
    }

    _glCreateVertexArray() {
        const gl = this._gl;
        const ext = this._ext;
        if (this._isWebGL2(gl)) {
            return gl.createVertexArray();
        } else if (ext) {
            return ext.createVertexArrayOES();
        }
        return undefined;
    }

    _glBindVertexArray(vao) {
        const gl = this._gl;
        const ext = this._ext;
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
        const ext = this._ext;
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
