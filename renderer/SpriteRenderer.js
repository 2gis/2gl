'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shaders = require('../shaders');

var _Geometry = require('../Geometry');

var _Geometry2 = _interopRequireDefault(_Geometry);

var _Buffer = require('../Buffer');

var _Buffer2 = _interopRequireDefault(_Buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Отдельный рендер, используется для отрисовки спрайтов.
 * @ignore
 */

var SpriteRenderer = function () {
    function SpriteRenderer() {
        _classCallCheck(this, SpriteRenderer);

        this._shader = _shaders.sprite;
        this._geometry = new _Geometry2.default();
        this._geometry.setBuffer('position', new _Buffer2.default(new Float32Array([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]), 3)).setBuffer('texture', new _Buffer2.default(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2)).setBuffer('index', new _Buffer2.default(new Uint16Array([1, 2, 0, 3, 0, 2]), 1));

        this._geometry.getBuffer('index').type = _Buffer2.default.ElementArrayBuffer;
    }

    _createClass(SpriteRenderer, [{
        key: 'render',
        value: function render(state, renderObjects) {
            var gl = state.gl;
            var camera = state.camera;


            gl.disable(gl.DEPTH_TEST);

            gl.enable(gl.BLEND);
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            if (!this._shaderProgram) {
                this._prepare(state);
            }

            gl.useProgram(this._shaderProgram);

            gl.enableVertexAttribArray(this._attributes.position);
            gl.enableVertexAttribArray(this._attributes.texture);

            this._geometry.getBuffer('position').bind(gl, this._attributes.position);
            this._geometry.getBuffer('texture').bind(gl, this._attributes.texture);

            gl.uniformMatrix4fv(this._uniforms.uPCamera, false, new Float32Array(camera.modelViewMatrix));

            this._geometry.getBuffer('index').bind(gl);

            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(this._uniforms.uTexture, 0);

            state.uniforms = this._uniforms;

            renderObjects.forEach(function (object) {
                return object.render(state);
            });

            gl.disableVertexAttribArray(this._attributes.position);
            gl.disableVertexAttribArray(this._attributes.texture);
        }
    }, {
        key: '_prepare',
        value: function _prepare(state) {
            this._prepareShaders(state);
            this._prepareAttributes(state);
            this._prepareUniforms(state);
        }
    }, {
        key: '_prepareShaders',
        value: function _prepareShaders(_ref) {
            var gl = _ref.gl;

            var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, this._shader.fragment);
            gl.compileShader(fragmentShader);

            var vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, this._shader.vertex);
            gl.compileShader(vertexShader);

            this._shaderProgram = gl.createProgram();
            gl.attachShader(this._shaderProgram, vertexShader);
            gl.attachShader(this._shaderProgram, fragmentShader);
            gl.linkProgram(this._shaderProgram);
        }
    }, {
        key: '_prepareAttributes',
        value: function _prepareAttributes(_ref2) {
            var gl = _ref2.gl;

            this._attributes = {
                position: gl.getAttribLocation(this._shaderProgram, 'position'),
                texture: gl.getAttribLocation(this._shaderProgram, 'texture')
            };
        }
    }, {
        key: '_prepareUniforms',
        value: function _prepareUniforms(_ref3) {
            var gl = _ref3.gl;

            this._uniforms = {
                uPCamera: gl.getUniformLocation(this._shaderProgram, 'uPCamera'),
                uPosition: gl.getUniformLocation(this._shaderProgram, 'uPosition'),
                uColorAlpha: gl.getUniformLocation(this._shaderProgram, 'uColorAlpha'),
                uTexture: gl.getUniformLocation(this._shaderProgram, 'uTexture'),
                uScale: gl.getUniformLocation(this._shaderProgram, 'uScale'),
                uHalfSize: gl.getUniformLocation(this._shaderProgram, 'uHalfSize'),
                uOffset: gl.getUniformLocation(this._shaderProgram, 'uOffset'),
                uSmoothing: gl.getUniformLocation(this._shaderProgram, 'uSmoothing')
            };
        }
    }]);

    return SpriteRenderer;
}();

