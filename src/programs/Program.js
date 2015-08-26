import definitions from './definitions';

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

        this._bindAttributes(gl, mesh);
        this._bindUniforms(gl, scene, camera, mesh);

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

    _prepareShaders(gl) {
        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._fragmentShader, this._addDefinitions(this._shader.fragment));
        gl.compileShader(this._fragmentShader);

        if (!gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this._fragmentShader));
        }

        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this._vertexShader, this._addDefinitions(this._shader.vertex));
        gl.compileShader(this._vertexShader);

        if (!gl.getShaderParameter(this._vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this._vertexShader));
        }

        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, this._vertexShader);
        gl.attachShader(this._shaderProgram, this._fragmentShader);
        gl.linkProgram(this._shaderProgram);

        if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
            console.log('Could not initialize shaders');
        }
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
