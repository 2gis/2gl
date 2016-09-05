'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _definitions = require('./definitions');

var _definitions2 = _interopRequireDefault(_definitions);

var _ShaderProgram = require('../ShaderProgram');

var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

var _libConstants = require('../libConstants');

var _Shader = require('../Shader');

var _Shader2 = _interopRequireDefault(_Shader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cachedPrograms = {};

/**
 * Базовый класс для материалов
 */

var Material = function () {
    function Material() {
        _classCallCheck(this, Material);

        this._attributes = [];
        this._uniforms = [{
            name: 'uColorAlpha',
            type: '1f'
        }];

        this._definitions = [];
        this._shader = null;

        /**
         * Прозрачность объекта отрисованного с помощью данной материала
         * @type {Number}
         */
        this.opacity = 1;
    }

    /**
     * Инициализирует шейдерную программу
     * @param {State} state
     */


    _createClass(Material, [{
        key: 'enable',
        value: function enable(state) {
            if (!this._shaderProgram) {
                this._prepare(state);
            }

            this._shaderProgram.enable(state.gl);

            this._shaderProgramBind(state);

            return this;
        }

        /**
         * Отключает шейдерную программу
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'disable',
        value: function disable(gl) {
            if (this._shaderProgram) {
                this._shaderProgram.disable(gl);
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
                this._definitions.push({ type: _definitions2.default[type], value: value });
            }

            return this;
        }

        /**
         * Вызывается объектом использующую данный материал,
         * чтобы определить к какому типу рендера принадлежит объект.
         * Самое простое разделение: на прозрачные и нет.
         *
         * @param {Object} renderPlugins
         * @param {Object3D} object
         */

    }, {
        key: 'typifyForRender',
        value: function typifyForRender(renderPlugins, object) {
            if (this.opacity === 1) {
                renderPlugins[_libConstants.COMMON_RENDERER].addObject(object);
            } else {
                renderPlugins[_libConstants.TRANSPARENT_RENDERER].addObject(object);
            }
        }
    }, {
        key: '_getCachedProgramKey',
        value: function _getCachedProgramKey() {
            var key = this.constructor.name;

            this._definitions.forEach(function (def) {
                key += ':' + def.type + ':' + (def.value || '');
            });

            return key;
        }
    }, {
        key: '_getCachedProgram',
        value: function _getCachedProgram() {
            return cachedPrograms[this._getCachedProgramKey()];
        }
    }, {
        key: '_prepare',
        value: function _prepare(gl) {
            var cachedProgram = this._getCachedProgram();

            if (cachedProgram && gl === cachedProgram.glContext) {
                this._shaderProgram = cachedProgram.program;
                return;
            }

            this._shaderProgram = new _ShaderProgram2.default({
                vertex: new _Shader2.default('vertex', this._shader.vertex, this._definitions),
                fragment: new _Shader2.default('fragment', this._shader.fragment, this._definitions),
                uniforms: this._uniforms,
                attributes: this._attributes
            });

            cachedPrograms[this._getCachedProgramKey()] = {
                glContext: gl,
                program: this._shaderProgram
            };
        }
    }, {
        key: '_shaderProgramBind',
        value: function _shaderProgramBind(_ref) {
            var gl = _ref.gl;
            var object = _ref.object;

            var attributes = {};
            this._attributes.forEach(function (obj) {
                attributes[obj.name] = object.geometry.getBuffer(obj.name);
            });

            var uniforms = {
                uColorAlpha: this.opacity
            };

            this._shaderProgram.bind(gl, uniforms, attributes);
        }
    }]);

    return Material;
}();

exports.default = Material;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbHMvTWF0ZXJpYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxpQkFBaUIsRUFBdkI7O0FBRUE7Ozs7SUFHTSxRO0FBQ0Ysd0JBQWM7QUFBQTs7QUFDVixhQUFLLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBQztBQUNkLGtCQUFNLGFBRFE7QUFFZCxrQkFBTTtBQUZRLFNBQUQsQ0FBakI7O0FBS0EsYUFBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjs7QUFFQTs7OztBQUlBLGFBQUssT0FBTCxHQUFlLENBQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7K0JBSU8sSyxFQUFPO0FBQ1YsZ0JBQUksQ0FBQyxLQUFLLGNBQVYsRUFBMEI7QUFDdEIscUJBQUssUUFBTCxDQUFjLEtBQWQ7QUFDSDs7QUFFRCxpQkFBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLE1BQU0sRUFBakM7O0FBRUEsaUJBQUssa0JBQUwsQ0FBd0IsS0FBeEI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7O2dDQUlRLEUsRUFBSTtBQUNSLGdCQUFJLEtBQUssY0FBVCxFQUF5QjtBQUNyQixxQkFBSyxjQUFMLENBQW9CLE9BQXBCLENBQTRCLEVBQTVCO0FBQ0g7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OytCQUtPLEksRUFBTSxLLEVBQU87QUFDaEIsZ0JBQUksc0JBQVksSUFBWixDQUFKLEVBQXVCO0FBQ25CLHFCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsRUFBQyxNQUFNLHNCQUFZLElBQVosQ0FBUCxFQUEwQixPQUFPLEtBQWpDLEVBQXZCO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozt3Q0FRZ0IsYSxFQUFlLE0sRUFBUTtBQUNuQyxnQkFBSSxLQUFLLE9BQUwsS0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsNkRBQStCLFNBQS9CLENBQXlDLE1BQXpDO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsa0VBQW9DLFNBQXBDLENBQThDLE1BQTlDO0FBQ0g7QUFDSjs7OytDQUVzQjtBQUNuQixnQkFBSSxNQUFNLEtBQUssV0FBTCxDQUFpQixJQUEzQjs7QUFFQSxpQkFBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLGVBQU87QUFDN0IsdUJBQU8sTUFBTSxJQUFJLElBQVYsR0FBaUIsR0FBakIsSUFBd0IsSUFBSSxLQUFKLElBQWEsRUFBckMsQ0FBUDtBQUNILGFBRkQ7O0FBSUEsbUJBQU8sR0FBUDtBQUNIOzs7NENBRW1CO0FBQ2hCLG1CQUFPLGVBQWUsS0FBSyxvQkFBTCxFQUFmLENBQVA7QUFDSDs7O2lDQUVRLEUsRUFBSTtBQUNULGdCQUFNLGdCQUFnQixLQUFLLGlCQUFMLEVBQXRCOztBQUVBLGdCQUFJLGlCQUFpQixPQUFPLGNBQWMsU0FBMUMsRUFBcUQ7QUFDakQscUJBQUssY0FBTCxHQUFzQixjQUFjLE9BQXBDO0FBQ0E7QUFDSDs7QUFFRCxpQkFBSyxjQUFMLEdBQXNCLDRCQUFrQjtBQUNwQyx3QkFBUSxxQkFBVyxRQUFYLEVBQXFCLEtBQUssT0FBTCxDQUFhLE1BQWxDLEVBQTBDLEtBQUssWUFBL0MsQ0FENEI7QUFFcEMsMEJBQVUscUJBQVcsVUFBWCxFQUF1QixLQUFLLE9BQUwsQ0FBYSxRQUFwQyxFQUE4QyxLQUFLLFlBQW5ELENBRjBCO0FBR3BDLDBCQUFVLEtBQUssU0FIcUI7QUFJcEMsNEJBQVksS0FBSztBQUptQixhQUFsQixDQUF0Qjs7QUFPQSwyQkFBZSxLQUFLLG9CQUFMLEVBQWYsSUFBOEM7QUFDMUMsMkJBQVcsRUFEK0I7QUFFMUMseUJBQVMsS0FBSztBQUY0QixhQUE5QztBQUlIOzs7aURBRWdDO0FBQUEsZ0JBQWIsRUFBYSxRQUFiLEVBQWE7QUFBQSxnQkFBVCxNQUFTLFFBQVQsTUFBUzs7QUFDN0IsZ0JBQU0sYUFBYSxFQUFuQjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBeUIsZUFBTztBQUM1QiwyQkFBVyxJQUFJLElBQWYsSUFBdUIsT0FBTyxRQUFQLENBQWdCLFNBQWhCLENBQTBCLElBQUksSUFBOUIsQ0FBdkI7QUFDSCxhQUZEOztBQUlBLGdCQUFNLFdBQVc7QUFDYiw2QkFBYSxLQUFLO0FBREwsYUFBakI7O0FBSUEsaUJBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixFQUF6QixFQUE2QixRQUE3QixFQUF1QyxVQUF2QztBQUNIOzs7Ozs7a0JBR1UsUSIsImZpbGUiOiJNYXRlcmlhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWZpbml0aW9ucyBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCBTaGFkZXJQcm9ncmFtIGZyb20gJy4uL1NoYWRlclByb2dyYW0nO1xuaW1wb3J0IHtDT01NT05fUkVOREVSRVIsIFRSQU5TUEFSRU5UX1JFTkRFUkVSfSBmcm9tICcuLi9saWJDb25zdGFudHMnO1xuaW1wb3J0IFNoYWRlciBmcm9tICcuLi9TaGFkZXInO1xuXG5jb25zdCBjYWNoZWRQcm9ncmFtcyA9IHt9O1xuXG4vKipcbiAqINCR0LDQt9C+0LLRi9C5INC60LvQsNGB0YEg0LTQu9GPINC80LDRgtC10YDQuNCw0LvQvtCyXG4gKi9cbmNsYXNzIE1hdGVyaWFsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlcyA9IFtdO1xuICAgICAgICB0aGlzLl91bmlmb3JtcyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAndUNvbG9yQWxwaGEnLFxuICAgICAgICAgICAgdHlwZTogJzFmJ1xuICAgICAgICB9XTtcblxuICAgICAgICB0aGlzLl9kZWZpbml0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLl9zaGFkZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9GA0L7Qt9GA0LDRh9C90L7RgdGC0Ywg0L7QsdGK0LXQutGC0LAg0L7RgtGA0LjRgdC+0LLQsNC90L3QvtCz0L4g0YEg0L/QvtC80L7RidGM0Y4g0LTQsNC90L3QvtC5INC80LDRgtC10YDQuNCw0LvQsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdGCINGI0LXQudC00LXRgNC90YPRjiDQv9GA0L7Qs9GA0LDQvNC80YNcbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuICAgICAqL1xuICAgIGVuYWJsZShzdGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX3NoYWRlclByb2dyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyUHJvZ3JhbS5lbmFibGUoc3RhdGUuZ2wpO1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW1CaW5kKHN0YXRlKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntGC0LrQu9GO0YfQsNC10YIg0YjQtdC50LTQtdGA0L3Rg9GOINC/0YDQvtCz0YDQsNC80LzRg1xuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqL1xuICAgIGRpc2FibGUoZ2wpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NoYWRlclByb2dyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0uZGlzYWJsZShnbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JTQvtCx0LDQstC70Y/QtdGCIGRlZmluaXRpb25zINCyINC60L7QtCDRiNC10LnQtNC10YDQvtCyLiDQktGB0LUg0LTQvtCx0LDQstC70LXQvdC40Y8g0LTQvtC70LbQvdGLINCx0YvRgtGMINGB0LTQtdC70LDQvdGLINC00L4g0L/QtdGA0LLQvtC5INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtOdW1iZXIgfCBTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgZGVmaW5lKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uc1t0eXBlXSkge1xuICAgICAgICAgICAgdGhpcy5fZGVmaW5pdGlvbnMucHVzaCh7dHlwZTogZGVmaW5pdGlvbnNbdHlwZV0sIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L7QsdGK0LXQutGC0L7QvCDQuNGB0L/QvtC70YzQt9GD0Y7RidGD0Y4g0LTQsNC90L3Ri9C5INC80LDRgtC10YDQuNCw0LssXG4gICAgICog0YfRgtC+0LHRiyDQvtC/0YDQtdC00LXQu9C40YLRjCDQuiDQutCw0LrQvtC80YMg0YLQuNC/0YMg0YDQtdC90LTQtdGA0LAg0L/RgNC40L3QsNC00LvQtdC20LjRgiDQvtCx0YrQtdC60YIuXG4gICAgICog0KHQsNC80L7QtSDQv9GA0L7RgdGC0L7QtSDRgNCw0LfQtNC10LvQtdC90LjQtTog0L3QsCDQv9GA0L7Qt9GA0LDRh9C90YvQtSDQuCDQvdC10YIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVuZGVyUGx1Z2luc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0M0R9IG9iamVjdFxuICAgICAqL1xuICAgIHR5cGlmeUZvclJlbmRlcihyZW5kZXJQbHVnaW5zLCBvYmplY3QpIHtcbiAgICAgICAgaWYgKHRoaXMub3BhY2l0eSA9PT0gMSkge1xuICAgICAgICAgICAgcmVuZGVyUGx1Z2luc1tDT01NT05fUkVOREVSRVJdLmFkZE9iamVjdChvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyUGx1Z2luc1tUUkFOU1BBUkVOVF9SRU5ERVJFUl0uYWRkT2JqZWN0KG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0Q2FjaGVkUHJvZ3JhbUtleSgpIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcblxuICAgICAgICB0aGlzLl9kZWZpbml0aW9ucy5mb3JFYWNoKGRlZiA9PiB7XG4gICAgICAgICAgICBrZXkgKz0gJzonICsgZGVmLnR5cGUgKyAnOicgKyAoZGVmLnZhbHVlIHx8ICcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBfZ2V0Q2FjaGVkUHJvZ3JhbSgpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFByb2dyYW1zW3RoaXMuX2dldENhY2hlZFByb2dyYW1LZXkoKV07XG4gICAgfVxuXG4gICAgX3ByZXBhcmUoZ2wpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkUHJvZ3JhbSA9IHRoaXMuX2dldENhY2hlZFByb2dyYW0oKTtcblxuICAgICAgICBpZiAoY2FjaGVkUHJvZ3JhbSAmJiBnbCA9PT0gY2FjaGVkUHJvZ3JhbS5nbENvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0gPSBjYWNoZWRQcm9ncmFtLnByb2dyYW07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaGFkZXJQcm9ncmFtID0gbmV3IFNoYWRlclByb2dyYW0oe1xuICAgICAgICAgICAgdmVydGV4OiBuZXcgU2hhZGVyKCd2ZXJ0ZXgnLCB0aGlzLl9zaGFkZXIudmVydGV4LCB0aGlzLl9kZWZpbml0aW9ucyksXG4gICAgICAgICAgICBmcmFnbWVudDogbmV3IFNoYWRlcignZnJhZ21lbnQnLCB0aGlzLl9zaGFkZXIuZnJhZ21lbnQsIHRoaXMuX2RlZmluaXRpb25zKSxcbiAgICAgICAgICAgIHVuaWZvcm1zOiB0aGlzLl91bmlmb3JtcyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuX2F0dHJpYnV0ZXNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FjaGVkUHJvZ3JhbXNbdGhpcy5fZ2V0Q2FjaGVkUHJvZ3JhbUtleSgpXSA9IHtcbiAgICAgICAgICAgIGdsQ29udGV4dDogZ2wsXG4gICAgICAgICAgICBwcm9ncmFtOiB0aGlzLl9zaGFkZXJQcm9ncmFtXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX3NoYWRlclByb2dyYW1CaW5kKHtnbCwgb2JqZWN0fSkge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgYXR0cmlidXRlc1tvYmoubmFtZV0gPSBvYmplY3QuZ2VvbWV0cnkuZ2V0QnVmZmVyKG9iai5uYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdW5pZm9ybXMgPSB7XG4gICAgICAgICAgICB1Q29sb3JBbHBoYTogdGhpcy5vcGFjaXR5XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyUHJvZ3JhbS5iaW5kKGdsLCB1bmlmb3JtcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXRlcmlhbDtcbiJdfQ==