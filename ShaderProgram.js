'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShaderAttribute = require('./ShaderAttribute');

var _ShaderAttribute2 = _interopRequireDefault(_ShaderAttribute);

var _ShaderUniform = require('./ShaderUniform');

var _ShaderUniform2 = _interopRequireDefault(_ShaderUniform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Шейдерная программа инициализирует шейдеры, подготавливает и связывает данные с WebGL.
 *
 * @param {Object} options
 * @param {Shader} vertex Вершинный шейдер
 * @param {Shader} fragment Фрагментный шейдер
 * @param {UniformDefinition[]} [options.uniforms=[]] Описание юниформ
 * @param {AttributeDefinition[]} [options.attributes=[]] Описание атрибутов
 */
var ShaderProgram = function () {
    function ShaderProgram(options) {
        var _this = this;

        _classCallCheck(this, ShaderProgram);

        options = options || {};

        this._vertexShader = options.vertex;
        this._fragmentShader = options.fragment;

        this.uniforms = {};
        options.uniforms = options.uniforms || [];
        options.uniforms.forEach(function (obj) {
            _this.uniforms[obj.name] = new _ShaderUniform2.default(obj);
        });

        this.attributes = {};
        options.attributes = options.attributes || [];
        options.attributes.forEach(function (obj) {
            _this.attributes[obj.name] = new _ShaderAttribute2.default(obj);
        });

        this._linked = false;
        this._located = false;
    }

    /**
     * Инициализирует программу с контекстом WebGl
     *
     * @param {WebGLRenderingContext} gl
     */


    _createClass(ShaderProgram, [{
        key: 'enable',
        value: function enable(gl) {
            this.link(gl);
            this.locate(gl);

            gl.useProgram(this._webglProgram);

            return this;
        }

        /**
         * Связывает юниформы и атрибуты программы с контекстом WebGl
         *
         * @param {WebGLRenderingContext} gl
         * @param {Object} [uniforms] Key-value объект содержащий значения юниформ
         * @param {Object} [attributes] Key-value объект содержащий значения атрибутов
         */

    }, {
        key: 'bind',
        value: function bind(gl, uniforms, attributes) {
            if (uniforms) {
                for (var name in uniforms) {
                    this.uniforms[name].bind(gl, uniforms[name]);
                }
            }

            if (attributes) {
                for (var _name in attributes) {
                    this.attributes[_name].bind(gl, attributes[_name]);
                }
            }

            return this;
        }

        /**
         * Выключает программу
         *
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'disable',
        value: function disable(gl) {
            for (var name in this.attributes) {
                this.attributes[name].disable(gl);
            }

            return this;
        }

        /**
         * Компилирует шейдеры и слинковывает программу.
         * Одна из двух необходимых функций для работы шейдерной программы.
         *
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'link',
        value: function link(gl) {
            if (this._linked) {
                return this;
            }

            this._webglProgram = gl.createProgram();

            if (this._vertexShader) {
                gl.attachShader(this._webglProgram, this._vertexShader.get(gl));
            }

            if (this._fragmentShader) {
                gl.attachShader(this._webglProgram, this._fragmentShader.get(gl));
            }

            for (var name in this.attributes) {
                this.attributes[name].bindLocation(gl, this._webglProgram);
            }

            gl.linkProgram(this._webglProgram);

            this._linked = true;

            return this;
        }

        /**
         * Лоцирует атрибуты и юниформе на основе шейдера.
         * Одна из двух необходимых функций для работы шейдерной программы.
         *
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'locate',
        value: function locate(gl) {
            if (this._located) {
                return this;
            }

            for (var name in this.attributes) {
                this.attributes[name].getLocation(gl, this._webglProgram);
            }

            for (var _name2 in this.uniforms) {
                this.uniforms[_name2].getLocation(gl, this._webglProgram);
            }

            this._located = true;

            return this;
        }
    }]);

    return ShaderProgram;
}();

exports.default = ShaderProgram;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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T0FBTCxHQUFlLElBQWY7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7K0JBTU8sRSxFQUFJO0FBQ1AsZ0JBQUksS0FBSyxRQUFULEVBQW1CO0FBQ2YsdUJBQU8sSUFBUDtBQUNIOztBQUVELGlCQUFLLElBQU0sSUFBWCxJQUFtQixLQUFLLFVBQXhCLEVBQW9DO0FBQ2hDLHFCQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsV0FBdEIsQ0FBa0MsRUFBbEMsRUFBc0MsS0FBSyxhQUEzQztBQUNIOztBQUVELGlCQUFLLElBQU0sTUFBWCxJQUFtQixLQUFLLFFBQXhCLEVBQWtDO0FBQzlCLHFCQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQW9CLFdBQXBCLENBQWdDLEVBQWhDLEVBQW9DLEtBQUssYUFBekM7QUFDSDs7QUFFRCxpQkFBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLGEiLCJmaWxlIjoiU2hhZGVyUHJvZ3JhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFkZXJBdHRyaWJ1dGUgZnJvbSAnLi9TaGFkZXJBdHRyaWJ1dGUnO1xuaW1wb3J0IFNoYWRlclVuaWZvcm0gZnJvbSAnLi9TaGFkZXJVbmlmb3JtJztcblxuLyoqXG4gKiDQqNC10LnQtNC10YDQvdCw0Y8g0L/RgNC+0LPRgNCw0LzQvNCwINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10YIg0YjQtdC50LTQtdGA0YssINC/0L7QtNCz0L7RgtCw0LLQu9C40LLQsNC10YIg0Lgg0YHQstGP0LfRi9Cy0LDQtdGCINC00LDQvdC90YvQtSDRgSBXZWJHTC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtTaGFkZXJ9IHZlcnRleCDQktC10YDRiNC40L3QvdGL0Lkg0YjQtdC50LTQtdGAXG4gKiBAcGFyYW0ge1NoYWRlcn0gZnJhZ21lbnQg0KTRgNCw0LPQvNC10L3RgtC90YvQuSDRiNC10LnQtNC10YBcbiAqIEBwYXJhbSB7VW5pZm9ybURlZmluaXRpb25bXX0gW29wdGlvbnMudW5pZm9ybXM9W11dINCe0L/QuNGB0LDQvdC40LUg0Y7QvdC40YTQvtGA0LxcbiAqIEBwYXJhbSB7QXR0cmlidXRlRGVmaW5pdGlvbltdfSBbb3B0aW9ucy5hdHRyaWJ1dGVzPVtdXSDQntC/0LjRgdCw0L3QuNC1INCw0YLRgNC40LHRg9GC0L7QslxuICovXG5jbGFzcyBTaGFkZXJQcm9ncmFtIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHRoaXMuX3ZlcnRleFNoYWRlciA9IG9wdGlvbnMudmVydGV4O1xuICAgICAgICB0aGlzLl9mcmFnbWVudFNoYWRlciA9IG9wdGlvbnMuZnJhZ21lbnQ7XG5cbiAgICAgICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICAgICAgICBvcHRpb25zLnVuaWZvcm1zID0gb3B0aW9ucy51bmlmb3JtcyB8fCBbXTtcbiAgICAgICAgb3B0aW9ucy51bmlmb3Jtcy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1zW29iai5uYW1lXSA9IG5ldyBTaGFkZXJVbmlmb3JtKG9iaik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwgW107XG4gICAgICAgIG9wdGlvbnMuYXR0cmlidXRlcy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbb2JqLm5hbWVdID0gbmV3IFNoYWRlckF0dHJpYnV0ZShvYmopO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9saW5rZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbG9jYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10YIg0L/RgNC+0LPRgNCw0LzQvNGDINGBINC60L7QvdGC0LXQutGB0YLQvtC8IFdlYkdsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKi9cbiAgICBlbmFibGUoZ2wpIHtcbiAgICAgICAgdGhpcy5saW5rKGdsKTtcbiAgICAgICAgdGhpcy5sb2NhdGUoZ2wpO1xuXG4gICAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5fd2ViZ2xQcm9ncmFtKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodCy0Y/Qt9GL0LLQsNC10YIg0Y7QvdC40YTQvtGA0LzRiyDQuCDQsNGC0YDQuNCx0YPRgtGLINC/0YDQvtCz0YDQsNC80LzRiyDRgSDQutC+0L3RgtC10LrRgdGC0L7QvCBXZWJHbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt1bmlmb3Jtc10gS2V5LXZhbHVlINC+0LHRitC10LrRgiDRgdC+0LTQtdGA0LbQsNGJ0LjQuSDQt9C90LDRh9C10L3QuNGPINGO0L3QuNGE0L7RgNC8XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFthdHRyaWJ1dGVzXSBLZXktdmFsdWUg0L7QsdGK0LXQutGCINGB0L7QtNC10YDQttCw0YnQuNC5INC30L3QsNGH0LXQvdC40Y8g0LDRgtGA0LjQsdGD0YLQvtCyXG4gICAgICovXG4gICAgYmluZChnbCwgdW5pZm9ybXMsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKHVuaWZvcm1zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdW5pZm9ybXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaWZvcm1zW25hbWVdLmJpbmQoZ2wsIHVuaWZvcm1zW25hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlc1tuYW1lXS5iaW5kKGdsLCBhdHRyaWJ1dGVzW25hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQutC70Y7Rh9Cw0LXRgiDQv9GA0L7Qs9GA0LDQvNC80YNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqL1xuICAgIGRpc2FibGUoZ2wpIHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdLmRpc2FibGUoZ2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JrQvtC80L/QuNC70LjRgNGD0LXRgiDRiNC10LnQtNC10YDRiyDQuCDRgdC70LjQvdC60L7QstGL0LLQsNC10YIg0L/RgNC+0LPRgNCw0LzQvNGDLlxuICAgICAqINCe0LTQvdCwINC40Lcg0LTQstGD0YUg0L3QtdC+0LHRhdC+0LTQuNC80YvRhSDRhNGD0L3QutGG0LjQuSDQtNC70Y8g0YDQsNCx0L7RgtGLINGI0LXQudC00LXRgNC90L7QuSDQv9GA0L7Qs9GA0LDQvNC80YsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKi9cbiAgICBsaW5rKGdsKSB7XG4gICAgICAgIGlmICh0aGlzLl9saW5rZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fd2ViZ2xQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl92ZXJ0ZXhTaGFkZXIpIHtcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl93ZWJnbFByb2dyYW0sIHRoaXMuX3ZlcnRleFNoYWRlci5nZXQoZ2wpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mcmFnbWVudFNoYWRlcikge1xuICAgICAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuX3dlYmdsUHJvZ3JhbSwgdGhpcy5fZnJhZ21lbnRTaGFkZXIuZ2V0KGdsKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXNbbmFtZV0uYmluZExvY2F0aW9uKGdsLCB0aGlzLl93ZWJnbFByb2dyYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5fd2ViZ2xQcm9ncmFtKTtcblxuICAgICAgICB0aGlzLl9saW5rZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCb0L7RhtC40YDRg9C10YIg0LDRgtGA0LjQsdGD0YLRiyDQuCDRjtC90LjRhNC+0YDQvNC1INC90LAg0L7RgdC90L7QstC1INGI0LXQudC00LXRgNCwLlxuICAgICAqINCe0LTQvdCwINC40Lcg0LTQstGD0YUg0L3QtdC+0LHRhdC+0LTQuNC80YvRhSDRhNGD0L3QutGG0LjQuSDQtNC70Y8g0YDQsNCx0L7RgtGLINGI0LXQudC00LXRgNC90L7QuSDQv9GA0L7Qs9GA0LDQvNC80YsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKi9cbiAgICBsb2NhdGUoZ2wpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvY2F0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdLmdldExvY2F0aW9uKGdsLCB0aGlzLl93ZWJnbFByb2dyYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMudW5pZm9ybXMpIHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0uZ2V0TG9jYXRpb24oZ2wsIHRoaXMuX3dlYmdsUHJvZ3JhbSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2NhdGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoYWRlclByb2dyYW07XG4iXX0=