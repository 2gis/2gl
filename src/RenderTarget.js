import Texture from './Texture';

/**
 * Используется для создания фреймбуфера, куда можно отрендерить кадр.
 *
 * @param {RenderTargetOptions & TextureOptions} options
 */
class RenderTarget {
    constructor(options = {}) {
        /**
         * Параметры для связывания фреймбуфера
         * @type {RenderTargetOptions & TextureOptions}
         * @readonly
         */
        this.options = Object.assign({}, RenderTarget.defaultOptions, options);

        /**
         * Текстура создается в конструкторе, чтобы можно было сразу получить на нее ссылку.
         * @type {?Texture}
         * @ignore
         */
        this._texture = new Texture(null, this.options);

        /**
         * Контекст WebGL, в котором был инициализирован фреймбуфер.
         * Используется только для удаления, подумать хорошо, прежде чем использовать для чего-то ещё.
         * @type {?WebGLRenderingContext}
         * @ignore
         */
        this._glContext = null;
    }

    /**
     * Связывает компоненты с контекстом WebGL
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
     * Удаляет фреймбуфер из видеокарты
     */
    remove() {
        this._unprepare();
        return this;
    }

    /**
     * Устанавливает размер фреймбуферу
     * @param {vec2} size
     */
    setSize(size) {
        this.options.size = size;
        this._unprepare();
        return this;
    }

    /**
     * Возвращает текущую текстуру фреймбуфера
     * @return {Texture | null}
     */
    getTexture() {
        return this._texture;
    }

    /**
     * Инициализирует фреймбуфер, текстуры и рендербуфер
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _prepare(gl) {
        this._glContext = gl;
        
        // Проверяем наличие текстуры, т.к. она может быть удалена через метод _unprepare.
        if (!this._texture) {
            this._texture = new Texture(null, this.options);
        }
        this._texture.prepare(gl);

        this._frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

        this._renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.options.size[0], this.options.size[1]);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture.getTexture(), 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);

        this._checkComplete(gl);

        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    /**
     * Удаляет данные из видеокарты
     * @ignore
     */
    _unprepare() {
        if (this._texture) {
            this._texture.remove(this._glContext);
            this._texture = null;
        }

        if (this._frameBuffer) {
            this._glContext.deleteFramebuffer(this._frameBuffer);
            this._glContext.deleteRenderbuffer(this._renderBuffer);
            this._frameBuffer = null;
            this._renderBuffer = null;
        }
    }

    /**
     * Проверяет инициализацию фреймбуфера
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

RenderTarget.defaultOptions = Object.assign({}, Texture.defaultOptions, {
    size: [0, 0],
    generateMipmaps: false,
});

export default RenderTarget;

/**
 * Параметры связывания текстуры
 *
 * @typedef {Object} RenderTargetOptions
 * @property {Number[]} size
 */
