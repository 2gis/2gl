'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Math = exports.glMatrix = exports.quat = exports.mat4 = exports.vec2 = exports.mat3 = exports.vec3 = exports.Vao = exports.TransparentPlugin = exports.RenderTarget = exports.Raycaster = exports.Ray = exports.Texture = exports.SpritePlugin = exports.SpriteMaterial = exports.Sprite = exports.ShaderProgram = exports.Shader = exports.Scene = exports.RendererPlugin = exports.Renderer = exports.Plane = exports.PerspectiveCamera = exports.OrthographicCamera = exports.Object3DPlugin = exports.Object3D = exports.MultiSpritePlugin = exports.MultiSpriteMaterial = exports.MultiSprite = exports.Line3 = exports.libConstants = exports.Mesh = exports.Geometry = exports.Frustum = exports.DirectionalLight = exports.ComplexMeshMaterial = exports.CommonPlugin = exports.Box = exports.GeometryBuffer = exports.BufferChannel = exports.Buffer = exports.BasicMeshMaterial = exports.AmbientLight = undefined;

var _AmbientLight = require('./lights/AmbientLight');

Object.defineProperty(exports, 'AmbientLight', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AmbientLight).default;
  }
});

var _BasicMeshMaterial = require('./materials/BasicMeshMaterial');

Object.defineProperty(exports, 'BasicMeshMaterial', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BasicMeshMaterial).default;
  }
});

var _Buffer = require('./Buffer');

Object.defineProperty(exports, 'Buffer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Buffer).default;
  }
});

var _BufferChannel = require('./BufferChannel');

Object.defineProperty(exports, 'BufferChannel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BufferChannel).default;
  }
});

var _GeometryBuffer = require('./GeometryBuffer');

Object.defineProperty(exports, 'GeometryBuffer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GeometryBuffer).default;
  }
});

var _Box = require('./math/Box');

Object.defineProperty(exports, 'Box', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Box).default;
  }
});

var _CommonPlugin = require('./rendererPlugins/CommonPlugin');

Object.defineProperty(exports, 'CommonPlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CommonPlugin).default;
  }
});

var _ComplexMeshMaterial = require('./materials/ComplexMeshMaterial');

Object.defineProperty(exports, 'ComplexMeshMaterial', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ComplexMeshMaterial).default;
  }
});

var _DirectionalLight = require('./lights/DirectionalLight');

Object.defineProperty(exports, 'DirectionalLight', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DirectionalLight).default;
  }
});

var _Frustum = require('./math/Frustum');

Object.defineProperty(exports, 'Frustum', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Frustum).default;
  }
});

var _Geometry = require('./Geometry');

Object.defineProperty(exports, 'Geometry', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Geometry).default;
  }
});

var _Mesh = require('./Mesh');

Object.defineProperty(exports, 'Mesh', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mesh).default;
  }
});

var _libConstants = require('./libConstants');

Object.defineProperty(exports, 'libConstants', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_libConstants).default;
  }
});

var _Line = require('./math/Line3');

Object.defineProperty(exports, 'Line3', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Line).default;
  }
});

var _MultiSprite = require('./MultiSprite');

Object.defineProperty(exports, 'MultiSprite', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MultiSprite).default;
  }
});

var _MultiSpriteMaterial = require('./materials/MultiSpriteMaterial');

Object.defineProperty(exports, 'MultiSpriteMaterial', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MultiSpriteMaterial).default;
  }
});

var _MultiSpritePlugin = require('./rendererPlugins/MultiSpritePlugin');

Object.defineProperty(exports, 'MultiSpritePlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MultiSpritePlugin).default;
  }
});

var _Object3D = require('./Object3D');

Object.defineProperty(exports, 'Object3D', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Object3D).default;
  }
});

var _Object3DPlugin = require('./rendererPlugins/Object3DPlugin');

Object.defineProperty(exports, 'Object3DPlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Object3DPlugin).default;
  }
});

var _OrthographicCamera = require('./cameras/OrthographicCamera');

Object.defineProperty(exports, 'OrthographicCamera', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_OrthographicCamera).default;
  }
});

var _PerspectiveCamera = require('./cameras/PerspectiveCamera');

Object.defineProperty(exports, 'PerspectiveCamera', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PerspectiveCamera).default;
  }
});

