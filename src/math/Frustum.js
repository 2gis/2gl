import {vec3} from 'gl-matrix';
import Plane from './Plane';

/**
 * Задаёт frustum в трёхмерном пространстве
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Frustum.js)
 */
class Frustum {
    /**
     * @param {Array} planes Массив из шести плоскостей, формирующих frustum
     */
    constructor(planes) {
        this.planes = planes;

        if (!this.planes || this.planes.length !== 6) {
            this.planes = [
                new Plane(),
                new Plane(),
                new Plane(),
                new Plane(),
                new Plane(),
                new Plane()
            ];
        }
    }

    /**
     * Устанавливает плоскости frustum в соответствие с матрицей
     * @param {mat4} matrix
     */
    setFromMatrix(matrix) {
        this.planes[0].setComponents(matrix[12] + matrix[0], matrix[13] + matrix[1], matrix[14] + matrix[2],
             matrix[15] + matrix[3]);

        this.planes[1].setComponents(matrix[12] - matrix[0], matrix[13] - matrix[1], matrix[14] - matrix[2],
             matrix[15] - matrix[3]);

        this.planes[2].setComponents(matrix[12] + matrix[4], matrix[13] + matrix[5], matrix[14] + matrix[6],
             matrix[15] + matrix[7]);

        this.planes[3].setComponents(matrix[12] - matrix[4], matrix[13] - matrix[5], matrix[14] - matrix[6],
             matrix[15] - matrix[7]);

        this.planes[4].setComponents(matrix[12] + matrix[8], matrix[13] + matrix[9], matrix[14] + matrix[10],
             matrix[15] + matrix[11]);

        this.planes[5].setComponents(matrix[12] - matrix[8], matrix[13] - matrix[9], matrix[14] - matrix[10],
             matrix[15] - matrix[11]);

        return this;
    }

    /**
     * Проверяет, находится ли {@link Box} в области frustum
     * @param {Box} box
     * @returns {Boolean}
     */
    intersectsBox(box) {
        const p1 = vec3.create();
        const p2 = vec3.create();
        const planes = this.planes;

        for (let i = 0; i < 6; i++) {
            const plane = planes[i];

            p1[0] = plane.normal[0] > 0 ? box.min[0] : box.max[0];
            p2[0] = plane.normal[0] > 0 ? box.max[0] : box.min[0];
            p1[1] = plane.normal[1] > 0 ? box.min[1] : box.max[1];
            p2[1] = plane.normal[1] > 0 ? box.max[1] : box.min[1];
            p1[2] = plane.normal[2] > 0 ? box.min[2] : box.max[2];
            p2[2] = plane.normal[2] > 0 ? box.max[2] : box.min[2];

            const d1 = plane.distanceToPoint(p1);
            const d2 = plane.distanceToPoint(p2);

            // if both outside plane, no intersection
            if (d1 < 0 && d2 < 0) {
                return false;
            }
        }

        return true;
    }
}

export default Frustum;
