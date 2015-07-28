import Object3D from './Object3D';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';
import {vec3, mat3, mat4} from 'gl-matrix';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    setTexture(texture) {
        this._texture = texture;
        this.program.define('texture');
        this.program._attributeList.push('texture', 'textureAlpha');
        this.program._uniformList.push('uTexture');

        return this;
    }

    render(gl, scene, camera) {
        this.program.enable(gl);

        this._bindAttributes(gl);
        this._bindUniforms(gl, scene, camera);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.program.disable(gl);
    }

    _bindAttributes(gl) {
        this.geometry.getBuffer('position').bind(gl, this.program.getAttribute('position'));
        this.geometry.getBuffer('color').bind(gl, this.program.getAttribute('color'));
        this.geometry.getBuffer('normal').bind(gl, this.program.getAttribute('normal'));
        this.geometry.getBuffer('texture').bind(gl, this.program.getAttribute('texture'));
        this.geometry.getBuffer('textureAlpha').bind(gl, this.program.getAttribute('textureAlpha'));
    }

    _bindUniforms(gl, scene, camera) {
        gl.uniformMatrix4fv(this.program.getUniform('uPosition'), false, this.matrix);
        gl.uniformMatrix4fv(this.program.getUniform('uCamera'), false, camera.matrix);

        let normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, this.matrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(this.program.getUniform('uNormalMatrix'), false, normalMatrix);


        if (this._texture) {
            this._texture.enable(gl, this.program.getUniform('uTexture'));
        }

        let lights = scene.getLights();

        let directionLightsColor = [];
        let directionLightsPosition = [];

        lights.forEach(light => {
            if (light instanceof AmbientLight) {
                gl.uniform3f(this.program.getUniform('uAmbientLightColor'),
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

        if (directionLightsColor && directionLightsPosition) {
            gl.uniform3fv(this.program.getUniform('uDirectionLightColors'), new Float32Array(directionLightsColor));
            gl.uniform3fv(this.program.getUniform('uDirectionLightPositions'), new Float32Array(directionLightsPosition));
        }
    }
}

