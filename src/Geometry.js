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

    concat(geometry) {
        for (let name in this.buffers) {
            Array.prototype.push.apply(this.buffers[name], geometry.buffers[name]);
        }

        return this;
    }
}