exports.default = SpriteRenderer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlci9TcHJpdGVSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7SUFNTTtBQUNGLGFBREUsY0FDRixHQUFjOzhCQURaLGdCQUNZOztBQUNWLGFBQUssT0FBTCxtQkFEVTtBQUVWLGFBQUssU0FBTCxHQUFpQix3QkFBakIsQ0FGVTtBQUdWLGFBQUssU0FBTCxDQUNLLFNBREwsQ0FDZSxVQURmLEVBQzJCLHFCQUFXLElBQUksWUFBSixDQUFpQixDQUMvQyxDQUFDLEdBQUQsRUFBTSxDQUFDLEdBQUQsRUFBTSxDQURtQyxFQUUvQyxHQUYrQyxFQUUxQyxDQUFDLEdBQUQsRUFBTSxDQUZvQyxFQUcvQyxHQUgrQyxFQUcxQyxHQUgwQyxFQUdyQyxDQUhxQyxFQUkvQyxDQUFDLEdBQUQsRUFBTSxHQUp5QyxFQUlwQyxDQUpvQyxDQUFqQixDQUFYLEVBS25CLENBTG1CLENBRDNCLEVBT0ssU0FQTCxDQU9lLFNBUGYsRUFPMEIscUJBQVcsSUFBSSxZQUFKLENBQWlCLENBQzlDLENBRDhDLEVBQzNDLENBRDJDLEVBRTlDLENBRjhDLEVBRTNDLENBRjJDLEVBRzlDLENBSDhDLEVBRzNDLENBSDJDLEVBSTlDLENBSjhDLEVBSTNDLENBSjJDLENBQWpCLENBQVgsRUFLbEIsQ0FMa0IsQ0FQMUIsRUFhSyxTQWJMLENBYWUsT0FiZixFQWF3QixxQkFBVyxJQUFJLFdBQUosQ0FBZ0IsQ0FDM0MsQ0FEMkMsRUFDeEMsQ0FEd0MsRUFDckMsQ0FEcUMsRUFFM0MsQ0FGMkMsRUFFeEMsQ0FGd0MsRUFFckMsQ0FGcUMsQ0FBaEIsQ0FBWCxFQUdoQixDQUhnQixDQWJ4QixFQUhVOztBQXFCVixhQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQXpCLEVBQWtDLElBQWxDLEdBQXlDLGlCQUFPLGtCQUFQLENBckIvQjtLQUFkOztpQkFERTs7K0JBeUJLLE9BQU8sZUFBZTtnQkFD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S0FBSyxjQUFMLENBQWYsQ0Faa0I7Ozs7a0RBZUc7Z0JBQUwsY0FBSzs7QUFDckIsaUJBQUssV0FBTCxHQUFtQjtBQUNmLDBCQUFVLEdBQUcsaUJBQUgsQ0FBcUIsS0FBSyxjQUFMLEVBQXFCLFVBQTFDLENBQVY7QUFDQSx5QkFBUyxHQUFHLGlCQUFILENBQXFCLEtBQUssY0FBTCxFQUFxQixTQUExQyxDQUFUO2FBRkosQ0FEcUI7Ozs7Z0RBT0Y7Z0JBQUwsY0FBSzs7QUFDbkIsaUJBQUssU0FBTCxHQUFpQjtBQUNiLDBCQUFVLEdBQUcsa0JBQUgsQ0FBc0IsS0FBSyxjQUFMLEVBQXFCLFVBQTNDLENBQVY7QUFDQSwyQkFBVyxHQUFHLGtCQUFILENBQXNCLEtBQUssY0FBTCxFQUFxQixXQUEzQyxDQUFYO0FBQ0EsNkJBQWEsR0FBRyxrQkFBSCxDQUFzQixLQUFLLGNBQUwsRUFBcUIsYUFBM0MsQ0FBYjtBQUNBLDBCQUFVLEdBQUcsa0JBQUgsQ0FBc0IsS0FBSyxjQUFMLEVBQXFCLFVBQTNDLENBQVY7QUFDQSx3QkFBUSxHQUFHLGtCQUFILENBQXNCLEtBQUssY0FBTCxFQUFxQixRQUEzQyxDQUFSO0FBQ0EsMkJBQVcsR0FBRyxrQkFBSCxDQUFzQixLQUFLLGNBQUwsRUFBcUIsV0FBM0MsQ0FBWDtBQUNBLHlCQUFTLEdBQUcsa0JBQUgsQ0FBc0IsS0FBSyxjQUFMLEVBQXFCLFNBQTNDLENBQVQ7QUFDQSw0QkFBWSxHQUFHLGtCQUFILENBQXNCLEtBQUssY0FBTCxFQUFxQixZQUEzQyxDQUFaO2FBUkosQ0FEbUI7Ozs7V0F6RnJCOzs7a0JBdUdTIiwiZmlsZSI6IlNwcml0ZVJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzcHJpdGUgYXMgc2hhZGVyfSBmcm9tICcuLi9zaGFkZXJzJztcbmltcG9ydCBHZW9tZXRyeSBmcm9tICcuLi9HZW9tZXRyeSc7XG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uL0J1ZmZlcic7XG5cbi8qKlxuICog0J7RgtC00LXQu9GM0L3Ri9C5INGA0LXQvdC00LXRgCwg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtGC0YDQuNGB0L7QstC60Lgg0YHQv9GA0LDQudGC0L7Qsi5cbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgU3ByaXRlUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zaGFkZXIgPSBzaGFkZXI7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5ID0gbmV3IEdlb21ldHJ5KCk7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5XG4gICAgICAgICAgICAuc2V0QnVmZmVyKCdwb3NpdGlvbicsIG5ldyBCdWZmZXIobmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAgICAgLTAuNSwgLTAuNSwgMCxcbiAgICAgICAgICAgICAgICAwLjUsIC0wLjUsIDAsXG4gICAgICAgICAgICAgICAgMC41LCAwLjUsIDAsXG4gICAgICAgICAgICAgICAgLTAuNSwgMC41LCAwXG4gICAgICAgICAgICBdKSwgMykpXG4gICAgICAgICAgICAuc2V0QnVmZmVyKCd0ZXh0dXJlJywgbmV3IEJ1ZmZlcihuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgIDEsIDAsXG4gICAgICAgICAgICAgICAgMSwgMSxcbiAgICAgICAgICAgICAgICAwLCAxXG4gICAgICAgICAgICBdKSwgMikpXG4gICAgICAgICAgICAuc2V0QnVmZmVyKCdpbmRleCcsIG5ldyBCdWZmZXIobmV3IFVpbnQxNkFycmF5KFtcbiAgICAgICAgICAgICAgICAxLCAyLCAwLFxuICAgICAgICAgICAgICAgIDMsIDAsIDJcbiAgICAgICAgICAgIF0pLCAxKSk7XG5cbiAgICAgICAgdGhpcy5fZ2VvbWV0cnkuZ2V0QnVmZmVyKCdpbmRleCcpLnR5cGUgPSBCdWZmZXIuRWxlbWVudEFycmF5QnVmZmVyO1xuICAgIH1cblxuICAgIHJlbmRlcihzdGF0ZSwgcmVuZGVyT2JqZWN0cykge1xuICAgICAgICBjb25zdCB7Z2wsIGNhbWVyYX0gPSBzdGF0ZTtcblxuICAgICAgICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpO1xuXG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3NoYWRlclByb2dyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmUoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLl9zaGFkZXJQcm9ncmFtKTtcblxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLl9hdHRyaWJ1dGVzLnBvc2l0aW9uKTtcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5fYXR0cmlidXRlcy50ZXh0dXJlKTtcblxuICAgICAgICB0aGlzLl9nZW9tZXRyeS5nZXRCdWZmZXIoJ3Bvc2l0aW9uJykuYmluZChnbCwgdGhpcy5fYXR0cmlidXRlcy5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuX2dlb21ldHJ5LmdldEJ1ZmZlcigndGV4dHVyZScpLmJpbmQoZ2wsIHRoaXMuX2F0dHJpYnV0ZXMudGV4dHVyZSk7XG5cbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLl91bmlmb3Jtcy51UENhbWVyYSwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkoY2FtZXJhLm1vZGVsVmlld01hdHJpeCkpO1xuXG4gICAgICAgIHRoaXMuX2dlb21ldHJ5LmdldEJ1ZmZlcignaW5kZXgnKS5iaW5kKGdsKTtcblxuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICAgICAgZ2wudW5pZm9ybTFpKHRoaXMuX3VuaWZvcm1zLnVUZXh0dXJlLCAwKTtcblxuICAgICAgICBzdGF0ZS51bmlmb3JtcyA9IHRoaXMuX3VuaWZvcm1zO1xuXG4gICAgICAgIHJlbmRlck9iamVjdHMuZm9yRWFjaChvYmplY3QgPT4gb2JqZWN0LnJlbmRlcihzdGF0ZSkpO1xuXG4gICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLl9hdHRyaWJ1dGVzLnBvc2l0aW9uKTtcbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMuX2F0dHJpYnV0ZXMudGV4dHVyZSk7XG4gICAgfVxuXG4gICAgX3ByZXBhcmUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fcHJlcGFyZVNoYWRlcnMoc3RhdGUpO1xuICAgICAgICB0aGlzLl9wcmVwYXJlQXR0cmlidXRlcyhzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3ByZXBhcmVVbmlmb3JtcyhzdGF0ZSk7XG4gICAgfVxuXG4gICAgX3ByZXBhcmVTaGFkZXJzKHtnbH0pIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCB0aGlzLl9zaGFkZXIuZnJhZ21lbnQpO1xuICAgICAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcblxuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHRoaXMuX3NoYWRlci52ZXJ0ZXgpO1xuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcik7XG5cbiAgICAgICAgdGhpcy5fc2hhZGVyUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuX3NoYWRlclByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9zaGFkZXJQcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX3NoYWRlclByb2dyYW0pO1xuICAgIH1cblxuICAgIF9wcmVwYXJlQXR0cmlidXRlcyh7Z2x9KSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgJ3Bvc2l0aW9uJyksXG4gICAgICAgICAgICB0ZXh0dXJlOiBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9zaGFkZXJQcm9ncmFtLCAndGV4dHVyZScpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX3ByZXBhcmVVbmlmb3Jtcyh7Z2x9KSB7XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zID0ge1xuICAgICAgICAgICAgdVBDYW1lcmE6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLl9zaGFkZXJQcm9ncmFtLCAndVBDYW1lcmEnKSxcbiAgICAgICAgICAgIHVQb3NpdGlvbjogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3NoYWRlclByb2dyYW0sICd1UG9zaXRpb24nKSxcbiAgICAgICAgICAgIHVDb2xvckFscGhhOiBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgJ3VDb2xvckFscGhhJyksXG4gICAgICAgICAgICB1VGV4dHVyZTogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3NoYWRlclByb2dyYW0sICd1VGV4dHVyZScpLFxuICAgICAgICAgICAgdVNjYWxlOiBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgJ3VTY2FsZScpLFxuICAgICAgICAgICAgdUhhbGZTaXplOiBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgJ3VIYWxmU2l6ZScpLFxuICAgICAgICAgICAgdU9mZnNldDogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX3NoYWRlclByb2dyYW0sICd1T2Zmc2V0JyksXG4gICAgICAgICAgICB1U21vb3RoaW5nOiBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fc2hhZGVyUHJvZ3JhbSwgJ3VTbW9vdGhpbmcnKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlUmVuZGVyZXI7XG4iXX0=