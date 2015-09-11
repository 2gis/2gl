/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера
 *
 * @param {TypedArray} array Типизированный массив данных, например, координат вершин
 * @param {Number} itemSize Размерность данных, например, 3 - для коодинат вершин
 */
class Buffer {
    constructor(array, itemSize) {
        this._array = array;

        /**
         * Размерность данных
         * @type {Number}
         */
        this.itemSize = itemSize;

        /**
         * Количество элементов в массиве данных
         * @type {Number}
         */
        this.length = array.length / itemSize;

        /**
         * Тип буфера. Буфер может использоваться для передачи массива данных,
         * так и для передачи индексов элементов из данных.
         * @type {Buffer.ArrayBuffer | Buffer.ElementArrayBuffer}
         */
        this.type = Buffer.ArrayBuffer;

        /**
         * Инициализация буфера происходит в момент первого рендеринга.
         * Текущий WebGl контекст сохраняется в этой переменной.
         * Если конекст меняется, буфер необходимо инициализровать заного.
         * @type {?WebGLRenderingContext}
         * @ignore
         */
        this._preparedGlContext = null;
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
     * @param {?Number} attribute Аттрибут для связывания данных с переменными в шейдере
     */
    bind(gl, attribute) {
        if (this._preparedGlContext !== gl) {
            this._unprepare(this._preparedGlContext);
        }

        if (!this._glBuffer) {
            this._prepare(gl);
        }

        if (this.type === Buffer.ArrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this._glBuffer);
            gl.vertexAttribPointer(attribute, this.itemSize, gl.FLOAT, false, 0, 0);
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
     * Возвращает массив данных
     * @returns {TypedArray}
     */
    getArray() {
        return this._array;
    }

    /**
     * Возвращает элемент из массива данных
     * @param {Number} index Номер элемента в массиве данных
     * @returns {TypedArray}
     */
    getElement(index) {
        return this._array.subarray(index * this.itemSize, (index + 1) * this.itemSize);
    }

    /**
     * Возвращает тройку элементов из массива данных
     * @param {Number} index Индекс
     * @returns {TypedArray[]}
     */
    getTriangle(index) {
        return [
            this.getElement(index),
            this.getElement(index + 1),
            this.getElement(index + 2)
        ];
    }

    /**
     * Конкатенирует данный буфер с другим.
     * Осторожно, метод не проверяет одинаковой размерности данные или нет.
     * @param {Buffer} buffer
     */
    concat(buffer) {
        let addArray = buffer.getArray();
        let newArray = new this._array.constructor(this._array.length + addArray.length);
        newArray.set(this._array, 0);
        newArray.set(addArray, this._array.length);

        this._array = newArray;
        this.length = newArray.length / this.itemSize;
    }

    /**
     * Кладёт данные в видеокарту
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _prepare(gl) {
        this._glBuffer = gl.createBuffer();
        gl.bindBuffer(this._toGlParam(gl, this.type), this._glBuffer);
        gl.bufferData(this._toGlParam(gl, this.type), this._array, gl.STATIC_DRAW);
        this._preparedGlContext = gl;
    }

    /**
     * Удаляет данные из видеокарты
     * @param {WebGLRenderingContext} gl
     * @ignore
     */
    _unprepare(gl) {
        if (!gl) { return; }

        if (this._glBuffer) {
            gl.deleteBuffer(this._glBuffer);
        }
        this._glBuffer = null;
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
    }
}

Buffer.ArrayBuffer = 1;
Buffer.ElementArrayBuffer = 2;

export default Buffer;
