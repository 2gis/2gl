export default class Renderer {
    constructor(options) {
        this._container = document.getElementById(options.container);

        this._initCanvas();
    }

    setSize(width, height) {
        this._canvasElement.width = width;
        this._canvasElement.height = height;
        this._gl.viewport(0, 0, width, height);
    }

    render(scene, camera) {
        let gl = this._gl;

        gl.clearColor(0.9, 0.9, 0.9, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        scene._objects.forEach(object => {
            object.initFromRender(gl);
            object.render();
        });
    }

    _initCanvas() {
        this._canvasElement = document.createElement('canvas');

        this._canvasElement.width = window.innerWidth;
        this._canvasElement.height = window.innerHeight;

        this._container.appendChild(this._canvasElement);

        this._gl = this._canvasElement.getContext('webgl');
    }
}
