import {vec3, mat3} from 'gl-matrix';
import Ray from './math/Ray';
import OrthographicCamera from './cameras/OrthographicCamera';
import PerspectiveCamera from './cameras/PerspectiveCamera';

/**
 * Позволяет легко определять пересечения луча с объектами.
 * Например, для определения клика пользователя.
 */
class Raycaster {
    /**
     * @param {vec3} origin Точка начала луча
     * @param {vec3} direction Направление луча
     * @param {Number} [near=0] Минимальное расстояние от начала до точки пересечения
     * @param {Number} [far=Infinity] Максимальное расстояние от начала до точки пересечения
     */
    constructor(origin, direction, near, far) {
        this.precision = 0.0001;
        this.ray = new Ray(origin, direction);
        this.near = near || 0;
        this.far = far || Infinity;
    }

    /**
     * Устанавливает начало луча в положение камеры, а направление проецирует с переданных координат
     * экрана в систему координат камеры.
     *
     * @param {vec3} coordinates
     * @param {Camera} camera
     */
    setFromCamera(coordinates, camera) {
        if (camera instanceof PerspectiveCamera) {
            this.ray.origin = vec3.clone(camera.position);

            let direction = vec3.fromValues(coordinates[0], coordinates[1], 0.5);
            direction = camera.unproject(direction);
            vec3.sub(direction, direction, camera.position);
            vec3.normalize(direction, direction);
            this.ray.direction = direction;

        } else if (camera instanceof OrthographicCamera) {
            let origin = vec3.fromValues(coordinates[0], coordinates[1], -1);
            this.ray.origin = camera.unproject(origin);

            this.ray.direction = vec3.fromValues(0, 0, -1);

            let matrix3 = mat3.create();
            mat3.fromMat4(matrix3, camera.worldMatrix);
            vec3.transformMat3(this.ray.direction, this.ray.direction, matrix3);
            vec3.normalize(this.ray.direction, this.ray.direction);
        }
    }

    /**
     * Ищет точки пересечения луча с объектом
     * @param {Object3D} object
     * @param {Boolean} [recursive=false] Проверять ли дочернии объекты
     * @returns {Intersect[]}
     */
    intersectObject(object, recursive) {
        var intersects = [];

        this._intersectObject(object, intersects, recursive);

        intersects.sort(this._descSort);

        return intersects;
    }

    /**
     * Ищет точки пересечения луча с массивом объектов
     * @param {Object3D[]} objects
     * @param {Boolean} [recursive=false] Проверять ли дочернии объекты
     * @returns {Intersect[]}
     */
    intersectObjects(objects, recursive) {
        let intersects = [];

        for (let i = 0; i < objects.length; i++) {
            this._intersectObject(objects[i], intersects, recursive);
        }

        intersects.sort(this._descSort);

        return intersects;
    }

    _descSort(a, b) {
        return a.distance - b.distance;
    }

    _intersectObject(object, intersects, recursive) {
        object.raycast(this, intersects);

        if (recursive) {
            let children = object.children;

            for (let i = 0; i < children.length; i++) {
                this._intersectObject(children[i], intersects, true);
            }
        }
    }
}

export default Raycaster;

/**
 * Возвращаемое значение методов raycast. Содержит информацию о точки пересечения с объектом.
 *
 * @typedef {Object} Intersect
 * @property {Number} distance Расстояние от начала луча до точки пересечения
 * @property {vec2} point Координаты точки пересечения
 * @property {Object3D} object Объект с которым пересекся луч
 */
