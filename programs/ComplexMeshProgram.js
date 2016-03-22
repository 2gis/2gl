'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _shaders = require('../shaders');

var _glMatrix = require('gl-matrix');

var _Program2 = require('./Program');

var _Program3 = _interopRequireDefault(_Program2);

var _AmbientLight = require('../lights/AmbientLight');

var _AmbientLight2 = _interopRequireDefault(_AmbientLight);

var _DirectionalLight = require('../lights/DirectionalLight');

var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Более сложная программа для {@link Mesh}.
 *
 * {@link Geometry} меша использующего эту программу должна содержать следующие буферы:
 * 1. position - координаты вершин
 * 2. color - диффузная составляющая цвета в RGB для каждой из вершин, на неё влияет освещение
 * 3. emissive - фоновая составляющая цвета в RGB, на неё не влияет освещение
 *
 * Если программе задана текстура, то также должен быть доступны буферы:
 * 5. texture - 2х мерные координаты сопоставляющие координаты грани к координатам текстуры
 * 6. textureEnable - будет ли использоваться текстура для данной вершины,
 * принимает два значаения: 0 - нет, 1 - да
 *
 * @extends Program
 */

var ComplexMeshProgram = function (_Program) {
    _inherits(ComplexMeshProgram, _Program);

    function ComplexMeshProgram() {
        _classCallCheck(this, ComplexMeshProgram);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComplexMeshProgram).call(this));

        _this._attributeList = ['position', 'color', 'emissive'];
        _this._uniformList = ['uCamera', 'uPosition', 'uColorAlpha', 'uAmbientLightColor'];
        _this._shader = _shaders.complex;
        _this._texture = null;
        return _this;
    }

    /**
     * Задаёт текстуру программе
     * @param {Texture} texture
     */


    _createClass(ComplexMeshProgram, [{
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

            _get(Object.getPrototypeOf(ComplexMeshProgram.prototype), '_prepare', this).call(this, state);
        }
    }, {
        key: '_enableLight',
        value: function _enableLight(_ref) {
            var scene = _ref.scene;

            var directionLightNumber = 0;

            scene.getLights().forEach(function (l) {
                if (l instanceof _DirectionalLight2.default) {
                    directionLightNumber++;
                }
            });

            this.define('directionLights', directionLightNumber);

            if (directionLightNumber > 0) {
                this._attributeList.push('normal');
                this._uniformList.push('uDirectionLightColors', 'uDirectionLightPositions', 'uNormalMatrix');
            }
        }
    }, {
        key: '_enableTexture',
        value: function _enableTexture() {
            this.define('texture');
            this._attributeList.push('texture', 'textureEnable');
            this._uniformList.push('uTexture');
        }
    }, {
        key: '_bindMesh',
        value: function _bindMesh(_ref2) {
            var _this2 = this;

            var gl = _ref2.gl;
            var scene = _ref2.scene;
            var camera = _ref2.camera;
            var object = _ref2.object;

            if (this._texture) {
                this._texture.enable(gl, this.uniforms.uTexture);
            }

            var lights = scene.getLights();

            if (lights.length) {
                (function () {
                    var directionLightsColor = [];
                    var directionLightsPosition = [];

                    lights.forEach(function (light) {
                        if (light instanceof _AmbientLight2.default) {
                            gl.uniform3fv(_this2.uniforms.uAmbientLightColor, light.color);
                        } else if (light instanceof _DirectionalLight2.default) {
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
                        gl.uniformMatrix3fv(_this2.uniforms.uNormalMatrix, false, new Float32Array(normalMatrix));

                        object.geometry.getBuffer('normal').bind(gl, _this2.attributes.normal);
                    }

                    gl.uniform3fv(_this2.uniforms.uDirectionLightColors, new Float32Array(directionLightsColor));
                    gl.uniform3fv(_this2.uniforms.uDirectionLightPositions, new Float32Array(directionLightsPosition));
                })();
            }

            this._attributeList.forEach(function (name) {
                if (name !== 'normal') {
                    object.geometry.getBuffer(name).bind(gl, _this2.attributes[name]);
                }
            });

            gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
            gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.modelViewMatrix));
            gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
        }
    }]);

    return ComplexMeshProgram;
}(_Program3.default);

