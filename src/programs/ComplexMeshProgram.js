import {complex as shader} from '../shaders';
import {vec3, mat3} from 'gl-matrix';
import Program from './Program';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/DirectionalLight';

export default class ComplexMeshProgram extends Program {
    constructor() {
        super();

        this._attributeList = ['position', 'color', 'lightEnable', 'emissive'];
        this._uniformList = ['uCamera', 'uPosition', 'uColorAlpha', 'uAmbientLightColor'];
        this._shader = shader;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    _prepare(state) {
        this._enableLight(state);

        if (this._texture) {
            this._enableTexture();
        }

        super._prepare(state);
    }

    _enableLight({scene}) {
        let directionLightNumber = 0;

        scene.getLights().forEach(l => {
            if (l instanceof DirectionalLight) {
                directionLightNumber++;
            }
        });

        this.define('directionLights', directionLightNumber);

        if (directionLightNumber > 0) {
            this._attributeList.push('normal');
            this._uniformList.push('uDirectionLightColors', 'uDirectionLightPositions', 'uNormalMatrix');
        }
    }

    _enableTexture() {
        this.define('texture');
        this._attributeList.push('texture', 'textureEnable');
        this._uniformList.push('uTexture');
    }

    _bindMesh({gl, scene, camera, object}) {
        if (this._texture) {
            this._texture.enable(gl, this.uniforms.uTexture);
        }

        let lights = scene.getLights();

        if (lights.length) {
            let directionLightsColor = [];
            let directionLightsPosition = [];

            lights.forEach(light => {
                if (light instanceof AmbientLight) {
                    gl.uniform3fv(this.uniforms.uAmbientLightColor, light.color);
                } else if (light instanceof DirectionalLight) {
                    directionLightsColor = directionLightsColor.concat(light.color);

                    let reverted = vec3.create();
                    vec3.scale(reverted, light.position, -1);
                    directionLightsPosition = directionLightsPosition.concat(Array.prototype.slice.call(reverted));
                }
            });

            if (directionLightsColor.length && directionLightsPosition.length) {
                let normalMatrix = mat3.create();
                mat3.fromMat4(normalMatrix, object.worldMatrix);
                mat3.invert(normalMatrix, normalMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                gl.uniformMatrix3fv(this.uniforms.uNormalMatrix, false, new Float32Array(normalMatrix));

                object.geometry.getBuffer('normal').bind(gl, this.attributes.normal);
            }

            gl.uniform3fv(this.uniforms.uDirectionLightColors, new Float32Array(directionLightsColor));
            gl.uniform3fv(this.uniforms.uDirectionLightPositions, new Float32Array(directionLightsPosition));
        }

        this._attributeList.forEach(name => {
            if (name !== 'normal') {
                object.geometry.getBuffer(name).bind(gl, this.attributes[name]);
            }
        });

        gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
        gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.projectionInverseMatrix));
        gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
    }
}
