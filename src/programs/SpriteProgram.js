import {sprite as shader} from '../shaders';
import Program from './Program';

export default class SpriteProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'texture'];
        this._uniformList = ['uPCamera', 'uWICamera', 'uPosition', 'uColorAlpha', 'uTexture', 'uScale'];
        this._shader = shader;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    _bindMesh(gl, scene, camera, mesh) {
        super._bindMesh(gl, scene, camera, mesh);

        if (this._texture) {
            this._texture.enable(gl, this.uniforms.uTexture);
        }
    }

    _bindUniforms(gl, scene, camera, mesh) {
        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(mesh.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uPCamera, false, new Float32Array(camera.projectionMatrix));
        gl.uniformMatrix4fv(this.uniforms.uWICamera, false, new Float32Array(camera.worldInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        gl.uniform2fv(this.uniforms.uScale, new Float32Array([mesh.scale[0], mesh.scale[1]]));
    }
}