var _Plane = require('./math/Plane');

Object.defineProperty(exports, 'Plane', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Plane).default;
  }
});

var _Renderer = require('./Renderer');

Object.defineProperty(exports, 'Renderer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Renderer).default;
  }
});

var _RendererPlugin = require('./RendererPlugin');

Object.defineProperty(exports, 'RendererPlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RendererPlugin).default;
  }
});

var _Scene = require('./Scene');

Object.defineProperty(exports, 'Scene', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Scene).default;
  }
});

var _Shader = require('./Shader');

Object.defineProperty(exports, 'Shader', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Shader).default;
  }
});

var _ShaderProgram = require('./ShaderProgram');

Object.defineProperty(exports, 'ShaderProgram', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ShaderProgram).default;
  }
});

var _Sprite = require('./Sprite');

Object.defineProperty(exports, 'Sprite', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sprite).default;
  }
});

var _SpriteMaterial = require('./materials/SpriteMaterial');

Object.defineProperty(exports, 'SpriteMaterial', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SpriteMaterial).default;
  }
});

var _SpritePlugin = require('./rendererPlugins/SpritePlugin');

Object.defineProperty(exports, 'SpritePlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SpritePlugin).default;
  }
});

var _Texture = require('./Texture');

Object.defineProperty(exports, 'Texture', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Texture).default;
  }
});

var _Ray = require('./math/Ray');

Object.defineProperty(exports, 'Ray', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Ray).default;
  }
});

var _Raycaster = require('./Raycaster');

Object.defineProperty(exports, 'Raycaster', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Raycaster).default;
  }
});

var _RenderTarget = require('./RenderTarget');

Object.defineProperty(exports, 'RenderTarget', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RenderTarget).default;
  }
});

var _TransparentPlugin = require('./rendererPlugins/TransparentPlugin');

Object.defineProperty(exports, 'TransparentPlugin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TransparentPlugin).default;
  }
});

var _Vao = require('./Vao');

Object.defineProperty(exports, 'Vao', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Vao).default;
  }
});

var _glMatrix = require('gl-matrix');

Object.defineProperty(exports, 'vec3', {
  enumerable: true,
  get: function get() {
    return _glMatrix.vec3;
  }
});
Object.defineProperty(exports, 'mat3', {
  enumerable: true,
  get: function get() {
    return _glMatrix.mat3;
  }
});
Object.defineProperty(exports, 'vec2', {
  enumerable: true,
  get: function get() {
    return _glMatrix.vec2;
  }
});
Object.defineProperty(exports, 'mat4', {
  enumerable: true,
  get: function get() {
    return _glMatrix.mat4;
  }
});
Object.defineProperty(exports, 'quat', {
  enumerable: true,
  get: function get() {
    return _glMatrix.quat;
  }
});
Object.defineProperty(exports, 'glMatrix', {
  enumerable: true,
  get: function get() {
    return _glMatrix.glMatrix;
  }
});

var _Math = require('./math/Math');

