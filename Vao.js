"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Обертка над vertex array object.
 * https://developer.mozilla.org/ru/docs/Web/API/OES_vertex_array_object
 *
 * Для использования необходимо включить расширение renderer.addExtension('OES_vertex_array_object')
 *
 * @param {ShaderProgram} Шейдерная программа, каждый Vao привязан к одной шейдерной программе.
 * @param {Object} Key-value объект содержащий данные атрибутов.
 */
var Vao = function () {
    function Vao(shaderProgram) {
        var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Vao);

        this._vao = null;
        this._attributes = attributes;
        this._shaderProgram = shaderProgram;

        /**
         * WebGL экстеншен, в котором был инициализирован буфер.
         * Используется только для удаления vao, подумать хорошо, прежде чем использовать для чего-то ещё.
         */
        this._ext = null;
    }

    /**
     * Связывает vao с контекстом WebGL.
     *
     * @param {State} Стейт рендера
     */


    _createClass(Vao, [{
        key: "bind",
        value: function bind(state) {
            var ext = state.extensions.OES_vertex_array_object;

            if (ext) {
                this._bind(state.gl, ext);
            } else {
                // В случае фоллбека - биндим атрибуты прямо из шейдерной программы
                this._shaderProgram.bind(state.gl, null, this._attributes);
            }

            return this;
        }

        /**
         * Отвязывает vao от контекста WebGL.
         * ВНИМАНИЕ: Этот метод нужно вызывать всегда, перед тем как будет использоваться
         * стандартный подход для связывания атрибутов через {@link ShaderProgram#bind}.
         *
         * @param {State} state Стейт рендерера
         */

    }, {
        key: "unbind",
        value: function unbind(state) {
            var ext = state.extensions.OES_vertex_array_object;

            if (ext) {
                ext.bindVertexArrayOES(null);
            }

            return this;
        }

        /**
         * Удаляет vao.
         */

    }, {
        key: "remove",
        value: function remove() {
            if (this._vao) {
                this._ext.deleteVertexArrayOES(this._vao);
            }

            return this;
        }
    }, {
        key: "_bind",
        value: function _bind(gl, ext) {
            if (!this._vao) {
                this._prepare(gl, ext);
            } else {
                ext.bindVertexArrayOES(this._vao);
            }
        }
    }, {
        key: "_prepare",
        value: function _prepare(gl, ext) {
            this._ext = ext;
            this._vao = ext.createVertexArrayOES();

            ext.bindVertexArrayOES(this._vao);

            var shaderAttributes = this._shaderProgram.attributes;
            var attributes = this._attributes;

            // Биндим атрибуты переданные в конструктор, их параметры берём из шейдерной программы
            for (var name in attributes) {
                var shaderAttribute = shaderAttributes[name];
                if (shaderAttribute.index !== true) {
                    gl.enableVertexAttribArray(shaderAttribute.location);
                }
                attributes[name].bind(gl, shaderAttribute.location);
            }
        }
    }]);

    return Vao;
}();

