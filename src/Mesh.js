import Object3D from './Object3D';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';
import {vec3, mat3, mat4} from 'gl-matrix';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;

        this._prepared = false;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    render(gl, scene, camera) {
        if (!this._prepared) {
            this._prepare(gl, scene, camera);
        }

        this.program.enable(gl);

        this._bindAttributes(gl);
        this._bindUniforms(gl, scene, camera);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.program.disable(gl);
    }

    raycast(raycaster, intersects) {
        let inverseMatrix = mat4.create();
        mat4.invert(inverseMatrix, this.worldMatrix);

        let ray = raycaster.ray.clone();
        ray.applyMatrix4(inverseMatrix);

        let boundingBox = this.geometry.getBoundingBox();

        if (!ray.intersectBox(boundingBox)) { return; }

        let positionBuffer = this.geometry.buffers.position;

        for (let i = 0; i < positionBuffer.length / 3; i++) {
            let triangle = positionBuffer.getTriangle(i);

            let intersectionPoint = ray.intersectTriangle(triangle, false);

            if (!intersectionPoint) { continue; }

            vec3.transformMat4(intersectionPoint, intersectionPoint, this.worldMatrix);

            let distance = vec3.dist(raycaster.ray.origin, intersectionPoint);

            if (distance < raycaster.precision || distance < raycaster.near || distance > raycaster.far) { continue; }

            intersects.push({
                distance: distance,
                point: intersectionPoint,
                object: this
            });
        }
    }

    _prepare(gl, scene, camera) {
        let lights = scene.getLights();

        if (lights.length) {
            this.program.enableLight(lights);
        }

        if (this._texture) {
            this.program.enableTexture();
        }

        this._prepared = true;
    }

    _bindAttributes(gl) {
        this.program._attributeList.forEach(name => {
            this.geometry.getBuffer(name).bind(gl, this.program.getAttribute(name));
        });
    }

    _bindUniforms(gl, scene, camera) {
        gl.uniformMatrix4fv(this.program.getUniform('uPosition'), false, this.worldMatrix);
        gl.uniformMatrix4fv(this.program.getUniform('uCamera'), false, camera.worldInverseMatrix);


        if (this._texture) {
            this._texture.enable(gl, this.program.getUniform('uTexture'));
        }

        let lights = scene.getLights();

        if (lights.length) {
            let normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, this.worldMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(this.program.getUniform('uNormalMatrix'), false, normalMatrix);

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

            if (directionLightsColor.length && directionLightsPosition.length) {
                gl.uniform3fv(this.program.getUniform('uDirectionLightColors'), new Float32Array(directionLightsColor));
                gl.uniform3fv(this.program.getUniform('uDirectionLightPositions'), new Float32Array(directionLightsPosition));
            }
        }
    }
}

