'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _multiSpriteFragGlsl = require('../shaders/multiSprite.frag.glsl.js');

var _multiSpriteFragGlsl2 = _interopRequireDefault(_multiSpriteFragGlsl);

var _multiSpriteVertGlsl = require('../shaders/multiSprite.vert.glsl.js');

var _multiSpriteVertGlsl2 = _interopRequireDefault(_multiSpriteVertGlsl);

var _ShaderProgram = require('../ShaderProgram');

var _ShaderProgram2 = _interopRequireDefault(_ShaderProgram);

var _RendererPlugin2 = require('../RendererPlugin');

var _RendererPlugin3 = _interopRequireDefault(_RendererPlugin2);

var _Shader = require('../Shader');

var _Shader2 = _interopRequireDefault(_Shader);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Плагин для рендера {@MultiSprite} объектов.
 * Для того, чтобы он добавился к рендеру, его нужно создать и вызвать {@link Renderer#addPlugin}.
 *
 * @extends RendererPlugin
 */
var MultiSpritePlugin = function (_RendererPlugin) {
    _inherits(MultiSpritePlugin, _RendererPlugin);

    function MultiSpritePlugin() {
        _classCallCheck(this, MultiSpritePlugin);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiSpritePlugin).call(this));

        _this._shaderProgram = new _ShaderProgram2.default({
            vertex: new _Shader2.default('vertex', _multiSpriteVertGlsl2.default),
            fragment: new _Shader2.default('fragment', _multiSpriteFragGlsl2.default),
            uniforms: [{ name: 'uPCamera', type: 'mat4' }, { name: 'uHalfSize', type: '2f' }, { name: 'uTexture', type: '1i' }, { name: 'uSmoothing', type: '1f' }],
            attributes: [{ name: 'disposition' }, { name: 'texture' }, { name: 'position' }, { name: 'colorAlpha' }, { name: 'scale' }, { name: 'offset' }]
        });

        _this.type = _libConstants.MULTI_SPRITE_RENDERER;
        return _this;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */


    _createClass(MultiSpritePlugin, [{
        key: 'render',
        value: function render(state) {
            var gl = state.gl;
            var camera = state.camera;
            var renderer = state.renderer;

            var size = renderer.getSize();

            state.shaderProgram = this._shaderProgram;

            gl.disable(gl.DEPTH_TEST);

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            this._shaderProgram.enable(gl).bind(gl, {
                uPCamera: new Float32Array(camera.modelViewMatrix),
                uHalfSize: [size[0] / 2, size[1] / 2],
                uTexture: 0
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

    return MultiSpritePlugin;
}(_RendererPlugin3.default);

exports.default = MultiSpritePlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlclBsdWdpbnMvTXVsdGlTcHJpdGVQbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0lBTU0saUI7OztBQUNGLGlDQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxjQUFMLEdBQXNCLDRCQUFrQjtBQUNwQyxvQkFBUSxxQkFBVyxRQUFYLGdDQUQ0QjtBQUVwQyxzQkFBVSxxQkFBVyxVQUFYLGdDQUYwQjtBQUdwQyxzQkFBVSxDQUNOLEVBQUMsTUFBTSxVQUFQLEVBQW1CLE1BQU0sTUFBekIsRUFETSxFQUVOLEVBQUMsTUFBTSxXQUFQLEVBQW9CLE1BQU0sSUFBMUIsRUFGTSxFQUdOLEVBQUMsTUFBTSxVQUFQLEVBQW1CLE1BQU0sSUFBekIsRUFITSxFQUlOLEVBQUMsTUFBTSxZQUFQLEVBQXFCLE1BQU0sSUFBM0IsRUFKTSxDQUgwQjtBQVNwQyx3QkFBWSxDQUNSLEVBQUMsTUFBTSxhQUFQLEVBRFEsRUFFUixFQUFDLE1BQU0sU0FBUCxFQUZRLEVBR1IsRUFBQyxNQUFNLFVBQVAsRUFIUSxFQUlSLEVBQUMsTUFBTSxZQUFQLEVBSlEsRUFLUixFQUFDLE1BQU0sT0FBUCxFQUxRLEVBTVIsRUFBQyxNQUFNLFFBQVAsRUFOUTtBQVR3QixTQUFsQixDQUF0Qjs7QUFtQkEsY0FBSyxJQUFMO0FBdEJVO0FBdUJiOztBQUVEOzs7Ozs7OzsrQkFJTyxLLEVBQU87QUFBQSxnQkFDSCxFQURHLEdBQ3FCLEtBRHJCLENBQ0gsRUFERztBQUFBLGdCQUNDLE1BREQsR0FDcUIsS0FEckIsQ0FDQyxNQUREO0FBQUEsZ0JBQ1MsUUFEVCxHQUNxQixLQURyQixDQUNTLFFBRFQ7O0FBRVYsZ0JBQU0sT0FBTyxTQUFTLE9BQVQsRUFBYjs7QUFFQSxrQkFBTSxhQUFOLEdBQXNCLEtBQUssY0FBM0I7O0FBRUEsZUFBRyxPQUFILENBQVcsR0FBRyxVQUFkOztBQUVBLGVBQUcsTUFBSCxDQUFVLEdBQUcsS0FBYjtBQUNBLGVBQUcsYUFBSCxDQUFpQixHQUFHLFFBQXBCO0FBQ0EsZUFBRyxTQUFILENBQWEsR0FBRyxHQUFoQixFQUFxQixHQUFHLG1CQUF4Qjs7QUFFQSxpQkFBSyxjQUFMLENBQ0ssTUFETCxDQUNZLEVBRFosRUFFSyxJQUZMLENBRVUsRUFGVixFQUVjO0FBQ04sMEJBQVUsSUFBSSxZQUFKLENBQWlCLE9BQU8sZUFBeEIsQ0FESjtBQUVOLDJCQUFXLENBQUMsS0FBSyxDQUFMLElBQVUsQ0FBWCxFQUFjLEtBQUssQ0FBTCxJQUFVLENBQXhCLENBRkw7QUFHTiwwQkFBVTtBQUhKLGFBRmQ7O0FBUUEsZUFBRyxhQUFILENBQWlCLEdBQUcsUUFBcEI7O0FBRUEsaUJBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0I7QUFBQSx1QkFBVSxPQUFPLE1BQVAsQ0FBYyxLQUFkLENBQVY7QUFBQSxhQUF0QjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsaUJBQUssY0FBTCxDQUFvQixPQUFwQixDQUE0QixFQUE1Qjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7Ozs7OztrQkFHVSxpQiIsImZpbGUiOiJNdWx0aVNwcml0ZVBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tICcuLi9zaGFkZXJzL211bHRpU3ByaXRlLmZyYWcuZ2xzbC5qcyc7XG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gJy4uL3NoYWRlcnMvbXVsdGlTcHJpdGUudmVydC5nbHNsLmpzJztcbmltcG9ydCBTaGFkZXJQcm9ncmFtIGZyb20gJy4uL1NoYWRlclByb2dyYW0nO1xuaW1wb3J0IFJlbmRlcmVyUGx1Z2luIGZyb20gJy4uL1JlbmRlcmVyUGx1Z2luJztcbmltcG9ydCBTaGFkZXIgZnJvbSAnLi4vU2hhZGVyJztcbmltcG9ydCB7TVVMVElfU1BSSVRFX1JFTkRFUkVSfSBmcm9tICcuLi9saWJDb25zdGFudHMnO1xuXG4vKipcbiAqINCf0LvQsNCz0LjQvSDQtNC70Y8g0YDQtdC90LTQtdGA0LAge0BNdWx0aVNwcml0ZX0g0L7QsdGK0LXQutGC0L7Qsi5cbiAqINCU0LvRjyDRgtC+0LPQviwg0YfRgtC+0LHRiyDQvtC9INC00L7QsdCw0LLQuNC70YHRjyDQuiDRgNC10L3QtNC10YDRgywg0LXQs9C+INC90YPQttC90L4g0YHQvtC30LTQsNGC0Ywg0Lgg0LLRi9C30LLQsNGC0Ywge0BsaW5rIFJlbmRlcmVyI2FkZFBsdWdpbn0uXG4gKlxuICogQGV4dGVuZHMgUmVuZGVyZXJQbHVnaW5cbiAqL1xuY2xhc3MgTXVsdGlTcHJpdGVQbHVnaW4gZXh0ZW5kcyBSZW5kZXJlclBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyUHJvZ3JhbSA9IG5ldyBTaGFkZXJQcm9ncmFtKHtcbiAgICAgICAgICAgIHZlcnRleDogbmV3IFNoYWRlcigndmVydGV4JywgdmVydGV4U2hhZGVyKSxcbiAgICAgICAgICAgIGZyYWdtZW50OiBuZXcgU2hhZGVyKCdmcmFnbWVudCcsIGZyYWdtZW50U2hhZGVyKSxcbiAgICAgICAgICAgIHVuaWZvcm1zOiBbXG4gICAgICAgICAgICAgICAge25hbWU6ICd1UENhbWVyYScsIHR5cGU6ICdtYXQ0J30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd1SGFsZlNpemUnLCB0eXBlOiAnMmYnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3VUZXh0dXJlJywgdHlwZTogJzFpJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICd1U21vb3RoaW5nJywgdHlwZTogJzFmJ31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICAge25hbWU6ICdkaXNwb3NpdGlvbid9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiAndGV4dHVyZSd9LFxuICAgICAgICAgICAgICAgIHtuYW1lOiAncG9zaXRpb24nfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ2NvbG9yQWxwaGEnfSxcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3NjYWxlJ30sXG4gICAgICAgICAgICAgICAge25hbWU6ICdvZmZzZXQnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBNVUxUSV9TUFJJVEVfUkVOREVSRVI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdGCINGB0YbQtdC90YMg0YEg0L/QvtC80L7RidGM0Y4g0Y3RgtC+0LPQviDQv9C70LDQs9C40L3QsFxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAgICovXG4gICAgcmVuZGVyKHN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHtnbCwgY2FtZXJhLCByZW5kZXJlcn0gPSBzdGF0ZTtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHJlbmRlcmVyLmdldFNpemUoKTtcblxuICAgICAgICBzdGF0ZS5zaGFkZXJQcm9ncmFtID0gdGhpcy5fc2hhZGVyUHJvZ3JhbTtcblxuICAgICAgICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpO1xuXG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgICB0aGlzLl9zaGFkZXJQcm9ncmFtXG4gICAgICAgICAgICAuZW5hYmxlKGdsKVxuICAgICAgICAgICAgLmJpbmQoZ2wsIHtcbiAgICAgICAgICAgICAgICB1UENhbWVyYTogbmV3IEZsb2F0MzJBcnJheShjYW1lcmEubW9kZWxWaWV3TWF0cml4KSxcbiAgICAgICAgICAgICAgICB1SGFsZlNpemU6IFtzaXplWzBdIC8gMiwgc2l6ZVsxXSAvIDJdLFxuICAgICAgICAgICAgICAgIHVUZXh0dXJlOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcblxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5yZW5kZXIoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3NoYWRlclByb2dyYW0uZGlzYWJsZShnbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNdWx0aVNwcml0ZVBsdWdpbjtcbiJdfQ==