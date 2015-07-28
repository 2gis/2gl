import {basic as shader} from '../shaders';
import definitions from './definitions';

export default class Program {
    constructor() {
        this._attributeList = ['position', 'color', 'normal'];
        this._uniformList = ['uCamera', 'uPosition', 'uAmbientLightColor',
            'uDirectionLightColors', 'uDirectionLightPositions', 'uNormalMatrix'];
        this._definitions = [];
        this.define('directionLights', 1);
    }

    enable(gl) {
        if (!this._shaderProgram) {
            this._prepare(gl);
        }

        gl.useProgram(this._shaderProgram);

        for (let name in this.attributes) {
            gl.enableVertexAttribArray(this.attributes[name]);
        }

        return this;
    }

    disable(gl) {
        for (let name in this.attributes) {
            gl.disableVertexAttribArray(this.attributes[name]);
        }

        return this;
    }

    getAttribute(name) {
        return this.attributes[name];
    }

    getUniform(name) {
        return this.uniforms[name];
    }

    define(type, value) {
        if (definitions[type]) {
            this._definitions.push({type, value});
        }

        return this;
    }

    _prepare(gl) {
        this._prepareShaders(gl);
        this._prepareAttributes(gl);
        this._prepareUniforms(gl);
    }

    _prepareShaders(gl) {
        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._fragmentShader, this._addDefinitions(shader.fragment));
        gl.compileShader(this._fragmentShader);

        if (!gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this._fragmentShader));
        }

        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        console.log(this._addDefinitions(shader.vertex));
        gl.shaderSource(this._vertexShader, this._addDefinitions(shader.vertex));
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
            if (def.value) {
                return definitions[def.type] + ' ' + def.value;
            } else {
                return definitions[def.type];
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
}
