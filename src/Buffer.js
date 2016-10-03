/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера
 *
 * @param {TypedArray | ArrayBuffer} data Данные для передачи в видеокарту
 * @param {?BufferBindOptions} options Параметры передачи буфера в видеокарту,
 * могут быть переопределены из {@link BufferChannel}
 */
class Buffer {
    constructor(data, options) {
        this._data = data;

        /**
         * Тип буфера. Буфер может использоваться для передачи массива данных,
         * так и для передачи индексов элементов из данных.
         * @type {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer}
         */
        this.type = Buffer.ArrayBuffer;

        /**
         * Указывает, как часто данные буфера будут изменяться.
         * @type {Buffer.StaticDraw | Buffer.DynamicDraw}
         */
        this.drawType = Buffer.StaticDraw;

        /**
         * Параметры для связывания буфера
         * @type {BufferBindOptions}
         * @ignore
         */
        this.options = Object.assign({}, Buffer.defaultOptions, options);

        /**
         * Исходный WebGL буфер
         * @type {?WebGLBuffer}
         * @ignore
         */
        this._glBuffer = null;
    }

    /**
     * Связывает данные с контекстом WebGL.
     *
     * В случае Buffer.ArrayBuffer связывает с атрибутами шейдера.
     * А в случае Buffer.ElementArrayBuffer связывает массив индексов.
     *
     * Если используется первый раз, добавляет данные в контекст WebGL.
     *
     * @param {WebGLRenderingContext} gl
     * @param {?Number} location Положение аттрибута для связывания данных с переменными в шейдере
     * @param {?BufferBindOptions} options Параметры передаваемые в функцию vertexAttribPointer, если их нет,
     * то используются параметры конкретного буфера. Параметры должны быть переданы все.
     */
    bind(gl, location, options) {
        if (!this._glBuffer) {
            this._prepare(gl);
        }

        if (this.type === Buffer.ArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);

            options = options || this.options;

            gl.vertexAttribPointer(location, options.itemSize, this._toGlParam(gl, options.dataType),
                options.normalized, options.stride, options.offset);

        } else if (this.type === Buffer.ElementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBuffer);
        }

        return this;
    }

    /**
     * Удаляет данные из контекста WebGL.
     * @param {WebGLRenderingContext} gl
     */
    remove(gl) {
        this._unprepare(gl);

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
        gl.bufferSubData(this._toGlParam(gl, this.type), index * this.itemSize, data);

        return this;
    }

    /**
     * Кладёт данные в видеокарту
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _prepare(gl) {
        this._glBuffer = gl.createBuffer();
        gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
        gl.bufferData(this._toGlParam(gl, this.type), this._data, this._toGlParam(gl, this.drawType));
        this._data = null;
    }

    /**
     * Удаляет данные из видеокарты
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _unprepare(gl) {
        if (this._glBuffer) {
            gl.deleteBuffer(this._glBuffer);
            this._glBuffer = null;
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
    normalized: false
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
