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
         * Словарь name - Buffer
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
     * Сохраняет буффер в геометрию
     * @param {String} name Название буффера
     * @param {Buffer} buffer
     */
    setBuffer(name, buffer) {
        this.buffers[name] = buffer;

        return this;
    }

    /**
     * Возвращает буффер из геометрии
     * @param {String} name Название буффера
     * @returns {Buffer}
     */
    getBuffer(name) {
        return this.buffers[name];
    }

    /**
     * Вычисляет буффер нормалей на основе текущего буффера вершин
     */
    computeNormals() {
        let positionBuffer = this.buffers.position;
        let normals = new Float32Array(positionBuffer.length * positionBuffer.itemSize);

        let ab = vec3.create();
        let cb = vec3.create();
        let n = vec3.create();

        for (let i = 0; i < positionBuffer.length; i += 3) {
            let triangle = positionBuffer.getTriangle(i);

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
     * Вычисляет параллелепипед описывающий данную геометрию на основе буффера вершин
     * @returns {Box}
     */
    computeBoundingBox() {
        let boundingBox = this._boundingBox = new Box();
        let positionBuffer = this.buffers.position;

        if (positionBuffer) {
            for (let i = 0; i < positionBuffer.length; i++) {
                boundingBox.expandByPoint(positionBuffer.getElement(i));
            }
        }
    }

    /**
     * Соединяет данную геометрию с другой.
     * Осторожно, геометрии должны быть подобны, т.е. содержать одинаковые буфферы.
     * @param {Geometry} geometry
     */
    concat(geometry) {
        for (let type in this.buffers) {
            this.buffers[type].concat(geometry.buffers[type]);
        }
    }
}

export default Geometry;
