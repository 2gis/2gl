import Object3D from './Object3D';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    setTexture(texture) {
        this._texture = texture;
        this.program.define('texture');
        this.program._attributeList.push('texture');
        this.program._uniformList.push('uTexture');

        return this;
    }

    render(gl, camera) {
        this.program.enable(gl);

        this._bindAttributes(gl);
        this._bindUniforms(gl, camera);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.program.disable(gl);
    }

    _bindAttributes(gl) {
        this.geometry.getBuffer('position').bind(gl, this.program.getAttribute('position'));
        this.geometry.getBuffer('color').bind(gl, this.program.getAttribute('color'));
        this.geometry.getBuffer('texture').bind(gl, this.program.getAttribute('texture'));
    }

    _bindUniforms(gl, camera) {
        gl.uniformMatrix4fv(this.program.getUniform('uPosition'), false, this.matrix);
        gl.uniformMatrix4fv(this.program.getUniform('uCamera'), false, camera.matrix);

        if (this._texture) {
            this._texture.enable(gl, this.program.getUniform('uTexture'));
        }
    }
}

