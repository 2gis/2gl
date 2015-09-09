import Object3D from './Object3D';

/**
 * Сцена включает в себя все объекты необходимые для рендеринга
 *
 * @extends Object3D
 */
class Scene extends Object3D {
    constructor() {
        super();

        this._lights = [];
    }

    /**
     * Добавляет источник света на сцену
     * @param {Light} light
     */
    addLight(light) {
        this._lights.push(light);

        return this;
    }

    /**
     * Возвращает все источники света сцены
     * @returns {Light[]}
     */
    getLights() {
        return this._lights;
    }
}

export default Scene;
