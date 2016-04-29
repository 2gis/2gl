import enums from '../enums';
import Light from './Light';

/**
 * Источник направленного освещения.
 * Для этого типа света важно направление.
 *
 * @extends Light
 */
class DirectionalLight extends Light {
    constructor(color) {
        super(color);

        /**
         * Используется для обозначения типа света
         * @type {Number}
         */
        this.type = enums.DIRECTIONAL_LIGHT;
    }
}

export default DirectionalLight;
