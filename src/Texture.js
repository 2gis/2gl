/**
 * Текстуры используются для отрисовки изображений в WebGL
 */
class Texture {
    /**
     * @param {HTMLImageElement | HTMLCanvasElement} src В качестве изображения может быть
     * либо элемент img, либо canvas
     */
    constructor(src) {
        this._src = src;

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
         * Генерировать ли mipmaps.
         * Они значительно повышают качество и производительность отображения.
         * Mipmaps могут использоваться только, если размеры текстуры равны степени 2.
         *
         * @type {Boolean}
         */
        this.generateMipmaps = true;
    }

    /**
     * Связывает WebGL и данные текстуры.
     * При первом вызов происходит инициализация.
     *
     * @param {WebGLRenderingContext} gl
     * @param {Number} uniform
     */
    enable(gl, uniform) {
        if (!this._texture) {
            this._prepare(gl);
        }

        gl.bindTexture(gl.TEXTURE_2D, this._texture);

        if (uniform) {
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(uniform, 0);
        }

        return this;
    }

    _prepare(gl) {
        this._texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._src);

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

        if (param === Texture.NearestFilter) { return gl.NEAREST; }
        if (param === Texture.NearestMipMapNearestFilter) { return gl.NEAREST_MIPMAP_NEAREST; }
        if (param === Texture.NearestMipMapLinearFilter) { return gl.NEAREST_MIPMAP_LINEAR; }

        if (param === Texture.LinearFilter) { return gl.LINEAR; }
        if (param === Texture.LinearMipMapNearestFilter) { return gl.LINEAR_MIPMAP_NEAREST; }
        if (param === Texture.LinearMipMapLinearFilter) { return gl.LINEAR_MIPMAP_LINEAR; }
    }
}

Texture.ClampToEdgeWrapping = 8;

Texture.NearestFilter = 1;
Texture.NearestMipMapNearestFilter = 2;
Texture.NearestMipMapLinearFilter = 3;
Texture.LinearFilter = 4;
Texture.LinearMipMapNearestFilter = 5;
Texture.LinearMipMapLinearFilter = 6;

export default Texture;

/**
 * @typedef {Texture.NearestFilter | Texture.NearestMipMapNearestFilter |
 * Texture.NearestMipMapLinearFilter | Texture.LinearFilter |
 * Texture.LinearMipMapNearestFilter | Texture.LinearMipMapLinearFilter} TextureFilter
 */

/**
 * @typedef {Texture.ClampToEdgeWrapping} TextureClamp
 */
