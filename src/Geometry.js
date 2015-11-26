import {vec3} from 'gl-matrix';
import Buffer from './Buffer';
import Box from './math/Box';

/**
 * Используется для задания геометрий объектов.
 * В качестве данных используются {@link Buffer}.
 */
class Geometry {
    constructor() {
        /**
         * Словарь вида: название буфера - Buffer
         * @type {Object}
         */
        this.buffers = {};

        /**
         * Параллелепипед описывающий данную геометрию
         * @type {?Box}
         * @ignore
         */
        this._boundingBox = null;
    }

    /**
     * Сохраняет буфер в геометрию
     * @param {String} name Название буфера
     * @param {Buffer} buffer
     */
    setBuffer(name, buffer) {
        this.buffers[name] = buffer;

        return this;
    }

    /**
     * Возвращает буфер из геометрии
     * @param {String} name Название буфера
     * @returns {Buffer}
     */
    getBuffer(name) {
        return this.buffers[name];
    }

    /**
     * Вычисляет буфер нормалей на основе буфера координат вершин (position)
     */
    computeNormals() {
        const positionBuffer = this.buffers.position;

        if (!positionBuffer) { return this; }

        const normals = new Float32Array(positionBuffer.length * positionBuffer.itemSize);

        const ab = vec3.create();
        const cb = vec3.create();
        const n = vec3.create();

        for (let i = 0; i < positionBuffer.length; i += 3) {
            const triangle = positionBuffer.getTriangle(i / 3);

            vec3.sub(ab, triangle[0], triangle[1]);
            vec3.sub(cb, triangle[2], triangle[1]);
            vec3.cross(n, ab, cb);
            vec3.normalize(n, n);

            normals.set(n, i * 3);
            normals.set(n, (i + 1) * 3);
            normals.set(n, (i + 2) * 3);
        }

        this.setBuffer('normal', new Buffer(normals, 3));

        return this;
    }

    /**
     * Возвращает параллелепипед описывающий данную геометрию
     * @returns {Box}
     */
    getBoundingBox() {
        if (!this._boundingBox) {
            this.computeBoundingBox();
        }

        return this._boundingBox;
    }

    /**
     * Вычисляет параллелепипед описывающий данную геометрию на основе буфера координат вершин (position)
     * @returns {Box}
     */
    computeBoundingBox() {
        const boundingBox = this._boundingBox = new Box();
        const positionBuffer = this.buffers.position;

        if (positionBuffer) {
            for (let i = 0; i < positionBuffer.length; i++) {
                boundingBox.expandByPoint(positionBuffer.getElement(i));
            }
        }
    }

    /**
     * Соединяет данную геометрию с другой.
     * Осторожно, геометрии должны быть подобны, т.е. содержать одинаковые буферы.
     * @param {Geometry} geometry
     */
    concat(geometry) {
        for (const type in this.buffers) {
            this.buffers[type].concat(geometry.buffers[type]);
        }
    }
}

export default Geometry;