var Math = _interopRequireWildcard(_Math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Math = Math;


// with Float32Array we have errors with raycast
_glMatrix.glMatrix.ARRAY_TYPE = typeof Float64Array !== 'undefined' ? Float64Array : Array;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7aURBSVEsTzs7Ozs7Ozs7O3NEQUNBLE87Ozs7Ozs7OzsyQ0FDQSxPOzs7Ozs7Ozs7a0RBQ0EsTzs7Ozs7Ozs7O21EQUNBLE87Ozs7Ozs7Ozt3Q0FDQSxPOzs7Ozs7Ozs7aURBQ0EsTzs7Ozs7Ozs7O3dEQUNBLE87Ozs7Ozs7OztxREFDQSxPOzs7Ozs7Ozs7NENBQ0EsTzs7Ozs7Ozs7OzZDQUNBLE87Ozs7Ozs7Ozt5Q0FDQSxPOzs7Ozs7Ozs7aURBQ0EsTzs7Ozs7Ozs7O3lDQUNBLE87Ozs7Ozs7OztnREFDQSxPOzs7Ozs7Ozs7d0RBQ0EsTzs7Ozs7Ozs7O3NEQUNBLE87Ozs7Ozs7Ozs2Q0FDQSxPOzs7Ozs7Ozs7bURBQ0EsTzs7Ozs7Ozs7O3VEQUNBLE87Ozs7Ozs7OztzREFDQSxPOzs7Ozs7Ozs7MENBQ0EsTzs7Ozs7Ozs7OzZDQUNBLE87Ozs7Ozs7OzttREFDQSxPOzs7Ozs7Ozs7MENBQ0EsTzs7Ozs7Ozs7OzJDQUNBLE87Ozs7Ozs7OztrREFDQSxPOzs7Ozs7Ozs7MkNBQ0EsTzs7Ozs7Ozs7O21EQUNBLE87Ozs7Ozs7OztpREFDQSxPOzs7Ozs7Ozs7NENBQ0EsTzs7Ozs7Ozs7O3dDQUNBLE87Ozs7Ozs7Ozs4Q0FDQSxPOzs7Ozs7Ozs7aURBQ0EsTzs7Ozs7Ozs7O3NEQUNBLE87Ozs7Ozs7Ozt3Q0FDQSxPOzs7Ozs7Ozs7cUJBQ0EsSTs7Ozs7O3FCQUFNLEk7Ozs7OztxQkFBTSxJOzs7Ozs7cUJBQU0sSTs7Ozs7O3FCQUFNLEk7Ozs7OztxQkFBTSxROzs7O0FBRXRDOztJQUFZLEk7Ozs7OztRQUNKLEksR0FBQSxJOzs7QUFJUjtBQUNBLG1CQUFTLFVBQVQsR0FBdUIsT0FBTyxZQUFQLEtBQXdCLFdBQXpCLEdBQXdDLFlBQXhDLEdBQXVELEtBQTdFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDQnNC+0LTRg9C70Ywg0L/QvtC00LrQu9GO0YfQsNC10YIg0LLRgdC1INC60L7QvNC/0L7QvdC10L3RgtGLIDJnbCDQtNC70Y8g0YLQvtCz0L4sINGH0YLQvtCx0Ysg0LjRhSDQvNC+0LbQvdC+INCx0YvQu9C+INGB0L7QsdGA0LDRgtGMINCyINC+0LTQuNC9INCx0LDQvdC00Lsg0LIgZGlzdFxuICog0LjQu9C4INC30LDQuNC80L/QvtGA0YLQuNGC0Ywg0YEg0L/QvtC80L7RidGM0Y4gRVM2XG4gKi9cbmV4cG9ydCB7ZGVmYXVsdCBhcyBBbWJpZW50TGlnaHR9IGZyb20gJy4vbGlnaHRzL0FtYmllbnRMaWdodCc7XG5leHBvcnQge2RlZmF1bHQgYXMgQmFzaWNNZXNoTWF0ZXJpYWx9IGZyb20gJy4vbWF0ZXJpYWxzL0Jhc2ljTWVzaE1hdGVyaWFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCdWZmZXJ9IGZyb20gJy4vQnVmZmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCdWZmZXJDaGFubmVsfSBmcm9tICcuL0J1ZmZlckNoYW5uZWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIEdlb21ldHJ5QnVmZmVyfSBmcm9tICcuL0dlb21ldHJ5QnVmZmVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBCb3h9IGZyb20gJy4vbWF0aC9Cb3gnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIENvbW1vblBsdWdpbn0gZnJvbSAnLi9yZW5kZXJlclBsdWdpbnMvQ29tbW9uUGx1Z2luJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBDb21wbGV4TWVzaE1hdGVyaWFsfSBmcm9tICcuL21hdGVyaWFscy9Db21wbGV4TWVzaE1hdGVyaWFsJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBEaXJlY3Rpb25hbExpZ2h0fSBmcm9tICcuL2xpZ2h0cy9EaXJlY3Rpb25hbExpZ2h0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBGcnVzdHVtfSBmcm9tICcuL21hdGgvRnJ1c3R1bSc7XG5leHBvcnQge2RlZmF1bHQgYXMgR2VvbWV0cnl9IGZyb20gJy4vR2VvbWV0cnknO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE1lc2h9IGZyb20gJy4vTWVzaCc7XG5leHBvcnQge2RlZmF1bHQgYXMgbGliQ29uc3RhbnRzfSBmcm9tICcuL2xpYkNvbnN0YW50cyc7XG5leHBvcnQge2RlZmF1bHQgYXMgTGluZTN9IGZyb20gJy4vbWF0aC9MaW5lMyc7XG5leHBvcnQge2RlZmF1bHQgYXMgTXVsdGlTcHJpdGV9IGZyb20gJy4vTXVsdGlTcHJpdGUnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE11bHRpU3ByaXRlTWF0ZXJpYWx9IGZyb20gJy4vbWF0ZXJpYWxzL011bHRpU3ByaXRlTWF0ZXJpYWwnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE11bHRpU3ByaXRlUGx1Z2lufSBmcm9tICcuL3JlbmRlcmVyUGx1Z2lucy9NdWx0aVNwcml0ZVBsdWdpbic7XG5leHBvcnQge2RlZmF1bHQgYXMgT2JqZWN0M0R9IGZyb20gJy4vT2JqZWN0M0QnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIE9iamVjdDNEUGx1Z2lufSBmcm9tICcuL3JlbmRlcmVyUGx1Z2lucy9PYmplY3QzRFBsdWdpbic7XG5leHBvcnQge2RlZmF1bHQgYXMgT3J0aG9ncmFwaGljQ2FtZXJhfSBmcm9tICcuL2NhbWVyYXMvT3J0aG9ncmFwaGljQ2FtZXJhJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQZXJzcGVjdGl2ZUNhbWVyYX0gZnJvbSAnLi9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBQbGFuZX0gZnJvbSAnLi9tYXRoL1BsYW5lJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBSZW5kZXJlcn0gZnJvbSAnLi9SZW5kZXJlcic7XG5leHBvcnQge2RlZmF1bHQgYXMgUmVuZGVyZXJQbHVnaW59IGZyb20gJy4vUmVuZGVyZXJQbHVnaW4nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNjZW5lfSBmcm9tICcuL1NjZW5lJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTaGFkZXJ9IGZyb20gJy4vU2hhZGVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBTaGFkZXJQcm9ncmFtfSBmcm9tICcuL1NoYWRlclByb2dyYW0nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNwcml0ZX0gZnJvbSAnLi9TcHJpdGUnO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFNwcml0ZU1hdGVyaWFsfSBmcm9tICcuL21hdGVyaWFscy9TcHJpdGVNYXRlcmlhbCc7XG5leHBvcnQge2RlZmF1bHQgYXMgU3ByaXRlUGx1Z2lufSBmcm9tICcuL3JlbmRlcmVyUGx1Z2lucy9TcHJpdGVQbHVnaW4nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFRleHR1cmV9IGZyb20gJy4vVGV4dHVyZSc7XG5leHBvcnQge2RlZmF1bHQgYXMgUmF5fSBmcm9tICcuL21hdGgvUmF5JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBSYXljYXN0ZXJ9IGZyb20gJy4vUmF5Y2FzdGVyJztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBSZW5kZXJUYXJnZXR9IGZyb20gJy4vUmVuZGVyVGFyZ2V0JztcbmV4cG9ydCB7ZGVmYXVsdCBhcyBUcmFuc3BhcmVudFBsdWdpbn0gZnJvbSAnLi9yZW5kZXJlclBsdWdpbnMvVHJhbnNwYXJlbnRQbHVnaW4nO1xuZXhwb3J0IHtkZWZhdWx0IGFzIFZhb30gZnJvbSAnLi9WYW8nO1xuZXhwb3J0IHt2ZWMzLCBtYXQzLCB2ZWMyLCBtYXQ0LCBxdWF0LCBnbE1hdHJpeH0gZnJvbSAnZ2wtbWF0cml4JztcblxuaW1wb3J0ICogYXMgTWF0aCBmcm9tICcuL21hdGgvTWF0aCc7XG5leHBvcnQge01hdGh9O1xuXG5pbXBvcnQge2dsTWF0cml4fSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vLyB3aXRoIEZsb2F0MzJBcnJheSB3ZSBoYXZlIGVycm9ycyB3aXRoIHJheWNhc3RcbmdsTWF0cml4LkFSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQ2NEFycmF5IDogQXJyYXk7XG4iXX0=