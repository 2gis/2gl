"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера
 *
 * @param {TypedArray | ArrayBuffer | number} initData Данные для инита буфера:
 * содержимое буфера или его размер
 * @param {?BufferBindOptions} options Параметры передачи буфера в видеокарту,
 * могут быть переопределены из {@link BufferChannel}
 */
var Buffer = function () {
  function Buffer(initData, options) {
    _classCallCheck(this, Buffer);

    this._initData = initData;

    /**
     * Размер данных в буфере в байтах
     * @type {Number}
     */
    this.byteLength = initData.byteLength !== undefined ? initData.byteLength : initData;

    /**
     * Тип буфера. Буфер может использоваться для передачи массива данных,
     * так и для передачи индексов элементов из данных.
     * @type {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer}
     */
    this.type = Buffer.ArrayBuffer;

    /**
     * Указывает, как часто данные буфера будут изменяться.
     * @type {Buffer.StaticDraw | Buffer.DynamicDraw}
     */
    this.drawType = Buffer.StaticDraw;

    /**
     * Параметры для связывания буфера
     * @type {BufferBindOptions}
     * @ignore
     */
    this.options = Object.assign({}, Buffer.defaultOptions, options);

    /**
     * Исходный WebGL буфер
     * @type {?WebGLBuffer}
     * @ignore
     */
    this._glBuffer = null;

    /**
     * Контекст WebGL, в котором был инициализирован буфер.
     * Используется только для удаления буфера, подумать хорошо, прежде чем использовать для чего-то ещё.
     * @type {?WebGLRenderingContext}
     * @ignore
     */
    this._glContext = null;
  }

  /**
   * Связывает данные с контекстом WebGL.
   *
   * В случае Buffer.ArrayBuffer связывает с атрибутами шейдера.
   * А в случае Buffer.ElementArrayBuffer связывает массив индексов.
   *
   * Если используется первый раз, добавляет данные в контекст WebGL.
   *
   * @param {WebGLRenderingContext} gl
   * @param {?Number} location Положение аттрибута для связывания данных с переменными в шейдере
   * @param {?BufferBindOptions} options Параметры передаваемые в функцию vertexAttribPointer, если их нет,
   * то используются параметры конкретного буфера. Параметры должны быть переданы все.
   */


  _createClass(Buffer, [{
    key: "bind",
    value: function bind(gl, location, options) {
      if (!this._glBuffer) {
        this.prepare(gl);
      }

      if (this.type === Buffer.ArrayBuffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);

        options = options || this.options;

        gl.vertexAttribPointer(location, options.itemSize, this._toGlParam(gl, options.dataType), options.normalized, options.stride, options.offset);
      } else if (this.type === Buffer.ElementArrayBuffer) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBuffer);
      }

      return this;
    }

    /**
     * Удаляет данные из контекста WebGL.
     */

  }, {
    key: "remove",
    value: function remove() {
      this._unprepare();

      return this;
    }

    /**
     * Заменяет часть буфера новыми данными и отправляет их в видеокарту
     * @param {WebGLRenderingContext} gl
     * @param {Number} index Индекс, с которого начать замену
     * @param {TypedArray} data Новые данные
     */

  }, {
    key: "subData",
    value: function subData(gl, index, data) {
      gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
      gl.bufferSubData(this._toGlParam(gl, this.type), index, data);

      return this;
    }

    /**
     * Кладёт данные в видеокарту
     * @param {WebGLRenderingContext} gl
     * @ignore
     */

  }, {
    key: "prepare",
    value: function prepare(gl) {
      this._glContext = gl;
      this._glBuffer = gl.createBuffer();
      gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
      gl.bufferData(this._toGlParam(gl, this.type), this._initData, this._toGlParam(gl, this.drawType));
      this._initData = null;
    }

    /**
     * Удаляет данные из видеокарты
     * @ignore
     */

  }, {
    key: "_unprepare",
    value: function _unprepare() {
      if (this._glBuffer) {
        this._glContext.deleteBuffer(this._glBuffer);
        this._glBuffer = null;
        this._glContext = null;
      }
    }

    /**
     * Преобразовывает параметры буфера в параметры WebGL
     * @param {WebGLRenderingContext} gl
     * @param {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer} param
     * @ignore
     */

  }, {
    key: "_toGlParam",
    value: function _toGlParam(gl, param) {
      if (param === Buffer.ArrayBuffer) {
        return gl.ARRAY_BUFFER;
      }
      if (param === Buffer.ElementArrayBuffer) {
        return gl.ELEMENT_ARRAY_BUFFER;
      }
      if (param === Buffer.StaticDraw) {
        return gl.STATIC_DRAW;
      }
      if (param === Buffer.DynamicDraw) {
        return gl.DYNAMIC_DRAW;
      }
      if (param === Buffer.Byte) {
        return gl.BYTE;
      }
      if (param === Buffer.Short) {
        return gl.SHORT;
      }
      if (param === Buffer.Int) {
        return gl.INT;
      }
      if (param === Buffer.Float) {
        return gl.FLOAT;
      }
      if (param === Buffer.UnsignedByte) {
        return gl.UNSIGNED_BYTE;
      }
      if (param === Buffer.UnsignedShort) {
        return gl.UNSIGNED_SHORT;
      }
      if (param === Buffer.UnsignedInt) {
        return gl.UNSIGNED_INT;
      }
      return null;
    }
  }]);

  return Buffer;
}();

