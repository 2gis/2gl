/// <reference types="@2gis/gl-matrix" />

declare module '2gl' {
    export class Shader {
        constructor(
            type: 'fragment' | 'vertex',
            code: string | string[],
            definitions?: Array<{type: string, value: number | string}>,
        );
        public get(gl: WebGLRenderingContext): WebGLShader;
        public remove(gl: WebGLRenderingContext): void;
    }

    export interface AttributeDefinition {
        name: string;
        index?: boolean;
        location?: number;
    }

    export interface UniformDefinition {
        name: string;
        type: 'mat2' | 'mat3' | 'mat4' |
            '1f' | '2f' | '3f' | '4f' |
            '1i' | '2i' | '3i' | '4i' |
            '1fv' | '2fv' | '3fv' | '4fv' |
            '1iv' | '2iv' | '3iv' | '4iv';
    }

    export interface ShaderProgramOptions {
        vertex: Shader;
        fragment: Shader;
        uniforms?: UniformDefinition[];
        attributes?: AttributeDefinition[];
    }

    export class ShaderProgram {
        constructor(options: ShaderProgramOptions);
        public enable(gl: WebGLRenderingContext): this;
        public bind(
            gl: WebGLRenderingContext,
            uniforms?: {[name: string]: number | number[] | TypedArray},
            attributes?: {[name: string]: Buffer | BufferChannel},
        ): this;
        public disable(gl: WebGLRenderingContext): this;
        public link(gl: WebGLRenderingContext): this;
        public locate(gl: WebGLRenderingContext): this;
    }

    export interface BufferBindOptions {
        itemSize: number;
        dataType: number;
        normalized: boolean;
        stride: number;
        offset: number;
        instanceDivisor: number;
    }

    export class Buffer {
        static ArrayBuffer: number;
        static ElementArrayBuffer: number;
        static StaticDraw: number;
        static DynamicDraw: number;
        static Float: number;
        static UnsignedByte: number;
        static UnsignedShort: number;
        static UnsignedInt: number;
        static Byte: number;
        static Short: number;
        static Int: number;
        static defaultOptions: BufferBindOptions;

        public byteLength: number;
        public type: number;
        public drawType: number;
        public options: BufferBindOptions;

        constructor(
            initData: DataView | TypedArray | ArrayBuffer | number,
            options?: Partial<BufferBindOptions>,
            isElementArray?: boolean,
            uintExt?: OES_element_index_uint,
        );

        public bind(gl: WebGLRenderingContext, location?: number, options?: BufferBindOptions, instancesExt: ?ANGLE_instanced_arrays): this;
        public remove(): this;
        public subData(gl: WebGLRenderingContext, index: number, data: TypedArray | ArrayBuffer): this;
        public prepare(gl: WebGLRenderingContext): this;
        public getGLType(gl: WebGLRenderingContext): number | null;
    }

    export class BufferChannel {
        constructor(buffer: Buffer, options: Partial<BufferBindOptions>);
        public bind(gl: WebGLRenderingContext, location?: number): this;
    }

    export interface TextureOptions {
        magFilter: number;
        minFilter: number;
        wrapS: number;
        wrapT: number;
        format: number;
        generateMipmaps: boolean;
        flipY: boolean;
        premultiplyAlpha: boolean;
        size?: Vec2;
        unit: number | undefined;
        type?: number;
    }

    export class Texture {
        static ClampToEdgeWrapping: number;
        static Repeat: number;
        static MirroredRepeat: number;
        static NearestFilter: number;
        static NearestMipMapNearestFilter: number;
        static NearestMipMapLinearFilter: number;
        static LinearFilter: number;
        static LinearMipMapNearestFilter: number;
        static LinearMipMapLinearFilter: number;
        static RgbaFormat: number;
        static AlphaFormat: number;
        static RgbFormat: number;
        static UnsignedByte: number;
        static Float: number
        static defaultOptions: TextureOptions;

        public readonly options: TextureOptions;
        constructor(
            src?: HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | TypedArray,
            options?: Partial<TextureOptions>,
        );
        public enable(gl: WebGLRenderingContext, index?: number): this;
        public prepare(gl: WebGLRenderingContext): this;
        public subImage(
            gl: WebGLRenderingContext,
            src: HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | TypedArray,
            x: number,
            y: number,
        ): this;
        public remove(): this;
        public getTexture(): WebGLTexture;
    }

    export interface RenderTargetOptions extends TextureOptions {
        size: Vec2;
    }

    export class Object3D {
        public children: Object3D[];
        public parent: Object3D | null;
        public visible: boolean;
        public scale: Vec3;
        public position: Vec3;
        public quaternion: Quat;
        public localMatrix: Mat4;
        public worldMatrix: Mat4;
        public worldMatrixNeedsUpdate: boolean;
        public type: number;
        constructor();
        public add(object: Object3D): this;
        public remove(object: Object3D): this;
        public render(): this;
        public updateLocalMatrix(): this;
        public updateWorldMatrix(): this;
        public getWorldPosition(): Vec3;
        public traverse(callback: (obj: Object3D) => void): this;
        public traverseVisible(callback: (obj: Object3D) => void): this;
        public typifyForRender(rp: {[type: number]: RendererPlugin}): this;
    }

