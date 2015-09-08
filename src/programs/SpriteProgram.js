import {sprite as shader} from '../shaders';
import Program from './Program';

export default class SpriteProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'texture'];
        this._uniformList = ['uPCamera', 'uWICamera', 'uPosition', 'uColorAlpha', 'uTexture', 'uScale',
            'uOCamera', 'uHalfSize', 'uOffset', 'uSmoothing'];
        this._shader = shader;

        this.smoothing = false;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    _bindMesh(state) {
        super._bindMesh(state);

        if (this._texture) {
            this._texture.enable(state.gl, this.uniforms.uTexture);
        }
    }

    _bindUniforms({gl, renderer, camera, object}) {
        gl.uniform3f(this.uniforms.uPosition, object.worldMatrix[12], object.worldMatrix[13], object.worldMatrix[14]);

        gl.uniformMatrix4fv(this.uniforms.uPCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        gl.uniform2f(this.uniforms.uScale, object.scale[0], object.scale[1]);

        let size = renderer.getSize();
        gl.uniform2f(this.uniforms.uHalfSize, size[0] / 2, size[1] / 2);
        gl.uniform2f(this.uniforms.uOffset, object.offset[0], object.offset[1]);
        gl.uniform1i(this.uniforms.uSmoothing, Number(this.smoothing));
    }
}
