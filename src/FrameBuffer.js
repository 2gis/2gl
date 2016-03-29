import Texture from './Texture';

/**
 * Используется для создания фрейм буфера, куда можно отрендерить кадр.
 */
class FrameBuffer {
    constructor() {}

    /**
     * Связывает фреймбуффер с контекстом WebGL
     * @param {WebGLRenderingContext} gl
     */
    bind(gl) {
        if (!this._frameBuffer) {
            this._prepare(gl);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        return this;
    }

    /**
     * Устанавливает пустой фреймбуфер у контекста WebGL
     * @param {WebGLRenderingContext} gl
     */
    unbind(gl) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return this;
    }

    /**
     * Подгтоваливает фреймбуфер: инициализует текстуры и рендер буфер
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _prepare(gl) {
        this._texture = new Texture();
        this._texture.generateMipmaps = false;
        this._texture.size = [1, 1];

        this._texture._prepare(gl);

        this._frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

        this._renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 1, 1);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture._texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);

        this._checkComplete(gl);

        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    /**
     * Проверяет инициализацию фрейм буфера
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _checkComplete(gl) {
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

        if (status === gl.FRAMEBUFFER_COMPLETE) {
            return;
        } else if (status === gl.FRAMEBUFFER_UNSUPPORTED) {
            console.log('Framebuffer is unsupported');
        } else if (status === gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT) {
            console.log('Framebuffer incomplete attachment');
        } else if (status === gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS) {
            console.log('Framebuffer incomplete dimensions');
        } else if (status === gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT) {
            console.log('Framebuffer incomplete missing attachment');
        } else {
            console.log('Unexpected framebuffer status: ' + status);
        }
    }
}

export default FrameBuffer;
