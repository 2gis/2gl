'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Шейдерная юниформа, используется только {@link ShaderProgram}
 *
 * @param {UniformDefinition} options
 * @ignore
 */
var ShaderUniform = function () {
    function ShaderUniform(options) {
        _classCallCheck(this, ShaderUniform);

        this.name = options.name;
        this.type = options.type;
        this.location = -1;
    }

    _createClass(ShaderUniform, [{
        key: 'getLocation',
        value: function getLocation(gl, webglProgram) {
            this.location = gl.getUniformLocation(webglProgram, this.name);
            return this;
        }
    }, {
        key: 'bind',
        value: function bind(gl, value) {
            var type = this.type;

            if (type === 'mat2') {
                gl.uniformMatrix2fv(this.location, false, value);
            } else if (type === 'mat3') {
                gl.uniformMatrix3fv(this.location, false, value);
            } else if (type === 'mat4') {
                gl.uniformMatrix4fv(this.location, false, value);
            } else if (type === '2f') {
                gl.uniform2f(this.location, value[0], value[1]);
            } else if (type === '3f') {
                gl.uniform3f(this.location, value[0], value[1], value[2]);
            } else if (type === '4f') {
                gl.uniform4f(this.location, value[0], value[1], value[2], value[3]);
            } else if (type === '2i') {
                gl.uniform2i(this.location, value[0], value[1]);
            } else if (type === '3i') {
                gl.uniform3i(this.location, value[0], value[1], value[2]);
            } else if (type === '4i') {
                gl.uniform4i(this.location, value[0], value[1], value[2], value[3]);
            } else {
                gl['uniform' + type](this.location, value);
            }

            return this;
        }
    }]);

    return ShaderUniform;
}();

exports.default = ShaderUniform;

