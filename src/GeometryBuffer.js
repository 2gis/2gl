import Buffer from './Buffer';

/**
 * Используется для хранения и подготовки данных для передачи в атрибуты шейдера.
 * В отличие от {@link Buffer}, принимает в качестве аргумента типизированный массив.
 * Это позволяет работать с данными в {@link Geometry}, например, вычислять BoundingBox.
 *
 * @param {TypedArray} array Типизированный массив данных, например, координат вершин
 * @param {?BufferBindOptions} options Параметры передачи буфера в видеокарту
 */
class GeometryBuffer extends Buffer {
    constructor(array, options) {
        super(array, options);

        this._array = array;

        /**
         * Количество элементов в массиве данных
         * @type {Number}
         */
        this.length = array.length / this.options.itemSize;
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
        return this._array.subarray(index * this.options.itemSize, (index + 1) * this.options.itemSize);
    }

    /**
     * Возвращает тройку элементов из массива данных
     * @param {Number} index Индекс
     * @returns {TypedArray[]}
     */
    getTriangle(index) {
        index *= 3;

        return [
            this.getElement(index),
            this.getElement(index + 1),
            this.getElement(index + 2)
        ];
    }

    /**
     * Конкатенирует данный буфер с другим.
     * Осторожно, метод не проверяет одинаковой размерности данные или нет.
     * @param {GeometryBuffer} buffer
     */
    concat(buffer) {
        const addArray = buffer.getArray();
        const newArray = new this._array.constructor(this._array.length + addArray.length);
        newArray.set(this._array, 0);
        newArray.set(addArray, this._array.length);

        this._array = newArray;
        this.length = newArray.length / this.options.itemSize;

        return this;
    }
}

export default GeometryBuffer;
