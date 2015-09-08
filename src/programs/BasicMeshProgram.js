import {basic as shader} from '../shaders';
import Program from './Program';

export default class BasicMeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position'];
        this._uniformList = ['uCamera', 'uPosition', 'uColor', 'uColorAlpha'];
        this._shader = shader;
        this.color = [0, 0, 0];
    }

    _bindUniforms({gl, camera, mesh}) {
        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(mesh.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        gl.uniform3fv(this.uniforms.uColor, this.color);
    }
}
