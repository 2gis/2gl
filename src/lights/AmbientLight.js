import enums from '../enums';
import Light from './Light';

/**
 * Источник постоянного света. Действует на все объекты и во всех направлениях.
 *
 * @extends Light
 */
class AmbientLight extends Light {
    constructor(color) {
        super(color);

        /**
         * Используется для обозначения типа света
         * @type {Number}
         */
        this.type = enums.AMBIENT_LIGHT;
    }
}

export default AmbientLight;
