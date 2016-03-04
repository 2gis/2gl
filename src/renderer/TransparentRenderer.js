/**
 * Отдельный рендер, используется для отрисовки прозрачных объектов.
 * @ignore
 */
class TransparentRenderer {
    constructor() {}

    render(state, renderObjects) {
        const gl = state.gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        if (state.renderer.sortObjects) {
            this._sortObjects(state, renderObjects);
        }

        renderObjects.forEach(object => object.render(state));
    }

    _sortObjects({camera}, renderObjects) {
        const sorter = this._reversePainterSortStable.bind(this, camera);

        renderObjects.sort(sorter);
    }

    _reversePainterSortStable(camera, a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        }

        const aZ = camera.project(a.getWorldPosition())[2];
        const bZ = camera.project(b.getWorldPosition())[2];

        return bZ - aZ;
    }
}

export default TransparentRenderer;
