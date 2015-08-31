export default class Renderer {
    constructor(options) {
        this._container = typeof options.container === 'string' ?
            document.getElementById(options.container) : options.container;

        this._pixelRatio = options.pixelRatio || 1;
        this._antialias = options.antialias !== undefined ? options.antialias : true;
        this.autoClear = options.autoClear !== undefined ? options.autoClear : true;
        this.clearColor = options.clearColor || [1, 1, 1, 1];

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

    clear() {
        let gl = this._gl;

        gl.clearColor.apply(gl, this.clearColor);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        return this;
    }

    render(scene, camera) {
        let gl = this._gl;

        gl.clearDepth(1);
        gl.clearStencil(0);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);

        if (this.autoClear) {
            this.clear();
        }

        camera.updateLocalMatrix();
        camera.updateWorldMatrix();

        gl.disable(gl.BLEND);

        scene.render(gl, camera, false);

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        scene.render(gl, camera, true);

        return this;
    }

    _initCanvas() {
        this._canvasElement = document.createElement('canvas');

        this._canvasElement.width = window.innerWidth;
        this._canvasElement.height = window.innerHeight;

        this._container.appendChild(this._canvasElement);

        let attributes = {
            antialias: this._antialias
        };

        this._gl = this._canvasElement.getContext('webgl', attributes);
    }
}
