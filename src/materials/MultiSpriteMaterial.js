import libConstants from '../libConstants';

/**
 * Материал для мультиспрайтов. Она не наследуются от {@link Material}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */
class MultiSpriteMaterial {
    constructor() {
        this.smoothing = 1;
        this._texture = null;

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        this.type = libConstants.MULTI_SPRITE_MATERIAL;
    }

    /**
     * Устанавливает текстуру для спрайта
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

    enable({gl, shaderProgram}) {
        shaderProgram.bind(gl, {
            uSmoothing: this.smoothing
        });

        if (this._texture) {
            this._texture.enable(gl);
        }
    }

    disable() {}
}

export default MultiSpriteMaterial;
