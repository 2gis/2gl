'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shaders = require('../shaders');

var _Program2 = require('./Program');

var _Program3 = _interopRequireDefault(_Program2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Простая программа для {@link Mesh}. Раскрашивает весь объект в один заданный цвет.
 * {@link Geometry} меша использующего эту программу должна содержать буфер вершин.
 *
 * @extends Program
 */

var BasicMeshProgram = function (_Program) {
    _inherits(BasicMeshProgram, _Program);

    function BasicMeshProgram() {
        _classCallCheck(this, BasicMeshProgram);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicMeshProgram).call(this));

        _this._attributeList = ['position'];
        _this._uniformList = ['uCamera', 'uPosition', 'uColor', 'uColorAlpha'];
        _this._shader = _shaders.basic;

        /**
         * Цвет в формате RGB
         * @type {Number[]}
         */
        _this.color = [0, 0, 0];
        return _this;
    }

    _createClass(BasicMeshProgram, [{
        key: '_bindUniforms',
        value: function _bindUniforms(_ref) {
            var gl = _ref.gl;
            var camera = _ref.camera;
            var object = _ref.object;

            gl.uniformMatrix4fv(this.uniforms.uPosition, false, new Float32Array(object.worldMatrix));
            gl.uniformMatrix4fv(this.uniforms.uCamera, false, new Float32Array(camera.modelViewMatrix));
            gl.uniform1f(this.uniforms.uColorAlpha, this.opacity);
            gl.uniform3fv(this.uniforms.uColor, this.color);
        }
    }]);

    return BasicMeshProgram;
}(_Program3.default);

exports.default = BasicMeshProgram;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9ncmFtcy9CYXNpY01lc2hQcm9ncmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRTTs7O0FBQ0YsYUFERSxnQkFDRixHQUFjOzhCQURaLGtCQUNZOzsyRUFEWiw4QkFDWTs7QUFHVixjQUFLLGNBQUwsR0FBc0IsQ0FBQyxVQUFELENBQXRCLENBSFU7QUFJVixjQUFLLFlBQUwsR0FBb0IsQ0FBQyxTQUFELEVBQVksV0FBWixFQUF5QixRQUF6QixFQUFtQyxhQUFuQyxDQUFwQixDQUpVO0FBS1YsY0FBSyxPQUFMOzs7Ozs7QUFMVSxhQVdWLENBQUssS0FBTCxHQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQWIsQ0FYVTs7S0FBZDs7aUJBREU7OzRDQWVrQztnQkFBckIsYUFBcUI7Z0JBQWpCLHFCQUFpQjtnQkFBVCxxQkFBUzs7QUFDaEMsZUFBRyxnQkFBSCxDQUFvQixLQUFLLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLEtBQTdDLEVBQW9ELElBQUksWUFBSixDQUFpQixPQUFPLFdBQVAsQ0FBckUsRUFEZ0M7QUFFaEMsZUFBRyxnQkFBSCxDQUFvQixLQUFLLFFBQUwsQ0FBYyxPQUFkLEVBQXVCLEtBQTNDLEVBQWtELElBQUksWUFBSixDQUFpQixPQUFPLGVBQVAsQ0FBbkUsRUFGZ0M7QUFHaEMsZUFBRyxTQUFILENBQWEsS0FBSyxRQUFMLENBQWMsV0FBZCxFQUEyQixLQUFLLE9BQUwsQ0FBeEMsQ0FIZ0M7QUFJaEMsZUFBRyxVQUFILENBQWMsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFzQixLQUFLLEtBQUwsQ0FBcEMsQ0FKZ0M7Ozs7V0FmbEM7OztrQkF1QlMiLCJmaWxlIjoiQmFzaWNNZXNoUHJvZ3JhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YmFzaWMgYXMgc2hhZGVyfSBmcm9tICcuLi9zaGFkZXJzJztcbmltcG9ydCBQcm9ncmFtIGZyb20gJy4vUHJvZ3JhbSc7XG5cbi8qKlxuICog0J/RgNC+0YHRgtCw0Y8g0L/RgNC+0LPRgNCw0LzQvNCwINC00LvRjyB7QGxpbmsgTWVzaH0uINCg0LDRgdC60YDQsNGI0LjQstCw0LXRgiDQstC10YHRjCDQvtCx0YrQtdC60YIg0LIg0L7QtNC40L0g0LfQsNC00LDQvdC90YvQuSDRhtCy0LXRgi5cbiAqIHtAbGluayBHZW9tZXRyeX0g0LzQtdGI0LAg0LjRgdC/0L7Qu9GM0LfRg9GO0YnQtdCz0L4g0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgyDQtNC+0LvQttC90LAg0YHQvtC00LXRgNC20LDRgtGMINCx0YPRhNC10YAg0LLQtdGA0YjQuNC9LlxuICpcbiAqIEBleHRlbmRzIFByb2dyYW1cbiAqL1xuY2xhc3MgQmFzaWNNZXNoUHJvZ3JhbSBleHRlbmRzIFByb2dyYW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUxpc3QgPSBbJ3Bvc2l0aW9uJ107XG4gICAgICAgIHRoaXMuX3VuaWZvcm1MaXN0ID0gWyd1Q2FtZXJhJywgJ3VQb3NpdGlvbicsICd1Q29sb3InLCAndUNvbG9yQWxwaGEnXTtcbiAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQptCy0LXRgiDQsiDRhNC+0YDQvNCw0YLQtSBSR0JcbiAgICAgICAgICogQHR5cGUge051bWJlcltdfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IFswLCAwLCAwXTtcbiAgICB9XG5cbiAgICBfYmluZFVuaWZvcm1zKHtnbCwgY2FtZXJhLCBvYmplY3R9KSB7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy51bmlmb3Jtcy51UG9zaXRpb24sIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KG9iamVjdC53b3JsZE1hdHJpeCkpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMudW5pZm9ybXMudUNhbWVyYSwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkoY2FtZXJhLm1vZGVsVmlld01hdHJpeCkpO1xuICAgICAgICBnbC51bmlmb3JtMWYodGhpcy51bmlmb3Jtcy51Q29sb3JBbHBoYSwgdGhpcy5vcGFjaXR5KTtcbiAgICAgICAgZ2wudW5pZm9ybTNmdih0aGlzLnVuaWZvcm1zLnVDb2xvciwgdGhpcy5jb2xvcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNpY01lc2hQcm9ncmFtO1xuIl19