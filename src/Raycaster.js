import {vec3, mat3, mat4} from 'gl-matrix';
import Ray from './math/Ray';
import libConstants from './libConstants';

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

        /**
         * Список методов проверки пересечений для разных типов объектов
         * @type {Object}
         */
        this.intersectMethodsByType = {
            [libConstants.MESH]: 'intersectMesh'
        };
    }

    /**
     * Устанавливает начало луча в положение камеры, а направление проецирует с переданных координат
     * экрана в систему координат камеры.
     *
     * @param {vec3} coordinates
     * @param {Camera} camera
     */
    setFromCamera(coordinates, camera) {
        if (camera.type === libConstants.PERSPECTIVE_CAMERA) {
            this.ray.origin = vec3.clone(camera.position);

            let direction = vec3.fromValues(coordinates[0], coordinates[1], 0.5);
            direction = camera.unproject(direction);
            vec3.sub(direction, direction, camera.position);
            vec3.normalize(direction, direction);
            this.ray.direction = direction;

        } else if (camera.type === libConstants.ORTHOGRAPHIC_CAMERA) {
            const origin = vec3.fromValues(coordinates[0], coordinates[1], -1);
            this.ray.origin = camera.unproject(origin);

            this.ray.direction = vec3.fromValues(0, 0, -1);

            const matrix3 = mat3.create();
            mat3.fromMat4(matrix3, camera.worldMatrix);
            vec3.transformMat3(this.ray.direction, this.ray.direction, matrix3);
            vec3.normalize(this.ray.direction, this.ray.direction);
        }
    }

    /**
     * Ищет точки пересечения луча с объектом
     * @param {Object3D} object
     * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
     * @param {Intersect[]} [intersects]
     * @returns {Intersect[]}
     */
    intersectObject(object, recursive, intersects) {
        intersects = intersects || [];

        const intersectMethod = this.intersectMethodsByType[object.type];

        if (intersectMethod && this[intersectMethod]) {
            this[intersectMethod](object, recursive, intersects);
        } else if (recursive) {
            this.intersectObjects(object.children, recursive, intersects);
        }

        intersects.sort(this._descSort);

        return intersects;
    }

    /**
     * Ищет точки пересечения луча с массивом объектов
     * @param {Object3D[]} objects
     * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
     * @param {Intersect[]} [intersects]
     * @returns {Intersect[]}
     */
    intersectObjects(objects, recursive, intersects) {
        intersects = intersects || [];

        objects.forEach(obj => this.intersectObject(obj, recursive, intersects));

        return intersects;
    }

    /**
     * Ищет точки пересечения луча с {@link Mesh}
     * @param {Mesh} mesh
     * @param {Boolean} [recursive=false] Проверять ли дочерние объекты
     * @param {Intersect[]} [intersects]
     * @returns {Intersect[]}
     */
    intersectMesh(mesh, recursive, intersects) {
        intersects = intersects || [];

        // get from https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js

        const inverseMatrix = mat4.create();
        mat4.invert(inverseMatrix, mesh.worldMatrix);

        const ray = this.ray.clone();
        ray.applyMatrix4(inverseMatrix);

        const boundingBox = mesh.geometry.getBoundingBox();

        if (!ray.intersectBox(boundingBox)) { return mesh; }

        const positionBuffer = mesh.geometry.buffers.position;

        for (let i = 0; i < positionBuffer.length; i += 3) {
            const triangle = positionBuffer.getTriangle(i / 3);

            const intersectionPoint = ray.intersectTriangle(triangle, false);

            if (!intersectionPoint) { continue; }

            vec3.transformMat4(intersectionPoint, intersectionPoint, mesh.worldMatrix);

            const distance = vec3.dist(this.ray.origin, intersectionPoint);

            if (distance < this.precision || distance < this.near || distance > this.far) { continue; }

            intersects.push({
                distance: distance,
                point: intersectionPoint,
                object: mesh
            });
        }

        if (recursive) {
            this.intersectObjects(mesh.children, recursive, intersects);
        }

        return intersects;
    }

    _descSort(a, b) {
        return a.distance - b.distance;
    }
}

export default Raycaster;

/**
 * Возвращаемое значение методов raycast. Содержит информацию о точки пересечения с объектом.
 *
 * @typedef {Object} Intersect
 * @property {Number} distance Расстояние от начала луча до точки пересечения
 * @property {vec3} point Координаты точки пересечения
 * @property {Object3D} object Объект с которым пересекся луч
 */