Buffer.ArrayBuffer = 1;
Buffer.ElementArrayBuffer = 2;

Buffer.StaticDraw = 10;
Buffer.DynamicDraw = 11;

Buffer.Float = 20;
Buffer.UnsignedByte = 21;
Buffer.UnsignedShort = 22;
Buffer.UnsignedInt = 23;
Buffer.Byte = 24;
Buffer.Short = 25;
Buffer.Int = 26;

Buffer.defaultOptions = {
  itemSize: 3,
  dataType: Buffer.Float,
  stride: 0,
  offset: 0,
  normalized: false
};

exports.default = Buffer;

/**
 * Параметры передаваемые в функцию vertexAttribPointer.
 *
 * @typedef {Object} BufferBindOptions
 * @property {Number} itemSize Размерность элементов в буфере
 * @property {Buffer.Float | Buffer.UnsignedByte} dataType Тип данных в буфере
 * @property {Boolean} normalized Используется для целочисленных типов. Если выставлен в true, то
 * значения имеющие тип BYTE от -128 до 128 будут переведены от -1.0 до 1.0.
 * @property {Number} stride
 * @property {Number} offset
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0EsT0FBTyxJQUFQLEdBQWMsRUFBZDtBQUNBLE9BQU8sS0FBUCxHQUFlLEVBQWY7QUFDQSxPQUFPLEdBQVAsR0FBYSxFQUFiOztBQUVBLE9BQU8sY0FBUCxHQUF3QjtBQUNwQixZQUFVLENBRFU7QUFFcEIsWUFBVSxPQUFPLEtBRkc7QUFHcEIsVUFBUSxDQUhZO0FBSXBCLFVBQVEsQ0FKWTtBQUtwQixjQUFZO0FBTFEsQ0FBeEI7O2tCQVFlLE07O0FBRWYiLCJmaWxlIjoiQnVmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0Lgg0L/QvtC00LPQvtGC0L7QstC60Lgg0LTQsNC90L3Ri9GFINC00LvRjyDQv9C10YDQtdC00LDRh9C4INCyINCw0YLRgNC40LHRg9GC0Ysg0YjQtdC50LTQtdGA0LBcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXkgfCBBcnJheUJ1ZmZlciB8IG51bWJlcn0gaW5pdERhdGEg0JTQsNC90L3Ri9C1INC00LvRjyDQuNC90LjRgtCwINCx0YPRhNC10YDQsDpcbiAqINGB0L7QtNC10YDQttC40LzQvtC1INCx0YPRhNC10YDQsCDQuNC70Lgg0LXQs9C+INGA0LDQt9C80LXRgFxuICogQHBhcmFtIHs/QnVmZmVyQmluZE9wdGlvbnN9IG9wdGlvbnMg0J/QsNGA0LDQvNC10YLRgNGLINC/0LXRgNC10LTQsNGH0Lgg0LHRg9GE0LXRgNCwINCyINCy0LjQtNC10L7QutCw0YDRgtGDLFxuICog0LzQvtCz0YPRgiDQsdGL0YLRjCDQv9C10YDQtdC+0L/RgNC10LTQtdC70LXQvdGLINC40Lcge0BsaW5rIEJ1ZmZlckNoYW5uZWx9XG4gKi9cbmNsYXNzIEJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoaW5pdERhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faW5pdERhdGEgPSBpbml0RGF0YTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KDQsNC30LzQtdGAINC00LDQvdC90YvRhSDQsiDQsdGD0YTQtdGA0LUg0LIg0LHQsNC50YLQsNGFXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJ5dGVMZW5ndGggPSBpbml0RGF0YS5ieXRlTGVuZ3RoICE9PSB1bmRlZmluZWQgPyBpbml0RGF0YS5ieXRlTGVuZ3RoIDogaW5pdERhdGE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCi0LjQvyDQsdGD0YTQtdGA0LAuINCR0YPRhNC10YAg0LzQvtC20LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINC00LvRjyDQv9C10YDQtdC00LDRh9C4INC80LDRgdGB0LjQstCwINC00LDQvdC90YvRhSxcbiAgICAgICAgICog0YLQsNC6INC4INC00LvRjyDQv9C10YDQtdC00LDRh9C4INC40L3QtNC10LrRgdC+0LIg0Y3Qu9C10LzQtdC90YLQvtCyINC40Lcg0LTQsNC90L3Ri9GFLlxuICAgICAgICAgKiBAdHlwZSB7QnVmZmVyLkFycmF5QnVmZmVyIHwgQnVmZmVyLkVsZW1lbnRBcnJheUJ1ZmZlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IEJ1ZmZlci5BcnJheUJ1ZmZlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KPQutCw0LfRi9Cy0LDQtdGCLCDQutCw0Log0YfQsNGB0YLQviDQtNCw0L3QvdGL0LUg0LHRg9GE0LXRgNCwINCx0YPQtNGD0YIg0LjQt9C80LXQvdGP0YLRjNGB0Y8uXG4gICAgICAgICAqIEB0eXBlIHtCdWZmZXIuU3RhdGljRHJhdyB8IEJ1ZmZlci5EeW5hbWljRHJhd31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhd1R5cGUgPSBCdWZmZXIuU3RhdGljRHJhdztcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/QsNGA0LDQvNC10YLRgNGLINC00LvRjyDRgdCy0Y/Qt9GL0LLQsNC90LjRjyDQsdGD0YTQtdGA0LBcbiAgICAgICAgICogQHR5cGUge0J1ZmZlckJpbmRPcHRpb25zfVxuICAgICAgICAgKiBAaWdub3JlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBCdWZmZXIuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmNGB0YXQvtC00L3Ri9C5IFdlYkdMINCx0YPRhNC10YBcbiAgICAgICAgICogQHR5cGUgez9XZWJHTEJ1ZmZlcn1cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZ2xCdWZmZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmtC+0L3RgtC10LrRgdGCIFdlYkdMLCDQsiDQutC+0YLQvtGA0L7QvCDQsdGL0Lsg0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNC9INCx0YPRhNC10YAuXG4gICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDRgtC+0LvRjNC60L4g0LTQu9GPINGD0LTQsNC70LXQvdC40Y8g0LHRg9GE0LXRgNCwLCDQv9C+0LTRg9C80LDRgtGMINGF0L7RgNC+0YjQviwg0L/RgNC10LbQtNC1INGH0LXQvCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LTQu9GPINGH0LXQs9C+LdGC0L4g0LXRidGRLlxuICAgICAgICAgKiBAdHlwZSB7P1dlYkdMUmVuZGVyaW5nQ29udGV4dH1cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZ2xDb250ZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCy0Y/Qt9GL0LLQsNC10YIg0LTQsNC90L3Ri9C1INGBINC60L7QvdGC0LXQutGB0YLQvtC8IFdlYkdMLlxuICAgICAqXG4gICAgICog0JIg0YHQu9GD0YfQsNC1IEJ1ZmZlci5BcnJheUJ1ZmZlciDRgdCy0Y/Qt9GL0LLQsNC10YIg0YEg0LDRgtGA0LjQsdGD0YLQsNC80Lgg0YjQtdC50LTQtdGA0LAuXG4gICAgICog0JAg0LIg0YHQu9GD0YfQsNC1IEJ1ZmZlci5FbGVtZW50QXJyYXlCdWZmZXIg0YHQstGP0LfRi9Cy0LDQtdGCINC80LDRgdGB0LjQsiDQuNC90LTQtdC60YHQvtCyLlxuICAgICAqXG4gICAgICog0JXRgdC70Lgg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC/0LXRgNCy0YvQuSDRgNCw0LcsINC00L7QsdCw0LLQu9GP0LXRgiDQtNCw0L3QvdGL0LUg0LIg0LrQvtC90YLQtdC60YHRgiBXZWJHTC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBwYXJhbSB7P051bWJlcn0gbG9jYXRpb24g0J/QvtC70L7QttC10L3QuNC1INCw0YLRgtGA0LjQsdGD0YLQsCDQtNC70Y8g0YHQstGP0LfRi9Cy0LDQvdC40Y8g0LTQsNC90L3Ri9GFINGBINC/0LXRgNC10LzQtdC90L3Ri9C80Lgg0LIg0YjQtdC50LTQtdGA0LVcbiAgICAgKiBAcGFyYW0gez9CdWZmZXJCaW5kT3B0aW9uc30gb3B0aW9ucyDQn9Cw0YDQsNC80LXRgtGA0Ysg0L/QtdGA0LXQtNCw0LLQsNC10LzRi9C1INCyINGE0YPQvdC60YbQuNGOIHZlcnRleEF0dHJpYlBvaW50ZXIsINC10YHQu9C4INC40YUg0L3QtdGCLFxuICAgICAqINGC0L4g0LjRgdC/0L7Qu9GM0LfRg9GO0YLRgdGPINC/0LDRgNCw0LzQtdGC0YDRiyDQutC+0L3QutGA0LXRgtC90L7Qs9C+INCx0YPRhNC10YDQsC4g0J/QsNGA0LDQvNC10YLRgNGLINC00L7Qu9C20L3RiyDQsdGL0YLRjCDQv9C10YDQtdC00LDQvdGLINCy0YHQtS5cbiAgICAgKi9cbiAgICBiaW5kKGdsLCBsb2NhdGlvbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuX2dsQnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUoZ2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQnVmZmVyLkFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fZ2xCdWZmZXIpO1xuXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIG9wdGlvbnMuaXRlbVNpemUsIHRoaXMuX3RvR2xQYXJhbShnbCwgb3B0aW9ucy5kYXRhVHlwZSksXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ub3JtYWxpemVkLCBvcHRpb25zLnN0cmlkZSwgb3B0aW9ucy5vZmZzZXQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBCdWZmZXIuRWxlbWVudEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLl9nbEJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C00LDQu9GP0LXRgiDQtNCw0L3QvdGL0LUg0LjQtyDQutC+0L3RgtC10LrRgdGC0LAgV2ViR0wuXG4gICAgICovXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLl91bnByZXBhcmUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0LzQtdC90Y/QtdGCINGH0LDRgdGC0Ywg0LHRg9GE0LXRgNCwINC90L7QstGL0LzQuCDQtNCw0L3QvdGL0LzQuCDQuCDQvtGC0L/RgNCw0LLQu9GP0LXRgiDQuNGFINCyINCy0LjQtNC10L7QutCw0YDRgtGDXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4INCY0L3QtNC10LrRgSwg0YEg0LrQvtGC0L7RgNC+0LPQviDQvdCw0YfQsNGC0Ywg0LfQsNC80LXQvdGDXG4gICAgICogQHBhcmFtIHtUeXBlZEFycmF5fSBkYXRhINCd0L7QstGL0LUg0LTQsNC90L3Ri9C1XG4gICAgICovXG4gICAgc3ViRGF0YShnbCwgaW5kZXgsIGRhdGEpIHtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcih0aGlzLl90b0dsUGFyYW0oZ2wsIHRoaXMudHlwZSksIHRoaXMuX2dsQnVmZmVyKTtcbiAgICAgICAgZ2wuYnVmZmVyU3ViRGF0YSh0aGlzLl90b0dsUGFyYW0oZ2wsIHRoaXMudHlwZSksIGluZGV4LCBkYXRhKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmtC70LDQtNGR0YIg0LTQsNC90L3Ri9C1INCyINCy0LjQtNC10L7QutCw0YDRgtGDXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHByZXBhcmUoZ2wpIHtcbiAgICAgICAgdGhpcy5fZ2xDb250ZXh0ID0gZ2w7XG4gICAgICAgIHRoaXMuX2dsQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIodGhpcy5fdG9HbFBhcmFtKGdsLCB0aGlzLnR5cGUpLCB0aGlzLl9nbEJ1ZmZlcik7XG4gICAgICAgIGdsLmJ1ZmZlckRhdGEodGhpcy5fdG9HbFBhcmFtKGdsLCB0aGlzLnR5cGUpLCB0aGlzLl9pbml0RGF0YSwgdGhpcy5fdG9HbFBhcmFtKGdsLCB0aGlzLmRyYXdUeXBlKSk7XG4gICAgICAgIHRoaXMuX2luaXREYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C00LDQu9GP0LXRgiDQtNCw0L3QvdGL0LUg0LjQtyDQstC40LTQtdC+0LrQsNGA0YLRi1xuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBfdW5wcmVwYXJlKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2xCdWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2dsQ29udGV4dC5kZWxldGVCdWZmZXIodGhpcy5fZ2xCdWZmZXIpO1xuICAgICAgICAgICAgdGhpcy5fZ2xCdWZmZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZ2xDb250ZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0YDQtdC+0LHRgNCw0LfQvtCy0YvQstCw0LXRgiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHRg9GE0LXRgNCwINCyINC/0LDRgNCw0LzQtdGC0YDRiyBXZWJHTFxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBwYXJhbSB7QnVmZmVyLkFycmF5QnVmZmVyIHwgQnVmZmVyLkVsZW1lbnRBcnJheUJ1ZmZlcn0gcGFyYW1cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgX3RvR2xQYXJhbShnbCwgcGFyYW0pIHtcbiAgICAgICAgaWYgKHBhcmFtID09PSBCdWZmZXIuQXJyYXlCdWZmZXIpIHsgcmV0dXJuIGdsLkFSUkFZX0JVRkZFUjsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IEJ1ZmZlci5FbGVtZW50QXJyYXlCdWZmZXIpIHsgcmV0dXJuIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSOyB9XG4gICAgICAgIGlmIChwYXJhbSA9PT0gQnVmZmVyLlN0YXRpY0RyYXcpIHsgcmV0dXJuIGdsLlNUQVRJQ19EUkFXOyB9XG4gICAgICAgIGlmIChwYXJhbSA9PT0gQnVmZmVyLkR5bmFtaWNEcmF3KSB7IHJldHVybiBnbC5EWU5BTUlDX0RSQVc7IH1cbiAgICAgICAgaWYgKHBhcmFtID09PSBCdWZmZXIuQnl0ZSkgeyByZXR1cm4gZ2wuQllURTsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IEJ1ZmZlci5TaG9ydCkgeyByZXR1cm4gZ2wuU0hPUlQ7IH1cbiAgICAgICAgaWYgKHBhcmFtID09PSBCdWZmZXIuSW50KSB7IHJldHVybiBnbC5JTlQ7IH1cbiAgICAgICAgaWYgKHBhcmFtID09PSBCdWZmZXIuRmxvYXQpIHsgcmV0dXJuIGdsLkZMT0FUOyB9XG4gICAgICAgIGlmIChwYXJhbSA9PT0gQnVmZmVyLlVuc2lnbmVkQnl0ZSkgeyByZXR1cm4gZ2wuVU5TSUdORURfQllURTsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IEJ1ZmZlci5VbnNpZ25lZFNob3J0KSB7IHJldHVybiBnbC5VTlNJR05FRF9TSE9SVDsgfVxuICAgICAgICBpZiAocGFyYW0gPT09IEJ1ZmZlci5VbnNpZ25lZEludCkgeyByZXR1cm4gZ2wuVU5TSUdORURfSU5UOyB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cblxuQnVmZmVyLkFycmF5QnVmZmVyID0gMTtcbkJ1ZmZlci5FbGVtZW50QXJyYXlCdWZmZXIgPSAyO1xuXG5CdWZmZXIuU3RhdGljRHJhdyA9IDEwO1xuQnVmZmVyLkR5bmFtaWNEcmF3ID0gMTE7XG5cbkJ1ZmZlci5GbG9hdCA9IDIwO1xuQnVmZmVyLlVuc2lnbmVkQnl0ZSA9IDIxO1xuQnVmZmVyLlVuc2lnbmVkU2hvcnQgPSAyMjtcbkJ1ZmZlci5VbnNpZ25lZEludCA9IDIzO1xuQnVmZmVyLkJ5dGUgPSAyNDtcbkJ1ZmZlci5TaG9ydCA9IDI1O1xuQnVmZmVyLkludCA9IDI2O1xuXG5CdWZmZXIuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaXRlbVNpemU6IDMsXG4gICAgZGF0YVR5cGU6IEJ1ZmZlci5GbG9hdCxcbiAgICBzdHJpZGU6IDAsXG4gICAgb2Zmc2V0OiAwLFxuICAgIG5vcm1hbGl6ZWQ6IGZhbHNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXI7XG5cbi8qKlxuICog0J/QsNGA0LDQvNC10YLRgNGLINC/0LXRgNC10LTQsNCy0LDQtdC80YvQtSDQsiDRhNGD0L3QutGG0LjRjiB2ZXJ0ZXhBdHRyaWJQb2ludGVyLlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEJ1ZmZlckJpbmRPcHRpb25zXG4gKiBAcHJvcGVydHkge051bWJlcn0gaXRlbVNpemUg0KDQsNC30LzQtdGA0L3QvtGB0YLRjCDRjdC70LXQvNC10L3RgtC+0LIg0LIg0LHRg9GE0LXRgNC1XG4gKiBAcHJvcGVydHkge0J1ZmZlci5GbG9hdCB8IEJ1ZmZlci5VbnNpZ25lZEJ5dGV9IGRhdGFUeXBlINCi0LjQvyDQtNCw0L3QvdGL0YUg0LIg0LHRg9GE0LXRgNC1XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IG5vcm1hbGl6ZWQg0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDRhtC10LvQvtGH0LjRgdC70LXQvdC90YvRhSDRgtC40L/QvtCyLiDQldGB0LvQuCDQstGL0YHRgtCw0LLQu9C10L0g0LIgdHJ1ZSwg0YLQvlxuICog0LfQvdCw0YfQtdC90LjRjyDQuNC80LXRjtGJ0LjQtSDRgtC40L8gQllURSDQvtGCIC0xMjgg0LTQviAxMjgg0LHRg9C00YPRgiDQv9C10YDQtdCy0LXQtNC10L3RiyDQvtGCIC0xLjAg0LTQviAxLjAuXG4gKiBAcHJvcGVydHkge051bWJlcn0gc3RyaWRlXG4gKiBAcHJvcGVydHkge051bWJlcn0gb2Zmc2V0XG4gKi9cbiJdfQ==