/**
 * Описание шейдерной юниформы
 *
 * @typedef {Object} UniformDefinition
 * @property {String} name Название юниформы
 * @property {String} type Тип юниформы, может быть: mat[234], [1234][fi], [1234][fi]v
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TaGFkZXJVbmlmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBTU0sYTtBQUNGLDJCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsYUFBSyxJQUFMLEdBQVksUUFBUSxJQUFwQjtBQUNBLGFBQUssSUFBTCxHQUFZLFFBQVEsSUFBcEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsQ0FBQyxDQUFqQjtBQUNIOzs7O29DQUVXLEUsRUFBSSxZLEVBQWM7QUFDMUIsaUJBQUssUUFBTCxHQUFnQixHQUFHLGtCQUFILENBQXNCLFlBQXRCLEVBQW9DLEtBQUssSUFBekMsQ0FBaEI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7Ozs2QkFFSSxFLEVBQUksSyxFQUFPO0FBQ1osZ0JBQU0sT0FBTyxLQUFLLElBQWxCOztBQUVBLGdCQUFJLFNBQVMsTUFBYixFQUFxQjtBQUNqQixtQkFBRyxnQkFBSCxDQUFvQixLQUFLLFFBQXpCLEVBQW1DLEtBQW5DLEVBQTBDLEtBQTFDO0FBQ0gsYUFGRCxNQUVPLElBQUksU0FBUyxNQUFiLEVBQXFCO0FBQ3hCLG1CQUFHLGdCQUFILENBQW9CLEtBQUssUUFBekIsRUFBbUMsS0FBbkMsRUFBMEMsS0FBMUM7QUFDSCxhQUZNLE1BRUEsSUFBSSxTQUFTLE1BQWIsRUFBcUI7QUFDeEIsbUJBQUcsZ0JBQUgsQ0FBb0IsS0FBSyxRQUF6QixFQUFtQyxLQUFuQyxFQUEwQyxLQUExQztBQUNILGFBRk0sTUFFQSxJQUFJLFNBQVMsSUFBYixFQUFtQjtBQUN0QixtQkFBRyxTQUFILENBQWEsS0FBSyxRQUFsQixFQUE0QixNQUFNLENBQU4sQ0FBNUIsRUFBc0MsTUFBTSxDQUFOLENBQXRDO0FBQ0gsYUFGTSxNQUVBLElBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ3RCLG1CQUFHLFNBQUgsQ0FBYSxLQUFLLFFBQWxCLEVBQTRCLE1BQU0sQ0FBTixDQUE1QixFQUFzQyxNQUFNLENBQU4sQ0FBdEMsRUFBZ0QsTUFBTSxDQUFOLENBQWhEO0FBQ0gsYUFGTSxNQUVBLElBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ3RCLG1CQUFHLFNBQUgsQ0FBYSxLQUFLLFFBQWxCLEVBQTRCLE1BQU0sQ0FBTixDQUE1QixFQUFzQyxNQUFNLENBQU4sQ0FBdEMsRUFBZ0QsTUFBTSxDQUFOLENBQWhELEVBQTBELE1BQU0sQ0FBTixDQUExRDtBQUNILGFBRk0sTUFFQSxJQUFJLFNBQVMsSUFBYixFQUFtQjtBQUN0QixtQkFBRyxTQUFILENBQWEsS0FBSyxRQUFsQixFQUE0QixNQUFNLENBQU4sQ0FBNUIsRUFBc0MsTUFBTSxDQUFOLENBQXRDO0FBQ0gsYUFGTSxNQUVBLElBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ3RCLG1CQUFHLFNBQUgsQ0FBYSxLQUFLLFFBQWxCLEVBQTRCLE1BQU0sQ0FBTixDQUE1QixFQUFzQyxNQUFNLENBQU4sQ0FBdEMsRUFBZ0QsTUFBTSxDQUFOLENBQWhEO0FBQ0gsYUFGTSxNQUVBLElBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ3RCLG1CQUFHLFNBQUgsQ0FBYSxLQUFLLFFBQWxCLEVBQTRCLE1BQU0sQ0FBTixDQUE1QixFQUFzQyxNQUFNLENBQU4sQ0FBdEMsRUFBZ0QsTUFBTSxDQUFOLENBQWhELEVBQTBELE1BQU0sQ0FBTixDQUExRDtBQUNILGFBRk0sTUFFQTtBQUNILG1CQUFHLFlBQVksSUFBZixFQUFxQixLQUFLLFFBQTFCLEVBQW9DLEtBQXBDO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBR1UsYTs7QUFFZiIsImZpbGUiOiJTaGFkZXJVbmlmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDQqNC10LnQtNC10YDQvdCw0Y8g0Y7QvdC40YTQvtGA0LzQsCwg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINGC0L7Qu9GM0LrQviB7QGxpbmsgU2hhZGVyUHJvZ3JhbX1cbiAqXG4gKiBAcGFyYW0ge1VuaWZvcm1EZWZpbml0aW9ufSBvcHRpb25zXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIFNoYWRlclVuaWZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICB0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbihnbCwgd2ViZ2xQcm9ncmFtKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24od2ViZ2xQcm9ncmFtLCB0aGlzLm5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBiaW5kKGdsLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnbWF0MicpIHtcbiAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYodGhpcy5sb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWF0MycpIHtcbiAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5sb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWF0NCcpIHtcbiAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5sb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnMmYnKSB7XG4gICAgICAgICAgICBnbC51bmlmb3JtMmYodGhpcy5sb2NhdGlvbiwgdmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnM2YnKSB7XG4gICAgICAgICAgICBnbC51bmlmb3JtM2YodGhpcy5sb2NhdGlvbiwgdmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJzRmJykge1xuICAgICAgICAgICAgZ2wudW5pZm9ybTRmKHRoaXMubG9jYXRpb24sIHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0sIHZhbHVlWzNdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnMmknKSB7XG4gICAgICAgICAgICBnbC51bmlmb3JtMmkodGhpcy5sb2NhdGlvbiwgdmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnM2knKSB7XG4gICAgICAgICAgICBnbC51bmlmb3JtM2kodGhpcy5sb2NhdGlvbiwgdmFsdWVbMF0sIHZhbHVlWzFdLCB2YWx1ZVsyXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJzRpJykge1xuICAgICAgICAgICAgZ2wudW5pZm9ybTRpKHRoaXMubG9jYXRpb24sIHZhbHVlWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMl0sIHZhbHVlWzNdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsWyd1bmlmb3JtJyArIHR5cGVdKHRoaXMubG9jYXRpb24sIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hhZGVyVW5pZm9ybTtcblxuLyoqXG4gKiDQntC/0LjRgdCw0L3QuNC1INGI0LXQudC00LXRgNC90L7QuSDRjtC90LjRhNC+0YDQvNGLXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gVW5pZm9ybURlZmluaXRpb25cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lINCd0LDQt9Cy0LDQvdC40LUg0Y7QvdC40YTQvtGA0LzRi1xuICogQHByb3BlcnR5IHtTdHJpbmd9IHR5cGUg0KLQuNC/INGO0L3QuNGE0L7RgNC80YssINC80L7QttC10YIg0LHRi9GC0Yw6IG1hdFsyMzRdLCBbMTIzNF1bZmldLCBbMTIzNF1bZmlddlxuICovXG4iXX0=