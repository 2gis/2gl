import Object3D from './Object3D';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
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
    }

    _bindUniforms(gl, camera) {
        gl.uniformMatrix4fv(this.program.getUniform('uPosition'), false, this.matrix);
        gl.uniformMatrix4fv(this.program.getUniform('uCamera'), false, camera.matrix);
    }
}

