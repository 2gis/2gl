import ShaderAttribute from './ShaderAttribute';
import ShaderUniform from './ShaderUniform';

/**
 * Шейдерная программа инициализирует шейдеры, подготавливает и связывает данные с WebGL.
 *
 * @param {Object} options
 * @param {Shader} vertex Вершинный шейдер
 * @param {Shader} fragment Фрагментный шейдер
 * @param {UniformDefinition[]} [options.uniforms=[]] Описание юниформ
 * @param {AttributeDefinition[]} [options.attributes=[]] Описание атрибутов
 */
class ShaderProgram {
    constructor(options) {
        options = options || {};

        this._vertexShader = options.vertex;
        this._fragmentShader = options.fragment;

        this.uniforms = {};
        options.uniforms = options.uniforms || [];
        options.uniforms.forEach(obj => {
            this.uniforms[obj.name] = new ShaderUniform(obj);
        });

        this.attributes = {};
        options.attributes = options.attributes || [];
        options.attributes.forEach(obj => {
            this.attributes[obj.name] = new ShaderAttribute(obj);
        });

        this._linked = false;
        this._located = false;
        this._error = false;
    }

    /**
     * Инициализирует программу с контекстом WebGl
     *
     * @param {WebGLRenderingContext} gl
     */
    enable(gl) {
        if (this._error) {
            return this;
        }
        this.link(gl);
        this.locate(gl);
        if (this._error) {
            return this;
        }

        gl.useProgram(this._webglProgram);

        return this;
    }

    /**
     * Связывает юниформы и атрибуты программы с контекстом WebGl
     *
     * @param {WebGLRenderingContext} gl
     * @param {Object} [uniforms] Key-value объект содержащий значения юниформ
     * @param {Object} [attributes] Key-value объект содержащий значения атрибутов
     */
    bind(gl, uniforms, attributes) {
        if (this._error) {
            return this;
        }
        if (uniforms) {
            for (const name in uniforms) {
                this.uniforms[name].bind(gl, uniforms[name]);
            }
        }

        if (attributes) {
            for (const name in attributes) {
                this.attributes[name].bind(gl, attributes[name]);
            }
        }

        return this;
    }

    /**
     * Выключает программу
     *
     * @param {WebGLRenderingContext} gl
     */
    disable(gl) {
        if (this._error) {
            return this;
        }

        for (const name in this.attributes) {
            this.attributes[name].disable(gl);
        }

        return this;
    }

    /**
     * Компилирует шейдеры и слинковывает программу.
     * Одна из двух необходимых функций для работы шейдерной программы.
     *
     * @param {WebGLRenderingContext} gl
     */
    link(gl) {
        if (this._linked || this._error) {
            return this;
        }

        try {
            this._webglProgram = gl.createProgram();

            if (this._vertexShader) {
                gl.attachShader(this._webglProgram, this._vertexShader.get(gl));
            }

            if (this._fragmentShader) {
                gl.attachShader(this._webglProgram, this._fragmentShader.get(gl));
            }

            for (const name in this.attributes) {
                this.attributes[name].bindLocation(gl, this._webglProgram);
            }

            gl.linkProgram(this._webglProgram);
            if (!gl.getProgramParameter(this._webglProgram, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(this._webglProgram));
            }

            this._linked = true;
        } catch (error) {
            this._error = true;
            throw error;
        }

        return this;
    }

    /**
     * Лоцирует атрибуты и юниформе на основе шейдера.
     * Одна из двух необходимых функций для работы шейдерной программы.
     *
     * @param {WebGLRenderingContext} gl
     */
    locate(gl) {
        if (this._located || this._error) {
            return this;
        }

        for (const name in this.attributes) {
            this.attributes[name].getLocation(gl, this._webglProgram);
        }

        for (const name in this.uniforms) {
            this.uniforms[name].getLocation(gl, this._webglProgram);
        }

        this._located = true;

        return this;
    }
}

export default ShaderProgram;
