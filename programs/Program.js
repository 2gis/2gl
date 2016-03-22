'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _definitions = require('./definitions');

var _definitions2 = _interopRequireDefault(_definitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cachedPrograms = {};

/**
 * Базовый класс для программ.
 * Программа инициализирует шейдеры, подготавливает и связывает данные с WebGL.
 */

var Program = function () {
    function Program() {
        _classCallCheck(this, Program);

        this._attributeList = [];
        this._uniformList = [];
        this._definitions = [];
        this._shader = null;

        /**
         * Прозрачность объекта отрисованного с помощью данной программы
         * @type {Number}
         */
        this.opacity = 1;
    }

    /**
     * Инициализирует программу. Связывает переменные шейдера с данными.
     * @param {State} state
     */


    _createClass(Program, [{
        key: 'enable',
        value: function enable(state) {
            var gl = state.gl;

            if (!this._shaderProgram) {
                this._prepare(state);
            }

            gl.useProgram(this._shaderProgram);

            for (var name in this.attributes) {
                gl.enableVertexAttribArray(this.attributes[name]);
            }

            this._bindMesh(state);

            return this;
        }

        /**
         * Отключает программу
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'disable',
        value: function disable(gl) {
            for (var name in this.attributes) {
                gl.disableVertexAttribArray(this.attributes[name]);
            }

            return this;
        }

        /**
         * Добавляет definitions в код шейдеров. Все добавления должны быть сделаны до первой инициализации.
         * @param {String} type
         * @param {Number | String} value
         */

    }, {
        key: 'define',
        value: function define(type, value) {
            if (_definitions2.default[type]) {
                this._definitions.push({ type: type, value: value });
            }

            return this;
        }

        /**
         * Вызывается объектом использующую данную программу,
         * чтобы определить к какому типу рендера принадлежит объект.
         * Самое простое разделение: на прозрачные и нет.
         *
         * @param {TypedObjects} typedObjects
         * @param {Object3D} object
         */

    }, {
        key: 'typifyForRender',
        value: function typifyForRender(typedObjects, object) {
            if (this.opacity === 1) {
                typedObjects.common.push(object);
            } else {
                typedObjects.transparent.push(object);
            }
        }
    }, {
        key: '_prepare',
        value: function _prepare(state) {
            this._prepareShaders(state);
            this._prepareAttributes(state);
            this._prepareUniforms(state);
        }
    }, {
        key: '_getCachedProgramKey',
        value: function _getCachedProgramKey() {
            return this.constructor.name + ':' + this._definitions.join(':');
        }
    }, {
        key: '_getCachedProgram',
        value: function _getCachedProgram() {
            return cachedPrograms[this._getCachedProgramKey()];
        }
    }, {
        key: '_prepareShaders',
        value: function _prepareShaders(_ref) {
            var gl = _ref.gl;

            var cachedProgram = this._getCachedProgram();

            if (cachedProgram && gl === cachedProgram.glContext) {
                this._shaderProgram = cachedProgram.program;
                return;
            }

            var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, this._addDefinitions(this._shader.fragment));
            gl.compileShader(fragmentShader);

            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(fragmentShader));
            }

            var vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, this._addDefinitions(this._shader.vertex));
            gl.compileShader(vertexShader);

            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(vertexShader));
            }

            this._shaderProgram = gl.createProgram();
            gl.attachShader(this._shaderProgram, vertexShader);
            gl.attachShader(this._shaderProgram, fragmentShader);
            gl.linkProgram(this._shaderProgram);

            if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
                console.log('Could not initialize shaders');
            }

            cachedPrograms[this._getCachedProgramKey()] = {
                glContext: gl,
                program: this._shaderProgram
            };
        }
    }, {
        key: '_addDefinitions',
        value: function _addDefinitions(shader) {
            return this._definitions.map(function (def) {
                if (def.value !== undefined) {
                    return '#define ' + _definitions2.default[def.type] + ' ' + def.value;
                } else {
                    return '#define ' + _definitions2.default[def.type];
                }
            }).join('\n') + '\n' + shader;
        }
    }, {
        key: '_prepareAttributes',
        value: function _prepareAttributes(_ref2) {
            var _this = this;

            var gl = _ref2.gl;

            this.attributes = {};

            this._attributeList.forEach(function (name) {
                _this.attributes[name] = gl.getAttribLocation(_this._shaderProgram, name);
            });
        }
    }, {
        key: '_prepareUniforms',
        value: function _prepareUniforms(_ref3) {
            var _this2 = this;

            var gl = _ref3.gl;

            this.uniforms = {};

            this._uniformList.forEach(function (name) {
                _this2.uniforms[name] = gl.getUniformLocation(_this2._shaderProgram, name);
            });
        }
    }, {
        key: '_bindMesh',
        value: function _bindMesh(state) {
            this._bindAttributes(state);
            this._bindUniforms(state);
        }
    }, {
        key: '_bindAttributes',
        value: function _bindAttributes(_ref4) {
            var _this3 = this;

            var gl = _ref4.gl;
            var object = _ref4.object;

            this._attributeList.forEach(function (name) {
                object.geometry.getBuffer(name).bind(gl, _this3.attributes[name]);
            });
        }
    }, {
        key: '_bindUniforms',
        value: function _bindUniforms(_ref5) {
            var gl = _ref5.gl;
            var object = _ref5.object;
            var camera = _ref5.camera;

            gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
            gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.modelViewMatrix));
            gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        }
    }]);

    return Program;
}();

