import ShaderAttribute from './ShaderAttribute';
import ShaderUniform from './ShaderUniform';

/**
 * Шейдерная программа инициализирует шейдеры, подготавливает и связывает данные с WebGL.
 *
 * @param {Object} options
 * @param {String | String[]} vertex Код вершинного шейдера. Либо строка, либо массив строк,
 * которые последовательно складываются.
 * @param {String | String[]} fragment Код фрагментного шейдера. Либо строка, либо массив строк,
 * которые последовательно складываются.
 * @param {UniformDefinition[]} [options.uniforms=[]] Описание юниформ
 * @param {AttributeDefinition[]} [options.attributes=[]] Описание атрибутов
 * @param {Object[]} [options.definitions=[]]
 */
class ShaderProgram {
    constructor(options = {}) {
        this._vertexShaderCode = this._getShaderCode(options.vertex);
        this._fragmentShaderCode = this._getShaderCode(options.fragment);

        this._uniforms = {};
        options.uniforms = options.uniforms || [];
        options.uniforms.forEach(obj => {
            this._uniforms[obj.name] = new ShaderUniform(obj);
        });

        this._attributes = {};
        options.attributes = options.attributes || [];
        options.attributes.forEach(obj => {
            this._attributes[obj.name] = new ShaderAttribute(obj);
        });

        this._definitions = options.definitions || [];

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

        for (const name in this._attributes) {
            this._attributes[name].enable(gl);
        }

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
                this._uniforms[name].bind(gl, uniforms[name]);
            }
        }

        if (attributes) {
            for (const name in attributes) {
                this._attributes[name].bind(gl, attributes[name]);
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
        for (const name in this._attributes) {
            this._attributes[name].disable(gl);
        }

        return this;
    }

    _getShaderCode(code) {
        return Array.isArray(code) ? code.join('\n') : (code || '');
    }

    _prepare(gl) {
        this._prepareShaders(gl);
        this._prepareAttributes(gl);
        this._prepareUniforms(gl);
    }

    _prepareShaders(gl) {
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, this._addDefinitions(this._fragmentShaderCode));
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fragmentShader));
            this._status = ShaderProgram.FAILED;
            return;
        }

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, this._addDefinitions(this._vertexShaderCode));
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vertexShader));
            this._status = ShaderProgram.FAILED;
            return;
        }

        this._webglProgram = gl.createProgram();
        gl.attachShader(this._webglProgram, vertexShader);
        gl.attachShader(this._webglProgram, fragmentShader);
        gl.linkProgram(this._webglProgram);

        if (!gl.getProgramParameter(this._webglProgram, gl.LINK_STATUS)) {
            console.log('Could not initialize shaders');
            this._status = ShaderProgram.FAILED;
            return;
        }

        this._status = ShaderProgram.READY;
        this._fragmentShaderCode = null;
        this._vertexShaderCode = null;
    }

    _addDefinitions(shader) {
        return this._definitions.map(def => {
            if (def.value !== undefined) {
                return '#define ' + def.type + ' ' + def.value;
            } else {
                return '#define ' + def.type;
            }
        }).join('\n') + '\n' + shader;
    }

    _prepareAttributes(gl) {
        for (const name in this._attributes) {
            this._attributes[name].setLocation(gl, this._webglProgram);
        }
    }

    _prepareUniforms(gl) {
        for (const name in this._uniforms) {
            this._uniforms[name].setLocation(gl, this._webglProgram);
        }
    }
}

ShaderProgram.NOT_READY = 1;
ShaderProgram.READY = 2;
ShaderProgram.FAILED = 3;

module.exports = ShaderProgram;
