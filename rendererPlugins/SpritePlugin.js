'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spriteFragGlsl = require('../shaders/sprite.frag.glsl.js');

var _spriteFragGlsl2 = _interopRequireDefault(_spriteFragGlsl);

var _spriteVertGlsl = require('../shaders/sprite.vert.glsl.js');

var _spriteVertGlsl2 = _interopRequireDefault(_spriteVertGlsl);

var _ShaderProgram = require('../ShaderProgram');

var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

var _RendererPlugin2 = require('../RendererPlugin');

var _RendererPlugin3 = _interopRequireDefault(_RendererPlugin2);

var _Geometry = require('../Geometry');

var _Geometry2 = _interopRequireDefault(_Geometry);

var _Shader = require('../Shader');

var _Shader2 = _interopRequireDefault(_Shader);

var _GeometryBuffer = require('../GeometryBuffer');

var _GeometryBuffer2 = _interopRequireDefault(_GeometryBuffer);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Плагин для рендера {@Sprite} объектов.
 * Для того, чтобы он добавился к рендеру, его нужно создать и вызвать {@link Renderer#addPlugin}.
 *
 * @extends RendererPlugin
 */
var SpritePlugin = function (_RendererPlugin) {
    _inherits(SpritePlugin, _RendererPlugin);

    function SpritePlugin() {
        _classCallCheck(this, SpritePlugin);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpritePlugin).call(this));

        _this._geometry = new _Geometry2.default();
        _this._geometry.setBuffer('position', new _GeometryBuffer2.default(new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]))).setBuffer('texture', new _GeometryBuffer2.default(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), { itemSize: 2 })).setBuffer('index', new _GeometryBuffer2.default(new Uint16Array([1, 2, 0, 3, 0, 2]), { itemSize: 1 }));

        _this._geometry.getBuffer('index').type = _GeometryBuffer2.default.ElementArrayBuffer;

        _this._shaderProgram = new _ShaderProgram2.default({
            vertex: new _Shader2.default('vertex', _spriteVertGlsl2.default),
            fragment: new _Shader2.default('fragment', _spriteFragGlsl2.default),
            uniforms: [{ name: 'uPCamera', type: 'mat4' }, { name: 'uPosition', type: '3f' }, { name: 'uColorAlpha', type: '1f' }, { name: 'uScale', type: '2f' }, { name: 'uTexture', type: '1i' }, { name: 'uHalfSize', type: '2f' }, { name: 'uOffset', type: '2f' }, { name: 'uSmoothing', type: '1f' }],
            attributes: [{ name: 'position' }, { name: 'texture' }, { name: 'index', index: true }]
        });

        _this.type = _libConstants.SPRITE_RENDERER;
        return _this;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */


    _createClass(SpritePlugin, [{
        key: 'render',
        value: function render(state) {
            var gl = state.gl;
            var camera = state.camera;


            state.shaderProgram = this._shaderProgram;

            gl.disable(gl.DEPTH_TEST);

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            this._shaderProgram.enable(gl).bind(gl, {
                uPCamera: new Float32Array(camera.modelViewMatrix),
                uTexture: 0
            }, {
                position: this._geometry.getBuffer('position'),
                texture: this._geometry.getBuffer('texture'),
                index: this._geometry.getBuffer('index')
            });

            gl.activeTexture(gl.TEXTURE0);

            this._objects.forEach(function (object) {
                return object.render(state);
            });
            this._objects = [];

            this._shaderProgram.disable(gl);

            return this;
        }
    }]);

    return SpritePlugin;
}(_RendererPlugin3.default);

