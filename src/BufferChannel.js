import Buffer from './Buffer';

const defaultOptions = {
    itemSize: 3,
    dataType: Buffer.Float,
    stride: 0,
    offset: 0,
    normalized: false
};

/**
 * Класс BufferChannel используется, если данные в обычном буфере имееют разные типы
 * и предназначены для разных атрибутов шейдера, т.е. нужно использовать webgl параметры stride и offset.
 * При инициализации классу передаётся {@link Buffer}. Несколько BufferChannel могут использовать один и тот же Buffer.
 * Во время рендеринга BufferChannel связывает полученный буфер с нужными параметрами.
 *
 * @param {Buffer} buffer Типизированный массив данных, например, координат вершин
 * @param {BufferBindOptions} options
 */
class BufferChannel {
    constructor(buffer, options = {}) {
        /**
         * Исходный буфер
         * @type {Buffer}
         * @ignore
         */
        this._buffer = buffer;

        /**
         * Параметры для связывания буфера
         * @type {BufferBindOptions}
         * @ignore
         */
        this._options = Object.assign({}, defaultOptions, options);
    }

    /**
     * Связывает данные с контекстом WebGL с нужными параметрами.
     * Вызывает {@link Buffer#bind} исходного буфера.
     */
    bind(gl, location) {
        this._buffer.bind(gl, location, this._options);
    }
}

export default BufferChannel;
