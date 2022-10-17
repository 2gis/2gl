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

        const result = 
            definitions
                .map((def) => {
                    if (def.value !== undefined) {
                        return '#define ' + def.type + ' ' + def.value;
                    } else {
                        return '#define ' + def.type;
                    }
                });

        const lines = Array.isArray(code) ? code : [code || ''];
        let firstLine = true;
        for (let line of lines) {
            // Если в шейдерах указана версия, то ее нужно обязательно
            // поместить первой строкой
            if (firstLine && line.indexOf('#version') !== -1) {
                result.unshift(line);
            } else {
                result.push(line)
            }
            firstLine = false;
        }

        /**
         * Код шейдера
         * @type {String}
         * @ignore
         */
        this._code = result.join('\n')
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
        const shader = (this._shader = gl.createShader(glType));

        if (!shader || gl.isContextLost()) {
            throw new Error(
                `[2gl] Failed to create shader. Shader is null: ${!shader}. Context is lost: ${gl.isContextLost()}`,
            );
        }

        gl.shaderSource(shader, this._code);
        gl.compileShader(shader);    

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const infoLog = gl.getShaderInfoLog(shader);
            const codeLines = (this._code || '').split('\n');
            throw new Error(infoLog.replace(/^ERROR:\s*(\d+):(\d+):\s*(.*?)\n/, 
                function (wholeMatch, col, row, message) {
                    const line = codeLines[Number(row) - 1];
                    if (line) {
                        return `ERROR ${col}:${row}: ${message}\nErroneous line: <<${line}>>\n`;
                    } else {
                        return wholeMatch;
                    }
                }));
        }
    }
}

Shader.Vertex = 1;
Shader.Fragment = 2;

export default Shader;
