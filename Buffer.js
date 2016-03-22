"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера
 *
 * @param {TypedArray} array Типизированный массив данных, например, координат вершин
 * @param {Number} itemSize Размерность данных, например, 3 - для коодинат вершин
 */

var Buffer = function () {
    function Buffer(array, itemSize) {
        _classCallCheck(this, Buffer);

        this._array = array;

        /**
         * Размерность данных
         * @type {Number}
         */
        this.itemSize = itemSize;

        /**
         * Количество элементов в массиве данных
         * @type {Number}
         */
        this.length = array.length / itemSize;

        /**
         * Тип буфера. Буфер может использоваться для передачи массива данных,
         * так и для передачи индексов элементов из данных.
         * @type {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer}
         */
        this.type = Buffer.ArrayBuffer;

        /**
         * Инициализация буфера происходит в момент первого рендеринга.
         * Текущий WebGl контекст сохраняется в этой переменной.
         * Если конекст меняется, буфер необходимо инициализровать заного.
         * @type {?WebGLRenderingContext}
         * @ignore
         */
        this._preparedGlContext = null;
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
     * @param {?Number} attribute Аттрибут для связывания данных с переменными в шейдере
     */


    _createClass(Buffer, [{
        key: "bind",
        value: function bind(gl, attribute) {
            if (this._preparedGlContext !== gl) {
                this._unprepare(this._preparedGlContext);
            }

            if (!this._glBuffer) {
                this._prepare(gl);
            }

            if (this.type === Buffer.ArrayBuffer) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);
                gl.vertexAttribPointer(attribute, this.itemSize, gl.FLOAT, false, 0, 0);
            } else if (this.type === Buffer.ElementArrayBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBuffer);
            }

            return this;
        }

        /**
         * Удаляет данные из контекста WebGL.
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: "remove",
        value: function remove(gl) {
            this._unprepare(gl);

            return this;
        }

        /**
         * Возвращает массив данных
         * @returns {TypedArray}
         */

    }, {
        key: "getArray",
        value: function getArray() {
            return this._array;
        }

        /**
         * Возвращает элемент из массива данных
         * @param {Number} index Номер элемента в массиве данных
         * @returns {TypedArray}
         */

    }, {
        key: "getElement",
        value: function getElement(index) {
            return this._array.subarray(index * this.itemSize, (index + 1) * this.itemSize);
        }

        /**
         * Возвращает тройку элементов из массива данных
         * @param {Number} index Индекс
         * @returns {TypedArray[]}
         */

    }, {
        key: "getTriangle",
        value: function getTriangle(index) {
            index *= 3;

            return [this.getElement(index), this.getElement(index + 1), this.getElement(index + 2)];
        }

        /**
         * Конкатенирует данный буфер с другим.
         * Осторожно, метод не проверяет одинаковой размерности данные или нет.
         * @param {Buffer} buffer
         */

    }, {
        key: "concat",
        value: function concat(buffer) {
            var addArray = buffer.getArray();
            var newArray = new this._array.constructor(this._array.length + addArray.length);
            newArray.set(this._array, 0);
            newArray.set(addArray, this._array.length);

            this._array = newArray;
            this.length = newArray.length / this.itemSize;
        }

        /**
         * Кладёт данные в видеокарту
         * @param {WebGLRenderingContext} gl
         * @ignore
         */

    }, {
        key: "_prepare",
        value: function _prepare(gl) {
            this._glBuffer = gl.createBuffer();
            gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
            gl.bufferData(this._toGlParam(gl, this.type), this._array, gl.STATIC_DRAW);
            this._preparedGlContext = gl;
        }

        /**
         * Удаляет данные из видеокарты
         * @param {WebGLRenderingContext} gl
         * @ignore
         */

    }, {
        key: "_unprepare",
        value: function _unprepare(gl) {
            if (!gl) {
                return;
            }

            if (this._glBuffer) {
                gl.deleteBuffer(this._glBuffer);
            }
            this._glBuffer = null;
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
        }
    }]);

    return Buffer;
}();

Buffer.ArrayBuffer = 1;
Buffer.ElementArrayBuffer = 2;

