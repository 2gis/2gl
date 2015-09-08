export default class SpriteProgram {
    constructor() {
        this.opacity = 1;
        this.smoothing = false;
    }

    setTexture(texture) {
        this._texture = texture;

        return this;
    }

    getTexture() {
        return this._texture;
    }

    enable({gl, object, uniforms, renderer}) {
        gl.uniform1f(uniforms.uColorAlpha, this.opacity);
        gl.uniform1i(uniforms.uSmoothing, Number(this.smoothing));

        let size = renderer.getSize();
        gl.uniform2f(uniforms.uHalfSize, size[0] / 2, size[1] / 2);
        gl.uniform2f(uniforms.uOffset, object.offset[0], object.offset[1]);
        gl.uniform2f(uniforms.uScale, object.scale[0], object.scale[1]);
        gl.uniform3f(uniforms.uPosition, object.worldMatrix[12], object.worldMatrix[13], object.worldMatrix[14]);

        if (this._texture) {
            this._texture.enable(gl);
        }
    }

    disable() {}
}
