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
    }
}

export default DirectionalLight;
