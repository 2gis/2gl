'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Шейдер компилирует код и хранит его в видеокарте.
 * Один шейдер может быть использован для нескольких программ.
 *
 * @param {String} type Тип шейдера: или vertex, или fragment
 * @param {String | String[]} code Код шейдера написанный на языке GLSL.
 * Можно передать несколько строк в виде массива, тогда перед компиляцией строки сложатся.
 * @param {Object[]} [definitions=[]]
 */
var Shader = function () {
    function Shader(type, code) {
        var definitions = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        _classCallCheck(this, Shader);

        /**
         * Тип шейдера
         * @type {Shader.Vertex | Shader.Fragment}
         */
        this.type = type === 'vertex' ? Shader.Vertex : Shader.Fragment;

        /**
         * Код шейдера
         * @type {String}
         * @ignore
         */
        this._code = Array.isArray(code) ? code.join('\n') : code || '';

        this._code = definitions.map(function (def) {
            if (def.value !== undefined) {
                return '#define ' + def.type + ' ' + def.value;
            } else {
                return '#define ' + def.type;
            }
        }).join('\n') + '\n' + this._code;
    }

    /**
     * Возвращает webgl шейдер для связывания с программой.
     * Если шейдер используюется первый раз, то компилирует его.
     */


    _createClass(Shader, [{
        key: 'get',
        value: function get(gl) {
            if (!this._shader) {
                this._compile(gl);
            }
            return this._shader;
        }

        /**
         * Удаляет шейдер из видеокарты
         * @param  {WebGLRenderingContext} gl Контекст WebGl
         */

    }, {
        key: 'remove',
        value: function remove(gl) {
            if (this._shader) {
                gl.deleteShader(this._shader);
            }
        }

        /**
         * Компилирует данный шейдер
         * @param  {WebGLRenderingContext} gl Контекст WebGL
         * @ignore
         */

    }, {
        key: '_compile',
        value: function _compile(gl) {
            var glType = this.type === Shader.Vertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
            var shader = this._shader = gl.createShader(glType);
            gl.shaderSource(shader, this._code);
            gl.compileShader(shader);
        }
    }]);

    return Shader;
}();

Shader.Vertex = 1;
Shader.Fragment = 2;

