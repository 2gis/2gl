import definitions from './definitions';

let cachedPrograms = {};

export default class Program {
    constructor() {
        this._attributeList = [];
        this._uniformList = [];
        this._definitions = [];
        this._shader = null;
        this.opacity = 1;
    }

    enable(gl, scene, camera, mesh) {
        if (!this._shaderProgram) {
            this._prepare(gl, scene);
        }

        gl.useProgram(this._shaderProgram);

        for (let name in this.attributes) {
            gl.enableVertexAttribArray(this.attributes[name]);
        }

        this._bindMesh(gl, scene, camera, mesh);

        return this;
    }

    disable(gl) {
        for (let name in this.attributes) {
            gl.disableVertexAttribArray(this.attributes[name]);
        }

        return this;
    }

    define(type, value) {
        if (definitions[type]) {
            this._definitions.push({type, value});
        }

        return this;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    _prepare(gl, scene) {
        this._prepareShaders(gl);
        this._prepareAttributes(gl);
        this._prepareUniforms(gl);
    }

    _getCachedProgramKey() {
        return this.constructor.name + ':' + this._definitions.join(':');
    }

    _getCachedProgram() {
        return cachedPrograms[this._getCachedProgramKey()];
    }

    _prepareShaders(gl) {
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

    _prepareAttributes(gl) {
        this.attributes = {};

        this._attributeList.forEach(name => {
            this.attributes[name] = gl.getAttribLocation(this._shaderProgram, name);
        });
    }

    _prepareUniforms(gl) {
        this.uniforms = {};

        this._uniformList.forEach(name => {
            this.uniforms[name] = gl.getUniformLocation(this._shaderProgram, name);
        });
    }

    _bindMesh(gl, scene, camera, mesh) {
        this._bindAttributes(gl, mesh);
        this._bindUniforms(gl, scene, camera, mesh);
    }

    _bindAttributes(gl, mesh) {
        this._attributeList.forEach(name => {
            mesh.geometry.getBuffer(name).bind(gl, this.attributes[name]);
        });
    }

    _bindUniforms(gl, scene, camera, mesh) {
        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(mesh.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
    }
}
