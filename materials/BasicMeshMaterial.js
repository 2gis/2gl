'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _basicFragGlsl = require('../shaders/basic.frag.glsl.js');

var _basicFragGlsl2 = _interopRequireDefault(_basicFragGlsl);

var _basicVertGlsl = require('../shaders/basic.vert.glsl.js');

var _basicVertGlsl2 = _interopRequireDefault(_basicVertGlsl);

var _Material2 = require('./Material');

var _Material3 = _interopRequireDefault(_Material2);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shader = {
    fragment: _basicFragGlsl2.default,
    vertex: _basicVertGlsl2.default
};

/**
 * Простой материал для {@link Mesh}. Раскрашивает весь объект в один заданный цвет.
 * {@link Geometry} меша использующего этот материал должна содержать буфер вершин.
 * Этот материал требует подключения {@link CommonPlugin} и {@link TransparentPlugin} к рендереру.
 *
 * @extends Material
 */

var BasicMeshMaterial = function (_Material) {
    _inherits(BasicMeshMaterial, _Material);

    function BasicMeshMaterial() {
        _classCallCheck(this, BasicMeshMaterial);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicMeshMaterial).call(this));

        _this._attributes = [{ name: 'position' }];
        _this._uniforms = [{ name: 'uColorAlpha', type: '1f' }, { name: 'uCamera', type: 'mat4' }, { name: 'uPosition', type: 'mat4' }, { name: 'uColor', type: '3fv' }];

        _this._shader = shader;

        /**
         * Цвет в формате RGB
         * @type {Number[]}
         */
        _this.color = [0, 0, 0];

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        _this.type = _libConstants.BASIC_MESH_MATERIAL;
        return _this;
    }

    _createClass(BasicMeshMaterial, [{
        key: '_shaderProgramBind',
        value: function _shaderProgramBind(_ref) {
            var gl = _ref.gl;
            var object = _ref.object;
            var camera = _ref.camera;

            var attributes = {};
            this._attributes.forEach(function (obj) {
                attributes[obj.name] = object.geometry.getBuffer(obj.name);
            });

            var uniforms = {
                uColorAlpha: this.opacity,
                uPosition: new Float32Array(object.worldMatrix),
                uCamera: new Float32Array(camera.modelViewMatrix),
                uColor: this.color
            };

            this._shaderProgram.bind(gl, uniforms, attributes);
        }
    }]);

    return BasicMeshMaterial;
}(_Material3.default);

