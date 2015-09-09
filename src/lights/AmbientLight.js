import Light from './Light';

/**
 * Источник постоянного света. Действует на все объекты и во всех направлениях.
 *
 * @extends Light
 */
class AmbientLight extends Light {
    constructor(color) {
        super(color);
    }
}

export default AmbientLight;
