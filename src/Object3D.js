import {vec3, mat4, quat} from 'gl-matrix';

/**
 * Базовый класс для 3D объектов.
 * @class Object3D
 * */
class Object3D {
    constructor() {
        /**
         * Каждый Object3D может включать в себя другие объекты.
         * Позиция, поворот и масштаб дочерних объектов будет зависеть от родителя.
         * @type {Object3D[]}
         */
        this.children = [];

        /**
         * Родитель, т.е. объект в котором данный Object3D будет дочерним
         * @type {?Object3D}
         */
        this.parent = null;

        /**
         * Будет ли объект отображаться на сцене, если нет, то все дочерние объекты тоже не будут отображаться.
         * @type {boolean}
         */
        this.visible = true;

        /**
         * Определяет порядок отрисовки объектов с выключенным фильтром глубины.
         * Работает примерно также как и z-index у dom элементов.
         * Также этот порядок учитывается при отрисовки прозрачных мешей.
         * @type {number}
         */
        this.renderOrder = 0;

        /**
         * Масштаб объекта
         * @type {vec3}
         */
        this.scale = vec3.fromValues(1, 1, 1);

        /**
         * Позиция объекта в локальной системе координат относительно родителя
         * @type {vec3}
         */
        this.position = vec3.create();

        /**
         * Отвечает за поворот объекта
         * @type {quat}
         */
        this.quaternion = quat.create();

        /**
         * Матрица определяющая поворот, масштаб и позицию объекта в локальной системе координат
         * относительно родителя.
         * @type {mat4}
         */
        this.localMatrix = mat4.create();

        /**
         * Матрица определяющая поворот, масштаб и позицию объекта в глобальной системе координат.
         * @type {mat4}
         */
        this.worldMatrix = mat4.create();

        /**
         * Если true, то worldMatrix будет обновлена перед рендерингом
         * @type {boolean}
         */
        this.worldMatrixNeedsUpdate = false;
    }

    /**
     * Добавляет дочерний объект
     * @param {Object3D} object Дочерний объект
     */
    add(object) {
        if (object.parent) {
            object.parent.remove(object);
        }

        object.parent = this;
        this.children.push(object);

        return this;
    }

    /**
     * Убирает дочерний объект
     * @param {Object3D} object Дочерний объект
     */
    remove(object) {
        let index = this.children.indexOf(object);

        if (index != -1) {
            object.parent = null;
            this.children.splice(index, 1);
        }

        return this;
    }

    /**
     * Проверяет пересекает ли {@link Raycaster} данный объект, вносит все пересечения в массив intersects.
     * @param {Raycaster} raycaster
     * @param {Intersect[]} intersects
     */
    raycast(raycaster, intersects) {
        return this;
    }

    /**
     * Вызывается рендером для подготовки и отрисовки объекта.
     * @param {State} state Текущие состояние рендера
     */
    render(state) {
        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        return this;
    }

    /**
     * Обновляет локальную матрицу объекта. Необходимо использовать каждый раз после изменения position, scale
     * и quaternion.
     * */
    updateLocalMatrix() {
        mat4.fromRotationTranslationScale(this.localMatrix, this.quaternion, this.position, this.scale);

        this.worldMatrixNeedsUpdate = true;

        return this;
    }

    /**
     * Обновляет глобальную матрицу объекта.
     * */
    updateWorldMatrix() {
        if (this.parent) {
            mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
        } else {
            mat4.copy(this.worldMatrix, this.localMatrix);
        }

        this.children.forEach(child => child.updateWorldMatrix());

        this.worldMatrixNeedsUpdate = false;

        return this;
    }

    /**
     * Возвращает позицию объекта относительно глобальных координат.
     */
    getWorldPosition() {
        return vec3.fromValues(this.worldMatrix[12], this.worldMatrix[13], this.worldMatrix[14]);
    }

    /**
     * Вызывает переданный callback для себя и для каждого дочернего класса.
     * @param {Function} callback
     */
    traverse(callback) {
        callback(this);

        this.children.forEach(child => child.traverse(callback));

        return this;
    }

    /**
     * Работает также как и {@link Object3D#traverse}, но только для объектов с visible = true
     * @param {Function} callback
     */
    traverseVisible(callback) {
        if (!this.visible) { return this; }

        callback(this);

        this.children.forEach(child => child.traverseVisible(callback));

        return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * @param {TypedObjects} typedObjects
     */
    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        typedObjects.common.push(this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}

export default Object3D;
