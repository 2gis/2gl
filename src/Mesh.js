import Object3D from './Object3D';
import enums from './enums';

/**
 * Используется для отрисовки 3D объектов. Каждому мешу необходимо задать программу и геометрию.
 *
 * @extends {Object3D}
 */
class Mesh extends Object3D {
    /**
     * @param {Geometry} geometry Геометрия меша
     * @param {Material} material Программа для отрисовки меша
     */
    constructor(geometry, material) {
        super();

        /**
         * Геометрия меша
         * @type {Geometry}
         */
        this.geometry = geometry;

        /**
         * Программа для отрисовки меша
         * @type {Material}
         */
        this.material = material;

        /**
         * Используется для обозначения типа объекта
         * @type {Number}
         */
        this.type = enums.MESH;
    }

    /**
     * Вызывается рендером для подготовки и отрисовки объекта.
     * @param {State} state Текущие состояние рендера
     */
    render(state) {
        const gl = state.gl;

        if (!this.visible) { return this; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        state.object = this;
        this.material.enable(state);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.material.disable(gl);

        return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * Меши разделяются на прозрачные и нет.
     *
     * @param {TypedObjects} typedObjects
     */
    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        this.material.typifyForRender(typedObjects, this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}

export default Mesh;
