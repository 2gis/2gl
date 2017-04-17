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

        this._status = ShaderProgram.NOT_READY;
    }

    /**
     * Инициализирует программу с контекстом WebGl
     *
     * @param {WebGLRenderingContext} gl
     */
    enable(gl) {
        if (this._status === ShaderProgram.NOT_READY) {
            this._prepare(gl);
        }

        if (this._status !== ShaderProgram.READY) { return this; }

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
        for (const name in this.attributes) {
            this.attributes[name].disable(gl);
        }

        return this;
    }

    _prepare(gl) {
        this._webglProgram = gl.createProgram();

        if (this._vertexShader) {
            gl.attachShader(this._webglProgram, this._vertexShader.get(gl));
        }

        if (this._fragmentShader) {
            gl.attachShader(this._webglProgram, this._fragmentShader.get(gl));
        }

        gl.linkProgram(this._webglProgram);

        if (process.env.NODE_ENV !== 'production' && !gl.getProgramParameter(this._webglProgram, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(this._webglProgram));
            this._status = ShaderProgram.FAILED;
            return;
        }

        this._status = ShaderProgram.READY;

        for (const name in this.attributes) {
            this.attributes[name].setLocation(gl, this._webglProgram);
        }

        for (const name in this.uniforms) {
            this.uniforms[name].setLocation(gl, this._webglProgram);
        }
    }
}

ShaderProgram.NOT_READY = 1;
ShaderProgram.READY = 2;
ShaderProgram.FAILED = 3;

export default ShaderProgram;
