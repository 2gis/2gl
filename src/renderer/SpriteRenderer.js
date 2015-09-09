import {sprite as shader} from '../shaders';
import Geometry from '../Geometry';
import Buffer from '../Buffer';

export default class SpriteRenderer {
    constructor() {
        this._shader = shader;
        this._geometry = new Geometry();
        this._geometry
            .setBuffer('position', new Buffer(new Float32Array([
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0.5, 0.5, 0,
                -0.5, 0.5, 0
            ]), 3))
            .setBuffer('texture', new Buffer(new Float32Array([
                0, 0,
                1, 0,
                1, 1,
                0, 1
            ]), 2))
            .setBuffer('index', new Buffer(new Uint16Array([
                1, 2, 0,
                3, 0, 2
            ]), 1));

        this._geometry.getBuffer('index').type = Buffer.ElementArrayBuffer;
    }

    render(state, renderObjects) {
        let {gl, scene, camera} = state;

        gl.disable(gl.DEPTH_TEST);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        if (!this._shaderProgram) {
            this._prepare(state);
        }

        gl.useProgram(this._shaderProgram);

        gl.enableVertexAttribArray(this._attributes.position);
        gl.enableVertexAttribArray(this._attributes.texture);

        this._geometry.getBuffer('position').bind(gl, this._attributes.position);
        this._geometry.getBuffer('texture').bind(gl, this._attributes.texture);

        gl.uniformMatrix4fv(this._uniforms.uPCamera, false, new Float32Array(camera.projectionInverseMatrix));

        this._geometry.getBuffer('index').bind(gl);

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(this._uniforms.uTexture, 0);

        state.uniforms = this._uniforms;

        renderObjects.forEach(object => object.render(state));

        gl.disableVertexAttribArray(this._attributes.position);
        gl.disableVertexAttribArray(this._attributes.texture);
    }

    _prepare(state) {
        this._prepareShaders(state);
        this._prepareAttributes(state);
        this._prepareUniforms(state);
    }

    _prepareShaders({gl}) {
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, this._shader.fragment);
        gl.compileShader(fragmentShader);

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, this._shader.vertex);
        gl.compileShader(vertexShader);

        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, vertexShader);
        gl.attachShader(this._shaderProgram, fragmentShader);
        gl.linkProgram(this._shaderProgram);
    }

    _prepareAttributes({gl}) {
        this._attributes = {
            position: gl.getAttribLocation(this._shaderProgram, 'position'),
            texture: gl.getAttribLocation(this._shaderProgram, 'texture')
        };
    }

    _prepareUniforms({gl}) {
        this._uniforms = {
            uPCamera: gl.getUniformLocation(this._shaderProgram, 'uPCamera'),
            uPosition: gl.getUniformLocation(this._shaderProgram, 'uPosition'),
            uColorAlpha: gl.getUniformLocation(this._shaderProgram, 'uColorAlpha'),
            uTexture: gl.getUniformLocation(this._shaderProgram, 'uTexture'),
            uScale: gl.getUniformLocation(this._shaderProgram, 'uScale'),
            uHalfSize: gl.getUniformLocation(this._shaderProgram, 'uHalfSize'),
            uOffset: gl.getUniformLocation(this._shaderProgram, 'uOffset'),
            uSmoothing: gl.getUniformLocation(this._shaderProgram, 'uSmoothing')
        };
    }
}
