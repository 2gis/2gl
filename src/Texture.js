/**
 * Текстуры используются для отрисовки изображений в WebGL
 */

class Texture {
    /**
     * @param {HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | TypedArray} [src=null] В качестве
     * изображения может быть либо элемент img, либо canvas
     * @param {?TextureOptions} options
     */
    constructor(src, options = {}) {
        this._src = src || null;

        /**
         * Параметры для связывания текстуры
         * @type {TextureOptions}
         * @readonly
         */
        this.options = Object.assign({}, Texture.defaultOptions, options);

        /**
         * Контекст WebGL, в котором была инициализирована текстура.
         * Используется только для удаления, подумать хорошо, прежде чем использовать для чего-то ещё.
         * @type {?WebGLRenderingContext}
         * @ignore
         */
        this._glContext = null;
    }

    /**
     * Связывает WebGL и данные текстуры.
     * При первом вызов происходит инициализация.
     *
     * @param {WebGLRenderingContext} gl
     * @param {?Number} index Номер текстуры в контексте WebGL.
     * Если его нет, используется уже активированный юнит текстуры.
     */
    enable(gl, index) {
        const unit = index !== undefined ? index : this.options.unit;

        if (unit !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + unit);
        }

        if (!this._texture) {
            this.prepare(gl);
        }

        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        return this;
    }

    /**
     * Удаляет текстуру из видеокарты
     */
    remove() {
        if (this._texture) {
            this._glContext.deleteTexture(this._texture);
            this._glContext = null;
            this._texture = null;
        }

        return this;
    }

    /**
     * Возвращает WebGL текстуру
     * @return {WebGLTexture}
     */
    getTexture() {
        return this._texture;
    }

    /**
     * Обновляет часть текстуры
     *
     * @param {WebGLRenderingContext} gl
     * @param {HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | TypedArray} src
     * @param {number} x Горизонтальное смещение, с которого записываем в текстуру
     * @param {number} y Вертикальное смещение, с которого записываем в текстуру
     */
    subImage(gl, src, x, y) {
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texSubImage2D(
            gl.TEXTURE_2D,
            0,
            x, y,
            this._toGlParam(gl, this.options.format),
            gl.UNSIGNED_BYTE,
            src,
        );

        return this;
    }

    /**
     * Кладёт текстуру в видеокарту
     * @param {WebGLRenderingContext} gl
     */
    prepare(gl) {
        this._glContext = gl;
        this._texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.options.flipY);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.options.premultiplyAlpha);

        if (this.options.size) {
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                this._toGlParam(gl, this.options.format),
                this.options.size[0],
                this.options.size[1],
                0,
                this._toGlParam(gl, this.options.format),
                gl.UNSIGNED_BYTE,
                this._src
            );
        } else {
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                this._toGlParam(gl, this.options.format),
                this._toGlParam(gl, this.options.format),
                gl.UNSIGNED_BYTE,
                this._src
            );
        }

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._toGlParam(gl, this.options.wrapS));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._toGlParam(gl, this.options.wrapT));

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._toGlParam(gl, this.options.magFilter));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._toGlParam(gl, this.options.minFilter));

        if (this.options.generateMipmaps &&
            this.options.minFilter !== Texture.NearestFilter &&
            this.options.minFilter !== Texture.LinearFilter
        ) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);

        return this;
    }

    _toGlParam(gl, param) {
        if (param === Texture.ClampToEdgeWrapping) { return gl.CLAMP_TO_EDGE; }
        if (param === Texture.Repeat) { return gl.REPEAT; }
        if (param === Texture.MirroredRepeat) { return gl.MIRRORED_REPEAT; }

        if (param === Texture.NearestFilter) { return gl.NEAREST; }
        if (param === Texture.NearestMipMapNearestFilter) { return gl.NEAREST_MIPMAP_NEAREST; }
        if (param === Texture.NearestMipMapLinearFilter) { return gl.NEAREST_MIPMAP_LINEAR; }

        if (param === Texture.LinearFilter) { return gl.LINEAR; }
        if (param === Texture.LinearMipMapNearestFilter) { return gl.LINEAR_MIPMAP_NEAREST; }
        if (param === Texture.LinearMipMapLinearFilter) { return gl.LINEAR_MIPMAP_LINEAR; }
        if (param === Texture.RgbaFormat) { return gl.RGBA; }
        if (param === Texture.AlphaFormat) { return gl.ALPHA; }
        if (param === Texture.RgbFormat) { return gl.RGB; }
        return null;
    }
}

Texture.ClampToEdgeWrapping = 8;
Texture.Repeat = 9;
Texture.MirroredRepeat = 10;

Texture.NearestFilter = 1;
Texture.NearestMipMapNearestFilter = 2;
Texture.NearestMipMapLinearFilter = 3;
Texture.LinearFilter = 4;
Texture.LinearMipMapNearestFilter = 5;
Texture.LinearMipMapLinearFilter = 6;

Texture.RgbaFormat = 11;
Texture.AlphaFormat = 12;
Texture.RgbFormat = 13;

Texture.defaultOptions = {
    magFilter: Texture.LinearFilter,
    minFilter: Texture.LinearMipMapLinearFilter,
    wrapS: Texture.ClampToEdgeWrapping,
    wrapT: Texture.ClampToEdgeWrapping,
    format: Texture.RgbaFormat,
    generateMipmaps: true,
    flipY: true,
    premultiplyAlpha: true,
};

export default Texture;

/**
 * @typedef {Texture.NearestFilter | Texture.NearestMipMapNearestFilter |
 * Texture.NearestMipMapLinearFilter | Texture.LinearFilter |
 * Texture.LinearMipMapNearestFilter | Texture.LinearMipMapLinearFilter} TextureFilter
 */

/**
 * @typedef {Texture.ClampToEdgeWrapping} TextureClamp
 */

/**
 * @typedef {Texture.RgbaFormat | Texture.AlphaFormat} TextureFormat
 */

/**
 * Параметры связывания текстуры
 *
 * @typedef {Object} TextureOptions
 * @property {TextureFilter} magFilter
 * @property {TextureFilter} minFilter
 * @property {TextureClamp} wrapS
 * @property {TextureClamp} wrapT
 * @property {TextureFormat} format
 * @property {Boolean} generateMipmaps
 * @property {Boolean} flipY
 * @property {Boolean} premultiplyAlpha
 * @property {?Number[]} size
 * @property {?Number} unit
 */
