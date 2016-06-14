import definitions from './definitions';
import ShaderProgram from '../ShaderProgram';
import libConstants from '../libConstants';
import '../rendererPlugins/CommonPlugin';
import '../rendererPlugins/TransparentPlugin';

const cachedPrograms = {};

/**
 * Базовый класс для материалов
 */
class Material {
    constructor() {
        this._attributes = [];
        this._uniforms = [{
            name: 'uColorAlpha',
            type: '1f'
        }];

        this._definitions = [];
        this._shader = null;

        /**
         * Прозрачность объекта отрисованного с помощью данной материала
         * @type {Number}
         */
        this.opacity = 1;
    }

    /**
     * Инициализирует шейдерную программу
     * @param {State} state
     */
    enable(state) {
        if (!this._shaderProgram) {
            this._prepare(state);
        }

        this._shaderProgram.enable(state.gl);

        this._shaderProgramBind(state);

        return this;
    }

    /**
     * Отключает шейдерную программу
     * @param {WebGLRenderingContext} gl
     */
    disable(gl) {
        if (this._shaderProgram) {
            this._shaderProgram.disable(gl);
        }
        return this;
    }

    /**
     * Добавляет definitions в код шейдеров. Все добавления должны быть сделаны до первой инициализации.
     * @param {String} type
     * @param {Number | String} value
     */
    define(type, value) {
        if (definitions[type]) {
            this._definitions.push({type: definitions[type], value: value});
        }

        return this;
    }

    /**
     * Вызывается объектом использующую данный материал,
     * чтобы определить к какому типу рендера принадлежит объект.
     * Самое простое разделение: на прозрачные и нет.
     *
     * @param {Object} renderPlugins
     * @param {Object3D} object
     */
    typifyForRender(renderPlugins, object) {
        if (this.opacity === 1) {
            renderPlugins[libConstants.COMMON_RENDERER].addObject(object);
        } else {
            renderPlugins[libConstants.TRANSPARENT_RENDERER].addObject(object);
        }
    }

    _getCachedProgramKey() {
        let key = this.constructor.name;

        this._definitions.forEach(def => {
            key += ':' + def.type + ':' + (def.value || '');
        });

        return key;
    }

    _getCachedProgram() {
        return cachedPrograms[this._getCachedProgramKey()];
    }

    _prepare(gl) {
        const cachedProgram = this._getCachedProgram();

        if (cachedProgram && gl === cachedProgram.glContext) {
            this._shaderProgram = cachedProgram.program;
            return;
        }

        this._shaderProgram = new ShaderProgram({
            vertex: this._shader.vertex,
            fragment: this._shader.fragment,
            uniforms: this._uniforms,
            attributes: this._attributes,
            definitions: this._definitions
        });

        cachedPrograms[this._getCachedProgramKey()] = {
            glContext: gl,
            program: this._shaderProgram
        };
    }

    _shaderProgramBind({gl, object}) {
        const attributes = {};
        this._attributes.forEach(obj => {
            attributes[obj.name] = object.geometry.getBuffer(obj.name);
        });

        const uniforms = {
            uColorAlpha: this.opacity
        };

        this._shaderProgram.bind(gl, uniforms, attributes);
    }
}

export default Material;
