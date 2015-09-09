import Object3D from '../Object3D';

/**
 * Базовый класс для создания источника света
 *
 * @extends Object3D
 */
class Light extends Object3D {
    /**
     * @param {Array} color Цвет в формате RGB, где каждая компонента от 0 до 1
     */
    constructor(color) {
        super();

        /**
         * Цвет в формате RGB, где каждая компонента от 0 до 1
         * @type {Array}
         */
        this.color = color;
    }
}

export default Light;
