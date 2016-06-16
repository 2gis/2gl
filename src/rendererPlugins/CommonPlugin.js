import RendererPlugin from '../RendererPlugin';
import Renderer from '../Renderer';
import libConstants from '../libConstants';

/**
 * Плагин для рендера простых объектов.
 * Для того, чтобы он добавился к рендеру, модуль нужно зареквайрить.
 * Для {@link BasicMeshMaterial} и {@link ComplexMeshMaterial} модуль подключается автоматически.
 */
class CommonPlugin extends RendererPlugin {
    constructor() {
        super();

        /**
         * Используется для обозначения типа плагина
         * @type {Number}
         */
        this.type = libConstants.COMMON_RENDERER;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */
    render(state) {
        const gl = state.gl;

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);
        gl.disable(gl.BLEND);

        if (state.renderer.sortObjects) {
            this._objects.sort(this._renderOrderSort);
        }

        this._objects.forEach(object => object.render(state));
        this._objects = [];

        return this;
    }

    _renderOrderSort(a, b) {
        return a.renderOrder - b.renderOrder;
    }
}

Renderer.addPlugin(0, CommonPlugin);

export default CommonPlugin;
