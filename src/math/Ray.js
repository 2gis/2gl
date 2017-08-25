import * as vec3 from '@2gis/gl-matrix/vec3';

/**
 * Луч
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js)
 */
class Ray {
    /**
     * @param {vec3} origin Позиция начала луча
     * @param {vec3} direction Направление луча
     */
    constructor(origin, direction) {
        /**
         * Начало
         * @type {vec3}
         */
        this.origin = origin || vec3.create();

        /**
         * Направление
         * @type {vec3}
         */
        this.direction = direction || vec3.create();
    }

    /**
     * Возвращает копию луча
     * @returns {Ray}
     */
    clone() {
        return new Ray(vec3.clone(this.origin), vec3.clone(this.direction));
    }

    /**
     * Ищёт точку на луче с заданным множителем
     * @param {Number} t Множитель
     * @returns {vec3}
     */
    at(t) {
        const result = vec3.create();
        vec3.scaleAndAdd(result, this.origin, this.direction, t);
        return result;
    }

    /**
     * Проверяет пересекает ли луч паралелепипед
     * @param {Box} box
     * @returns {?vec3} Точка пересечения или null
     */
    intersectBox(box) {
        let tmin, tmax, tymin, tymax, tzmin, tzmax;

        const invdirx = 1 / this.direction[0];
        const invdiry = 1 / this.direction[1];
        const invdirz = 1 / this.direction[2];

        const origin = this.origin;

        if (invdirx >= 0) {
            tmin = (box.min[0] - origin[0]) * invdirx;
            tmax = (box.max[0] - origin[0]) * invdirx;
        } else {
            tmin = (box.max[0] - origin[0]) * invdirx;
            tmax = (box.min[0] - origin[0]) * invdirx;
        }

        if (invdiry >= 0) {
            tymin = (box.min[1] - origin[1]) * invdiry;
            tymax = (box.max[1] - origin[1]) * invdiry;
        } else {
            tymin = (box.max[1] - origin[1]) * invdiry;
            tymax = (box.min[1] - origin[1]) * invdiry;
        }

        if ((tmin > tymax) || (tymin > tmax)) { return null; }

        // These lines also handle the case where tmin or tmax is NaN
        // (result of 0 * Infinity). x !== x returns true if x is NaN
        /* eslint-disable no-self-compare */
        if (tymin > tmin || tmin !== tmin) { tmin = tymin; }

        if (tymax < tmax || tmax !== tmax) { tmax = tymax; }

        if (invdirz >= 0) {
            tzmin = (box.min[2] - origin[2]) * invdirz;
            tzmax = (box.max[2] - origin[2]) * invdirz;
        } else {
            tzmin = (box.max[2] - origin[2]) * invdirz;
            tzmax = (box.min[2] - origin[2]) * invdirz;
        }

        if ((tmin > tzmax) || (tzmin > tmax)) { return null; }

        if (tzmin > tmin || tmin !== tmin) { tmin = tzmin; }

        if (tzmax < tmax || tmax !== tmax) { tmax = tzmax; }
        /* eslint-enable no-self-compare */

        // return point closest to the ray (positive side)
        if (tmax < 0) { return null; }

        return this.at(tmin >= 0 ? tmin : tmax);
    }

    /**
     * Изменяет направление луча с помощью матрицы
     * @param {mat4} matrix
     */
    applyMatrix4(matrix) {
        vec3.add(this.direction, this.direction, this.origin);
        vec3.transformMat4(this.direction, this.direction, matrix);
        vec3.transformMat4(this.origin, this.origin, matrix);
        vec3.sub(this.direction, this.direction, this.origin);
        vec3.normalize(this.direction, this.direction);

        return this;
    }

    /**
     * Проверяет пересекает ли луч заданный треугольник
     * @param {vec3[]} triangle
     * @param {Boolean} [backfaceCulling=false] Если true, то луч может пересечь только переднюю сторону треугольника
     * @returns {?vec3} Точка пересечения или null
     */
    intersectTriangle(triangle, backfaceCulling) {
        // Compute the offset origin, edges, and normal.
        const edge1 = vec3.create();
        const edge2 = vec3.create();
        const normal = vec3.create();

        vec3.sub(edge1, triangle[1], triangle[0]);
        vec3.sub(edge2, triangle[2], triangle[0]);
        vec3.cross(normal, edge1, edge2);

        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)| * b1 = sign(Dot(D, N)) * Dot(D, Cross(Q, E2))
        //   |Dot(D,N)| * b2 = sign(Dot(D, N)) * Dot(D, Cross(E1, Q))
        //   |Dot(D,N)| * t = -sign(Dot(D, N)) * Dot(Q, N)
        let DdN = vec3.dot(this.direction, normal);
        let sign;

        if (DdN > 0) {
            if (backfaceCulling) { return null; }
            sign = 1;
        } else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        } else {
            return null;
        }

        const diff = vec3.create();
        vec3.sub(diff, this.origin, triangle[0]);

        const cde2 = vec3.create();
        vec3.cross(cde2, diff, edge2);

        const DdQxE2 = sign * vec3.dot(this.direction, cde2);

        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return null;
        }

        const cde1 = vec3.create();
        vec3.cross(cde1, edge1, diff);
        const DdE1xQ = sign * vec3.dot(this.direction, cde1);

        // b2 < 0, no intersection
        if (DdE1xQ < 0) {
            return null;
        }

        // b1+b2 > 1, no intersection
        if (DdQxE2 + DdE1xQ > DdN) {
            return null;
        }

        // Line intersects triangle, check if ray does.
        const QdN = -sign * vec3.dot(diff, normal);

        // t < 0, no intersection
        if (QdN < 0) {
            return null;
        }

        // Ray intersects triangle.
        return this.at(QdN / DdN);
    }

    /**
     * Ищет расстояние от начала луча до плоскости
     * @param {Plane} plane
     * @returns {?Number}
     */
    distanceToPlane(plane) {
        const denominator = vec3.dot(plane.normal, this.direction);

        if (denominator === 0) {
            // line is coplanar, return origin
            if (plane.distanceToPoint(this.origin) === 0) {
                return 0;
            }

            // Null is preferable to undefined since undefined means.... it is undefined
            return null;
        }

        const t = -(vec3.dot(this.origin, plane.normal) + plane.constant) / denominator;

        // Return if the ray never intersects the plane
        return t >= 0 ? t : null;
    }

    /**
     * Проверяет пересекает ли луч заданную плоскость
     * @param {Plane} plane
     * @returns {?vec3} Точка пересечения или null
     */
    intersectPlane(plane) {
        const t = this.distanceToPlane(plane);

        if (t === null) {
            return null;
        }

        return this.at(t);
    }
}

export default Ray;
