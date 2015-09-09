import {basic as shader} from '../shaders';
import Program from './Program';

/**
 * Простая программа для {@link Mesh}. Раскрашивает весь объект в один заданный цвет.
 * Геометрия меша использующего эту программу должна содержать буффер вершин.
 *
 * @extends Program
 */
class BasicMeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position'];
        this._uniformList = ['uCamera', 'uPosition', 'uColor', 'uColorAlpha'];
        this._shader = shader;

        /**
         * Цвет в формате RGB
         * @type {Number[]}
         */
        this.color = [0, 0, 0];
    }

    _bindUniforms({gl, camera, object}) {
        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        gl.uniform3fv(this.uniforms.uColor, this.color);
    }
}

export default BasicMeshProgram;
