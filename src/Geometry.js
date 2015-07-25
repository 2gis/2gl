export default class Geometry {
    constructor() {
        this.buffers = {};
    }

    setBuffer(name, attribute) {
        this.buffers[name] = attribute;

        return this;
    }

    getBuffer(name) {
        return this.buffers[name];
    }
}