exports.default = SpritePlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlclBsdWdpbnMvU3ByaXRlUGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7Ozs7SUFNTSxZOzs7QUFDRiw0QkFBYztBQUFBOztBQUFBOztBQUdWLGNBQUssU0FBTCxHQUFpQix3QkFBakI7QUFDQSxjQUFLLFNBQUwsQ0FDSyxTQURMLENBQ2UsVUFEZixFQUMyQiw2QkFBbUIsSUFBSSxZQUFKLENBQWlCLENBQ3ZELENBQUMsR0FEc0QsRUFDakQsQ0FBQyxHQURnRCxFQUMzQyxDQUQyQyxFQUV2RCxHQUZ1RCxFQUVsRCxDQUFDLEdBRmlELEVBRTVDLENBRjRDLEVBR3ZELEdBSHVELEVBR2xELEdBSGtELEVBRzdDLENBSDZDLEVBSXZELENBQUMsR0FKc0QsRUFJakQsR0FKaUQsRUFJNUMsQ0FKNEMsQ0FBakIsQ0FBbkIsQ0FEM0IsRUFPSyxTQVBMLENBT2UsU0FQZixFQU8wQiw2QkFBbUIsSUFBSSxZQUFKLENBQWlCLENBQ3RELENBRHNELEVBQ25ELENBRG1ELEVBRXRELENBRnNELEVBRW5ELENBRm1ELEVBR3RELENBSHNELEVBR25ELENBSG1ELEVBSXRELENBSnNELEVBSW5ELENBSm1ELENBQWpCLENBQW5CLEVBS2xCLEVBQUMsVUFBVSxDQUFYLEVBTGtCLENBUDFCLEVBYUssU0FiTCxDQWFlLE9BYmYsRUFhd0IsNkJBQW1CLElBQUksV0FBSixDQUFnQixDQUNuRCxDQURtRCxFQUNoRCxDQURnRCxFQUM3QyxDQUQ2QyxFQUVuRCxDQUZtRCxFQUVoRCxDQUZnRCxFQUU3QyxDQUY2QyxDQUFoQixDQUFuQixFQUdoQixFQUFDLFVBQVUsQ0FBWCxFQUhnQixDQWJ4Qjs7QUFrQkEsY0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUF6QixFQUFrQyxJQUFsQyxHQUF5Qyx5QkFBZSxrQkFBeEQ7O0FBRUEsY0FBSyxjQUFMLEdBQXNCLDRCQUFrQjtBQUNwQyxvQkFBUSxxQkFBVyxRQUFYLDJCQUQ0QjtBQUVwQyxzQkFBVSxxQkFBVyxVQUFYLDJCQUYwQjtBQUdwQyxzQkFBVSxDQUNOLEVBQUMsTUFBTSxVQUFQLEVBQW1CLE1BQU0sTUFBekIsRUFETSxFQUVOLEVBQUMsTUFBTSxXQUFQLEVBQW9CLE1BQU0sSUFBMUIsRUFGTSxFQUdOLEVBQUMsTUFBTSxhQUFQLEVBQXNCLE1BQU0sSUFBNUIsRUFITSxFQUlOLEVBQUMsTUFBTSxRQUFQLEVBQWlCLE1BQU0sSUFBdkIsRUFKTSxFQUtOLEVBQUMsTUFBTSxVQUFQLEVBQW1CLE1BQU0sSUFBekIsRUFMTSxFQU1OLEVBQUMsTUFBTSxXQUFQLEVBQW9CLE1BQU0sSUFBMUIsRUFOTSxFQU9OLEVBQUMsTUFBTSxTQUFQLEVBQWtCLE1BQU0sSUFBeEIsRUFQTSxFQVFOLEVBQUMsTUFBTSxZQUFQLEVBQXFCLE1BQU0sSUFBM0IsRUFSTSxDQUgwQjtBQWFwQyx3QkFBWSxDQUNSLEVBQUMsTUFBTSxVQUFQLEVBRFEsRUFFUixFQUFDLE1BQU0sU0FBUCxFQUZRLEVBR1IsRUFBQyxNQUFNLE9BQVAsRUFBZ0IsT0FBTyxJQUF2QixFQUhRO0FBYndCLFNBQWxCLENBQXRCOztBQW9CQSxjQUFLLElBQUw7QUE1Q1U7QUE2Q2I7O0FBRUQ7Ozs7Ozs7OytCQUlPLEssRUFBTztBQUFBLGdCQUNILEVBREcsR0FDVyxLQURYLENBQ0gsRUFERztBQUFBLGdCQUNDLE1BREQsR0FDVyxLQURYLENBQ0MsTUFERDs7O0FBR1Ysa0JBQU0sYUFBTixHQUFzQixLQUFLLGNBQTNCOztBQUVBLGVBQUcsT0FBSCxDQUFXLEdBQUcsVUFBZDs7QUFFQSxlQUFHLE1BQUgsQ0FBVSxHQUFHLEtBQWI7QUFDQSxlQUFHLGFBQUgsQ0FBaUIsR0FBRyxRQUFwQjtBQUNBLGVBQUcsU0FBSCxDQUFhLEdBQUcsR0FBaEIsRUFBcUIsR0FBRyxtQkFBeEI7O0FBRUEsaUJBQUssY0FBTCxDQUNLLE1BREwsQ0FDWSxFQURaLEVBRUssSUFGTCxDQUVVLEVBRlYsRUFFYztBQUNOLDBCQUFVLElBQUksWUFBSixDQUFpQixPQUFPLGVBQXhCLENBREo7QUFFTiwwQkFBVTtBQUZKLGFBRmQsRUFLTztBQUNDLDBCQUFVLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsVUFBekIsQ0FEWDtBQUVDLHlCQUFTLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsU0FBekIsQ0FGVjtBQUdDLHVCQUFPLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBekI7QUFIUixhQUxQOztBQVdBLGVBQUcsYUFBSCxDQUFpQixHQUFHLFFBQXBCOztBQUVBLGlCQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO0FBQUEsdUJBQVUsT0FBTyxNQUFQLENBQWMsS0FBZCxDQUFWO0FBQUEsYUFBdEI7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBLGlCQUFLLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBNEIsRUFBNUI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7Ozs7a0JBR1UsWSIsImZpbGUiOiJTcHJpdGVQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9zcHJpdGUuZnJhZy5nbHNsLmpzJztcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSAnLi4vc2hhZGVycy9zcHJpdGUudmVydC5nbHNsLmpzJztcbmltcG9ydCBTaGFkZXJQcm9ncmFtIGZyb20gJy4uL1NoYWRlclByb2dyYW0nO1xuaW1wb3J0IFJlbmRlcmVyUGx1Z2luIGZyb20gJy4uL1JlbmRlcmVyUGx1Z2luJztcbmltcG9ydCBHZW9tZXRyeSBmcm9tICcuLi9HZW9tZXRyeSc7XG5pbXBvcnQgU2hhZGVyIGZyb20gJy4uL1NoYWRlcic7XG5pbXBvcnQgR2VvbWV0cnlCdWZmZXIgZnJvbSAnLi4vR2VvbWV0cnlCdWZmZXInO1xuaW1wb3J0IHtTUFJJVEVfUkVOREVSRVJ9IGZyb20gJy4uL2xpYkNvbnN0YW50cyc7XG5cbi8qKlxuICog0J/Qu9Cw0LPQuNC9INC00LvRjyDRgNC10L3QtNC10YDQsCB7QFNwcml0ZX0g0L7QsdGK0LXQutGC0L7Qsi5cbiAqINCU0LvRjyDRgtC+0LPQviwg0YfRgtC+0LHRiyDQvtC9INC00L7QsdCw0LLQuNC70YHRjyDQuiDRgNC10L3QtNC10YDRgywg0LXQs9C+INC90YPQttC90L4g0YHQvtC30LTQsNGC0Ywg0Lgg0LLRi9C30LLQsNGC0Ywge0BsaW5rIFJlbmRlcmVyI2FkZFBsdWdpbn0uXG4gKlxuICogQGV4dGVuZHMgUmVuZGVyZXJQbHVnaW5cbiAqL1xuY2xhc3MgU3ByaXRlUGx1Z2luIGV4dGVuZHMgUmVuZGVyZXJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5XG4gICAgICAgICAgICAuc2V0QnVmZmVyKCdwb3NpdGlvbicsIG5ldyBHZW9tZXRyeUJ1ZmZlcihuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICAtMC41LCAtMC41LCAwLFxuICAgICAgICAgICAgICAgIDAuNSwgLTAuNSwgMCxcbiAgICAgICAgICAgICAgICAwLjUsIDAuNSwgMCxcbiAgICAgICAgICAgICAgICAtMC41LCAwLjUsIDBcbiAgICAgICAgICAgIF0pKSlcbiAgICAgICAgICAgIC5zZXRCdWZmZXIoJ3RleHR1cmUnLCBuZXcgR2VvbWV0cnlCdWZmZXIobmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMCxcbiAgICAgICAgICAgICAgICAxLCAwLFxuICAgICAgICAgICAgICAgIDEsIDEsXG4gICAgICAgICAgICAgICAgMCwgMVxuICAgICAgICAgICAgXSksIHtpdGVtU2l6ZTogMn0pKVxuICAgICAgICAgICAgLnNldEJ1ZmZlcignaW5kZXgnLCBuZXcgR2VvbWV0cnlCdWZmZXIobmV3IFVpbnQxNkFycmF5KFtcbiAgICAgICAgICAgICAgICAxLCAyLCAwLFxuICAgICAgICAgICAgICAgIDMsIDAsIDJcbiAgICAgICAgICAgIF0pLCB7aXRlbVNpemU6IDF9KSk7XG5cbiAgICAgICAgdGhpcy5fZ2VvbWV0cnkuZ2V0QnVmZmVyKCdpbmRleCcpLnR5cGUgPSBHZW9tZXRyeUJ1ZmZlci5FbGVtZW50QXJyYXlCdWZmZXI7XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyUHJvZ3JhbSA9IG5ldyBTaGFkZXJQcm9ncmFtKHtcbiAgICAgICAgICAgIHZlcnRleDogbmV3IFNoYWRlcigndmVydGV4JywgdmVydGV4U2hhZGVyKSxcbiAgICAgICAgICAgIGZyYWdtZW50OiBuZXcgU2hhZGVyKCdmcmFnbWVudCcsIGZyYWdtZW50U2hhZGVyKSxcbiAgICAgICAgICAgIHVuaWZvcm1zOiBbXG4gICAgICAgICAgICAgICAge25hbWU6ICd1UENhbWVyYScsIHR5cGU6ICdtYXQ0J30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd1UG9zaXRpb24nLCB0eXBlOiAnM2YnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3VDb2xvckFscGhhJywgdHlwZTogJzFmJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd1U2NhbGUnLCB0eXBlOiAnMmYnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3VUZXh0dXJlJywgdHlwZTogJzFpJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd1SGFsZlNpemUnLCB0eXBlOiAnMmYnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3VPZmZzZXQnLCB0eXBlOiAnMmYnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3VTbW9vdGhpbmcnLCB0eXBlOiAnMWYnfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3Bvc2l0aW9uJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd0ZXh0dXJlJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICdpbmRleCcsIGluZGV4OiB0cnVlfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBTUFJJVEVfUkVOREVSRVI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdGCINGB0YbQtdC90YMg0YEg0L/QvtC80L7RidGM0Y4g0Y3RgtC+0LPQviDQv9C70LDQs9C40L3QsFxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAgICovXG4gICAgcmVuZGVyKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHtnbCwgY2FtZXJhfSA9IHN0YXRlO1xuXG4gICAgICAgIHN0YXRlLnNoYWRlclByb2dyYW0gPSB0aGlzLl9zaGFkZXJQcm9ncmFtO1xuXG4gICAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgICAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERCk7XG4gICAgICAgIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW1cbiAgICAgICAgICAgIC5lbmFibGUoZ2wpXG4gICAgICAgICAgICAuYmluZChnbCwge1xuICAgICAgICAgICAgICAgIHVQQ2FtZXJhOiBuZXcgRmxvYXQzMkFycmF5KGNhbWVyYS5tb2RlbFZpZXdNYXRyaXgpLFxuICAgICAgICAgICAgICAgIHVUZXh0dXJlOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuX2dlb21ldHJ5LmdldEJ1ZmZlcigncG9zaXRpb24nKSxcbiAgICAgICAgICAgICAgICB0ZXh0dXJlOiB0aGlzLl9nZW9tZXRyeS5nZXRCdWZmZXIoJ3RleHR1cmUnKSxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fZ2VvbWV0cnkuZ2V0QnVmZmVyKCdpbmRleCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcblxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5yZW5kZXIoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0uZGlzYWJsZShnbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGVQbHVnaW47XG4iXX0=