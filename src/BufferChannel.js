import Buffer from './Buffer';

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
        this.options = Object.assign({}, Buffer.defaultOptions, options);
    }

    /**
     * Связывает данные с контекстом WebGL с нужными параметрами.
     * Вызывает {@link Buffer#bind} исходного буфера.
     */
    bind(gl, location, options, instancesExt) {
        this._buffer.bind(gl, location, options || this.options, instancesExt);
    }
}

export default BufferChannel;