exports.default = BasicMeshMaterial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbHMvQmFzaWNNZXNoTWF0ZXJpYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUztBQUNYLHFDQURXO0FBRVg7QUFGVyxDQUFmOztBQUtBOzs7Ozs7OztJQU9NLGlCOzs7QUFDRixpQ0FBYztBQUFBOztBQUFBOztBQUdWLGNBQUssV0FBTCxHQUFtQixDQUFDLEVBQUMsTUFBTSxVQUFQLEVBQUQsQ0FBbkI7QUFDQSxjQUFLLFNBQUwsR0FBaUIsQ0FDYixFQUFDLE1BQU0sYUFBUCxFQUFzQixNQUFNLElBQTVCLEVBRGEsRUFFYixFQUFDLE1BQU0sU0FBUCxFQUFrQixNQUFNLE1BQXhCLEVBRmEsRUFHYixFQUFDLE1BQU0sV0FBUCxFQUFvQixNQUFNLE1BQTFCLEVBSGEsRUFJYixFQUFDLE1BQU0sUUFBUCxFQUFpQixNQUFNLEtBQXZCLEVBSmEsQ0FBakI7O0FBT0EsY0FBSyxPQUFMLEdBQWUsTUFBZjs7QUFFQTs7OztBQUlBLGNBQUssS0FBTCxHQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQWI7O0FBRUE7Ozs7QUFJQSxjQUFLLElBQUw7QUF2QlU7QUF3QmI7Ozs7aURBRXdDO0FBQUEsZ0JBQXJCLEVBQXFCLFFBQXJCLEVBQXFCO0FBQUEsZ0JBQWpCLE1BQWlCLFFBQWpCLE1BQWlCO0FBQUEsZ0JBQVQsTUFBUyxRQUFULE1BQVM7O0FBQ3JDLGdCQUFNLGFBQWEsRUFBbkI7QUFDQSxpQkFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLGVBQU87QUFDNUIsMkJBQVcsSUFBSSxJQUFmLElBQXVCLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQixJQUFJLElBQTlCLENBQXZCO0FBQ0gsYUFGRDs7QUFJQSxnQkFBTSxXQUFXO0FBQ2IsNkJBQWEsS0FBSyxPQURMO0FBRWIsMkJBQVcsSUFBSSxZQUFKLENBQWlCLE9BQU8sV0FBeEIsQ0FGRTtBQUdiLHlCQUFTLElBQUksWUFBSixDQUFpQixPQUFPLGVBQXhCLENBSEk7QUFJYix3QkFBUSxLQUFLO0FBSkEsYUFBakI7O0FBT0EsaUJBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixFQUF6QixFQUE2QixRQUE3QixFQUF1QyxVQUF2QztBQUNIOzs7Ozs7a0JBR1UsaUIiLCJmaWxlIjoiQmFzaWNNZXNoTWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9iYXNpYy5mcmFnLmdsc2wuanMnO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL2Jhc2ljLnZlcnQuZ2xzbC5qcyc7XG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi9NYXRlcmlhbCc7XG5pbXBvcnQge0JBU0lDX01FU0hfTUFURVJJQUx9IGZyb20gJy4uL2xpYkNvbnN0YW50cyc7XG5cbmNvbnN0IHNoYWRlciA9IHtcbiAgICBmcmFnbWVudDogZnJhZ21lbnRTaGFkZXIsXG4gICAgdmVydGV4OiB2ZXJ0ZXhTaGFkZXJcbn07XG5cbi8qKlxuICog0J/RgNC+0YHRgtC+0Lkg0LzQsNGC0LXRgNC40LDQuyDQtNC70Y8ge0BsaW5rIE1lc2h9LiDQoNCw0YHQutGA0LDRiNC40LLQsNC10YIg0LLQtdGB0Ywg0L7QsdGK0LXQutGCINCyINC+0LTQuNC9INC30LDQtNCw0L3QvdGL0Lkg0YbQstC10YIuXG4gKiB7QGxpbmsgR2VvbWV0cnl9INC80LXRiNCwINC40YHQv9C+0LvRjNC30YPRjtGJ0LXQs9C+INGN0YLQvtGCINC80LDRgtC10YDQuNCw0Lsg0LTQvtC70LbQvdCwINGB0L7QtNC10YDQttCw0YLRjCDQsdGD0YTQtdGAINCy0LXRgNGI0LjQvS5cbiAqINCt0YLQvtGCINC80LDRgtC10YDQuNCw0Lsg0YLRgNC10LHRg9C10YIg0L/QvtC00LrQu9GO0YfQtdC90LjRjyB7QGxpbmsgQ29tbW9uUGx1Z2lufSDQuCB7QGxpbmsgVHJhbnNwYXJlbnRQbHVnaW59INC6INGA0LXQvdC00LXRgNC10YDRgy5cbiAqXG4gKiBAZXh0ZW5kcyBNYXRlcmlhbFxuICovXG5jbGFzcyBCYXNpY01lc2hNYXRlcmlhbCBleHRlbmRzIE1hdGVyaWFsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzID0gW3tuYW1lOiAncG9zaXRpb24nfV07XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zID0gW1xuICAgICAgICAgICAge25hbWU6ICd1Q29sb3JBbHBoYScsIHR5cGU6ICcxZid9LFxuICAgICAgICAgICAge25hbWU6ICd1Q2FtZXJhJywgdHlwZTogJ21hdDQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAndVBvc2l0aW9uJywgdHlwZTogJ21hdDQnfSxcbiAgICAgICAgICAgIHtuYW1lOiAndUNvbG9yJywgdHlwZTogJzNmdid9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQptCy0LXRgiDQsiDRhNC+0YDQvNCw0YLQtSBSR0JcbiAgICAgICAgICogQHR5cGUge051bWJlcltdfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IFswLCAwLCAwXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC80LDRgtC10YDQuNCw0LvQsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gQkFTSUNfTUVTSF9NQVRFUklBTDtcbiAgICB9XG5cbiAgICBfc2hhZGVyUHJvZ3JhbUJpbmQoe2dsLCBvYmplY3QsIGNhbWVyYX0pIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNbb2JqLm5hbWVdID0gb2JqZWN0Lmdlb21ldHJ5LmdldEJ1ZmZlcihvYmoubmFtZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHVuaWZvcm1zID0ge1xuICAgICAgICAgICAgdUNvbG9yQWxwaGE6IHRoaXMub3BhY2l0eSxcbiAgICAgICAgICAgIHVQb3NpdGlvbjogbmV3IEZsb2F0MzJBcnJheShvYmplY3Qud29ybGRNYXRyaXgpLFxuICAgICAgICAgICAgdUNhbWVyYTogbmV3IEZsb2F0MzJBcnJheShjYW1lcmEubW9kZWxWaWV3TWF0cml4KSxcbiAgICAgICAgICAgIHVDb2xvcjogdGhpcy5jb2xvclxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0uYmluZChnbCwgdW5pZm9ybXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNNZXNoTWF0ZXJpYWw7XG4iXX0=