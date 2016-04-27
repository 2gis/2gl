import Object3D from './Object3D';
import {vec3, mat4} from 'gl-matrix';

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
     * Проверяет пересекает ли {@link Raycaster} данный объект, вносит все пересечения в массив intersects.
     * @param {Raycaster} raycaster
     * @param {Intersect[]} intersects
     * @param {Boolean} recursive Проверять ли пересечения с дочерними объектами
     */
    raycast(raycaster, intersects, recursive) {
        // get from https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js

        const inverseMatrix = mat4.create();
        mat4.invert(inverseMatrix, this.worldMatrix);

        const ray = raycaster.ray.clone();
        ray.applyMatrix4(inverseMatrix);

        const boundingBox = this.geometry.getBoundingBox();

        if (!ray.intersectBox(boundingBox)) { return this; }

        const positionBuffer = this.geometry.buffers.position;

        for (let i = 0; i < positionBuffer.length; i += 3) {
            const triangle = positionBuffer.getTriangle(i / 3);

            const intersectionPoint = ray.intersectTriangle(triangle, false);

            if (!intersectionPoint) { continue; }

            vec3.transformMat4(intersectionPoint, intersectionPoint, this.worldMatrix);

            const distance = vec3.dist(raycaster.ray.origin, intersectionPoint);

            if (distance < raycaster.precision || distance < raycaster.near || distance > raycaster.far) { continue; }

            intersects.push({
                distance: distance,
                point: intersectionPoint,
                object: this
            });
        }

        if (recursive) {
            this.children.forEach(child => child.raycast(raycaster, intersects, recursive));
        }

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