exports.default = ComplexMeshProgram;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9ncmFtcy9Db21wbGV4TWVzaFByb2dyYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlCTTs7O0FBQ0YsYUFERSxrQkFDRixHQUFjOzhCQURaLG9CQUNZOzsyRUFEWixnQ0FDWTs7QUFHVixjQUFLLGNBQUwsR0FBc0IsQ0FBQyxVQUFELEVBQWEsT0FBYixFQUFzQixVQUF0QixDQUF0QixDQUhVO0FBSVYsY0FBSyxZQUFMLEdBQW9CLENBQUMsU0FBRCxFQUFZLFdBQVosRUFBeUIsYUFBekIsRUFBd0Msb0JBQXhDLENBQXBCLENBSlU7QUFLVixjQUFLLE9BQUwsb0JBTFU7QUFNVixjQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FOVTs7S0FBZDs7Ozs7Ozs7aUJBREU7O21DQWNTLFNBQVM7QUFDaEIsaUJBQUssUUFBTCxHQUFnQixPQUFoQixDQURnQjs7QUFHaEIsbUJBQU8sSUFBUCxDQUhnQjs7Ozs7Ozs7OztxQ0FVUDtBQUNULG1CQUFPLEtBQUssUUFBTCxDQURFOzs7O2lDQUlKLE9BQU87QUFDWixpQkFBSyxZQUFMLENBQWtCLEtBQWxCLEVBRFk7O0FBR1osZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDZixxQkFBSyxjQUFMLEdBRGU7YUFBbkI7O0FBSUEsdUNBbkNGLDREQW1DaUIsTUFBZixDQVBZOzs7OzJDQVVNO2dCQUFSLG1CQUFROztBQUNsQixnQkFBSSx1QkFBdUIsQ0FBdkIsQ0FEYzs7QUFHbEIsa0JBQU0sU0FBTixHQUFrQixPQUFsQixDQUEwQixhQUFLO0FBQzNCLG9CQUFJLHVDQUFKLEVBQW1DO0FBQy9CLDJDQUQrQjtpQkFBbkM7YUFEc0IsQ0FBMUIsQ0FIa0I7O0FBU2xCLGlCQUFLLE1BQUwsQ0FBWSxpQkFBWixFQUErQixvQkFBL0IsRUFUa0I7O0FBV2xCLGdCQUFJLHVCQUF1QixDQUF2QixF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bUM7O0FBMkNuQyxlQUFHLGdCQUFILENBQW9CLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsS0FBN0MsRUFBb0QsSUFBSSxZQUFKLENBQWlCLE9BQU8sV0FBUCxDQUFyRSxFQTNDbUM7QUE0Q25DLGVBQUcsZ0JBQUgsQ0FBb0IsS0FBSyxRQUFMLENBQWMsT0FBZCxFQUF1QixLQUEzQyxFQUFrRCxJQUFJLFlBQUosQ0FBaUIsT0FBTyxlQUFQLENBQW5FLEVBNUNtQztBQTZDbkMsZUFBRyxTQUFILENBQWEsS0FBSyxRQUFMLENBQWMsV0FBZCxFQUEyQixLQUFLLE9BQUwsQ0FBeEMsQ0E3Q21DOzs7O1dBN0RyQzs7O2tCQThHUyIsImZpbGUiOiJDb21wbGV4TWVzaFByb2dyYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbXBsZXggYXMgc2hhZGVyfSBmcm9tICcuLi9zaGFkZXJzJztcbmltcG9ydCB7dmVjMywgbWF0M30gZnJvbSAnZ2wtbWF0cml4JztcbmltcG9ydCBQcm9ncmFtIGZyb20gJy4vUHJvZ3JhbSc7XG5pbXBvcnQgQW1iaWVudExpZ2h0IGZyb20gJy4uL2xpZ2h0cy9BbWJpZW50TGlnaHQnO1xuaW1wb3J0IERpcmVjdGlvbmFsTGlnaHQgZnJvbSAnLi4vbGlnaHRzL0RpcmVjdGlvbmFsTGlnaHQnO1xuXG4vKipcbiAqINCR0L7Qu9C10LUg0YHQu9C+0LbQvdCw0Y8g0L/RgNC+0LPRgNCw0LzQvNCwINC00LvRjyB7QGxpbmsgTWVzaH0uXG4gKlxuICoge0BsaW5rIEdlb21ldHJ5fSDQvNC10YjQsCDQuNGB0L/QvtC70YzQt9GD0Y7RidC10LPQviDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDINC00L7Qu9C20L3QsCDRgdC+0LTQtdGA0LbQsNGC0Ywg0YHQu9C10LTRg9GO0YnQuNC1INCx0YPRhNC10YDRizpcbiAqIDEuIHBvc2l0aW9uIC0g0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LLQtdGA0YjQuNC9XG4gKiAyLiBjb2xvciAtINC00LjRhNGE0YPQt9C90LDRjyDRgdC+0YHRgtCw0LLQu9GP0Y7RidCw0Y8g0YbQstC10YLQsCDQsiBSR0Ig0LTQu9GPINC60LDQttC00L7QuSDQuNC3INCy0LXRgNGI0LjQvSwg0L3QsCDQvdC10ZEg0LLQu9C40Y/QtdGCINC+0YHQstC10YnQtdC90LjQtVxuICogMy4gZW1pc3NpdmUgLSDRhNC+0L3QvtCy0LDRjyDRgdC+0YHRgtCw0LLQu9GP0Y7RidCw0Y8g0YbQstC10YLQsCDQsiBSR0IsINC90LAg0L3QtdGRINC90LUg0LLQu9C40Y/QtdGCINC+0YHQstC10YnQtdC90LjQtVxuICpcbiAqINCV0YHQu9C4INC/0YDQvtCz0YDQsNC80LzQtSDQt9Cw0LTQsNC90LAg0YLQtdC60YHRgtGD0YDQsCwg0YLQviDRgtCw0LrQttC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDQtNC+0YHRgtGD0L/QvdGLINCx0YPRhNC10YDRizpcbiAqIDUuIHRleHR1cmUgLSAy0YUg0LzQtdGA0L3Ri9C1INC60L7QvtGA0LTQuNC90LDRgtGLINGB0L7Qv9C+0YHRgtCw0LLQu9GP0Y7RidC40LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0LPRgNCw0L3QuCDQuiDQutC+0L7RgNC00LjQvdCw0YLQsNC8INGC0LXQutGB0YLRg9GA0YtcbiAqIDYuIHRleHR1cmVFbmFibGUgLSDQsdGD0LTQtdGCINC70Lgg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGM0YHRjyDRgtC10LrRgdGC0YPRgNCwINC00LvRjyDQtNCw0L3QvdC+0Lkg0LLQtdGA0YjQuNC90YssXG4gKiDQv9GA0LjQvdC40LzQsNC10YIg0LTQstCwINC30L3QsNGH0LDQtdC90LjRjzogMCAtINC90LXRgiwgMSAtINC00LBcbiAqXG4gKiBAZXh0ZW5kcyBQcm9ncmFtXG4gKi9cbmNsYXNzIENvbXBsZXhNZXNoUHJvZ3JhbSBleHRlbmRzIFByb2dyYW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUxpc3QgPSBbJ3Bvc2l0aW9uJywgJ2NvbG9yJywgJ2VtaXNzaXZlJ107XG4gICAgICAgIHRoaXMuX3VuaWZvcm1MaXN0ID0gWyd1Q2FtZXJhJywgJ3VQb3NpdGlvbicsICd1Q29sb3JBbHBoYScsICd1QW1iaWVudExpZ2h0Q29sb3InXTtcbiAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0LTQsNGR0YIg0YLQtdC60YHRgtGD0YDRgyDQv9GA0L7Qs9GA0LDQvNC80LVcbiAgICAgKiBAcGFyYW0ge1RleHR1cmV9IHRleHR1cmVcbiAgICAgKi9cbiAgICBzZXRUZXh0dXJlKHRleHR1cmUpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YLQtdC60YPRidGD0Y4g0YLQtdC60YHRgtGD0YDRg1xuICAgICAqIEByZXR1cm5zIHs/VGV4dHVyZX1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICB9XG5cbiAgICBfcHJlcGFyZShzdGF0ZSkge1xuICAgICAgICB0aGlzLl9lbmFibGVMaWdodChzdGF0ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVRleHR1cmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLl9wcmVwYXJlKHN0YXRlKTtcbiAgICB9XG5cbiAgICBfZW5hYmxlTGlnaHQoe3NjZW5lfSkge1xuICAgICAgICBsZXQgZGlyZWN0aW9uTGlnaHROdW1iZXIgPSAwO1xuXG4gICAgICAgIHNjZW5lLmdldExpZ2h0cygpLmZvckVhY2gobCA9PiB7XG4gICAgICAgICAgICBpZiAobCBpbnN0YW5jZW9mIERpcmVjdGlvbmFsTGlnaHQpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25MaWdodE51bWJlcisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRlZmluZSgnZGlyZWN0aW9uTGlnaHRzJywgZGlyZWN0aW9uTGlnaHROdW1iZXIpO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb25MaWdodE51bWJlciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUxpc3QucHVzaCgnbm9ybWFsJyk7XG4gICAgICAgICAgICB0aGlzLl91bmlmb3JtTGlzdC5wdXNoKCd1RGlyZWN0aW9uTGlnaHRDb2xvcnMnLCAndURpcmVjdGlvbkxpZ2h0UG9zaXRpb25zJywgJ3VOb3JtYWxNYXRyaXgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9lbmFibGVUZXh0dXJlKCkge1xuICAgICAgICB0aGlzLmRlZmluZSgndGV4dHVyZScpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVMaXN0LnB1c2goJ3RleHR1cmUnLCAndGV4dHVyZUVuYWJsZScpO1xuICAgICAgICB0aGlzLl91bmlmb3JtTGlzdC5wdXNoKCd1VGV4dHVyZScpO1xuICAgIH1cblxuICAgIF9iaW5kTWVzaCh7Z2wsIHNjZW5lLCBjYW1lcmEsIG9iamVjdH0pIHtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmUuZW5hYmxlKGdsLCB0aGlzLnVuaWZvcm1zLnVUZXh0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxpZ2h0cyA9IHNjZW5lLmdldExpZ2h0cygpO1xuXG4gICAgICAgIGlmIChsaWdodHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uTGlnaHRzQ29sb3IgPSBbXTtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25MaWdodHNQb3NpdGlvbiA9IFtdO1xuXG4gICAgICAgICAgICBsaWdodHMuZm9yRWFjaChsaWdodCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxpZ2h0IGluc3RhbmNlb2YgQW1iaWVudExpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0zZnYodGhpcy51bmlmb3Jtcy51QW1iaWVudExpZ2h0Q29sb3IsIGxpZ2h0LmNvbG9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpZ2h0IGluc3RhbmNlb2YgRGlyZWN0aW9uYWxMaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25MaWdodHNDb2xvciA9IGRpcmVjdGlvbkxpZ2h0c0NvbG9yLmNvbmNhdChsaWdodC5jb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2ZXJ0ZWQgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB2ZWMzLnNjYWxlKHJldmVydGVkLCBsaWdodC5wb3NpdGlvbiwgLTEpO1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25MaWdodHNQb3NpdGlvbiA9IGRpcmVjdGlvbkxpZ2h0c1Bvc2l0aW9uLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyZXZlcnRlZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uTGlnaHRzQ29sb3IubGVuZ3RoICYmIGRpcmVjdGlvbkxpZ2h0c1Bvc2l0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbE1hdHJpeCA9IG1hdDMuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgbWF0My5mcm9tTWF0NChub3JtYWxNYXRyaXgsIG9iamVjdC53b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICAgICAgbWF0My5pbnZlcnQobm9ybWFsTWF0cml4LCBub3JtYWxNYXRyaXgpO1xuICAgICAgICAgICAgICAgIG1hdDMudHJhbnNwb3NlKG5vcm1hbE1hdHJpeCwgbm9ybWFsTWF0cml4KTtcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KHRoaXMudW5pZm9ybXMudU5vcm1hbE1hdHJpeCwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkobm9ybWFsTWF0cml4KSk7XG5cbiAgICAgICAgICAgICAgICBvYmplY3QuZ2VvbWV0cnkuZ2V0QnVmZmVyKCdub3JtYWwnKS5iaW5kKGdsLCB0aGlzLmF0dHJpYnV0ZXMubm9ybWFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2wudW5pZm9ybTNmdih0aGlzLnVuaWZvcm1zLnVEaXJlY3Rpb25MaWdodENvbG9ycywgbmV3IEZsb2F0MzJBcnJheShkaXJlY3Rpb25MaWdodHNDb2xvcikpO1xuICAgICAgICAgICAgZ2wudW5pZm9ybTNmdih0aGlzLnVuaWZvcm1zLnVEaXJlY3Rpb25MaWdodFBvc2l0aW9ucywgbmV3IEZsb2F0MzJBcnJheShkaXJlY3Rpb25MaWdodHNQb3NpdGlvbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXR0cmlidXRlTGlzdC5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWUgIT09ICdub3JtYWwnKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lmdlb21ldHJ5LmdldEJ1ZmZlcihuYW1lKS5iaW5kKGdsLCB0aGlzLmF0dHJpYnV0ZXNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMudW5pZm9ybXMudVBvc2l0aW9uLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShvYmplY3Qud29ybGRNYXRyaXgpKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnVuaWZvcm1zLnVDYW1lcmEsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KGNhbWVyYS5tb2RlbFZpZXdNYXRyaXgpKTtcbiAgICAgICAgZ2wudW5pZm9ybTFmKHRoaXMudW5pZm9ybXMudUNvbG9yQWxwaGEsIHRoaXMub3BhY2l0eSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21wbGV4TWVzaFByb2dyYW07XG4iXX0=