export default class Scene {
    constructor() {
        this._objects = [];
    }

    add(object) {
        this._objects.push(object);
    }
}
