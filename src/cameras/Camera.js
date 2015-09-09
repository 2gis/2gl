import Object3D from '../Object3D';
import {vec3, mat3, mat4, quat} from 'gl-matrix';

/**
 * Камера
 *
 * @extends Object3D
 */
class Camera extends Object3D {
    constructor() {
        super();

        /**
         * Специфичный для камеры вектор, помогающий определить её положение
         * @type {vec3}
         */
        this.up = vec3.fromValues(0, 1, 0);

        /**
         * Проецкционная матрица
         * @type {mat4}
         */
        this.projectionMatrix = mat4.create();

        /**
         * Так называемая матрица модель-вида использующаяся в шейдерах для получения конечного изображения
         * @type {mat4}
         */
        this.projectionInverseMatrix = mat4.create();

        /**
         * Матрица, обратная к worldMatrix
         * @type {mat4}
         */
        this.worldInverseMatrix = mat4.create();
    }

    /**
     * Обновляет проекционную матрицу. Обычно это нужно после изменения параметров камеры.
     * Метод испльзуется в наследуемых классах.
     */
    updateProjectionMatrix() {}

    /**
     * Обновляет глобальную матрицу объекта и матрицу модель-вида.
     * */
    updateWorldMatrix() {
        super.updateWorldMatrix();

        mat4.invert(this.worldInverseMatrix, this.worldMatrix);
        mat4.multiply(this.projectionInverseMatrix, this.projectionMatrix, this.worldInverseMatrix);
    }

    /**
     * Проецирует вектор из глобальной системы координат на экран
     * @param {vec3} vector
     * @returns {vec3}
     */
    project(vector) {
        let result = vec3.create();
        vec3.transformMat4(result, vector, this.projectionInverseMatrix);
        return result;
    }

    /**
     * Проецирует вектор из системы координат экрана в глобальную
     * @param {vec3} vector
     * @returns {vec3}
     */
    unproject(vector) {
        let matrix = mat4.create();
        let inverseMatrix = mat4.create();
        let result = vec3.create();

        mat4.invert(inverseMatrix, this.projectionMatrix);
        mat4.mul(matrix, this.worldMatrix, inverseMatrix);
        vec3.transformMat4(result, vector, matrix);

        return result;
    }

    /**
     * Поворачивает камеру так, чтобы центр экрана точно смотрел на указанную позицию
     * @param {vec3} vector
     */
    lookAt(vector) {
        let matrix4 = mat4.create();
        let matrix3 = mat3.create();
        mat4.lookAt(matrix4, this.position, vector, this.up);
        mat4.transpose(matrix4, matrix4);
        mat3.fromMat4(matrix3, matrix4);
        quat.fromMat3(this.quaternion, matrix3);

        return this;
    }
}

export default Camera;
