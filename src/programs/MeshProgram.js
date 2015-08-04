import {basic as shader} from '../shaders';
import Program from './Program';
import DirectionalLight from '../lights/DirectionalLight';

export default class MeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'color'];
        this._uniformList = ['uCamera', 'uPosition', 'uColorAlpha'];
        this._shader = shader;
    }

    enableLight(lights) {
        this.define('light');

        let directionLightNumber = 0;

        lights.forEach(l => {
            if (l instanceof DirectionalLight) {
                directionLightNumber++;
            }
        });

        this.define('directionLights', directionLightNumber);

        if (directionLightNumber > 0) {
            this._attributeList.push('normal');
        }

        this._attributeList.push('directionLightAlpha');
        this._uniformList.push('uAmbientLightColor', 'uDirectionLightColors',
            'uDirectionLightPositions', 'uNormalMatrix');
    }

    enableTexture() {
        this.define('texture');
        this._attributeList.push('texture', 'textureAlpha');
        this._uniformList.push('uTexture');
    }
}
