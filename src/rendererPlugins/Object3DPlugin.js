import RendererPlugin from '../RendererPlugin';
import Renderer from '../Renderer';
import {OBJECT_3D_RENDERER} from '../libConstants';

/**
 * Плагин - заглушка для {@link Object3D}.
 * Он не делает ничего лишнего, только вызывает метод {@link Object3D#render}.
 * Этот плагин должен всегда рендериться первым.
 */
class Object3DPlugin extends RendererPlugin {
    constructor() {
        super();

        /**
         * Используется для обозначения типа плагина
         * @type {Number}
         */
        this.type = OBJECT_3D_RENDERER;
    }

    /**
     * Вызывает {@link Object3D#render}
     * @param {State} state
     */
    render(state) {
        this._objects.forEach(object => object.render(state));
        this._objects = [];

        return this;
    }
}

Renderer.addPlugin(0, Object3DPlugin);

export default Object3DPlugin;
