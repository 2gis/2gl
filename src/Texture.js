/**
 * Текстуры используются для отрисовки изображений в WebGL
 */
class Texture {
    /**
     * @param {HTMLImageElement | HTMLCanvasElement} [src=null] В качестве изображения может быть
     * либо элемент img, либо canvas
     */
    constructor(src) {
        this._src = src || null;

        /**
         * Тип фильтра при отображении текстуры, размеры которой больше, чем размеры исходной картинки
         * @type {TextureFilter}
         */
        this.magFilter = Texture.LinearFilter;

        /**
         * Тип фильтра при отображении текстуры, размеры которой меньше, чем размеры исходной картинки
         * @type {TextureFilter}
         */
        this.minFilter = Texture.LinearMipMapLinearFilter;

        /**
         * Что делать, если ширина исходной картинки не равна степени 2.
         * @type {TextureClamp}
         */
        this.wrapS = Texture.ClampToEdgeWrapping;

        /**
         * Что делать, если высота исходной картинки не равна степени 2.
         * @type {TextureClamp}
         */
        this.wrapT = Texture.ClampToEdgeWrapping;

        /**
         * Формат текстуры (RGBA или Alpha)
         * @type {TextureFormat}
         */
        this.format = Texture.RgbaFormat;

        /**
         * Генерировать ли mipmaps.
         * Они значительно повышают качество и производительность отображения.
         * Mipmaps могут использоваться только, если размеры текстуры равны степени 2.
         *
         * @type {Boolean}
         */
        this.generateMipmaps = true;

        /**
         * Нужно ли отражать текстуру относительно оси Y.
         * @type {Boolean}
         */
        this.flipY = true;

        /**
         * Сохранен ли цвет текстуры с premultiply аlpha.
         * @type {Boolean}
         */
        this.premultiplyAlpha = true;
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
        if (index !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + index);
        }

        if (!this._texture) {
            this._prepare(gl);
        }

        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        return this;
    }

    /**
     * Удаляет текстуру из видеокарты
     *
     * @param {WebGLRenderingContext} gl
     */
    remove(gl) {
        if (this._texture) {
            gl.deleteTexture(this._texture);
        }

        return this;
    }

    _prepare(gl) {
        this._texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        if (this.flipY) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        }

        if (this.premultiplyAlpha) {
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        }

        if (this.size) {
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                this._toGlParam(gl, this.format),
                this.size[0],
                this.size[1],
                0,
                this._toGlParam(gl, this.format),
                gl.UNSIGNED_BYTE,
                this._src
            );
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._src);
        }

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._toGlParam(gl, this.wrapS));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._toGlParam(gl, this.wrapT));

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._toGlParam(gl, this.magFilter));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._toGlParam(gl, this.minFilter));

        if (this.generateMipmaps &&
            this.minFilter !== Texture.NearestFilter &&
            this.minFilter !== Texture.LinearFilter
        ) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);
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
