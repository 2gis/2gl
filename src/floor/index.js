import fragmentShader from './floor.frag';
import vertexShader from './floor.vert';

export default class Floor {
    constructor(options) {
        this._vertices = options.vertices;
        this._dataRooms = options.rooms;

        this.initializedFromRender = false;
    }

    initFromRender(gl) {
        this.initializedFromRender = true;

        this._gl = gl;
        this._initShaders();
        this._initRooms();
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

        this._mvMatrixUniform = gl.getUniformLocation(this._shaderProgram, 'uMVMatrix');
    }

    _initRooms(dataRooms) {
        let gl = this._gl;

        this._vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);

        this._vertexIndices = [];
        this._colorVertices = [];

        this._dataRooms.forEach(room => {
            this._vertexIndices = this._vertexIndices.concat(room.areaIndices);

            let colors = [];
            for (let i = 0; i < room.areaIndices.length * 3; i++) {
                colors.push(room.color);
            }

            this._colorVertices = this._colorVertices.concat(colors);
        });

        this._vertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._vertexIndexBuffer), gl.STATIC_DRAW);

        this._vertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colorVertices), gl.STATIC_DRAW);
    }
}
