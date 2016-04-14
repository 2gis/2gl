import {basic as shader} from '../shaders';
import Program from './Program';

/**
 * Простая программа для {@link Mesh}. Раскрашивает весь объект в один заданный цвет.
 * {@link Geometry} меша использующего эту программу должна содержать буфер вершин.
 *
 * @extends Program
 */
class BasicMeshProgram extends Program {
    constructor() {
        super();

        this._attributes = [{name: 'position'}];
        this._uniforms = [
            {name: 'uColorAlpha', type: '1f'},
            {name: 'uCamera', type: 'mat4'},
            {name: 'uPosition', type: 'mat4'},
            {name: 'uColor', type: '3fv'}
        ];

        this._shader = shader;

        /**
         * Цвет в формате RGB
         * @type {Number[]}
         */
        this.color = [0, 0, 0];
    }

    _shaderProgramBind({gl, object, camera}) {
        const attributes = {};
        this._attributes.forEach(obj => {
            attributes[obj.name] = object.geometry.getBuffer(obj.name);
        });

        const uniforms = {
            uColorAlpha: this.opacity,
            uPosition: new Float32Array(object.worldMatrix),
            uCamera: new Float32Array(camera.modelViewMatrix),
            uColor: this.color
        };

        this._shaderProgram.bind(gl, uniforms, attributes);
    }
}

export default BasicMeshProgram;
