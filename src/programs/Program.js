import definitions from './definitions';

let cachedPrograms = {};

/**
 * Базовый класс для программ.
 * Программа инициализирует шейдеры, подготавливает и связывает данные с WebGL.
 */
class Program {
    constructor() {
        this._attributeList = [];
        this._uniformList = [];
        this._definitions = [];
        this._shader = null;

        /**
         * Прозрачность объекта отрисованного с помощью данной программы
         * @type {Number}
         */
        this.opacity = 1;
    }

    /**
     * Инициализирует программу. Связывает переменные шейдера с данными.
     * @param {State} state
     */
    enable(state) {
        let gl = state.gl;

        if (!this._shaderProgram) {
            this._prepare(state);
        }

        gl.useProgram(this._shaderProgram);

        for (let name in this.attributes) {
            gl.enableVertexAttribArray(this.attributes[name]);
        }

        this._bindMesh(state);

        return this;
    }

    /**
     * Отключает программу
     * @param {WebGLRenderingContext} gl
     */
    disable(gl) {
        for (let name in this.attributes) {
            gl.disableVertexAttribArray(this.attributes[name]);
        }

        return this;
    }

    /**
     * Добавляет definitions в код шейдеров. Все добавления должны быть сделаны до первой инициализации.
     * @param {String} type
     * @param {Number | String} value
     */
    define(type, value) {
        if (definitions[type]) {
            this._definitions.push({type, value});
        }

        return this;
    }

    /**
     * Вызывается объектом использующую данную программу,
     * чтобы определить к какому типу рендера принадлежит объект.
     * Самое простое разделение: на прозрачные и нет.
     *
     * @param {TypedObjects} typedObjects
     * @param {Object3D} object
     */
    typifyForRender(typedObjects, object) {
        if (this.opacity === 1) {
            typedObjects.common.push(object);
        } else {
            typedObjects.transparent.push(object);
        }
    }

    _prepare(state) {
        this._prepareShaders(state);
        this._prepareAttributes(state);
        this._prepareUniforms(state);
    }

    _getCachedProgramKey() {
        return this.constructor.name + ':' + this._definitions.join(':');
    }

    _getCachedProgram() {
        return cachedPrograms[this._getCachedProgramKey()];
    }

    _prepareShaders({gl}) {
        let cachedProgram = this._getCachedProgram();

        if (cachedProgram && gl === cachedProgram.glContext) {
            this._shaderProgram = cachedProgram.program;
            return;
        }

        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, this._addDefinitions(this._shader.fragment));
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(fragmentShader));
        }

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, this._addDefinitions(this._shader.vertex));
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(vertexShader));
        }

        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, vertexShader);
        gl.attachShader(this._shaderProgram, fragmentShader);
        gl.linkProgram(this._shaderProgram);

        if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
            console.log('Could not initialize shaders');
        }

        cachedPrograms[this._getCachedProgramKey()] = {
            glContext: gl,
            program: this._shaderProgram
        };
    }

    _addDefinitions(shader) {
        return this._definitions.map(def => {
            if (def.value !== undefined) {
                return '#define ' + definitions[def.type] + ' ' + def.value;
            } else {
                return '#define ' + definitions[def.type];
            }
        }).join('\n') + '\n' + shader;
    }

    _prepareAttributes({gl}) {
        this.attributes = {};

        this._attributeList.forEach(name => {
            this.attributes[name] = gl.getAttribLocation(this._shaderProgram, name);
        });
    }

    _prepareUniforms({gl}) {
        this.uniforms = {};

        this._uniformList.forEach(name => {
            this.uniforms[name] = gl.getUniformLocation(this._shaderProgram, name);
        });
    }

    _bindMesh(state) {
        this._bindAttributes(state);
        this._bindUniforms(state);
    }

    _bindAttributes({gl, object}) {
        this._attributeList.forEach(name => {
            object.geometry.getBuffer(name).bind(gl, this.attributes[name]);
        });
    }

    _bindUniforms({object, camera}) {
        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.modelViewMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
    }
}

export default Program;
