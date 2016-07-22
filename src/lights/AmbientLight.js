import {AMBIENT_LIGHT} from '../libConstants';
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
        this.type = AMBIENT_LIGHT;
    }
}

export default AmbientLight;
