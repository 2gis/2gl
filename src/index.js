/**
 * Модуль подключает все компоненты 2gl для того, чтобы их можно было собрать в один бандл в dist
 * или заимпортить с помощью ES6
 */
export {default as AmbientLight} from './lights/AmbientLight';
export {default as BasicMeshMaterial} from './materials/BasicMeshMaterial';
export {default as Buffer} from './Buffer';
export {default as BufferChannel} from './BufferChannel';
export {default as GeometryBuffer} from './GeometryBuffer';
export {default as Box} from './math/Box';
export {default as CommonPlugin} from './rendererPlugins/CommonPlugin';
export {default as ComplexMeshMaterial} from './materials/ComplexMeshMaterial';
export {default as DirectionalLight} from './lights/DirectionalLight';
export {default as Frustum} from './math/Frustum';
export {default as Geometry} from './Geometry';
export {default as Mesh} from './Mesh';
export {default as libConstants} from './libConstants';
export {default as Line3} from './math/Line3';
export {default as MultiSprite} from './MultiSprite';
export {default as MultiSpriteMaterial} from './materials/MultiSpriteMaterial';
export {default as MultiSpritePlugin} from './rendererPlugins/MultiSpritePlugin';
export {default as Object3D} from './Object3D';
export {default as Object3DPlugin} from './rendererPlugins/Object3DPlugin';
export {default as OrthographicCamera} from './cameras/OrthographicCamera';
export {default as PerspectiveCamera} from './cameras/PerspectiveCamera';
export {default as Plane} from './math/Plane';
export {default as Renderer} from './Renderer';
export {default as RendererPlugin} from './RendererPlugin';
export {default as Scene} from './Scene';
export {default as Shader} from './Shader';
export {default as ShaderProgram} from './ShaderProgram';
export {default as Sprite} from './Sprite';
export {default as SpriteMaterial} from './materials/SpriteMaterial';
export {default as SpritePlugin} from './rendererPlugins/SpritePlugin';
export {default as Texture} from './Texture';
export {default as Ray} from './math/Ray';
export {default as Raycaster} from './Raycaster';
export {default as RenderTarget} from './RenderTarget';
export {default as TransparentPlugin} from './rendererPlugins/TransparentPlugin';
export {vec3, mat3, vec2, mat4, quat, glMatrix} from 'gl-matrix';

import * as Math from './math/Math';
export {Math};

import {glMatrix} from 'gl-matrix';

// with Float32Array we have errors with raycast
glMatrix.ARRAY_TYPE = (typeof Float64Array !== 'undefined') ? Float64Array : Array;
