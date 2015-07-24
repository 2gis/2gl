import Object3D from './Object3D';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    render(gl, camera) {
        this.program.use(gl);

        this._bindAttributes();
        this._bindUniforms(camera);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.program.unuse(gl);
    }

    _bindAttributes() {
        for (let name in this.program.attributes) {
            this.geometry.getBuffer(name).bind(this.program.attributes[name]);
        }
    }

    _bindUniforms(camera) {
        gl.uniformMatrix4fv(this.program.uniforms['uPosition'], false, this.matrix);
        gl.uniformMatrix4fv(this.program.uniforms['uCamera'], false, camera.matrix);
    }
}

