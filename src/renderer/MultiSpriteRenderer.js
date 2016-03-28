import {multiSprite as shader} from '../shaders';

/**
 * Отдельный рендер, используется для отрисовки мультиспрайтов.
 * @ignore
 */
class MultiSpriteRenderer {
    constructor(renderer) {
        this._renderer = renderer;
        this._shader = shader;
    }

    render(state, renderObjects) {
        const {gl, camera} = state;

        gl.disable(gl.DEPTH_TEST);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        if (!this._shaderProgram) {
            this._prepare(state);
        }

        gl.useProgram(this._shaderProgram);

        gl.enableVertexAttribArray(this._attributes.position);
        gl.enableVertexAttribArray(this._attributes.texture);
        gl.enableVertexAttribArray(this._attributes.uPosition);
        gl.enableVertexAttribArray(this._attributes.uColorAlpha);
        gl.enableVertexAttribArray(this._attributes.uScale);
        gl.enableVertexAttribArray(this._attributes.uOffset);

        state.attributes = this._attributes;
        state.uniforms = this._uniforms;

        gl.uniformMatrix4fv(this._uniforms.uPCamera, false, new Float32Array(camera.modelViewMatrix));

        const size = this._renderer.getSize();
        gl.uniform2f(this._uniforms.uHalfSize, size[0] / 2, size[1] / 2);

        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(this._uniforms.uTexture, 0);

        renderObjects.forEach(object => object.render(state));

        gl.disableVertexAttribArray(this._attributes.position);
        gl.disableVertexAttribArray(this._attributes.texture);
        gl.disableVertexAttribArray(this._attributes.uPosition);
        gl.disableVertexAttribArray(this._attributes.uColorAlpha);
        gl.disableVertexAttribArray(this._attributes.uScale);
        gl.disableVertexAttribArray(this._attributes.uOffset);

        return this;
    }

    _prepare(state) {
        this._prepareShaders(state);
        this._prepareAttributes(state);
        this._prepareUniforms(state);
    }

    _prepareShaders({gl}) {
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, this._shader.fragment);
        gl.compileShader(fragmentShader);

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
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
            texture: gl.getAttribLocation(this._shaderProgram, 'texture'),
            uPosition: gl.getAttribLocation(this._shaderProgram, 'uPosition'),
            uColorAlpha: gl.getAttribLocation(this._shaderProgram, 'uColorAlpha'),
            uScale: gl.getAttribLocation(this._shaderProgram, 'uScale'),
            uOffset: gl.getAttribLocation(this._shaderProgram, 'uOffset')
        };
    }

    _prepareUniforms({gl}) {
        this._uniforms = {
            uPCamera: gl.getUniformLocation(this._shaderProgram, 'uPCamera'),
            uHalfSize: gl.getUniformLocation(this._shaderProgram, 'uHalfSize'),
            uTexture: gl.getUniformLocation(this._shaderProgram, 'uTexture'),
            uSmoothing: gl.getUniformLocation(this._shaderProgram, 'uSmoothing')
        };
    }
}

export default MultiSpriteRenderer;
