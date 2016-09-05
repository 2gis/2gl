'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _complexFragGlsl = require('../shaders/complex.frag.glsl.js');

var _complexFragGlsl2 = _interopRequireDefault(_complexFragGlsl);

var _complexVertGlsl = require('../shaders/complex.vert.glsl.js');

var _complexVertGlsl2 = _interopRequireDefault(_complexVertGlsl);

var _glMatrix = require('gl-matrix');

var _Material2 = require('./Material');

var _Material3 = _interopRequireDefault(_Material2);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shader = {
    fragment: _complexFragGlsl2.default,
    vertex: _complexVertGlsl2.default
};

/**
 * Более сложный материал для {@link Mesh}.
 *
 * {@link Geometry} меша использующего этот материал должна содержать следующие буферы:
 * 1. position - координаты вершин
 * 2. color - диффузная составляющая цвета в RGB для каждой из вершин, на неё влияет освещение
 * 3. emissive - фоновая составляющая цвета в RGB, на неё не влияет освещение
 *
 * Если материалу задана текстура, то также должен быть доступны буферы:
 * 5. texture - 2х мерные координаты сопоставляющие координаты грани к координатам текстуры
 * 6. textureEnable - будет ли использоваться текстура для данной вершины,
 * принимает два значаения: 0 - нет, 1 - да
 *
 * Этот материал требует подключения {@link CommonPlugin} и {@link TransparentPlugin} к рендереру.
 *
 * @extends Material
 */

var ComplexMeshMaterial = function (_Material) {
    _inherits(ComplexMeshMaterial, _Material);

    function ComplexMeshMaterial() {
        _classCallCheck(this, ComplexMeshMaterial);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComplexMeshMaterial).call(this));

        _this._attributes = [{ name: 'position' }, { name: 'color' }, { name: 'emissive' }];
        _this._uniforms = [{ name: 'uColorAlpha', type: '1f' }, { name: 'uCamera', type: 'mat4' }, { name: 'uPosition', type: 'mat4' }, { name: 'uAmbientLightColor', type: '3fv' }];

        _this._shader = shader;
        _this._texture = null;

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        _this.type = _libConstants.COMPLEX_MESH_MATERIAL;
        return _this;
    }

    /**
     * Задаёт текстуру материалу
     * @param {Texture} texture
     */


    _createClass(ComplexMeshMaterial, [{
        key: 'setTexture',
        value: function setTexture(texture) {
            this._texture = texture;

            return this;
        }

        /**
         * Возвращает текущую текстуру
         * @returns {?Texture}
         */

    }, {
        key: 'getTexture',
        value: function getTexture() {
            return this._texture;
        }
    }, {
        key: '_prepare',
        value: function _prepare(state) {
            this._enableLight(state);

            if (this._texture) {
                this._enableTexture();
            }

            _get(Object.getPrototypeOf(ComplexMeshMaterial.prototype), '_prepare', this).call(this, state);
        }
    }, {
        key: '_enableLight',
        value: function _enableLight(_ref) {
            var scene = _ref.scene;

            var directionLightNumber = 0;

            scene.getLights().forEach(function (l) {
                if (l.type === _libConstants.DIRECTIONAL_LIGHT) {
                    directionLightNumber++;
                }
            });

            this.define('directionLights', directionLightNumber);

            if (directionLightNumber > 0) {
                this._attributes.push({ name: 'normal' });
                this._uniforms.push({ name: 'uDirectionLightColors', type: '3fv' }, { name: 'uDirectionLightPositions', type: '3fv' }, { name: 'uNormalMatrix', type: 'mat3' });
            }
        }
    }, {
        key: '_enableTexture',
        value: function _enableTexture() {
            this.define('texture');
            this._attributes.push({ name: 'texture' }, { name: 'textureEnable' });
            this._uniforms.push({ name: 'uTexture', type: '1i' });
        }
    }, {
        key: '_shaderProgramBind',
        value: function _shaderProgramBind(_ref2) {
            var gl = _ref2.gl;
            var scene = _ref2.scene;
            var camera = _ref2.camera;
            var object = _ref2.object;

            var uniforms = {};
            var attributes = {};

            if (this._texture) {
                this._texture.enable(gl, 0);
                uniforms.uTexture = 0;
            }

            var lights = scene.getLights();

            if (lights.length) {
                (function () {
                    var directionLightsColor = [];
                    var directionLightsPosition = [];

                    lights.forEach(function (light) {
                        if (light.type === _libConstants.AMBIENT_LIGHT) {
                            uniforms.uAmbientLightColor = light.color;
                        } else if (light.type === _libConstants.DIRECTIONAL_LIGHT) {
                            directionLightsColor = directionLightsColor.concat(light.color);

                            var reverted = _glMatrix.vec3.create();
                            _glMatrix.vec3.scale(reverted, light.position, -1);
                            directionLightsPosition = directionLightsPosition.concat(Array.prototype.slice.call(reverted));
                        }
                    });

                    if (directionLightsColor.length && directionLightsPosition.length) {
                        var normalMatrix = _glMatrix.mat3.create();
                        _glMatrix.mat3.fromMat4(normalMatrix, object.worldMatrix);
                        _glMatrix.mat3.invert(normalMatrix, normalMatrix);
                        _glMatrix.mat3.transpose(normalMatrix, normalMatrix);
                        uniforms.uNormalMatrix = new Float32Array(normalMatrix);
                        attributes.normal = object.geometry.getBuffer('normal');
                    }

                    uniforms.uDirectionLightColors = new Float32Array(directionLightsColor);
                    uniforms.uDirectionLightPositions = new Float32Array(directionLightsPosition);
                })();
            }

            this._attributes.forEach(function (obj) {
                if (obj.name !== 'normal') {
                    attributes[obj.name] = object.geometry.getBuffer(obj.name);
                }
            });

            uniforms.uPosition = new Float32Array(object.worldMatrix);
            uniforms.uCamera = new Float32Array(camera.modelViewMatrix);
            uniforms.uColorAlpha = this.opacity;

            this._shaderProgram.bind(gl, uniforms, attributes);
        }
    }]);

    return ComplexMeshMaterial;
}(_Material3.default);

