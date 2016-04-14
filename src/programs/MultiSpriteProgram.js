/**
 * Программа для мультиспрайтов. Она не наследуюется от {@link Program}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */
class MultiSpriteProgram {
    constructor() {
        this.smoothing = 1;
        this._texture = null;
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

    /**
     * Вызывается спрайтом, чтобы определить его к специфичному рендеру.
     *
     * @param {TypedObjects} typedObjects
     * @param {Sprite} object
     */
    typifyForRender(typedObjects, object) {
        typedObjects.multiSprites.push(object);
    }
}

export default MultiSpriteProgram;
