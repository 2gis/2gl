import Object3D from '../Object3D';

/**
 * Базовый класс для создания источника света.
 * Сам по себе не используется.
 *
 * @extends Object3D
 */
class Light extends Object3D {
    /**
     * @param {Array} color Цвет в формате RGB
     */
    constructor(color) {
        super();

        /**
         * Цвет в формате RGB
         * @type {Array}
         */
        this.color = color;
    }
}

export default Light;
