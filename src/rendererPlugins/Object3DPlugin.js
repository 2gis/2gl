import RendererPlugin from '../RendererPlugin';
import {OBJECT_3D_RENDERER} from '../libConstants';

/**
 * Плагин - заглушка для {@link Object3D}.
 * Он не делает ничего лишнего, только вызывает метод {@link Object3D#render}.
 * Этот плагин должен всегда рендериться первым и добавляется автоматически.
 *
 * @extends RendererPlugin
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

export default Object3DPlugin;
