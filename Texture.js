"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Текстуры используются для отрисовки изображений в WebGL
 */

var Texture = function () {
  /**
   * @param {HTMLImageElement | HTMLCanvasElement} src В качестве изображения может быть
   * либо элемент img, либо canvas
   */

  function Texture(src) {
    _classCallCheck(this, Texture);

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


  _createClass(Texture, [{
    key: "enable",
    value: function enable(gl, uniform) {
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
  }, {
    key: "_prepare",
    value: function _prepare(gl) {
      this._texture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._src);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._toGlParam(gl, this.wrapS));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._toGlParam(gl, this.wrapT));

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._toGlParam(gl, this.magFilter));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._toGlParam(gl, this.minFilter));

      if (this.generateMipmaps && this.minFilter !== Texture.NearestFilter && this.minFilter !== Texture.LinearFilter) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }

      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }, {
    key: "_toGlParam",
    value: function _toGlParam(gl, param) {
      if (param === Texture.ClampToEdgeWrapping) {
        return gl.CLAMP_TO_EDGE;
      }

      if (param === Texture.NearestFilter) {
        return gl.NEAREST;
      }
      if (param === Texture.NearestMipMapNearestFilter) {
        return gl.NEAREST_MIPMAP_NEAREST;
      }
      if (param === Texture.NearestMipMapLinearFilter) {
        return gl.NEAREST_MIPMAP_LINEAR;
      }

      if (param === Texture.LinearFilter) {
        return gl.LINEAR;
      }
      if (param === Texture.LinearMipMapNearestFilter) {
        return gl.LINEAR_MIPMAP_NEAREST;
      }
      if (param === Texture.LinearMipMapLinearFilter) {
        return gl.LINEAR_MIPMAP_LINEAR;
      }
    }
  }]);

  return Texture;
}();

Texture.ClampToEdgeWrapping = 8;

Texture.NearestFilter = 1;
Texture.NearestMipMapNearestFilter = 2;
Texture.NearestMipMapLinearFilter = 3;
Texture.LinearFilter = 4;
Texture.LinearMipMapNearestFilter = 5;
Texture.LinearMipMapLinearFilter = 6;

exports.default = Texture;

/**
 * @typedef {Texture.NearestFilter | Texture.NearestMipMapNearestFilter |
 * Texture.NearestMipMapLinearFilter | Texture.LinearFilter |
 * Texture.LinearMipMapNearestFilter | Texture.LinearMipMapLinearFilter} TextureFilter
 */

