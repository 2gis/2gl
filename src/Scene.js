import Object3D from './Object3D';

export default class Scene extends Object3D {
    constructor() {
        super();

        this._lights = [];
    }

    addLight(light) {
        this._lights.push(light);
    }

    getLights() {
        return this._lights;
    }

    render(gl, renderer, camera, state) {
        this.children.forEach(object => object.render(gl, renderer, this, camera, state));
    }
}
