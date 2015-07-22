import fragmentShader from './triangle.frag';
import vertexShader from './triangle.vert';
import glm from 'gl-matrix';

export default class Triangle {
    constructor() {
        this._vertices = [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];

        this.initializedFromRender = false;
    }

    initFromRender(gl) {
        this.initializedFromRender = true;

        this._gl = gl;
        this._initShaders();
        this._initData();
    }

    render() {
        let gl = this._gl;

        this._mvMatrix = glm.mat4.create();
        this._pMatrix = glm.mat4.create();

        glm.mat4.perspective(this._pMatrix, 45, window.innerWidth / window.innerHeight, 0.1, 100.0);
        glm.mat4.identity(this._mvMatrix);
        glm.mat4.translate(this._mvMatrix, this._mvMatrix, [-1.5, 0.0, -7.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        gl.vertexAttribPointer(this._vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(this._mvMatrixUniform, false, this._mvMatrix);
        gl.uniformMatrix4fv(this._pMatrixUniform, false, this._pMatrix);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    _initShaders() {
        let gl = this._gl;

        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._fragmentShader, fragmentShader);
        gl.compileShader(this._fragmentShader);

        if (!gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this._fragmentShader));
        }

        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this._vertexShader, vertexShader);
        gl.compileShader(this._vertexShader);

        if (!gl.getShaderParameter(this._vertexShader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(this._vertexShader));
        }

        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, this._vertexShader);
        gl.attachShader(this._shaderProgram, this._fragmentShader);
        gl.linkProgram(this._shaderProgram);

        if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
            console.log('Could not initialise shaders');
        }

        gl.useProgram(this._shaderProgram);

        this._vertexPositionAttribute = gl.getAttribLocation(this._shaderProgram, 'aVertexPosition');
        gl.enableVertexAttribArray(this._vertexPositionAttribute);

        this._pMatrixUniform = gl.getUniformLocation(this._shaderProgram, 'uPMatrix');
        this._mvMatrixUniform = gl.getUniformLocation(this._shaderProgram, 'uMVMatrix');
    }

    _initData() {
        let gl = this._gl;

        this._vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);
    }
}