exports.default = Shader;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TaGFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7SUFTTSxNO0FBQ0Ysb0JBQVksSUFBWixFQUFrQixJQUFsQixFQUEwQztBQUFBLFlBQWxCLFdBQWtCLHlEQUFKLEVBQUk7O0FBQUE7O0FBQ3RDOzs7O0FBSUEsYUFBSyxJQUFMLEdBQVksU0FBUyxRQUFULEdBQW9CLE9BQU8sTUFBM0IsR0FBb0MsT0FBTyxRQUF2RDs7QUFFQTs7Ozs7QUFLQSxhQUFLLEtBQUwsR0FBYSxNQUFNLE9BQU4sQ0FBYyxJQUFkLElBQXNCLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBdEIsR0FBeUMsUUFBUSxFQUE5RDs7QUFFQSxhQUFLLEtBQUwsR0FBYSxZQUFZLEdBQVosQ0FBZ0IsZUFBTztBQUNoQyxnQkFBSSxJQUFJLEtBQUosS0FBYyxTQUFsQixFQUE2QjtBQUN6Qix1QkFBTyxhQUFhLElBQUksSUFBakIsR0FBd0IsR0FBeEIsR0FBOEIsSUFBSSxLQUF6QztBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLGFBQWEsSUFBSSxJQUF4QjtBQUNIO0FBQ0osU0FOWSxFQU1WLElBTlUsQ0FNTCxJQU5LLElBTUcsSUFOSCxHQU1VLEtBQUssS0FONUI7QUFPSDs7QUFFRDs7Ozs7Ozs7NEJBSUksRSxFQUFJO0FBQ0osZ0JBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDZixxQkFBSyxRQUFMLENBQWMsRUFBZDtBQUNIO0FBQ0QsbUJBQU8sS0FBSyxPQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs7K0JBSU8sRSxFQUFJO0FBQ1AsZ0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2QsbUJBQUcsWUFBSCxDQUFnQixLQUFLLE9BQXJCO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7aUNBS1MsRSxFQUFJO0FBQ1QsZ0JBQU0sU0FBUyxLQUFLLElBQUwsS0FBYyxPQUFPLE1BQXJCLEdBQThCLEdBQUcsYUFBakMsR0FBaUQsR0FBRyxlQUFuRTtBQUNBLGdCQUFNLFNBQVMsS0FBSyxPQUFMLEdBQWUsR0FBRyxZQUFILENBQWdCLE1BQWhCLENBQTlCO0FBQ0EsZUFBRyxZQUFILENBQWdCLE1BQWhCLEVBQXdCLEtBQUssS0FBN0I7QUFDQSxlQUFHLGFBQUgsQ0FBaUIsTUFBakI7QUFDSDs7Ozs7O0FBR0wsT0FBTyxNQUFQLEdBQWdCLENBQWhCO0FBQ0EsT0FBTyxRQUFQLEdBQWtCLENBQWxCOztrQkFFZSxNIiwiZmlsZSI6IlNoYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog0KjQtdC50LTQtdGAINC60L7QvNC/0LjQu9C40YDRg9C10YIg0LrQvtC0INC4INGF0YDQsNC90LjRgiDQtdCz0L4g0LIg0LLQuNC00LXQvtC60LDRgNGC0LUuXG4gKiDQntC00LjQvSDRiNC10LnQtNC10YAg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC9INC00LvRjyDQvdC10YHQutC+0LvRjNC60LjRhSDQv9GA0L7Qs9GA0LDQvNC8LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlINCi0LjQvyDRiNC10LnQtNC10YDQsDog0LjQu9C4IHZlcnRleCwg0LjQu9C4IGZyYWdtZW50XG4gKiBAcGFyYW0ge1N0cmluZyB8IFN0cmluZ1tdfSBjb2RlINCa0L7QtCDRiNC10LnQtNC10YDQsCDQvdCw0L/QuNGB0LDQvdC90YvQuSDQvdCwINGP0LfRi9C60LUgR0xTTC5cbiAqINCc0L7QttC90L4g0L/QtdGA0LXQtNCw0YLRjCDQvdC10YHQutC+0LvRjNC60L4g0YHRgtGA0L7QuiDQsiDQstC40LTQtSDQvNCw0YHRgdC40LLQsCwg0YLQvtCz0LTQsCDQv9C10YDQtdC0INC60L7QvNC/0LjQu9GP0YbQuNC10Lkg0YHRgtGA0L7QutC4INGB0LvQvtC20LDRgtGB0Y8uXG4gKiBAcGFyYW0ge09iamVjdFtdfSBbZGVmaW5pdGlvbnM9W11dXG4gKi9cbmNsYXNzIFNoYWRlciB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgY29kZSwgZGVmaW5pdGlvbnMgPSBbXSkge1xuICAgICAgICAvKipcbiAgICAgICAgICog0KLQuNC/INGI0LXQudC00LXRgNCwXG4gICAgICAgICAqIEB0eXBlIHtTaGFkZXIuVmVydGV4IHwgU2hhZGVyLkZyYWdtZW50fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZSA9PT0gJ3ZlcnRleCcgPyBTaGFkZXIuVmVydGV4IDogU2hhZGVyLkZyYWdtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmtC+0LQg0YjQtdC50LTQtdGA0LBcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGlnbm9yZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fY29kZSA9IEFycmF5LmlzQXJyYXkoY29kZSkgPyBjb2RlLmpvaW4oJ1xcbicpIDogKGNvZGUgfHwgJycpO1xuXG4gICAgICAgIHRoaXMuX2NvZGUgPSBkZWZpbml0aW9ucy5tYXAoZGVmID0+IHtcbiAgICAgICAgICAgIGlmIChkZWYudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnI2RlZmluZSAnICsgZGVmLnR5cGUgKyAnICcgKyBkZWYudmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnI2RlZmluZSAnICsgZGVmLnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmpvaW4oJ1xcbicpICsgJ1xcbicgKyB0aGlzLl9jb2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCIHdlYmdsINGI0LXQudC00LXRgCDQtNC70Y8g0YHQstGP0LfRi9Cy0LDQvdC40Y8g0YEg0L/RgNC+0LPRgNCw0LzQvNC+0LkuXG4gICAgICog0JXRgdC70Lgg0YjQtdC50LTQtdGAINC40YHQv9C+0LvRjNC30YPRjtC10YLRgdGPINC/0LXRgNCy0YvQuSDRgNCw0LcsINGC0L4g0LrQvtC80L/QuNC70LjRgNGD0LXRgiDQtdCz0L4uXG4gICAgICovXG4gICAgZ2V0KGdsKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2hhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21waWxlKGdsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0LTQsNC70Y/QtdGCINGI0LXQudC00LXRgCDQuNC3INCy0LjQtNC10L7QutCw0YDRgtGLXG4gICAgICogQHBhcmFtICB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCDQmtC+0L3RgtC10LrRgdGCIFdlYkdsXG4gICAgICovXG4gICAgcmVtb3ZlKGdsKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaGFkZXIpIHtcbiAgICAgICAgICAgIGdsLmRlbGV0ZVNoYWRlcih0aGlzLl9zaGFkZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JrQvtC80L/QuNC70LjRgNGD0LXRgiDQtNCw0L3QvdGL0Lkg0YjQtdC50LTQtdGAXG4gICAgICogQHBhcmFtICB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbCDQmtC+0L3RgtC10LrRgdGCIFdlYkdMXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIF9jb21waWxlKGdsKSB7XG4gICAgICAgIGNvbnN0IGdsVHlwZSA9IHRoaXMudHlwZSA9PT0gU2hhZGVyLlZlcnRleCA/IGdsLlZFUlRFWF9TSEFERVIgOiBnbC5GUkFHTUVOVF9TSEFERVI7XG4gICAgICAgIGNvbnN0IHNoYWRlciA9IHRoaXMuX3NoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbFR5cGUpO1xuICAgICAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCB0aGlzLl9jb2RlKTtcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIH1cbn1cblxuU2hhZGVyLlZlcnRleCA9IDE7XG5TaGFkZXIuRnJhZ21lbnQgPSAyO1xuXG5leHBvcnQgZGVmYXVsdCBTaGFkZXI7XG4iXX0=