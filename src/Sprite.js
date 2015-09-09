import Object3D from './Object3D';
import {vec2} from 'gl-matrix';

/**
 * Используется для отрисовки спрайтов. Спрайты всегда рисуются лицевой стороной
 * и их размеры не зависят от положения. Т.е. координаты спрайта проецируются в плоскость экрана,
 * и уже на ней отрисовываются.
 * 
 * @extends {Object3D}
 */
class Sprite extends Object3D {
    /**
     * @param {SpriteProgram} program
     */
    constructor(program) {
        super();

        /**
         * Программа отрисовки спрайта
         * @type {SpriteProgram}
         */
        this.program = program;

        /**
         * Смещение спрайта в плоскости экрана
         * @type {vec2}
         */
        this.offset = vec2.create();
    }

    render(state) {
        if (!this.visible) { return this; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        let gl = state.gl;

        state.object = this;

        this.program.enable(state);

        // draw for indices
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

        this.program.disable(state.gl);

        return this;
    }

    /**
     * Вызывается на этапе рендеринга для определения, каким конкретно рендером объект будет рисоваться.
     * Спрайты рисуются отдельным рендером.
     *
     * @param {TypedObjects} typedObjects
     */
    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        typedObjects.sprites.push(this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}

export default Sprite;
