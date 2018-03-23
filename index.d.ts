declare module '2gl' {
    export class Shader {
        constructor(
            type: 'fragment' | 'vertex',
            code: string | string[],
            definitions?: {[key: string]: {type: string, value: number | string}},
        );
        public get(gl: WebGLRenderingContext): WebGLShader;
        public remove(gl: WebGLRenderingContext): void;
    }

    interface AttributeDefinition {
        name: string;
        index?: boolean;
        location?: number;
    }

    interface UniformDefinition {
        name: string;
        type: 'mat2' | 'mat3' | 'mat4' |
            '1f' | '2f' | '3f' | '4f' |
            '1i' | '2i' | '3i' | '4i' |
            '1fv' | '2fv' | '3fv' | '4fv' |
            '1iv' | '2iv' | '3iv' | '4iv';
    }

    interface ShaderProgramOptions {
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

    interface BufferBindOptions {
        itemSize: number;
        dataType: number;
        normalized: boolean;
        stride: number;
        offset: number;
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
            initData: TypedArray | ArrayBuffer | number,
            options?: Partial<BufferBindOptions>,
        );

        public bind(gl: WebGLRenderingContext, location?: number, options?: BufferBindOptions): this;
        public remove(): this;
        public subData(gl: WebGLRenderingContext, index: number, data: TypedArray | ArrayBuffer): this;
        public prepare(gl: WebGLRenderingContext): this;
    }

    export class BufferChannel {
        constructor(buffer: Buffer, options: Partial<BufferBindOptions>);
        public bind(gl: WebGLRenderingContext, location?: number): this;
    }

    interface TextureOptions {
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

    interface RenderTargetOptions extends TextureOptions {
        size: Vec2;
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

    interface RendererState {
        gl: WebGLRenderingContext;
        extensions: {[name: string]: any};
    }

    export class Vao {
        constructor(program: ShaderProgram, attributes: {[name: string]: Buffer | BufferChannel});
        public bind(state: RendererState): this;
        public unbind(): this;
        public remove(): this;
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

declare module '2gl/Vao' {
    import { Vao } from '2gl';
    export default Vao;
}
