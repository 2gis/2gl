/**
 * Шейдер компилирует код и хранит его в видеокарте.
 * Один шейдер может быть использован для нескольких программ.
 *
 * @param {String} type Тип шейдера: или vertex, или fragment
 * @param {String | String[]} code Код шейдера написанный на языке GLSL.
 * Можно передать несколько строк в виде массива, тогда перед компиляцией строки сложатся.
 * @param {Object[]} [definitions=[]]
 */
class Shader {
    constructor(type, code, definitions = []) {
        /**
         * Тип шейдера
         * @type {Shader.Vertex | Shader.Fragment}
         */
        this.type = type === 'vertex' ? Shader.Vertex : Shader.Fragment;

        /**
         * Код шейдера
         * @type {String}
         * @ignore
         */
        this._code = Array.isArray(code) ? code.join('\n') : (code || '');

        this._code = definitions.map(def => {
            if (def.value !== undefined) {
                return '#define ' + def.type + ' ' + def.value;
            } else {
                return '#define ' + def.type;
            }
        }).join('\n') + '\n' + this._code;
    }

    /**
     * Возвращает webgl шейдер для связывания с программой.
     * Если шейдер используюется первый раз, то компилирует его.
     */
    get(gl) {
        if (!this._shader) {
            this._compile(gl);
        }
        return this._shader;
    }

    /**
     * Удаляет шейдер из видеокарты
     * @param  {WebGLRenderingContext} gl Контекст WebGl
     */
    remove(gl) {
        if (this._shader) {
            gl.deleteShader(this._shader);
        }
    }

    /**
     * Компилирует данный шейдер
     * @param  {WebGLRenderingContext} gl Контекст WebGL
     * @ignore
     */
    _compile(gl) {
        const glType = this.type === Shader.Vertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
        const shader = this._shader = gl.createShader(glType);
        gl.shaderSource(shader, this._code);
        gl.compileShader(shader);
    }
}

Shader.Vertex = 1;
Shader.Fragment = 2;

export default Shader;