/**
 * @typedef {Texture.ClampToEdgeWrapping} TextureClamp
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUNBLFVBQUksVUFBVSxRQUFRLHlCQUFSLEVBQW1DO0FBQUUsZUFBTyxHQUFHLHFCQUFILENBQVQ7T0FBakQ7O0FBRUEsVUFBSSxVQUFVLFFBQVEsWUFBUixFQUFzQjtBQUFFLGVBQU8sR0FBRyxNQUFILENBQVQ7T0FBcEM7QUFDQSxVQUFJLFVBQVUsUUFBUSx5QkFBUixFQUFtQztBQUFFLGVBQU8sR0FBRyxxQkFBSCxDQUFUO09BQWpEO0FBQ0EsVUFBSSxVQUFVLFFBQVEsd0JBQVIsRUFBa0M7QUFBRSxlQUFPLEdBQUcsb0JBQUgsQ0FBVDtPQUFoRDs7OztTQWpHRjs7O0FBcUdOLFFBQVEsbUJBQVIsR0FBOEIsQ0FBOUI7O0FBRUEsUUFBUSxhQUFSLEdBQXdCLENBQXhCO0FBQ0EsUUFBUSwwQkFBUixHQUFxQyxDQUFyQztBQUNBLFFBQVEseUJBQVIsR0FBb0MsQ0FBcEM7QUFDQSxRQUFRLFlBQVIsR0FBdUIsQ0FBdkI7QUFDQSxRQUFRLHlCQUFSLEdBQW9DLENBQXBDO0FBQ0EsUUFBUSx3QkFBUixHQUFtQyxDQUFuQzs7a0JBRWUiLCJmaWxlIjoiVGV4dHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog0KLQtdC60YHRgtGD0YDRiyDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8g0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDQuNC30L7QsdGA0LDQttC10L3QuNC5INCyIFdlYkdMXG4gKi9cbmNsYXNzIFRleHR1cmUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudCB8IEhUTUxDYW52YXNFbGVtZW50fSBzcmMg0JIg0LrQsNGH0LXRgdGC0LLQtSDQuNC30L7QsdGA0LDQttC10L3QuNGPINC80L7QttC10YIg0LHRi9GC0YxcbiAgICAgKiDQu9C40LHQviDRjdC70LXQvNC10L3RgiBpbWcsINC70LjQsdC+IGNhbnZhc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNyYykge1xuICAgICAgICB0aGlzLl9zcmMgPSBzcmM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCi0LjQvyDRhNC40LvRjNGC0YDQsCDQv9GA0Lgg0L7RgtC+0LHRgNCw0LbQtdC90LjQuCDRgtC10LrRgdGC0YPRgNGLLCDRgNCw0LfQvNC10YDRiyDQutC+0YLQvtGA0L7QuSDQsdC+0LvRjNGI0LUsINGH0LXQvCDRgNCw0LfQvNC10YDRiyDQuNGB0YXQvtC00L3QvtC5INC60LDRgNGC0LjQvdC60LhcbiAgICAgICAgICogQHR5cGUge1RleHR1cmVGaWx0ZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hZ0ZpbHRlciA9IFRleHR1cmUuTGluZWFyRmlsdGVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQotC40L8g0YTQuNC70YzRgtGA0LAg0L/RgNC4INC+0YLQvtCx0YDQsNC20LXQvdC40Lgg0YLQtdC60YHRgtGD0YDRiywg0YDQsNC30LzQtdGA0Ysg0LrQvtGC0L7RgNC+0Lkg0LzQtdC90YzRiNC1LCDRh9C10Lwg0YDQsNC30LzQtdGA0Ysg0LjRgdGF0L7QtNC90L7QuSDQutCw0YDRgtC40L3QutC4XG4gICAgICAgICAqIEB0eXBlIHtUZXh0dXJlRmlsdGVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5taW5GaWx0ZXIgPSBUZXh0dXJlLkxpbmVhck1pcE1hcExpbmVhckZpbHRlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KfRgtC+INC00LXQu9Cw0YLRjCwg0LXRgdC70Lgg0YjQuNGA0LjQvdCwINC40YHRhdC+0LTQvdC+0Lkg0LrQsNGA0YLQuNC90LrQuCDQvdC1INGA0LDQstC90LAg0YHRgtC10L/QtdC90LggMi5cbiAgICAgICAgICogQHR5cGUge1RleHR1cmVDbGFtcH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3JhcFMgPSBUZXh0dXJlLkNsYW1wVG9FZGdlV3JhcHBpbmc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCn0YLQviDQtNC10LvQsNGC0YwsINC10YHQu9C4INCy0YvRgdC+0YLQsCDQuNGB0YXQvtC00L3QvtC5INC60LDRgNGC0LjQvdC60Lgg0L3QtSDRgNCw0LLQvdCwINGB0YLQtdC/0LXQvdC4IDIuXG4gICAgICAgICAqIEB0eXBlIHtUZXh0dXJlQ2xhbXB9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndyYXBUID0gVGV4dHVyZS5DbGFtcFRvRWRnZVdyYXBwaW5nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQk9C10L3QtdGA0LjRgNC+0LLQsNGC0Ywg0LvQuCBtaXBtYXBzLlxuICAgICAgICAgKiDQntC90Lgg0LfQvdCw0YfQuNGC0LXQu9GM0L3QviDQv9C+0LLRi9GI0LDRjtGCINC60LDRh9C10YHRgtCy0L4g0Lgg0L/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YzQvdC+0YHRgtGMINC+0YLQvtCx0YDQsNC20LXQvdC40Y8uXG4gICAgICAgICAqIE1pcG1hcHMg0LzQvtCz0YPRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGC0L7Qu9GM0LrQviwg0LXRgdC70Lgg0YDQsNC30LzQtdGA0Ysg0YLQtdC60YHRgtGD0YDRiyDRgNCw0LLQvdGLINGB0YLQtdC/0LXQvdC4IDIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1pcG1hcHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0LLRj9C30YvQstCw0LXRgiBXZWJHTCDQuCDQtNCw0L3QvdGL0LUg0YLQtdC60YHRgtGD0YDRiy5cbiAgICAgKiDQn9GA0Lgg0L/QtdGA0LLQvtC8INCy0YvQt9C+0LIg0L/RgNC+0LjRgdGF0L7QtNC40YIg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdW5pZm9ybVxuICAgICAqL1xuICAgIGVuYWJsZShnbCwgdW5pZm9ybSkge1xuICAgICAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmUoZ2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fdGV4dHVyZSk7XG5cbiAgICAgICAgaWYgKHVuaWZvcm0pIHtcbiAgICAgICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICAgICAgZ2wudW5pZm9ybTFpKHVuaWZvcm0sIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX3ByZXBhcmUoZ2wpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgICAgICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgdHJ1ZSk7XG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgdGhpcy5fc3JjKTtcblxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCB0aGlzLl90b0dsUGFyYW0oZ2wsIHRoaXMud3JhcFMpKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgdGhpcy5fdG9HbFBhcmFtKGdsLCB0aGlzLndyYXBUKSk7XG5cbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIHRoaXMuX3RvR2xQYXJhbShnbCwgdGhpcy5tYWdGaWx0ZXIpKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIHRoaXMuX3RvR2xQYXJhbShnbCwgdGhpcy5taW5GaWx0ZXIpKTtcblxuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZU1pcG1hcHMgJiZcbiAgICAgICAgICAgIHRoaXMubWluRmlsdGVyICE9PSBUZXh0dXJlLk5lYXJlc3RGaWx0ZXIgJiZcbiAgICAgICAgICAgIHRoaXMubWluRmlsdGVyICE9PSBUZXh0dXJlLkxpbmVhckZpbHRlclxuICAgICAgICApIHtcbiAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gICAgfVxuXG4gICAgX3RvR2xQYXJhbShnbCwgcGFyYW0pIHtcbiAgICAgICAgaWYgKHBhcmFtID09PSBUZXh0dXJlLkNsYW1wVG9FZGdlV3JhcHBpbmcpIHsgcmV0dXJuIGdsLkNMQU1QX1RPX0VER0U7IH1cblxuICAgICAgICBpZiAocGFyYW0gPT09IFRleHR1cmUuTmVhcmVzdEZpbHRlcikgeyByZXR1cm4gZ2wuTkVBUkVTVDsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IFRleHR1cmUuTmVhcmVzdE1pcE1hcE5lYXJlc3RGaWx0ZXIpIHsgcmV0dXJuIGdsLk5FQVJFU1RfTUlQTUFQX05FQVJFU1Q7IH1cbiAgICAgICAgaWYgKHBhcmFtID09PSBUZXh0dXJlLk5lYXJlc3RNaXBNYXBMaW5lYXJGaWx0ZXIpIHsgcmV0dXJuIGdsLk5FQVJFU1RfTUlQTUFQX0xJTkVBUjsgfVxuXG4gICAgICAgIGlmIChwYXJhbSA9PT0gVGV4dHVyZS5MaW5lYXJGaWx0ZXIpIHsgcmV0dXJuIGdsLkxJTkVBUjsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IFRleHR1cmUuTGluZWFyTWlwTWFwTmVhcmVzdEZpbHRlcikgeyByZXR1cm4gZ2wuTElORUFSX01JUE1BUF9ORUFSRVNUOyB9XG4gICAgICAgIGlmIChwYXJhbSA9PT0gVGV4dHVyZS5MaW5lYXJNaXBNYXBMaW5lYXJGaWx0ZXIpIHsgcmV0dXJuIGdsLkxJTkVBUl9NSVBNQVBfTElORUFSOyB9XG4gICAgfVxufVxuXG5UZXh0dXJlLkNsYW1wVG9FZGdlV3JhcHBpbmcgPSA4O1xuXG5UZXh0dXJlLk5lYXJlc3RGaWx0ZXIgPSAxO1xuVGV4dHVyZS5OZWFyZXN0TWlwTWFwTmVhcmVzdEZpbHRlciA9IDI7XG5UZXh0dXJlLk5lYXJlc3RNaXBNYXBMaW5lYXJGaWx0ZXIgPSAzO1xuVGV4dHVyZS5MaW5lYXJGaWx0ZXIgPSA0O1xuVGV4dHVyZS5MaW5lYXJNaXBNYXBOZWFyZXN0RmlsdGVyID0gNTtcblRleHR1cmUuTGluZWFyTWlwTWFwTGluZWFyRmlsdGVyID0gNjtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dHVyZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7VGV4dHVyZS5OZWFyZXN0RmlsdGVyIHwgVGV4dHVyZS5OZWFyZXN0TWlwTWFwTmVhcmVzdEZpbHRlciB8XG4gKiBUZXh0dXJlLk5lYXJlc3RNaXBNYXBMaW5lYXJGaWx0ZXIgfCBUZXh0dXJlLkxpbmVhckZpbHRlciB8XG4gKiBUZXh0dXJlLkxpbmVhck1pcE1hcE5lYXJlc3RGaWx0ZXIgfCBUZXh0dXJlLkxpbmVhck1pcE1hcExpbmVhckZpbHRlcn0gVGV4dHVyZUZpbHRlclxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge1RleHR1cmUuQ2xhbXBUb0VkZ2VXcmFwcGluZ30gVGV4dHVyZUNsYW1wXG4gKi9cbiJdfQ==