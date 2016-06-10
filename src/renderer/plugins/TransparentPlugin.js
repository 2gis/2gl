import RendererPlugin from '../RendererPlugin';
import Renderer from '../Renderer';
import libConstants from '../../libConstants';

/**
 * Плагин для рендера прозрачных объектов.
 * Для того, чтобы он добавился к рендеру, модуль нужно зареквайрить.
 * Для {@link BasicMeshMaterial} и {@link ComplexMeshMaterial} модуль подключается автоматически.
 */
class TransparentPlugin extends RendererPlugin {
    constructor() {
        super();

        this.type = libConstants.TRANSPARENT_RENDERER;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */
    render(state) {
        const gl = state.gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        if (state.renderer.sortObjects) {
            this._sortObjects(state);
        }

        this._objects.forEach(object => object.render(state));
        this._objects = [];

        return this;
    }

    _sortObjects({camera}) {
        const sorter = this._reversePainterSortStable.bind(this, camera);

        this._objects.sort(sorter);
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

Renderer.addPlugin(10, TransparentPlugin);

export default TransparentPlugin;