exports.default = Vao;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9WYW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7SUFTTSxHO0FBQ0YsaUJBQVksYUFBWixFQUE0QztBQUFBLFlBQWpCLFVBQWlCLHlEQUFKLEVBQUk7O0FBQUE7O0FBQ3hDLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLFdBQUwsR0FBbUIsVUFBbkI7QUFDQSxhQUFLLGNBQUwsR0FBc0IsYUFBdEI7O0FBRUE7Ozs7QUFJQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs2QkFLSyxLLEVBQU87QUFDUixnQkFBTSxNQUFNLE1BQU0sVUFBTixDQUFpQix1QkFBN0I7O0FBRUEsZ0JBQUksR0FBSixFQUFTO0FBQ0wscUJBQUssS0FBTCxDQUFXLE1BQU0sRUFBakIsRUFBcUIsR0FBckI7QUFDSCxhQUZELE1BRU87QUFDSDtBQUNBLHFCQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsTUFBTSxFQUEvQixFQUFtQyxJQUFuQyxFQUF5QyxLQUFLLFdBQTlDO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7OytCQU9PLEssRUFBTztBQUNWLGdCQUFNLE1BQU0sTUFBTSxVQUFOLENBQWlCLHVCQUE3Qjs7QUFFQSxnQkFBSSxHQUFKLEVBQVM7QUFDTCxvQkFBSSxrQkFBSixDQUF1QixJQUF2QjtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7O2lDQUdTO0FBQ0wsZ0JBQUksS0FBSyxJQUFULEVBQWU7QUFDWCxxQkFBSyxJQUFMLENBQVUsb0JBQVYsQ0FBK0IsS0FBSyxJQUFwQztBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7OzhCQUVLLEUsRUFBSSxHLEVBQUs7QUFDWCxnQkFBSSxDQUFDLEtBQUssSUFBVixFQUFnQjtBQUNaLHFCQUFLLFFBQUwsQ0FBYyxFQUFkLEVBQWtCLEdBQWxCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsb0JBQUksa0JBQUosQ0FBdUIsS0FBSyxJQUE1QjtBQUNIO0FBQ0o7OztpQ0FFUSxFLEVBQUksRyxFQUFLO0FBQ2QsaUJBQUssSUFBTCxHQUFZLEdBQVo7QUFDQSxpQkFBSyxJQUFMLEdBQVksSUFBSSxvQkFBSixFQUFaOztBQUVBLGdCQUFJLGtCQUFKLENBQXVCLEtBQUssSUFBNUI7O0FBRUEsZ0JBQU0sbUJBQW1CLEtBQUssY0FBTCxDQUFvQixVQUE3QztBQUNBLGdCQUFNLGFBQWEsS0FBSyxXQUF4Qjs7QUFFQTtBQUNBLGlCQUFLLElBQU0sSUFBWCxJQUFtQixVQUFuQixFQUErQjtBQUMzQixvQkFBTSxrQkFBa0IsaUJBQWlCLElBQWpCLENBQXhCO0FBQ0Esb0JBQUksZ0JBQWdCLEtBQWhCLEtBQTBCLElBQTlCLEVBQW9DO0FBQ2hDLHVCQUFHLHVCQUFILENBQTJCLGdCQUFnQixRQUEzQztBQUNIO0FBQ0QsMkJBQVcsSUFBWCxFQUFpQixJQUFqQixDQUFzQixFQUF0QixFQUEwQixnQkFBZ0IsUUFBMUM7QUFDSDtBQUNKOzs7Ozs7a0JBR1UsRyIsImZpbGUiOiJWYW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqINCe0LHQtdGA0YLQutCwINC90LDQtCB2ZXJ0ZXggYXJyYXkgb2JqZWN0LlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvcnUvZG9jcy9XZWIvQVBJL09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0XG4gKlxuICog0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINC90LXQvtCx0YXQvtC00LjQvNC+INCy0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0YjQuNGA0LXQvdC40LUgcmVuZGVyZXIuYWRkRXh0ZW5zaW9uKCdPRVNfdmVydGV4X2FycmF5X29iamVjdCcpXG4gKlxuICogQHBhcmFtIHtTaGFkZXJQcm9ncmFtfSDQqNC10LnQtNC10YDQvdCw0Y8g0L/RgNC+0LPRgNCw0LzQvNCwLCDQutCw0LbQtNGL0LkgVmFvINC/0YDQuNCy0Y/Qt9Cw0L0g0Log0L7QtNC90L7QuSDRiNC10LnQtNC10YDQvdC+0Lkg0L/RgNC+0LPRgNCw0LzQvNC1LlxuICogQHBhcmFtIHtPYmplY3R9IEtleS12YWx1ZSDQvtCx0YrQtdC60YIg0YHQvtC00LXRgNC20LDRidC40Lkg0LTQsNC90L3Ri9C1INCw0YLRgNC40LHRg9GC0L7Qsi5cbiAqL1xuY2xhc3MgVmFvIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFkZXJQcm9ncmFtLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICAgICAgdGhpcy5fdmFvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0gPSBzaGFkZXJQcm9ncmFtO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZWJHTCDRjdC60YHRgtC10L3RiNC10L0sINCyINC60L7RgtC+0YDQvtC8INCx0YvQuyDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0L0g0LHRg9GE0LXRgC5cbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINGC0L7Qu9GM0LrQviDQtNC70Y8g0YPQtNCw0LvQtdC90LjRjyB2YW8sINC/0L7QtNGD0LzQsNGC0Ywg0YXQvtGA0L7RiNC+LCDQv9GA0LXQttC00LUg0YfQtdC8INC40YHQv9C+0LvRjNC30L7QstCw0YLRjCDQtNC70Y8g0YfQtdCz0L4t0YLQviDQtdGJ0ZEuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9leHQgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0LLRj9C30YvQstCw0LXRgiB2YW8g0YEg0LrQvtC90YLQtdC60YHRgtC+0LwgV2ViR0wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0YXRlfSDQodGC0LXQudGCINGA0LXQvdC00LXRgNCwXG4gICAgICovXG4gICAgYmluZChzdGF0ZSkge1xuICAgICAgICBjb25zdCBleHQgPSBzdGF0ZS5leHRlbnNpb25zLk9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0O1xuXG4gICAgICAgIGlmIChleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JpbmQoc3RhdGUuZ2wsIGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDQkiDRgdC70YPRh9Cw0LUg0YTQvtC70LvQsdC10LrQsCAtINCx0LjQvdC00LjQvCDQsNGC0YDQuNCx0YPRgtGLINC/0YDRj9C80L4g0LjQtyDRiNC10LnQtNC10YDQvdC+0Lkg0L/RgNC+0LPRgNCw0LzQvNGLXG4gICAgICAgICAgICB0aGlzLl9zaGFkZXJQcm9ncmFtLmJpbmQoc3RhdGUuZ2wsIG51bGwsIHRoaXMuX2F0dHJpYnV0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7RgtCy0Y/Qt9GL0LLQsNC10YIgdmFvINC+0YIg0LrQvtC90YLQtdC60YHRgtCwIFdlYkdMLlxuICAgICAqINCS0J3QmNCc0JDQndCY0JU6INCt0YLQvtGCINC80LXRgtC+0LQg0L3Rg9C20L3QviDQstGL0LfRi9Cy0LDRgtGMINCy0YHQtdCz0LTQsCwg0L/QtdGA0LXQtCDRgtC10Lwg0LrQsNC6INCx0YPQtNC10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGM0YHRj1xuICAgICAqINGB0YLQsNC90LTQsNGA0YLQvdGL0Lkg0L/QvtC00YXQvtC0INC00LvRjyDRgdCy0Y/Qt9GL0LLQsNC90LjRjyDQsNGC0YDQuNCx0YPRgtC+0LIg0YfQtdGA0LXQtyB7QGxpbmsgU2hhZGVyUHJvZ3JhbSNiaW5kfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlINCh0YLQtdC50YIg0YDQtdC90LTQtdGA0LXRgNCwXG4gICAgICovXG4gICAgdW5iaW5kKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHN0YXRlLmV4dGVuc2lvbnMuT0VTX3ZlcnRleF9hcnJheV9vYmplY3Q7XG5cbiAgICAgICAgaWYgKGV4dCkge1xuICAgICAgICAgICAgZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyhudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0LTQsNC70Y/QtdGCIHZhby5cbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl92YW8pIHtcbiAgICAgICAgICAgIHRoaXMuX2V4dC5kZWxldGVWZXJ0ZXhBcnJheU9FUyh0aGlzLl92YW8pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2JpbmQoZ2wsIGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Zhbykge1xuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZShnbCwgZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dC5iaW5kVmVydGV4QXJyYXlPRVModGhpcy5fdmFvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wcmVwYXJlKGdsLCBleHQpIHtcbiAgICAgICAgdGhpcy5fZXh0ID0gZXh0O1xuICAgICAgICB0aGlzLl92YW8gPSBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKTtcblxuICAgICAgICBleHQuYmluZFZlcnRleEFycmF5T0VTKHRoaXMuX3Zhbyk7XG5cbiAgICAgICAgY29uc3Qgc2hhZGVyQXR0cmlidXRlcyA9IHRoaXMuX3NoYWRlclByb2dyYW0uYXR0cmlidXRlcztcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHRoaXMuX2F0dHJpYnV0ZXM7XG5cbiAgICAgICAgLy8g0JHQuNC90LTQuNC8INCw0YLRgNC40LHRg9GC0Ysg0L/QtdGA0LXQtNCw0L3QvdGL0LUg0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCwg0LjRhSDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHQtdGA0ZHQvCDQuNC3INGI0LXQudC00LXRgNC90L7QuSDQv9GA0L7Qs9GA0LDQvNC80YtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlckF0dHJpYnV0ZSA9IHNoYWRlckF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgICAgICBpZiAoc2hhZGVyQXR0cmlidXRlLmluZGV4ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoc2hhZGVyQXR0cmlidXRlLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXNbbmFtZV0uYmluZChnbCwgc2hhZGVyQXR0cmlidXRlLmxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFvO1xuIl19