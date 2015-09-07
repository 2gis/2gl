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

    _bindMesh(gl, renderer, scene, camera, mesh) {
        super._bindMesh(gl, renderer, scene, camera, mesh);

        if (this._texture) {
            this._texture.enable(gl, this.uniforms.uTexture);
        }
    }

    _bindUniforms(gl, renderer, scene, camera, mesh) {
        gl.uniform3f(this.uniforms.uPosition, mesh.worldMatrix[12], mesh.worldMatrix[13], mesh.worldMatrix[14]);

        gl.uniformMatrix4fv(this.uniforms.uPCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        gl.uniform2f(this.uniforms.uScale, mesh.scale[0], mesh.scale[1]);

        let size = renderer.getSize();
        gl.uniform2f(this.uniforms.uHalfSize, size[0] / 2, size[1] / 2);
        gl.uniform2f(this.uniforms.uOffset, mesh.offset[0], mesh.offset[1]);
        gl.uniform1i(this.uniforms.uSmoothing, Number(this.smoothing));
    }
}
