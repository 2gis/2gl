import fragmentShader from '../shaders/multiSprite.frag.glsl.js';
import vertexShader from '../shaders/multiSprite.vert.glsl.js';
import ShaderProgram from '../ShaderProgram';
import RendererPlugin from '../RendererPlugin';
import Shader from '../Shader';
import {MULTI_SPRITE_RENDERER} from '../libConstants';

/**
 * Плагин для рендера {@MultiSprite} объектов.
 * Для того, чтобы он добавился к рендеру, нужно вызвать {@link Renderer#addPlugin}.
 *
 * @extends RendererPlugin
 */
class MultiSpritePlugin extends RendererPlugin {
    constructor(renderer) {
        super();

        this._renderer = renderer;

        this._shaderProgram = new ShaderProgram({
            vertex: new Shader('vertex', vertexShader),
            fragment: new Shader('fragment', fragmentShader),
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

        this.type = MULTI_SPRITE_RENDERER;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */
    render(state) {
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

        this._objects.forEach(object => object.render(state));
        this._objects = [];

        this._shaderProgram.disable(gl);

        return this;
    }
}

export default MultiSpritePlugin;
