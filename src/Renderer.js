export default class Renderer {
    constructor(options) {
        this._container = document.getElementById(options.container);
        this._pixelRatio = 1;

        this._initCanvas();
    }

    setPixelRatio(value) {
        this._pixelRatio = value;

        return this;
    }

    setSize(width, height) {
        this._canvasElement.width = width * this._pixelRatio;
        this._canvasElement.height = height * this._pixelRatio;
        this._canvasElement.style.width = width + 'px';
        this._canvasElement.style.height = height + 'px';
        this._gl.viewport(0, 0, width * this._pixelRatio, height * this._pixelRatio);

        return this;
    }

    render(scene, camera) {
        let gl = this._gl;

        gl.clearColor(1, 1, 1, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        camera.updateLocalMatrix();
        camera.updateWorldMatrix();

        scene.childs.forEach(object => object.render(gl, scene, camera));

        return this;
    }

    _initCanvas() {
        this._canvasElement = document.createElement('canvas');

        this._canvasElement.width = window.innerWidth;
        this._canvasElement.height = window.innerHeight;

        this._container.appendChild(this._canvasElement);

        this._gl = this._canvasElement.getContext('webgl');
    }
}
