import fragmentShader from '../shaders/complex.frag.glsl.js';
import vertexShader from '../shaders/complex.vert.glsl.js';
import {vec3, mat3} from 'gl-matrix';
import Material from './Material';
import libConstants from '../libConstants';

const shader = {
    fragment: fragmentShader,
    vertex: vertexShader
};

/**
 * Более сложный материал для {@link Mesh}.
 *
 * {@link Geometry} меша использующего этот материал должна содержать следующие буферы:
 * 1. position - координаты вершин
 * 2. color - диффузная составляющая цвета в RGB для каждой из вершин, на неё влияет освещение
 * 3. emissive - фоновая составляющая цвета в RGB, на неё не влияет освещение
 *
 * Если материалу задана текстура, то также должен быть доступны буферы:
 * 5. texture - 2х мерные координаты сопоставляющие координаты грани к координатам текстуры
 * 6. textureEnable - будет ли использоваться текстура для данной вершины,
 * принимает два значаения: 0 - нет, 1 - да
 *
 * @extends Material
 */
class ComplexMeshMaterial extends Material {
    constructor() {
        super();

        this._attributes = [{name: 'position'}, {name: 'color'}, {name: 'emissive'}];
        this._uniforms = [
            {name: 'uColorAlpha', type: '1f'},
            {name: 'uCamera', type: 'mat4'},
            {name: 'uPosition', type: 'mat4'},
            {name: 'uAmbientLightColor', type: '3fv'}
        ];

        this._shader = shader;
        this._texture = null;

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        this.type = libConstants.COMPLEX_MESH_MATERIAL;
    }

    /**
     * Задаёт текстуру материалу
     * @param {Texture} texture
     */
    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    /**
     * Возвращает текущую текстуру
     * @returns {?Texture}
     */
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
            if (l.type === libConstants.DIRECTIONAL_LIGHT) {
                directionLightNumber++;
            }
        });

        this.define('directionLights', directionLightNumber);

        if (directionLightNumber > 0) {
            this._attributes.push({name: 'normal'});
            this._uniforms.push(
                {name: 'uDirectionLightColors', type: '3fv'},
                {name: 'uDirectionLightPositions', type: '3fv'},
                {name: 'uNormalMatrix', type: 'mat3'}
            );
        }
    }

    _enableTexture() {
        this.define('texture');
        this._attributes.push({name: 'texture'}, {name: 'textureEnable'});
        this._uniforms.push({name: 'uTexture', type: '1i'});
    }

    _shaderProgramBind({gl, scene, camera, object}) {
        const uniforms = {};
        const attributes = {};

        if (this._texture) {
            this._texture.enable(gl, true);
            uniforms.uTexture = 0;
        }

        const lights = scene.getLights();

        if (lights.length) {
            let directionLightsColor = [];
            let directionLightsPosition = [];

            lights.forEach(light => {
                if (light.type === libConstants.AMBIENT_LIGHT) {
                    uniforms.uAmbientLightColor = light.color;
                } else if (light.type === libConstants.DIRECTIONAL_LIGHT) {
                    directionLightsColor = directionLightsColor.concat(light.color);

                    const reverted = vec3.create();
                    vec3.scale(reverted, light.position, -1);
                    directionLightsPosition = directionLightsPosition.concat(Array.prototype.slice.call(reverted));
                }
            });

            if (directionLightsColor.length && directionLightsPosition.length) {
                const normalMatrix = mat3.create();
                mat3.fromMat4(normalMatrix, object.worldMatrix);
                mat3.invert(normalMatrix, normalMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                uniforms.uNormalMatrix = new Float32Array(normalMatrix);
                attributes.normal = object.geometry.getBuffer('normal');
            }

            uniforms.uDirectionLightColors = new Float32Array(directionLightsColor);
            uniforms.uDirectionLightPositions = new Float32Array(directionLightsPosition);
        }

        this._attributes.forEach(obj => {
            if (obj.name !== 'normal') {
                attributes[obj.name] = object.geometry.getBuffer(obj.name);
            }
        });

        uniforms.uPosition = new Float32Array(object.worldMatrix);
        uniforms.uCamera = new Float32Array(camera.modelViewMatrix);
        uniforms.uColorAlpha = this.opacity;

        this._shaderProgram.bind(gl, uniforms, attributes);
    }
}

export default ComplexMeshMaterial;
