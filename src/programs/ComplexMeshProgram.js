import {basic as shader} from '../shaders';
import {vec3, mat3} from 'gl-matrix';
import Program from './Program';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/DirectionalLight';

export default class ComplexMeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'color', 'normal', 'lightEnable'];
        this._uniformList = ['uCamera', 'uPosition', 'uColorAlpha', 'uAmbientLightColor', 'uDirectionLightColors',
            'uDirectionLightPositions', 'uNormalMatrix'];
        this._shader = shader;

        this.define('light');
        this.define('lightEnabling');
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    _prepare(gl, scene) {
        this._enableLight(scene);

        if (this._texture) {
            this._enableTexture();
        }

        super._prepare(gl, scene);
    }

    _enableLight(scene) {
        let directionLightNumber = 0;

        scene.getLights().forEach(l => {
            if (l instanceof DirectionalLight) {
                directionLightNumber++;
            }
        });

        this.define('directionLights', directionLightNumber);
    }

    _enableTexture() {
        this.define('texture');
        this.define('textureEnabling');
        this._attributeList.push('texture', 'textureEnable');
        this._uniformList.push('uTexture');
    }

    _bindUniforms(gl, scene, camera, mesh) {
        super._bindUniforms(gl, scene, camera, mesh);

        if (this._texture) {
            this._texture.enable(gl, this.uniforms.uTexture);
        }

        let lights = scene.getLights();

        if (lights.length) {
            let normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, mesh.worldMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(this.uniforms.uNormalMatrix, false, new Float32Array(normalMatrix));

            let directionLightsColor = [];
            let directionLightsPosition = [];

            lights.forEach(light => {
                if (light instanceof AmbientLight) {
                    gl.uniform3f(this.uniforms.uAmbientLightColor,
                        light.color[0],
                        light.color[1],
                        light.color[2]
                    );
                } else if (light instanceof DirectionalLight) {
                    directionLightsColor = directionLightsColor.concat(light.color);

                    let reverted = vec3.create();
                    vec3.scale(reverted, light.position, -1);
                    directionLightsPosition = directionLightsPosition.concat(Array.prototype.slice.call(reverted));
                }
            });

            if (directionLightsColor.length && directionLightsPosition.length) {
                gl.uniform3fv(this.uniforms.uDirectionLightColors, new Float32Array(directionLightsColor));
                gl.uniform3fv(this.uniforms.uDirectionLightPositions, new Float32Array(directionLightsPosition));
            }
        }
    }
}
