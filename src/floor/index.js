import fragmentShader from './floor.frag';
import vertexShader from './floor.vert';
import glm from 'gl-matrix';
import utils from '../utils';

export default class Floor {
    constructor(options) {
        this._dataVertices = options.vertices;
        this._dataRooms = options.rooms;
        this._dataIslands = options.islands;
        this._dataFloor = options;

        this.initializedFromRender = false;
    }

    initFromRender(gl) {
        if (this.initializedFromRender) { return; }

        this.initializedFromRender = true;

        this._gl = gl;
        this._initShaders();
        this._initRooms();
    }

    render(camera) {
        let gl = this._gl;

        this._mvMatrix = glm.mat4.create();
        this._pMatrix = glm.mat4.create();

        glm.mat4.perspective(this._pMatrix, 45, window.innerWidth / window.innerHeight, 10, 100000.0);
        glm.mat4.identity(this._mvMatrix);
        glm.mat4.translate(this._mvMatrix, this._mvMatrix, [-1.5, 0.0, -207.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        gl.vertexAttribPointer(this._vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexColorBuffer);
        gl.vertexAttribPointer(this._vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(this._mvMatrixUniform, false, this._mvMatrix);
        gl.uniformMatrix4fv(this._pMatrixUniform, false, camera.matrix);

        gl.drawArrays(gl.TRIANGLES, 0, this._vertices.length / 3);
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

        this._vertexColorAttribute = gl.getAttribLocation(this._shaderProgram, 'aVertexColor');
        gl.enableVertexAttribArray(this._vertexColorAttribute);

        this._pMatrixUniform = gl.getUniformLocation(this._shaderProgram, 'uPMatrix');
        this._mvMatrixUniform = gl.getUniformLocation(this._shaderProgram, 'uMVMatrix');
    }

    _initRooms() {
        let gl = this._gl;

        this._vertices = [];
        this._colorVertices = [];

        let addAreas = room => {
            let vertices = utils.mapIndicesToVertices(this._dataVertices, room.areaIndices);
            this._vertices = this._vertices.concat(vertices);

            let colorVertices = [];

            for (let i = 0; i < vertices.length / 3; i++) {
                colorVertices = colorVertices.concat(room.color);
            }

            this._colorVertices = this._colorVertices.concat(colorVertices);
        };

        let addWalls = room => {
            let vertices = utils.mapIndicesToVertices(this._dataVertices, room.wallIndices);
            this._vertices = this._vertices.concat(vertices);

            let colorVertices = [];
            let color = room.color.map(c => c * 0.95);
            color[3] = 1;

            for (let i = 0; i < vertices.length / 3; i++) {
                colorVertices = colorVertices.concat(color);
            }

            this._colorVertices = this._colorVertices.concat(colorVertices);
        };

        let addWallTopAreas = room => {
            let vertices = utils.mapIndicesToVertices(this._dataVertices, room.wallTopAreaIndices);
            this._vertices = this._vertices.concat(vertices);

            let colorVertices = [];

            for (let i = 0; i < vertices.length / 3; i++) {
                colorVertices = colorVertices.concat([1, 1, 1, 1]);
            }

            this._colorVertices = this._colorVertices.concat(colorVertices);
        };

        // полы
        addAreas(this._dataFloor);
        this._dataRooms.forEach(addAreas);
        this._dataIslands.forEach(addAreas);

        // стены
        addWalls(this._dataFloor);
        this._dataRooms.forEach(addWalls);
        this._dataIslands.forEach(addWalls);

        // верхушки стен
        addWallTopAreas(this._dataFloor);
        this._dataRooms.forEach(addWallTopAreas);

        this._vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);

        this._vertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colorVertices), gl.STATIC_DRAW);
    }
}