exports.default = ComplexMeshMaterial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbHMvQ29tcGxleE1lc2hNYXRlcmlhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFNBQVM7QUFDWCx1Q0FEVztBQUVYO0FBRlcsQ0FBZjs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJNLG1COzs7QUFDRixtQ0FBYztBQUFBOztBQUFBOztBQUdWLGNBQUssV0FBTCxHQUFtQixDQUFDLEVBQUMsTUFBTSxVQUFQLEVBQUQsRUFBcUIsRUFBQyxNQUFNLE9BQVAsRUFBckIsRUFBc0MsRUFBQyxNQUFNLFVBQVAsRUFBdEMsQ0FBbkI7QUFDQSxjQUFLLFNBQUwsR0FBaUIsQ0FDYixFQUFDLE1BQU0sYUFBUCxFQUFzQixNQUFNLElBQTVCLEVBRGEsRUFFYixFQUFDLE1BQU0sU0FBUCxFQUFrQixNQUFNLE1BQXhCLEVBRmEsRUFHYixFQUFDLE1BQU0sV0FBUCxFQUFvQixNQUFNLE1BQTFCLEVBSGEsRUFJYixFQUFDLE1BQU0sb0JBQVAsRUFBNkIsTUFBTSxLQUFuQyxFQUphLENBQWpCOztBQU9BLGNBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxjQUFLLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUE7Ozs7QUFJQSxjQUFLLElBQUw7QUFsQlU7QUFtQmI7O0FBRUQ7Ozs7Ozs7O21DQUlXLE8sRUFBUztBQUNoQixpQkFBSyxRQUFMLEdBQWdCLE9BQWhCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7OztxQ0FJYTtBQUNULG1CQUFPLEtBQUssUUFBWjtBQUNIOzs7aUNBRVEsSyxFQUFPO0FBQ1osaUJBQUssWUFBTCxDQUFrQixLQUFsQjs7QUFFQSxnQkFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDZixxQkFBSyxjQUFMO0FBQ0g7O0FBRUQsb0dBQWUsS0FBZjtBQUNIOzs7MkNBRXFCO0FBQUEsZ0JBQVIsS0FBUSxRQUFSLEtB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LHVCQUFqQixDQUFwQztBQTFCZTtBQTJCbEI7O0FBRUQsaUJBQUssV0FBTCxDQUFpQixPQUFqQixDQUF5QixlQUFPO0FBQzVCLG9CQUFJLElBQUksSUFBSixLQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCLCtCQUFXLElBQUksSUFBZixJQUF1QixPQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsQ0FBMEIsSUFBSSxJQUE5QixDQUF2QjtBQUNIO0FBQ0osYUFKRDs7QUFNQSxxQkFBUyxTQUFULEdBQXFCLElBQUksWUFBSixDQUFpQixPQUFPLFdBQXhCLENBQXJCO0FBQ0EscUJBQVMsT0FBVCxHQUFtQixJQUFJLFlBQUosQ0FBaUIsT0FBTyxlQUF4QixDQUFuQjtBQUNBLHFCQUFTLFdBQVQsR0FBdUIsS0FBSyxPQUE1Qjs7QUFFQSxpQkFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEVBQXpCLEVBQTZCLFFBQTdCLEVBQXVDLFVBQXZDO0FBQ0g7Ozs7OztrQkFHVSxtQiIsImZpbGUiOiJDb21wbGV4TWVzaE1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gJy4uL3NoYWRlcnMvY29tcGxleC5mcmFnLmdsc2wuanMnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL2NvbXBsZXgudmVydC5nbHNsLmpzJztcbmltcG9ydCB7dmVjMywgbWF0M30gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuL01hdGVyaWFsJztcbmltcG9ydCB7Q09NUExFWF9NRVNIX01BVEVSSUFMLCBESVJFQ1RJT05BTF9MSUdIVCwgQU1CSUVOVF9MSUdIVH0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcblxuY29uc3Qgc2hhZGVyID0ge1xuICAgIGZyYWdtZW50OiBmcmFnbWVudFNoYWRlcixcbiAgICB2ZXJ0ZXg6IHZlcnRleFNoYWRlclxufTtcblxuLyoqXG4gKiDQkdC+0LvQtdC1INGB0LvQvtC20L3Ri9C5INC80LDRgtC10YDQuNCw0Lsg0LTQu9GPIHtAbGluayBNZXNofS5cbiAqXG4gKiB7QGxpbmsgR2VvbWV0cnl9INC80LXRiNCwINC40YHQv9C+0LvRjNC30YPRjtGJ0LXQs9C+INGN0YLQvtGCINC80LDRgtC10YDQuNCw0Lsg0LTQvtC70LbQvdCwINGB0L7QtNC10YDQttCw0YLRjCDRgdC70LXQtNGD0Y7RidC40LUg0LHRg9GE0LXRgNGLOlxuICogMS4gcG9zaXRpb24gLSDQutC+0L7RgNC00LjQvdCw0YLRiyDQstC10YDRiNC40L1cbiAqIDIuIGNvbG9yIC0g0LTQuNGE0YTRg9C30L3QsNGPINGB0L7RgdGC0LDQstC70Y/RjtGJ0LDRjyDRhtCy0LXRgtCwINCyIFJHQiDQtNC70Y8g0LrQsNC20LTQvtC5INC40Lcg0LLQtdGA0YjQuNC9LCDQvdCwINC90LXRkSDQstC70LjRj9C10YIg0L7RgdCy0LXRidC10L3QuNC1XG4gKiAzLiBlbWlzc2l2ZSAtINGE0L7QvdC+0LLQsNGPINGB0L7RgdGC0LDQstC70Y/RjtGJ0LDRjyDRhtCy0LXRgtCwINCyIFJHQiwg0L3QsCDQvdC10ZEg0L3QtSDQstC70LjRj9C10YIg0L7RgdCy0LXRidC10L3QuNC1XG4gKlxuICog0JXRgdC70Lgg0LzQsNGC0LXRgNC40LDQu9GDINC30LDQtNCw0L3QsCDRgtC10LrRgdGC0YPRgNCwLCDRgtC+INGC0LDQutC20LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINC00L7RgdGC0YPQv9C90Ysg0LHRg9GE0LXRgNGLOlxuICogNS4gdGV4dHVyZSAtIDLRhSDQvNC10YDQvdGL0LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YHQvtC/0L7RgdGC0LDQstC70Y/RjtGJ0LjQtSDQutC+0L7RgNC00LjQvdCw0YLRiyDQs9GA0LDQvdC4INC6INC60L7QvtGA0LTQuNC90LDRgtCw0Lwg0YLQtdC60YHRgtGD0YDRi1xuICogNi4gdGV4dHVyZUVuYWJsZSAtINCx0YPQtNC10YIg0LvQuCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGC0LXQutGB0YLRg9GA0LAg0LTQu9GPINC00LDQvdC90L7QuSDQstC10YDRiNC40L3RiyxcbiAqINC/0YDQuNC90LjQvNCw0LXRgiDQtNCy0LAg0LfQvdCw0YfQsNC10L3QuNGPOiAwIC0g0L3QtdGCLCAxIC0g0LTQsFxuICpcbiAqINCt0YLQvtGCINC80LDRgtC10YDQuNCw0Lsg0YLRgNC10LHRg9C10YIg0L/QvtC00LrQu9GO0YfQtdC90LjRjyB7QGxpbmsgQ29tbW9uUGx1Z2lufSDQuCB7QGxpbmsgVHJhbnNwYXJlbnRQbHVnaW59INC6INGA0LXQvdC00LXRgNC10YDRgy5cbiAqXG4gKiBAZXh0ZW5kcyBNYXRlcmlhbFxuICovXG5jbGFzcyBDb21wbGV4TWVzaE1hdGVyaWFsIGV4dGVuZHMgTWF0ZXJpYWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBbe25hbWU6ICdwb3NpdGlvbid9LCB7bmFtZTogJ2NvbG9yJ30sIHtuYW1lOiAnZW1pc3NpdmUnfV07XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zID0gW1xuICAgICAgICAgICAge25hbWU6ICd1Q29sb3JBbHBoYScsIHR5cGU6ICcxZid9LFxuICAgICAgICAgICAge25hbWU6ICd1Q2FtZXJhJywgdHlwZTogJ21hdDQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAndVBvc2l0aW9uJywgdHlwZTogJ21hdDQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAndUFtYmllbnRMaWdodENvbG9yJywgdHlwZTogJzNmdid9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC80LDRgtC10YDQuNCw0LvQsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gQ09NUExFWF9NRVNIX01BVEVSSUFMO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQtNCw0ZHRgiDRgtC10LrRgdGC0YPRgNGDINC80LDRgtC10YDQuNCw0LvRg1xuICAgICAqIEBwYXJhbSB7VGV4dHVyZX0gdGV4dHVyZVxuICAgICAqL1xuICAgIHNldFRleHR1cmUodGV4dHVyZSkge1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gdGV4dHVyZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgtC10LrRg9GJ0YPRjiDRgtC10LrRgdGC0YPRgNGDXG4gICAgICogQHJldHVybnMgez9UZXh0dXJlfVxuICAgICAqL1xuICAgIGdldFRleHR1cmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICAgIH1cblxuICAgIF9wcmVwYXJlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuX2VuYWJsZUxpZ2h0KHN0YXRlKTtcblxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlVGV4dHVyZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuX3ByZXBhcmUoc3RhdGUpO1xuICAgIH1cblxuICAgIF9lbmFibGVMaWdodCh7c2NlbmV9KSB7XG4gICAgICAgIGxldCBkaXJlY3Rpb25MaWdodE51bWJlciA9IDA7XG5cbiAgICAgICAgc2NlbmUuZ2V0TGlnaHRzKCkuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIGlmIChsLnR5cGUgPT09IERJUkVDVElPTkFMX0xJR0hUKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uTGlnaHROdW1iZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kZWZpbmUoJ2RpcmVjdGlvbkxpZ2h0cycsIGRpcmVjdGlvbkxpZ2h0TnVtYmVyKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uTGlnaHROdW1iZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzLnB1c2goe25hbWU6ICdub3JtYWwnfSk7XG4gICAgICAgICAgICB0aGlzLl91bmlmb3Jtcy5wdXNoKFxuICAgICAgICAgICAgICAgIHtuYW1lOiAndURpcmVjdGlvbkxpZ2h0Q29sb3JzJywgdHlwZTogJzNmdid9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiAndURpcmVjdGlvbkxpZ2h0UG9zaXRpb25zJywgdHlwZTogJzNmdid9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiAndU5vcm1hbE1hdHJpeCcsIHR5cGU6ICdtYXQzJ31cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5hYmxlVGV4dHVyZSgpIHtcbiAgICAgICAgdGhpcy5kZWZpbmUoJ3RleHR1cmUnKTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlcy5wdXNoKHtuYW1lOiAndGV4dHVyZSd9LCB7bmFtZTogJ3RleHR1cmVFbmFibGUnfSk7XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zLnB1c2goe25hbWU6ICd1VGV4dHVyZScsIHR5cGU6ICcxaSd9KTtcbiAgICB9XG5cbiAgICBfc2hhZGVyUHJvZ3JhbUJpbmQoe2dsLCBzY2VuZSwgY2FtZXJhLCBvYmplY3R9KSB7XG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0ge307XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcblxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5lbmFibGUoZ2wsIDApO1xuICAgICAgICAgICAgdW5pZm9ybXMudVRleHR1cmUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlnaHRzID0gc2NlbmUuZ2V0TGlnaHRzKCk7XG5cbiAgICAgICAgaWYgKGxpZ2h0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25MaWdodHNDb2xvciA9IFtdO1xuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbkxpZ2h0c1Bvc2l0aW9uID0gW107XG5cbiAgICAgICAgICAgIGxpZ2h0cy5mb3JFYWNoKGxpZ2h0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGlnaHQudHlwZSA9PT0gQU1CSUVOVF9MSUdIVCkge1xuICAgICAgICAgICAgICAgICAgICB1bmlmb3Jtcy51QW1iaWVudExpZ2h0Q29sb3IgPSBsaWdodC5jb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpZ2h0LnR5cGUgPT09IERJUkVDVElPTkFMX0xJR0hUKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbkxpZ2h0c0NvbG9yID0gZGlyZWN0aW9uTGlnaHRzQ29sb3IuY29uY2F0KGxpZ2h0LmNvbG9yKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZlcnRlZCA9IHZlYzMuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZlYzMuc2NhbGUocmV2ZXJ0ZWQsIGxpZ2h0LnBvc2l0aW9uLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbkxpZ2h0c1Bvc2l0aW9uID0gZGlyZWN0aW9uTGlnaHRzUG9zaXRpb24uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJldmVydGVkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25MaWdodHNDb2xvci5sZW5ndGggJiYgZGlyZWN0aW9uTGlnaHRzUG9zaXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsTWF0cml4ID0gbWF0My5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBtYXQzLmZyb21NYXQ0KG5vcm1hbE1hdHJpeCwgb2JqZWN0LndvcmxkTWF0cml4KTtcbiAgICAgICAgICAgICAgICBtYXQzLmludmVydChub3JtYWxNYXRyaXgsIG5vcm1hbE1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbWF0My50cmFuc3Bvc2Uobm9ybWFsTWF0cml4LCBub3JtYWxNYXRyaXgpO1xuICAgICAgICAgICAgICAgIHVuaWZvcm1zLnVOb3JtYWxNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbE1hdHJpeCk7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5ub3JtYWwgPSBvYmplY3QuZ2VvbWV0cnkuZ2V0QnVmZmVyKCdub3JtYWwnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5pZm9ybXMudURpcmVjdGlvbkxpZ2h0Q29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShkaXJlY3Rpb25MaWdodHNDb2xvcik7XG4gICAgICAgICAgICB1bmlmb3Jtcy51RGlyZWN0aW9uTGlnaHRQb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGRpcmVjdGlvbkxpZ2h0c1Bvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgaWYgKG9iai5uYW1lICE9PSAnbm9ybWFsJykge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbb2JqLm5hbWVdID0gb2JqZWN0Lmdlb21ldHJ5LmdldEJ1ZmZlcihvYmoubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVuaWZvcm1zLnVQb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkob2JqZWN0LndvcmxkTWF0cml4KTtcbiAgICAgICAgdW5pZm9ybXMudUNhbWVyYSA9IG5ldyBGbG9hdDMyQXJyYXkoY2FtZXJhLm1vZGVsVmlld01hdHJpeCk7XG4gICAgICAgIHVuaWZvcm1zLnVDb2xvckFscGhhID0gdGhpcy5vcGFjaXR5O1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0uYmluZChnbCwgdW5pZm9ybXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcGxleE1lc2hNYXRlcmlhbDtcbiJdfQ==