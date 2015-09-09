/**
 * Отдельный рендер, используется для отрисовки прозрачных объектов.
 * @ignore
 */
class TransparentRenderer {
    constructor() {}

    render(state, renderObjects) {
        let gl = state.gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        if (state.renderer.sortObjects) {
            renderObjects = this._sortObjects(state, renderObjects);
        }

        renderObjects.forEach(object => object.render(state));
    }

    _sortObjects({camera}, renderObjects) {
        let preparedObjects = renderObjects.map(object => {
            return {
                object,
                z: camera.project(object.getWorldPosition())[2]
            };
        });

        preparedObjects.sort(this._reversePainterSortStable);

        return preparedObjects.map(object => object.object);
    }

    _reversePainterSortStable(a, b) {
        if (a.object.renderOrder !== b.object.renderOrder) {
            return a.object.renderOrder - b.object.renderOrder;
        }

        if (a.z !== b.z) {
            return b.z - a.z;
        }
    }
}

export default TransparentRenderer;
