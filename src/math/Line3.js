import {vec3} from 'gl-matrix';
import {clamp} from './Math.js';

/**
 * Класс для линий
 *
 * Взято из [three.js](https://github.com/mrdoob/three.js/blob/master/src/math/Line3.js)
 */
class Line3 {
    /**
     * @param {vec3} start Начало
     * @param {vec3} end Конец
     */
    constructor(start, end) {
        this.start = start || vec3.create();
        this.end = end || vec3.create();
    }

    /**
     * Возвращает параметр основанный на проекции ближайшей точки к линии.
     * Если clampToLine = true, возвращает параметр между 0 и 1.
     * @param {vec3} point
     * @param {Boolean} clampToLine
     * @returns {number}
     */
    closestPointToPointParameter(point, clampToLine) {
        let startP = vec3.create();
        let startEnd = vec3.create();

        vec3.sub(startP, point, this.start);
        vec3.sub(startEnd, this.end, this.start);

        let startEnd2 = vec3.dot(startEnd, startEnd);
        let startEndStartP = vec3.dot(startEnd, startP);

        let t = startEndStartP / startEnd2;

        if (clampToLine) {
            t = clamp(t, 0, 1);
        }

        return t;
    }

    /**
     * Возвращает ближайшую точку на прямой заданную линией. Если clampToLine = true, возвращает точку
     * лежащую в пределах линии.
     * @param {vec3} point
     * @param {Boolean} clampToLine
     * @param {?vec3} optionalTarget Если указать параметр, то результат будет записан в него
     * @returns {vec3}
     */
    closestPointToPoint(point, clampToLine, optionalTarget) {
        let t = this.closestPointToPointParameter(point, clampToLine);

        let result = optionalTarget || vec3.create();
        result = this.delta(result);
        vec3.scale(result, result, t);
        vec3.add(result, result, this.start);

        return result;

    }

    /**
     * Вычитает вектор начала линии из конца
     * @param {?vec3} optionalTarget Если указать параметр, то результат будет записан в него
     * @returns {vec3}
     */
    delta(optionalTarget) {
        let result = optionalTarget || vec3.create();
        vec3.sub(result, this.end, this.start);
        return result;
    }
}

export default Line3;
