import Object3D from '../Object3D';

export default class Light extends Object3D {
    constructor(color) {
        super();

        this.color = color;
    }
}
