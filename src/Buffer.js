/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера
 *
 * @param {TypedArray | ArrayBuffer | number} initData Данные для инита буфера:
 * содержимое буфера или его размер
 * @param {?BufferBindOptions} options Параметры передачи буфера в видеокарту,
 * могут быть переопределены из {@link BufferChannel}
 */
class Buffer {
    constructor(initData, options) {
        this._initData = initData;

        /**
         * Размер данных в буфере в байтах
         * @type {Number}
         */
        this.byteLength = initData.byteLength !== undefined ? initData.byteLength : initData;

        /**
         * Тип буфера. Буфер может использоваться для передачи массива данных,
         * так и для передачи индексов элементов из данных.
         * @type {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer}
         */
        this.type = Buffer.ArrayBuffer;

        /**
         * Параметры для связывания буфера
         * @type {BufferBindOptions}
         * @ignore
         */
        this.options = Object.assign({}, Buffer.defaultOptions, options);

        /**
         * Указывает, как часто данные буфера будут изменяться.
         * @type {Buffer.StaticDraw | Buffer.DynamicDraw}
         */
        this.drawType = this.options.instanceDivisor ? Buffer.dynamicDraw : Buffer.StaticDraw;

        /**
         * Исходный WebGL буфер
         * @type {?WebGLBuffer}
         * @ignore
         */
        this._glBuffer = null;

        /**
         * Контекст WebGL, в котором был инициализирован буфер.
         * Используется только для удаления буфера, подумать хорошо, прежде чем использовать для чего-то ещё.
         * @type {?WebGLRenderingContext}
         * @ignore
         */
        this._glContext = null;
    }

    /**
     * Связывает данные с контекстом WebGL.
     *
     * В случае Buffer.ArrayBuffer связывает с атрибутами шейдера.
     * А в случае Buffer.ElementArrayBuffer связывает массив индексов.
     *
     * Если используется первый раз, добавляет данные в контекст WebGL.
     *
     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl
     * @param {?Number} location Положение аттрибута для связывания данных с переменными в шейдере
     * @param {?BufferBindOptions} options Параметры передаваемые в функцию vertexAttribPointer, если их нет,
     * то используются параметры конкретного буфера. Параметры должны быть переданы все.
     * @param {?ANGLE_instanced_arrays} instancesExt Экстеншн для работы с instanced буферами,
     */
    bind(gl, location, options, instancesExt) {
        if (!this._glBuffer) {
            this.prepare(gl);
        }

        if (this.type === Buffer.ArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);

            location = location || 0;
            options = options || this.options;

            gl.vertexAttribPointer(location, options.itemSize, this._toGlParam(gl, options.dataType),
                options.normalized, options.stride, options.offset);

            if (options.instanceDivisor) {
                if (gl instanceof WebGLRenderingContext) {
                    if (instancesExt) {
                        instancesExt.vertexAttribDivisorANGLE(location, options.instanceDivisor);
                    } else {
                        console.error('Can\'t set up instanced attribute divisor. ' +
                                      'Missing ANGLE_instanced_arrays extension');
                    }
                } else {
                    gl.vertexAttribDivisor(location, options.instanceDivisor);
                }
            }
        } else if (this.type === Buffer.ElementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBuffer);
        }

        return this;
    }

    /**
     * Удаляет данные из контекста WebGL.
     */
    remove() {
        this._unprepare();

        return this;
    }

    /**
     * Заменяет часть буфера новыми данными и отправляет их в видеокарту
     * @param {WebGLRenderingContext} gl
     * @param {Number} index Индекс, с которого начать замену
     * @param {TypedArray} data Новые данные
     */
    subData(gl, index, data) {
        gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
        gl.bufferSubData(this._toGlParam(gl, this.type), index, data);

        return this;
    }

    /**
     * Кладёт данные в видеокарту
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    prepare(gl) {
        this._glContext = gl;
        this._glBuffer = gl.createBuffer();
        gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
        gl.bufferData(this._toGlParam(gl, this.type), this._initData, this._toGlParam(gl, this.drawType));
        this._initData = null;
        return this;
    }

    /**
     * Удаляет данные из видеокарты
     * @ignore
     */
    _unprepare() {
        if (this._glBuffer) {
            this._glContext.deleteBuffer(this._glBuffer);
            this._glBuffer = null;
            this._glContext = null;
        }
    }

    /**
     * Преобразовывает параметры буфера в параметры WebGL
     * @param {WebGLRenderingContext} gl
     * @param {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer} param
     * @ignore
     */
    _toGlParam(gl, param) {
        if (param === Buffer.ArrayBuffer) { return gl.ARRAY_BUFFER; }
        if (param === Buffer.ElementArrayBuffer) { return gl.ELEMENT_ARRAY_BUFFER; }
        if (param === Buffer.StaticDraw) { return gl.STATIC_DRAW; }
        if (param === Buffer.DynamicDraw) { return gl.DYNAMIC_DRAW; }
        if (param === Buffer.Byte) { return gl.BYTE; }
        if (param === Buffer.Short) { return gl.SHORT; }
        if (param === Buffer.Int) { return gl.INT; }
        if (param === Buffer.Float) { return gl.FLOAT; }
        if (param === Buffer.UnsignedByte) { return gl.UNSIGNED_BYTE; }
        if (param === Buffer.UnsignedShort) { return gl.UNSIGNED_SHORT; }
        if (param === Buffer.UnsignedInt) { return gl.UNSIGNED_INT; }
        return null;
    }
}

Buffer.ArrayBuffer = 1;
Buffer.ElementArrayBuffer = 2;

Buffer.StaticDraw = 10;
Buffer.DynamicDraw = 11;

Buffer.Float = 20;
Buffer.UnsignedByte = 21;
Buffer.UnsignedShort = 22;
Buffer.UnsignedInt = 23;
Buffer.Byte = 24;
Buffer.Short = 25;
Buffer.Int = 26;

Buffer.defaultOptions = {
    itemSize: 3,
    dataType: Buffer.Float,
    stride: 0,
    offset: 0,
    normalized: false,
    instanceDivisor: 0
};

export default Buffer;

/**
 * Параметры передаваемые в функцию vertexAttribPointer.
 *
 * @typedef {Object} BufferBindOptions
 * @property {Number} itemSize Размерность элементов в буфере
 * @property {Buffer.Float | Buffer.UnsignedByte} dataType Тип данных в буфере
 * @property {Boolean} normalized Используется для целочисленных типов. Если выставлен в true, то
 * значения имеющие тип BYTE от -128 до 128 будут переведены от -1.0 до 1.0.
 * @property {Number} stride
 * @property {Number} offset
 */