    export class Scene extends Object3D {}

    export class Camera extends Object3D {}

    export class RendererPlugin {
        public _objects: Object3D[];
        public type: number;
        constructor();
        public render(): this;
        public addObject(object: Object3D): this;
        public hasObjects(): boolean;
    }

    export class RenderTarget {
        public readonly options: RenderTargetOptions;
        constructor(options?: Partial<RenderTargetOptions>);
        public bind(gl: WebGLRenderingContext): this;
        public unbind(gl: WebGLRenderingContext): this;
        public remove(gl: WebGLRenderingContext): this;
        public setSize(size: Vec2): this;
        public getTexture(): Texture;
    }

    export interface RendererState {
        gl: WebGLRenderingContext;
        extensions: {[name: string]: any};
    }

    export interface RendererOptions {
        canvas: string | HTMLCanvasElement;
        gl: WebGLRenderingContext;
        pixelRatio: number;
        antialias: boolean;
        stencil: boolean;
        autoClear: boolean;
        clearColor: Vec4;
        sortObjects: boolean;
        failIfMajorPerformanceCaveat: boolean;
        preserveDrawingBuffer: boolean;
        version: number;
    }

    export class Renderer {
        public _gl: WebGLRenderingContext;
        public autoClear: boolean;
        public clearColor: Vec4;
        public sortObjects: boolean;
        public _pluginsByType: {[type: number]: RendererPlugin};
        public _plugins: RendererPlugin[];
        public webGlExtensions: {[name: string]: any};
        constructor(options: Partial<RendererOptions>);
        public addPlugin(plugin: RendererPlugin, order?: number): this;
        public removePlugin(plugin: RendererPlugin): this;
        public setPixelRatio(value: number): this;
        public getPixelRatio(): number;
        public setSize(width: number, height: number): this;
        public setViewport(width: number, height: number): this;
        public getSize(): Vec2;
        public setRenderTarget(rt: RenderTarget): this;
        public readPixels(x: number, y: number, width: number, height: number, arrat: TypedArray): this;
        public clear(): this;
        public render(scene: Scene, camera: Camera, userData: any): this;
        public addExtension(name: string): this;
    }

    export class Vao {
        constructor(program: ShaderProgram, attributes: {[name: string]: Buffer | BufferChannel}, indicesBuffer?: Buffer);
        public bind(state: RendererState): this;
        public setAttribute(name: string, buffer: Buffer | BufferChannel): this;
        public unbind(): this;
        public remove(): this;
        public getElementsGLType(gl: WebGLRenderingContext): number | null;
    }

    export class Box {
        public min: Vec3;
        public max: Vec3;
        constructor(min?: Vec3, max?: Vec3);
        public containsPoint(point: Vec3): boolean;
        public expandByPoint(point: Vec3): this;
    }

    export class Plane {
        public normal: Vec3;
        public constant: number;
        constructor(normal?: Vec3, constane?: number);
        public distanceToPoint(point: Vec3): number;
        public setComponents(x: number, y: number, z: number, w: number): this;
        public normalize(): this;
    }

    export class Frustum {
        public planes: Plane[];
        constructor(planes?: Plane[]);
        public setFromMatrix(m: Mat4): this;
        public intersectsBox(box: Box): boolean;
    }
}

declare module '2gl/Shader' {
    import { Shader } from '2gl';
    export default Shader;
}

declare module '2gl/ShaderProgram' {
    import { ShaderProgram } from '2gl';
    export default ShaderProgram;
}

declare module '2gl/Buffer' {
    import { Buffer } from '2gl';
    export default Buffer;
}

declare module '2gl/BufferChannel' {
    import { BufferChannel } from '2gl';
    export default BufferChannel;
}

declare module '2gl/Texture' {
    import { Texture } from '2gl';
    export default Texture;
}

declare module '2gl/RenderTarget' {
    import { RenderTarget } from '2gl';
    export default RenderTarget;
}

declare module '2gl/Renderer' {
    import { Renderer } from '2gl';
    export default Renderer;
}

declare module '2gl/RendererPlugin' {
    import { RendererPlugin } from '2gl';
    export default RendererPlugin;
}

declare module '2gl/Object3D' {
    import { Object3D } from '2gl';
    export default Object3D;
}

declare module '2gl/Vao' {
    import { Vao } from '2gl';
    export default Vao;
}

declare module '2gl/math/Box' {
    import { Box } from '2gl';
    export default Box;
}

declare module '2gl/math/Plane' {
    import { Plane } from '2gl';
    export default Plane;
}

declare module '2gl/math/Frustum' {
    import { Frustum } from '2gl';
    export default Frustum;
}
