import fragmentShader from '../../shaders/sprite.frag.js';
import vertexShader from '../../shaders/sprite.vert.js';
import ShaderProgram from '../../ShaderProgram';
import RendererPlugin from '../RendererPlugin';
import Geometry from '../../Geometry';
import Renderer from '../Renderer';
import Buffer from '../../Buffer';
import libConstants from '../../libConstants';

/**
 *  Плагин для рендера {@Sprite} объектов, добавляется автоматически при их использовании.
 */
class SpritePlugin extends RendererPlugin {
    constructor() {
        super();

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

        this._shaderProgram = new ShaderProgram({
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: [
                {name: 'uPCamera', type: 'mat4'},
                {name: 'uPosition', type: '3f'},
                {name: 'uColorAlpha', type: '1f'},
                {name: 'uScale', type: '2f'},
                {name: 'uTexture', type: '1i'},
                {name: 'uHalfSize', type: '2f'},
                {name: 'uOffset', type: '2f'},
                {name: 'uSmoothing', type: '1f'}
            ],
            attributes: [
                {name: 'position'},
                {name: 'texture'},
                {name: 'index', index: true}
            ]
        });

        this.type = libConstants.SPRITE_RENDERER;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */
    render(state) {
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
                uTexture: 0
            }, {
                position: this._geometry.getBuffer('position'),
                texture: this._geometry.getBuffer('texture'),
                index: this._geometry.getBuffer('index')
            });

        gl.activeTexture(gl.TEXTURE0);

        this._objects.forEach(object => object.render(state));
        this._objects = [];

        this._shaderProgram.disable(gl);

        return this;
    }
}

Renderer.addPlugin(20, SpritePlugin);

export default SpritePlugin;
