import {basic as shader} from '../shaders';
import Program from './Program';

export default class BasicMeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'color'];
        this._uniformList = ['uCamera', 'uPosition', 'uColorAlpha'];
        this._shader = shader;
    }
}
