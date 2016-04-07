/**
 * Программа для спрайтов. Она не наследуюется от {@link Program}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */
class SpriteProgram {
    constructor() {
        this.opacity = 1;
        this.smoothing = 0;
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

    enable({gl, object, shaderProgram, renderer}) {
        const size = renderer.getSize();

        shaderProgram.bind(gl, {
            uColorAlpha: this.opacity,
            uSmoothing: this.smoothing,
            uHalfSize: [size[0] / 2, size[1] / 2],
            uOffset: object.offset,
            uScale: object.scale,
            uPosition: [object.worldMatrix[12], object.worldMatrix[13], object.worldMatrix[14]]
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
        typedObjects.sprites.push(object);
    }
}

export default SpriteProgram;