exports.default = Buffer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LFNBQUwsQ0FBOUMsQ0FGUztBQUdULGVBQUcsVUFBSCxDQUFjLEtBQUssVUFBTCxDQUFnQixFQUFoQixFQUFvQixLQUFLLElBQUwsQ0FBbEMsRUFBOEMsS0FBSyxNQUFMLEVBQWEsR0FBRyxXQUFILENBQTNELENBSFM7QUFJVCxpQkFBSyxrQkFBTCxHQUEwQixFQUExQixDQUpTOzs7Ozs7Ozs7OzttQ0FZRixJQUFJO0FBQ1gsZ0JBQUksQ0FBQyxFQUFELEVBQUs7QUFBRSx1QkFBRjthQUFUOztBQUVBLGdCQUFJLEtBQUssU0FBTCxFQUFnQjtBQUNoQixtQkFBRyxZQUFILENBQWdCLEtBQUssU0FBTCxDQUFoQixDQURnQjthQUFwQjtBQUdBLGlCQUFLLFNBQUwsR0FBaUIsSUFBakIsQ0FOVzs7Ozs7Ozs7Ozs7O21DQWVKLElBQUksT0FBTztBQUNsQixnQkFBSSxVQUFVLE9BQU8sV0FBUCxFQUFvQjtBQUFFLHVCQUFPLEdBQUcsWUFBSCxDQUFUO2FBQWxDO0FBQ0EsZ0JBQUksVUFBVSxPQUFPLGtCQUFQLEVBQTJCO0FBQUUsdUJBQU8sR0FBRyxvQkFBSCxDQUFUO2FBQXpDOzs7O1dBMUpGOzs7QUE4Sk4sT0FBTyxXQUFQLEdBQXFCLENBQXJCO0FBQ0EsT0FBTyxrQkFBUCxHQUE0QixDQUE1Qjs7a0JBRWUiLCJmaWxlIjoiQnVmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0Lgg0L/QvtC00LPQvtGC0L7QstC60Lgg0LTQsNC90L3Ri9GFINC00LvRjyDQv9C10YDQtdC00LDRh9C4INCyINCw0YLRgNC40LHRg9GC0Ysg0YjQtdC50LTQtdGA0LBcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9IGFycmF5INCi0LjQv9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0LzQsNGB0YHQuNCyINC00LDQvdC90YvRhSwg0L3QsNC/0YDQuNC80LXRgCwg0LrQvtC+0YDQtNC40L3QsNGCINCy0LXRgNGI0LjQvVxuICogQHBhcmFtIHtOdW1iZXJ9IGl0ZW1TaXplINCg0LDQt9C80LXRgNC90L7RgdGC0Ywg0LTQsNC90L3Ri9GFLCDQvdCw0L/RgNC40LzQtdGALCAzIC0g0LTQu9GPINC60L7QvtC00LjQvdCw0YIg0LLQtdGA0YjQuNC9XG4gKi9cbmNsYXNzIEJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3IoYXJyYXksIGl0ZW1TaXplKSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCg0LDQt9C80LXRgNC90L7RgdGC0Ywg0LTQsNC90L3Ri9GFXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLml0ZW1TaXplID0gaXRlbVNpemU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQsiDQvNCw0YHRgdC40LLQtSDQtNCw0L3QvdGL0YVcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoIC8gaXRlbVNpemU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCi0LjQvyDQsdGD0YTQtdGA0LAuINCR0YPRhNC10YAg0LzQvtC20LXRgiDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINC00LvRjyDQv9C10YDQtdC00LDRh9C4INC80LDRgdGB0LjQstCwINC00LDQvdC90YvRhSxcbiAgICAgICAgICog0YLQsNC6INC4INC00LvRjyDQv9C10YDQtdC00LDRh9C4INC40L3QtNC10LrRgdC+0LIg0Y3Qu9C10LzQtdC90YLQvtCyINC40Lcg0LTQsNC90L3Ri9GFLlxuICAgICAgICAgKiBAdHlwZSB7QnVmZmVyLkFycmF5QnVmZmVyIHwgQnVmZmVyLkVsZW1lbnRBcnJheUJ1ZmZlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IEJ1ZmZlci5BcnJheUJ1ZmZlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LHRg9GE0LXRgNCwINC/0YDQvtC40YHRhdC+0LTQuNGCINCyINC80L7QvNC10L3RgiDQv9C10YDQstC+0LPQviDRgNC10L3QtNC10YDQuNC90LPQsC5cbiAgICAgICAgICog0KLQtdC60YPRidC40LkgV2ViR2wg0LrQvtC90YLQtdC60YHRgiDRgdC+0YXRgNCw0L3Rj9C10YLRgdGPINCyINGN0YLQvtC5INC/0LXRgNC10LzQtdC90L3QvtC5LlxuICAgICAgICAgKiDQldGB0LvQuCDQutC+0L3QtdC60YHRgiDQvNC10L3Rj9C10YLRgdGPLCDQsdGD0YTQtdGAINC90LXQvtCx0YXQvtC00LjQvNC+INC40L3QuNGG0LjQsNC70LjQt9GA0L7QstCw0YLRjCDQt9Cw0L3QvtCz0L4uXG4gICAgICAgICAqIEB0eXBlIHs/V2ViR0xSZW5kZXJpbmdDb250ZXh0fVxuICAgICAgICAgKiBAaWdub3JlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wcmVwYXJlZEdsQ29udGV4dCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHQstGP0LfRi9Cy0LDQtdGCINC00LDQvdC90YvQtSDRgSDQutC+0L3RgtC10LrRgdGC0L7QvCBXZWJHTC5cbiAgICAgKlxuICAgICAqINCSINGB0LvRg9GH0LDQtSBCdWZmZXIuQXJyYXlCdWZmZXIg0YHQstGP0LfRi9Cy0LDQtdGCINGBINCw0YLRgNC40LHRg9GC0LDQvNC4INGI0LXQudC00LXRgNCwLlxuICAgICAqINCQINCyINGB0LvRg9GH0LDQtSBCdWZmZXIuRWxlbWVudEFycmF5QnVmZmVyINGB0LLRj9C30YvQstCw0LXRgiDQvNCw0YHRgdC40LIg0LjQvdC00LXQutGB0L7Qsi5cbiAgICAgKlxuICAgICAqINCV0YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQv9C10YDQstGL0Lkg0YDQsNC3LCDQtNC+0LHQsNCy0LvRj9C10YIg0LTQsNC90L3Ri9C1INCyINC60L7QvdGC0LXQutGB0YIgV2ViR0wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKiBAcGFyYW0gez9OdW1iZXJ9IGF0dHJpYnV0ZSDQkNGC0YLRgNC40LHRg9GCINC00LvRjyDRgdCy0Y/Qt9GL0LLQsNC90LjRjyDQtNCw0L3QvdGL0YUg0YEg0L/QtdGA0LXQvNC10L3QvdGL0LzQuCDQsiDRiNC10LnQtNC10YDQtVxuICAgICAqL1xuICAgIGJpbmQoZ2wsIGF0dHJpYnV0ZSkge1xuICAgICAgICBpZiAodGhpcy5fcHJlcGFyZWRHbENvbnRleHQgIT09IGdsKSB7XG4gICAgICAgICAgICB0aGlzLl91bnByZXBhcmUodGhpcy5fcHJlcGFyZWRHbENvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9nbEJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZShnbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBCdWZmZXIuQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl9nbEJ1ZmZlcik7XG4gICAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJpYnV0ZSwgdGhpcy5pdGVtU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IEJ1ZmZlci5FbGVtZW50QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX2dsQnVmZmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0LTQsNC70Y/QtdGCINC00LDQvdC90YvQtSDQuNC3INC60L7QvdGC0LXQutGB0YLQsCBXZWJHTC5cbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKi9cbiAgICByZW1vdmUoZ2wpIHtcbiAgICAgICAgdGhpcy5fdW5wcmVwYXJlKGdsKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0LTQsNC90L3Ri9GFXG4gICAgICogQHJldHVybnMge1R5cGVkQXJyYXl9XG4gICAgICovXG4gICAgZ2V0QXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDRjdC70LXQvNC10L3RgiDQuNC3INC80LDRgdGB0LjQstCwINC00LDQvdC90YvRhVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCDQndC+0LzQtdGAINGN0LvQtdC80LXQvdGC0LAg0LIg0LzQsNGB0YHQuNCy0LUg0LTQsNC90L3Ri9GFXG4gICAgICogQHJldHVybnMge1R5cGVkQXJyYXl9XG4gICAgICovXG4gICAgZ2V0RWxlbWVudChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkuc3ViYXJyYXkoaW5kZXggKiB0aGlzLml0ZW1TaXplLCAoaW5kZXggKyAxKSAqIHRoaXMuaXRlbVNpemUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0YDQvtC50LrRgyDRjdC70LXQvNC10L3RgtC+0LIg0LjQtyDQvNCw0YHRgdC40LLQsCDQtNCw0L3QvdGL0YVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXgg0JjQvdC00LXQutGBXG4gICAgICogQHJldHVybnMge1R5cGVkQXJyYXlbXX1cbiAgICAgKi9cbiAgICBnZXRUcmlhbmdsZShpbmRleCkge1xuICAgICAgICBpbmRleCAqPSAzO1xuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoaW5kZXgpLFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KGluZGV4ICsgMSksXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoaW5kZXggKyAyKVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCa0L7QvdC60LDRgtC10L3QuNGA0YPQtdGCINC00LDQvdC90YvQuSDQsdGD0YTQtdGAINGBINC00YDRg9Cz0LjQvC5cbiAgICAgKiDQntGB0YLQvtGA0L7QttC90L4sINC80LXRgtC+0LQg0L3QtSDQv9GA0L7QstC10YDRj9C10YIg0L7QtNC40L3QsNC60L7QstC+0Lkg0YDQsNC30LzQtdGA0L3QvtGB0YLQuCDQtNCw0L3QvdGL0LUg0LjQu9C4INC90LXRgi5cbiAgICAgKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gICAgICovXG4gICAgY29uY2F0KGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBhZGRBcnJheSA9IGJ1ZmZlci5nZXRBcnJheSgpO1xuICAgICAgICBjb25zdCBuZXdBcnJheSA9IG5ldyB0aGlzLl9hcnJheS5jb25zdHJ1Y3Rvcih0aGlzLl9hcnJheS5sZW5ndGggKyBhZGRBcnJheS5sZW5ndGgpO1xuICAgICAgICBuZXdBcnJheS5zZXQodGhpcy5fYXJyYXksIDApO1xuICAgICAgICBuZXdBcnJheS5zZXQoYWRkQXJyYXksIHRoaXMuX2FycmF5Lmxlbmd0aCk7XG5cbiAgICAgICAgdGhpcy5fYXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBuZXdBcnJheS5sZW5ndGggLyB0aGlzLml0ZW1TaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCa0LvQsNC00ZHRgiDQtNCw0L3QvdGL0LUg0LIg0LLQuNC00LXQvtC60LDRgNGC0YNcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgX3ByZXBhcmUoZ2wpIHtcbiAgICAgICAgdGhpcy5fZ2xCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcih0aGlzLl90b0dsUGFyYW0oZ2wsIHRoaXMudHlwZSksIHRoaXMuX2dsQnVmZmVyKTtcbiAgICAgICAgZ2wuYnVmZmVyRGF0YSh0aGlzLl90b0dsUGFyYW0oZ2wsIHRoaXMudHlwZSksIHRoaXMuX2FycmF5LCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVkR2xDb250ZXh0ID0gZ2w7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPQtNCw0LvRj9C10YIg0LTQsNC90L3Ri9C1INC40Lcg0LLQuNC00LXQvtC60LDRgNGC0YtcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgX3VucHJlcGFyZShnbCkge1xuICAgICAgICBpZiAoIWdsKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh0aGlzLl9nbEJ1ZmZlcikge1xuICAgICAgICAgICAgZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX2dsQnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9nbEJ1ZmZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC10L7QsdGA0LDQt9C+0LLRi9Cy0LDQtdGCINC/0LDRgNCw0LzQtdGC0YDRiyDQsdGD0YTQtdGA0LAg0LIg0L/QsNGA0LDQvNC10YLRgNGLIFdlYkdMXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHtCdWZmZXIuQXJyYXlCdWZmZXIgfCBCdWZmZXIuRWxlbWVudEFycmF5QnVmZmVyfSBwYXJhbVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBfdG9HbFBhcmFtKGdsLCBwYXJhbSkge1xuICAgICAgICBpZiAocGFyYW0gPT09IEJ1ZmZlci5BcnJheUJ1ZmZlcikgeyByZXR1cm4gZ2wuQVJSQVlfQlVGRkVSOyB9XG4gICAgICAgIGlmIChwYXJhbSA9PT0gQnVmZmVyLkVsZW1lbnRBcnJheUJ1ZmZlcikgeyByZXR1cm4gZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVI7IH1cbiAgICB9XG59XG5cbkJ1ZmZlci5BcnJheUJ1ZmZlciA9IDE7XG5CdWZmZXIuRWxlbWVudEFycmF5QnVmZmVyID0gMjtcblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyO1xuIl19