exports.default = Program;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9ncmFtcy9Qcm9ncmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTSxpQkFBaUIsRUFBakI7Ozs7Ozs7SUFNQTtBQUNGLGFBREUsT0FDRixHQUFjOzhCQURaLFNBQ1k7O0FBQ1YsYUFBSyxjQUFMLEdBQXNCLEVBQXRCLENBRFU7QUFFVixhQUFLLFlBQUwsR0FBb0IsRUFBcEIsQ0FGVTtBQUdWLGFBQUssWUFBTCxHQUFvQixFQUFwQixDQUhVO0FBSVYsYUFBSyxPQUFMLEdBQWUsSUFBZjs7Ozs7O0FBSlUsWUFVVixDQUFLLE9BQUwsR0FBZSxDQUFmLENBVlU7S0FBZDs7Ozs7Ozs7aUJBREU7OytCQWtCSyxPQUFPO0FBQ1YsZ0JBQU0sS0FBSyxNQUFNLEVBQU4sQ0FERDs7QUFHVixnQkFBSSxDQUFDLEtBQUssY0FBTCxFQUFxQjtBQUN0QixxQkFBSyxRQUFMLENBQWMsS0FBZCxFQURzQjthQUExQjs7QUFJQSxlQUFHLFVBQUgsQ0FBYyxLQUFLLGNBQUwsQ0FBZCxDQVBVOztBQVNWLGlCQUFLLElBQU0sSUFBTixJQUFjLEtBQUssVUFBTCxFQUFpQjtBQUNoQyxtQkFBRyx1QkFBSCxDQUEyQixLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBM0IsRUFEZ0M7YUFBcEM7O0FBSUEsaUJBQUssU0FBTCxDQUFlLEtBQWYsRUFiVTs7QUFlVixtQkFBTyxJQUFQLENBZlU7Ozs7Ozs7Ozs7Z0NBc0JOLElBQUk7QUFDUixpQkFBSyxJQUFNLElBQU4sSUFBYyxLQUFLLFVBQUwsRUFBaUI7QUFDaEMsbUJBQUcsd0JBQUgsQ0FBNEIsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQTVCLEVBRGdDO2FBQXBDOztBQUlBLG1CQUFPLElBQVAsQ0FMUTs7Ozs7Ozs7Ozs7K0JBYUwsTUFBTSxPQUFPO0FBQ2hCLGdCQUFJLHNCQUFZLElBQVosQ0FBSixFQUF1QjtBQUNuQixxQkFBSyxZQUFMLENBQWtCLElBQWxCLENB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OztBQUNoQyxlQUFHLGdCQUFILENBQW9CLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsS0FBN0MsRUFBb0QsSUFBSSxZQUFKLENBQWlCLE9BQU8sV0FBUCxDQUFyRSxFQURnQztBQUVoQyxlQUFHLGdCQUFILENBQW9CLEtBQUssUUFBTCxDQUFjLE9BQWQsRUFBdUIsS0FBM0MsRUFBa0QsSUFBSSxZQUFKLENBQWlCLE9BQU8sZUFBUCxDQUFuRSxFQUZnQztBQUdoQyxlQUFHLFNBQUgsQ0FBYSxLQUFLLFFBQUwsQ0FBYyxXQUFkLEVBQTJCLEtBQUssT0FBTCxDQUF4QyxDQUhnQzs7OztXQXZLbEM7OztrQkE4S1MiLCJmaWxlIjoiUHJvZ3JhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWZpbml0aW9ucyBmcm9tICcuL2RlZmluaXRpb25zJztcblxuY29uc3QgY2FjaGVkUHJvZ3JhbXMgPSB7fTtcblxuLyoqXG4gKiDQkdCw0LfQvtCy0YvQuSDQutC70LDRgdGBINC00LvRjyDQv9GA0L7Qs9GA0LDQvNC8LlxuICog0J/RgNC+0LPRgNCw0LzQvNCwINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10YIg0YjQtdC50LTQtdGA0YssINC/0L7QtNCz0L7RgtCw0LLQu9C40LLQsNC10YIg0Lgg0YHQstGP0LfRi9Cy0LDQtdGCINC00LDQvdC90YvQtSDRgSBXZWJHTC5cbiAqL1xuY2xhc3MgUHJvZ3JhbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fdW5pZm9ybUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVmaW5pdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2hhZGVyID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LfRgNCw0YfQvdC+0YHRgtGMINC+0LHRitC10LrRgtCwINC+0YLRgNC40YHQvtCy0LDQvdC90L7Qs9C+INGBINC/0L7QvNC+0YnRjNGOINC00LDQvdC90L7QuSDQv9GA0L7Qs9GA0LDQvNC80YtcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXRgiDQv9GA0L7Qs9GA0LDQvNC80YMuINCh0LLRj9C30YvQstCw0LXRgiDQv9C10YDQtdC80LXQvdC90YvQtSDRiNC10LnQtNC10YDQsCDRgSDQtNCw0L3QvdGL0LzQuC5cbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuICAgICAqL1xuICAgIGVuYWJsZShzdGF0ZSkge1xuICAgICAgICBjb25zdCBnbCA9IHN0YXRlLmdsO1xuXG4gICAgICAgIGlmICghdGhpcy5fc2hhZGVyUHJvZ3JhbSkge1xuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZShzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMuX3NoYWRlclByb2dyYW0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9iaW5kTWVzaChzdGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7RgtC60LvRjtGH0LDQtdGCINC/0YDQvtCz0YDQsNC80LzRg1xuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqL1xuICAgIGRpc2FibGUoZ2wpIHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQlNC+0LHQsNCy0LvRj9C10YIgZGVmaW5pdGlvbnMg0LIg0LrQvtC0INGI0LXQudC00LXRgNC+0LIuINCS0YHQtSDQtNC+0LHQsNCy0LvQtdC90LjRjyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0YHQtNC10LvQsNC90Ysg0LTQviDQv9C10YDQstC+0Lkg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LguXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge051bWJlciB8IFN0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBkZWZpbmUodHlwZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb25zW3R5cGVdKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZpbml0aW9ucy5wdXNoKHt0eXBlLCB2YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L7QsdGK0LXQutGC0L7QvCDQuNGB0L/QvtC70YzQt9GD0Y7RidGD0Y4g0LTQsNC90L3Rg9GOINC/0YDQvtCz0YDQsNC80LzRgyxcbiAgICAgKiDRh9GC0L7QsdGLINC+0L/RgNC10LTQtdC70LjRgtGMINC6INC60LDQutC+0LzRgyDRgtC40L/RgyDRgNC10L3QtNC10YDQsCDQv9GA0LjQvdCw0LTQu9C10LbQuNGCINC+0LHRitC10LrRgi5cbiAgICAgKiDQodCw0LzQvtC1INC/0YDQvtGB0YLQvtC1INGA0LDQt9C00LXQu9C10L3QuNC1OiDQvdCwINC/0YDQvtC30YDQsNGH0L3Ri9C1INC4INC90LXRgi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VHlwZWRPYmplY3RzfSB0eXBlZE9iamVjdHNcbiAgICAgKiBAcGFyYW0ge09iamVjdDNEfSBvYmplY3RcbiAgICAgKi9cbiAgICB0eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzLCBvYmplY3QpIHtcbiAgICAgICAgaWYgKHRoaXMub3BhY2l0eSA9PT0gMSkge1xuICAgICAgICAgICAgdHlwZWRPYmplY3RzLmNvbW1vbi5wdXNoKG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eXBlZE9iamVjdHMudHJhbnNwYXJlbnQucHVzaChvYmplY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3ByZXBhcmUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZVNoYWRlcnMoc3RhdGUpO1xuICAgICAgICB0aGlzLl9wcmVwYXJlQXR0cmlidXRlcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVVbmlmb3JtcyhzdGF0ZSk7XG4gICAgfVxuXG4gICAgX2dldENhY2hlZFByb2dyYW1LZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnOicgKyB0aGlzLl9kZWZpbml0aW9ucy5qb2luKCc6Jyk7XG4gICAgfVxuXG4gICAgX2dldENhY2hlZFByb2dyYW0oKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRQcm9ncmFtc1t0aGlzLl9nZXRDYWNoZWRQcm9ncmFtS2V5KCldO1xuICAgIH1cblxuICAgIF9wcmVwYXJlU2hhZGVycyh7Z2x9KSB7XG4gICAgICAgIGNvbnN0IGNhY2hlZFByb2dyYW0gPSB0aGlzLl9nZXRDYWNoZWRQcm9ncmFtKCk7XG5cbiAgICAgICAgaWYgKGNhY2hlZFByb2dyYW0gJiYgZ2wgPT09IGNhY2hlZFByb2dyYW0uZ2xDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFkZXJQcm9ncmFtID0gY2FjaGVkUHJvZ3JhbS5wcm9ncmFtO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCB0aGlzLl9hZGREZWZpbml0aW9ucyh0aGlzLl9zaGFkZXIuZnJhZ21lbnQpKTtcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG5cbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB0aGlzLl9hZGREZWZpbml0aW9ucyh0aGlzLl9zaGFkZXIudmVydGV4KSk7XG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9zaGFkZXJQcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5fc2hhZGVyUHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLl9zaGFkZXJQcm9ncmFtKTtcblxuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fc2hhZGVyUHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGQgbm90IGluaXRpYWxpemUgc2hhZGVycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FjaGVkUHJvZ3JhbXNbdGhpcy5fZ2V0Q2FjaGVkUHJvZ3JhbUtleSgpXSA9IHtcbiAgICAgICAgICAgIGdsQ29udGV4dDogZ2wsXG4gICAgICAgICAgICBwcm9ncmFtOiB0aGlzLl9zaGFkZXJQcm9ncmFtXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX2FkZERlZmluaXRpb25zKHNoYWRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmaW5pdGlvbnMubWFwKGRlZiA9PiB7XG4gICAgICAgICAgICBpZiAoZGVmLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyNkZWZpbmUgJyArIGRlZmluaXRpb25zW2RlZi50eXBlXSArICcgJyArIGRlZi52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcjZGVmaW5lICcgKyBkZWZpbml0aW9uc1tkZWYudHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBzaGFkZXI7XG4gICAgfVxuXG4gICAgX3ByZXBhcmVBdHRyaWJ1dGVzKHtnbH0pIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG5cbiAgICAgICAgdGhpcy5fYXR0cmlidXRlTGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgbmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9wcmVwYXJlVW5pZm9ybXMoe2dsfSkge1xuICAgICAgICB0aGlzLnVuaWZvcm1zID0ge307XG5cbiAgICAgICAgdGhpcy5fdW5pZm9ybUxpc3QuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgbmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9iaW5kTWVzaChzdGF0ZSkge1xuICAgICAgICB0aGlzLl9iaW5kQXR0cmlidXRlcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuX2JpbmRVbmlmb3JtcyhzdGF0ZSk7XG4gICAgfVxuXG4gICAgX2JpbmRBdHRyaWJ1dGVzKHtnbCwgb2JqZWN0fSkge1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVMaXN0LmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICBvYmplY3QuZ2VvbWV0cnkuZ2V0QnVmZmVyKG5hbWUpLmJpbmQoZ2wsIHRoaXMuYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9iaW5kVW5pZm9ybXMoe2dsLCBvYmplY3QsIGNhbWVyYX0pIHtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnVuaWZvcm1zLnVQb3NpdGlvbiwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkob2JqZWN0LndvcmxkTWF0cml4KSk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy51bmlmb3Jtcy51Q2FtZXJhLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShjYW1lcmEubW9kZWxWaWV3TWF0cml4KSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZih0aGlzLnVuaWZvcm1zLnVDb2xvckFscGhhLCB0aGlzLm9wYWNpdHkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZ3JhbTtcbiJdfQ==