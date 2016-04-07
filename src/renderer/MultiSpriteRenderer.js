import {multiSprite as shader} from '../shaders';
import ShaderProgram from '../ShaderProgram';

/**
 * Отдельный рендер, используется для отрисовки мультиспрайтов.
 * @ignore
 */
class MultiSpriteRenderer {
    constructor(renderer) {
        this._renderer = renderer;
        this._shader = shader;

        this._shaderProgram = new ShaderProgram({
            vertex: shader.vertex,
            fragment: shader.fragment,
            uniforms: [
                {name: 'uPCamera', type: 'mat4'},
                {name: 'uHalfSize', type: '2f'},
                {name: 'uTexture', type: '1i'},
                {name: 'uSmoothing', type: '1f'}
            ],
            attributes: [
                {name: 'disposition'},
                {name: 'texture'},
                {name: 'position'},
                {name: 'colorAlpha'},
                {name: 'scale'},
                {name: 'offset'}
            ]
        });
    }

    render(state, renderObjects) {
        const size = this._renderer.getSize();
        const {gl, camera} = state;

        state.shaderProgram = this._shaderProgram;

        gl.disable(gl.DEPTH_TEST);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        this._shaderProgram
            .enable(gl)
            .bind(gl, {
                uPCamera: new Float32Array(camera.modelViewMatrix),
                uHalfSize: [size[0] / 2, size[1] / 2],
                uTexture: 0
            });

        gl.activeTexture(gl.TEXTURE0);

        renderObjects.forEach(object => object.render(state));

        this._shaderProgram.disable(gl);

        return this;
    }
}

export default MultiSpriteRenderer;
