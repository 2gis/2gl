import Light from './Light';

/**
 * Источник направленного освещения.
 *
 * @extends Light
 */
class DirectionalLight extends Light {
    constructor(color) {
        super(color);
    }
}

export default DirectionalLight;
