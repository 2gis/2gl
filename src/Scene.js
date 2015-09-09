import Object3D from './Object3D';

export default class Scene extends Object3D {
    constructor() {
        super();

        this._lights = [];
    }

    addLight(light) {
        this._lights.push(light);

        return this;
    }

    getLights() {
        return this._lights;
    }
}
