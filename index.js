'use strict';

var _Renderer = require('./renderer/Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Object3D = require('./Object3D');

var _Object3D2 = _interopRequireDefault(_Object3D);

var _PerspectiveCamera = require('./cameras/PerspectiveCamera');

var _PerspectiveCamera2 = _interopRequireDefault(_PerspectiveCamera);

var _OrthographicCamera = require('./cameras/OrthographicCamera');

var _OrthographicCamera2 = _interopRequireDefault(_OrthographicCamera);

var _Buffer = require('./Buffer');

var _Buffer2 = _interopRequireDefault(_Buffer);

var _Geometry = require('./Geometry');

var _Geometry2 = _interopRequireDefault(_Geometry);

var _BasicMeshProgram = require('./programs/BasicMeshProgram');

var _BasicMeshProgram2 = _interopRequireDefault(_BasicMeshProgram);

var _ComplexMeshProgram = require('./programs/ComplexMeshProgram');

var _ComplexMeshProgram2 = _interopRequireDefault(_ComplexMeshProgram);

var _SpriteProgram = require('./programs/SpriteProgram');

var _SpriteProgram2 = _interopRequireDefault(_SpriteProgram);

var _Mesh = require('./Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _Sprite = require('./Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

var _Texture = require('./Texture');

var _Texture2 = _interopRequireDefault(_Texture);

var _AmbientLight = require('./lights/AmbientLight');

var _AmbientLight2 = _interopRequireDefault(_AmbientLight);

var _DirectionalLight = require('./lights/DirectionalLight');

var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

var _Raycaster = require('./Raycaster');

var _Raycaster2 = _interopRequireDefault(_Raycaster);

var _Ray = require('./math/Ray');

var _Ray2 = _interopRequireDefault(_Ray);

var _Plane = require('./math/Plane');

var _Plane2 = _interopRequireDefault(_Plane);

var _Box = require('./math/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Frustum = require('./math/Frustum');

var _Frustum2 = _interopRequireDefault(_Frustum);

var _Math = require('./math/Math');

var math = _interopRequireWildcard(_Math);

var _Line = require('./math/Line3');

var _Line2 = _interopRequireDefault(_Line);

var _glMatrix = require('gl-matrix');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// with Float32Array we have errors with raycast
_glMatrix.glMatrix.ARRAY_TYPE = typeof Float64Array !== 'undefined' ? Float64Array : Array;

var dgl = {
    Renderer: _Renderer2.default,
    Object3D: _Object3D2.default,
    PerspectiveCamera: _PerspectiveCamera2.default,
    OrthographicCamera: _OrthographicCamera2.default,
    Buffer: _Buffer2.default,
    Geometry: _Geometry2.default,
    Mesh: _Mesh2.default,
    Sprite: _Sprite2.default,
    BasicMeshProgram: _BasicMeshProgram2.default,
    ComplexMeshProgram: _ComplexMeshProgram2.default,
    SpriteProgram: _SpriteProgram2.default,
    Scene: _Scene2.default,
    Texture: _Texture2.default,
    AmbientLight: _AmbientLight2.default,
    DirectionalLight: _DirectionalLight2.default,
    Raycaster: _Raycaster2.default,
    Ray: _Ray2.default,
    Plane: _Plane2.default,
    Frustum: _Frustum2.default,
    Box: _Box2.default,
    Line3: _Line2.default,
    Math: math,
    vec3: _glMatrix.vec3,
    mat3: _glMatrix.mat3,
    vec2: _glMatrix.vec2,
    mat4: _glMatrix.mat4,
    quat: _glMatrix.quat
};

module.exports = dgl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWTs7QUFDWjs7OztBQUNBOzs7Ozs7O0FBR0EsbUJBQVMsVUFBVCxHQUFzQixPQUFRLFlBQVAsS0FBd0IsV0FBeEIsR0FBdUMsWUFBeEMsR0FBdUQsS0FBdkQ7O0FBRXRCLElBQU0sTUFBTTtBQUNSLGdDQURRO0FBRVIsZ0NBRlE7QUFHUixrREFIUTtBQUlSLG9EQUpRO0FBS1IsNEJBTFE7QUFNUixnQ0FOUTtBQU9SLHdCQVBRO0FBUVIsNEJBUlE7QUFTUixnREFUUTtBQVVSLG9EQVZRO0FBV1IsMENBWFE7QUFZUiwwQkFaUTtBQWFSLDhCQWJRO0FBY1Isd0NBZFE7QUFlUixnREFmUTtBQWdCUixrQ0FoQlE7QUFpQlIsc0JBakJRO0FBa0JSLDBCQWxCUTtBQW1CUiw4QkFuQlE7QUFvQlIsc0JBcEJRO0FBcUJSLHlCQXJCUTtBQXNCUixVQUFNLElBQU47QUFDQSx3QkF2QlE7QUF3QlIsd0JBeEJRO0FBeUJSLHdCQXpCUTtBQTBCUix3QkExQlE7QUEyQlIsd0JBM0JRO0NBQU47O0FBOEJOLE9BQU8sT0FBUCxHQUFpQixHQUFqQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZW5kZXJlciBmcm9tICcuL3JlbmRlcmVyL1JlbmRlcmVyJztcbmltcG9ydCBPYmplY3QzRCBmcm9tICcuL09iamVjdDNEJztcbmltcG9ydCBQZXJzcGVjdGl2ZUNhbWVyYSBmcm9tICcuL2NhbWVyYXMvUGVyc3BlY3RpdmVDYW1lcmEnO1xuaW1wb3J0IE9ydGhvZ3JhcGhpY0NhbWVyYSBmcm9tICcuL2NhbWVyYXMvT3J0aG9ncmFwaGljQ2FtZXJhJztcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi9CdWZmZXInO1xuaW1wb3J0IEdlb21ldHJ5IGZyb20gJy4vR2VvbWV0cnknO1xuaW1wb3J0IEJhc2ljTWVzaFByb2dyYW0gZnJvbSAnLi9wcm9ncmFtcy9CYXNpY01lc2hQcm9ncmFtJztcbmltcG9ydCBDb21wbGV4TWVzaFByb2dyYW0gZnJvbSAnLi9wcm9ncmFtcy9Db21wbGV4TWVzaFByb2dyYW0nO1xuaW1wb3J0IFNwcml0ZVByb2dyYW0gZnJvbSAnLi9wcm9ncmFtcy9TcHJpdGVQcm9ncmFtJztcbmltcG9ydCBNZXNoIGZyb20gJy4vTWVzaCc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vU3ByaXRlJztcbmltcG9ydCBTY2VuZSBmcm9tICcuL1NjZW5lJztcbmltcG9ydCBUZXh0dXJlIGZyb20gJy4vVGV4dHVyZSc7XG5pbXBvcnQgQW1iaWVudExpZ2h0IGZyb20gJy4vbGlnaHRzL0FtYmllbnRMaWdodCc7XG5pbXBvcnQgRGlyZWN0aW9uYWxMaWdodCBmcm9tICcuL2xpZ2h0cy9EaXJlY3Rpb25hbExpZ2h0JztcbmltcG9ydCBSYXljYXN0ZXIgZnJvbSAnLi9SYXljYXN0ZXInO1xuaW1wb3J0IFJheSBmcm9tICcuL21hdGgvUmF5JztcbmltcG9ydCBQbGFuZSBmcm9tICcuL21hdGgvUGxhbmUnO1xuaW1wb3J0IEJveCBmcm9tICcuL21hdGgvQm94JztcbmltcG9ydCBGcnVzdHVtIGZyb20gJy4vbWF0aC9GcnVzdHVtJztcbmltcG9ydCAqIGFzIG1hdGggZnJvbSAnLi9tYXRoL01hdGgnO1xuaW1wb3J0IExpbmUzIGZyb20gJy4vbWF0aC9MaW5lMyc7XG5pbXBvcnQge3ZlYzMsIG1hdDMsIHZlYzIsIG1hdDQsIHF1YXQsIGdsTWF0cml4fSBmcm9tICdnbC1tYXRyaXgnO1xuXG4vLyB3aXRoIEZsb2F0MzJBcnJheSB3ZSBoYXZlIGVycm9ycyB3aXRoIHJheWNhc3RcbmdsTWF0cml4LkFSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQ2NEFycmF5IDogQXJyYXk7XG5cbmNvbnN0IGRnbCA9IHtcbiAgICBSZW5kZXJlcixcbiAgICBPYmplY3QzRCxcbiAgICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgICBPcnRob2dyYXBoaWNDYW1lcmEsXG4gICAgQnVmZmVyLFxuICAgIEdlb21ldHJ5LFxuICAgIE1lc2gsXG4gICAgU3ByaXRlLFxuICAgIEJhc2ljTWVzaFByb2dyYW0sXG4gICAgQ29tcGxleE1lc2hQcm9ncmFtLFxuICAgIFNwcml0ZVByb2dyYW0sXG4gICAgU2NlbmUsXG4gICAgVGV4dHVyZSxcbiAgICBBbWJpZW50TGlnaHQsXG4gICAgRGlyZWN0aW9uYWxMaWdodCxcbiAgICBSYXljYXN0ZXIsXG4gICAgUmF5LFxuICAgIFBsYW5lLFxuICAgIEZydXN0dW0sXG4gICAgQm94LFxuICAgIExpbmUzLFxuICAgIE1hdGg6IG1hdGgsXG4gICAgdmVjMyxcbiAgICBtYXQzLFxuICAgIHZlYzIsXG4gICAgbWF0NCxcbiAgICBxdWF0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRnbDtcbiJdfQ==