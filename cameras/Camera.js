'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Object3D2 = require('../Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _glMatrix = require('gl-matrix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Камера
 *
 * @extends Object3D
 */
var Camera = function (_Object3D) {
  _inherits(Camera, _Object3D);

  function Camera() {
    _classCallCheck(this, Camera);

    /**
     * Специфичный для камеры вектор, помогающий определить её положение
     * @type {vec3}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Camera).call(this));

    _this.up = _glMatrix.vec3.fromValues(0, 1, 0);

    /**
     * Проекционная матрица
     * @type {mat4}
     */
    _this.projectionMatrix = _glMatrix.mat4.create();

    /**
     * Матрица модель-вида использующаяся в шейдерах для получения конечного изображения
     * @type {mat4}
     */
    _this.modelViewMatrix = _glMatrix.mat4.create();

    /**
     * Матрица, обратная к worldMatrix
     * @type {mat4}
     */
    _this.worldInverseMatrix = _glMatrix.mat4.create();

    // Вспомогательные переменные для методов
    _this._mat3 = _glMatrix.mat3.create();
    _this._mat4a = _glMatrix.mat4.create();
    _this._mat4b = _glMatrix.mat4.create();
    return _this;
  }

  /**
   * Обновляет проекционную матрицу. Обычно это нужно после изменения параметров камеры.
   * Используется в наследуемых классах.
   */


  _createClass(Camera, [{
    key: 'updateProjectionMatrix',
    value: function updateProjectionMatrix() {}

    /**
     * Обновляет глобальную матрицу объекта и матрицу модель-вида.
     * */

  }, {
    key: 'updateWorldMatrix',
    value: function updateWorldMatrix() {
      _get(Object.getPrototypeOf(Camera.prototype), 'updateWorldMatrix', this).call(this);

      _glMatrix.mat4.invert(this.worldInverseMatrix, this.worldMatrix);
      _glMatrix.mat4.multiply(this.modelViewMatrix, this.projectionMatrix, this.worldInverseMatrix);
    }

    /**
     * Проецирует вектор из глобальной системы координат на экран
     * @param {vec3} vector
     * @returns {vec3}
     */

  }, {
    key: 'project',
    value: function project(vector) {
      var result = _glMatrix.vec3.create();
      _glMatrix.vec3.transformMat4(result, vector, this.modelViewMatrix);
      return result;
    }

    /**
     * Проецирует вектор из системы координат экрана в глобальную
     * @param {vec3} vector
     * @returns {vec3}
     */

  }, {
    key: 'unproject',
    value: function unproject(vector) {
      var matrix = this._mat4a;
      var inverseMatrix = this._mat4b;
      var result = _glMatrix.vec3.create();

      _glMatrix.mat4.invert(inverseMatrix, this.projectionMatrix);
      _glMatrix.mat4.mul(matrix, this.worldMatrix, inverseMatrix);
      _glMatrix.vec3.transformMat4(result, vector, matrix);

      return result;
    }

    /**
     * Поворачивает камеру так, чтобы центр экрана точно смотрел на указанную позицию
     * @param {vec3} position
     */

  }, {
    key: 'lookAt',
    value: function lookAt(position) {
      var matrix4 = this._mat4a;
      var matrix3 = this._mat3;
      _glMatrix.mat4.lookAt(matrix4, this.position, position, this.up);
      _glMatrix.mat4.transpose(matrix4, matrix4);
      _glMatrix.mat3.fromMat4(matrix3, matrix4);
      _glMatrix.quat.fromMat3(this.quaternion, matrix3);

      return this;
    }
  }]);

  return Camera;
}(_Object3D3.default);

exports.default = Camera;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL0NhbWVyYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7OztJQUtNLE07OztBQUNGLG9CQUFjO0FBQUE7O0FBR1Y7Ozs7QUFIVTs7QUFPVixVQUFLLEVBQUwsR0FBVSxlQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBVjs7QUFFQTs7OztBQUlBLFVBQUssZ0JBQUwsR0FBd0IsZUFBSyxNQUFMLEVBQXhCOztBQUVBOzs7O0FBSUEsVUFBSyxlQUFMLEdBQXVCLGVBQUssTUFBTCxFQUF2Qjs7QUFFQTs7OztBQUlBLFVBQUssa0JBQUwsR0FBMEIsZUFBSyxNQUFMLEVBQTFCOztBQUVBO0FBQ0EsVUFBSyxLQUFMLEdBQWEsZUFBSyxNQUFMLEVBQWI7QUFDQSxVQUFLLE1BQUwsR0FBYyxlQUFLLE1BQUwsRUFBZDtBQUNBLFVBQUssTUFBTCxHQUFjLGVBQUssTUFBTCxFQUFkO0FBOUJVO0FBK0JiOztBQUVEOzs7Ozs7Ozs2Q0FJeUIsQ0FBRTs7QUFFM0I7Ozs7Ozt3Q0FHb0I7QUFDaEI7O0FBRUEscUJBQUssTUFBTCxDQUFZLEtBQUssa0JBQWpCLEVBQXFDLEtBQUssV0FBMUM7QUFDQSxxQkFBSyxRQUFMLENBQWMsS0FBSyxlQUFuQixFQUFvQyxLQUFLLGdCQUF6QyxFQUEyRCxLQUFLLGtCQUFoRTtBQUNIOztBQUVEOzs7Ozs7Ozs0QkFLUSxNLEVBQVE7QUFDWixVQUFNLFNBQVMsZUFBSyxNQUFMLEVBQWY7QUFDQSxxQkFBSyxhQUFMLENBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLEVBQW1DLEtBQUssZUFBeEM7QUFDQSxhQUFPLE1BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7OEJBS1UsTSxFQUFRO0FBQ2QsVUFBTSxTQUFTLEtBQUssTUFBcEI7QUFDQSxVQUFNLGdCQUFnQixLQUFLLE1BQTNCO0FBQ0EsVUFBTSxTQUFTLGVBQUssTUFBTCxFQUFmOztBQUVBLHFCQUFLLE1BQUwsQ0FBWSxhQUFaLEVBQTJCLEtBQUssZ0JBQWhDO0FBQ0EscUJBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsS0FBSyxXQUF0QixFQUFtQyxhQUFuQztBQUNBLHFCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsTUFBbkM7O0FBRUEsYUFBTyxNQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7MkJBSU8sUSxFQUFVO0FBQ2IsVUFBTSxVQUFVLEtBQUssTUFBckI7QUFDQSxVQUFNLFVBQVUsS0FBSyxLQUFyQjtBQUNBLHFCQUFLLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLEtBQUssUUFBMUIsRUFBb0MsUUFBcEMsRUFBOEMsS0FBSyxFQUFuRDtBQUNBLHFCQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQXdCLE9BQXhCO0FBQ0EscUJBQUssUUFBTCxDQUFjLE9BQWQsRUFBdUIsT0FBdkI7QUFDQSxxQkFBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUErQixPQUEvQjs7QUFFQSxhQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLE0iLCJmaWxlIjoiQ2FtZXJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9iamVjdDNEIGZyb20gJy4uL09iamVjdDNEJztcbmltcG9ydCB7dmVjMywgbWF0MywgbWF0NCwgcXVhdH0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQmtCw0LzQtdGA0LBcbiAqXG4gKiBAZXh0ZW5kcyBPYmplY3QzRFxuICovXG5jbGFzcyBDYW1lcmEgZXh0ZW5kcyBPYmplY3QzRCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0L/QtdGG0LjRhNC40YfQvdGL0Lkg0LTQu9GPINC60LDQvNC10YDRiyDQstC10LrRgtC+0YAsINC/0L7QvNC+0LPQsNGO0YnQuNC5INC+0L/RgNC10LTQtdC70LjRgtGMINC10ZEg0L/QvtC70L7QttC10L3QuNC1XG4gICAgICAgICAqIEB0eXBlIHt2ZWMzfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51cCA9IHZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LXQutGG0LjQvtC90L3QsNGPINC80LDRgtGA0LjRhtCwXG4gICAgICAgICAqIEB0eXBlIHttYXQ0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQsNGC0YDQuNGG0LAg0LzQvtC00LXQu9GMLdCy0LjQtNCwINC40YHQv9C+0LvRjNC30YPRjtGJ0LDRj9GB0Y8g0LIg0YjQtdC50LTQtdGA0LDRhSDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC60L7QvdC10YfQvdC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgICAgICAqIEB0eXBlIHttYXQ0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YLRgNC40YbQsCwg0L7QsdGA0LDRgtC90LDRjyDQuiB3b3JsZE1hdHJpeFxuICAgICAgICAgKiBAdHlwZSB7bWF0NH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud29ybGRJbnZlcnNlTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgICAgICAvLyDQktGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0L/QtdGA0LXQvNC10L3QvdGL0LUg0LTQu9GPINC80LXRgtC+0LTQvtCyXG4gICAgICAgIHRoaXMuX21hdDMgPSBtYXQzLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl9tYXQ0YSA9IG1hdDQuY3JlYXRlKCk7XG4gICAgICAgIHRoaXMuX21hdDRiID0gbWF0NC5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntCx0L3QvtCy0LvRj9C10YIg0L/RgNC+0LXQutGG0LjQvtC90L3Rg9GOINC80LDRgtGA0LjRhtGDLiDQntCx0YvRh9C90L4g0Y3RgtC+INC90YPQttC90L4g0L/QvtGB0LvQtSDQuNC30LzQtdC90LXQvdC40Y8g0L/QsNGA0LDQvNC10YLRgNC+0LIg0LrQsNC80LXRgNGLLlxuICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQsiDQvdCw0YHQu9C10LTRg9C10LzRi9GFINC60LvQsNGB0YHQsNGFLlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKSB7fVxuXG4gICAgLyoqXG4gICAgICog0J7QsdC90L7QstC70Y/QtdGCINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwINC4INC80LDRgtGA0LjRhtGDINC80L7QtNC10LvRjC3QstC40LTQsC5cbiAgICAgKiAqL1xuICAgIHVwZGF0ZVdvcmxkTWF0cml4KCkge1xuICAgICAgICBzdXBlci51cGRhdGVXb3JsZE1hdHJpeCgpO1xuXG4gICAgICAgIG1hdDQuaW52ZXJ0KHRoaXMud29ybGRJbnZlcnNlTWF0cml4LCB0aGlzLndvcmxkTWF0cml4KTtcbiAgICAgICAgbWF0NC5tdWx0aXBseSh0aGlzLm1vZGVsVmlld01hdHJpeCwgdGhpcy5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLndvcmxkSW52ZXJzZU1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LXRhtC40YDRg9C10YIg0LLQtdC60YLQvtGAINC40Lcg0LPQu9C+0LHQsNC70YzQvdC+0Lkg0YHQuNGB0YLQtdC80Ysg0LrQvtC+0YDQtNC40L3QsNGCINC90LAg0Y3QutGA0LDQvVxuICAgICAqIEBwYXJhbSB7dmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybnMge3ZlYzN9XG4gICAgICovXG4gICAgcHJvamVjdCh2ZWN0b3IpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdmVjMy50cmFuc2Zvcm1NYXQ0KHJlc3VsdCwgdmVjdG9yLCB0aGlzLm1vZGVsVmlld01hdHJpeCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LXRhtC40YDRg9C10YIg0LLQtdC60YLQvtGAINC40Lcg0YHQuNGB0YLQtdC80Ysg0LrQvtC+0YDQtNC40L3QsNGCINGN0LrRgNCw0L3QsCDQsiDQs9C70L7QsdCw0LvRjNC90YPRjlxuICAgICAqIEBwYXJhbSB7dmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybnMge3ZlYzN9XG4gICAgICovXG4gICAgdW5wcm9qZWN0KHZlY3Rvcikge1xuICAgICAgICBjb25zdCBtYXRyaXggPSB0aGlzLl9tYXQ0YTtcbiAgICAgICAgY29uc3QgaW52ZXJzZU1hdHJpeCA9IHRoaXMuX21hdDRiO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB2ZWMzLmNyZWF0ZSgpO1xuXG4gICAgICAgIG1hdDQuaW52ZXJ0KGludmVyc2VNYXRyaXgsIHRoaXMucHJvamVjdGlvbk1hdHJpeCk7XG4gICAgICAgIG1hdDQubXVsKG1hdHJpeCwgdGhpcy53b3JsZE1hdHJpeCwgaW52ZXJzZU1hdHJpeCk7XG4gICAgICAgIHZlYzMudHJhbnNmb3JtTWF0NChyZXN1bHQsIHZlY3RvciwgbWF0cml4KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCf0L7QstC+0YDQsNGH0LjQstCw0LXRgiDQutCw0LzQtdGA0YMg0YLQsNC6LCDRh9GC0L7QsdGLINGG0LXQvdGC0YAg0Y3QutGA0LDQvdCwINGC0L7Rh9C90L4g0YHQvNC+0YLRgNC10Lsg0L3QsCDRg9C60LDQt9Cw0L3QvdGD0Y4g0L/QvtC30LjRhtC40Y5cbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHBvc2l0aW9uXG4gICAgICovXG4gICAgbG9va0F0KHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeDQgPSB0aGlzLl9tYXQ0YTtcbiAgICAgICAgY29uc3QgbWF0cml4MyA9IHRoaXMuX21hdDM7XG4gICAgICAgIG1hdDQubG9va0F0KG1hdHJpeDQsIHRoaXMucG9zaXRpb24sIHBvc2l0aW9uLCB0aGlzLnVwKTtcbiAgICAgICAgbWF0NC50cmFuc3Bvc2UobWF0cml4NCwgbWF0cml4NCk7XG4gICAgICAgIG1hdDMuZnJvbU1hdDQobWF0cml4MywgbWF0cml4NCk7XG4gICAgICAgIHF1YXQuZnJvbU1hdDModGhpcy5xdWF0ZXJuaW9uLCBtYXRyaXgzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbWVyYTtcbiJdfQ==