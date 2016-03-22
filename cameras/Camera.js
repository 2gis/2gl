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
      var matrix = _glMatrix.mat4.create();
      var inverseMatrix = _glMatrix.mat4.create();
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
      var matrix4 = _glMatrix.mat4.create();
      var matrix3 = _glMatrix.mat3.create();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL0NhbWVyYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQU9NOzs7QUFDRixXQURFLE1BQ0YsR0FBYzswQkFEWixRQUNZOzs7Ozs7O3VFQURaLG9CQUNZOztBQU9WLFVBQUssRUFBTCxHQUFVLGVBQUssVUFBTCxDQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixDQUFWOzs7Ozs7QUFQVSxTQWFWLENBQUssZ0JBQUwsR0FBd0IsZUFBSyxNQUFMLEVBQXhCOzs7Ozs7QUFiVSxTQW1CVixDQUFLLGVBQUwsR0FBdUIsZUFBSyxNQUFMLEVBQXZCOzs7Ozs7QUFuQlUsU0F5QlYsQ0FBSyxrQkFBTCxHQUEwQixlQUFLLE1BQUwsRUFBMUIsQ0F6QlU7O0dBQWQ7Ozs7Ozs7O2VBREU7OzZDQWlDdUI7Ozs7Ozs7O3dDQUtMO0FBQ2hCLGlDQXZDRix3REF1Q0UsQ0FEZ0I7O0FBR2hCLHFCQUFLLE1BQUwsQ0FBWSxLQUFLLGtCQUFMLEVBQXlCLEtBQUssV0FBTCxDQUFyQyxDQUhnQjtBQUloQixxQkFBSyxRQUFMLENBQWMsS0FBSyxlQUFMLEVBQXNCLEtBQUssZ0JBQUwsRUFBdUIsS0FBSyxrQkFBTCxDQUEzRCxDQUpnQjs7Ozs7Ozs7Ozs7NEJBWVosUUFBUTtBQUNaLFVBQU0sU0FBUyxlQUFLLE1BQUwsRUFBVCxDQURNO0FBRVoscUJBQUssYUFBTCxDQUFtQixNQUFuQixFQUEyQixNQUEzQixFQUFtQyxLQUFLLGVBQUwsQ0FBbkMsQ0FGWTtBQUdaLGFBQU8sTUFBUCxDQUhZOzs7Ozs7Ozs7Ozs4QkFXTixRQUFRO0FBQ2QsVUFBTSxTQUFTLGVBQUssTUFBTCxFQUFULENBRFE7QUFFZCxVQUFNLGdCQUFnQixlQUFLLE1BQUwsRUFBaEIsQ0FGUTtBQUdkLFVBQU0sU0FBUyxlQUFLLE1BQUwsRUFBVCxDQUhROztBQUtkLHFCQUFLLE1BQUwsQ0FBWSxhQUFaLEVBQTJCLEtBQUssZ0JBQUwsQ0FBM0IsQ0FMYztBQU1kLHFCQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWlCLEtBQUssV0FBTCxFQUFrQixhQUFuQyxFQU5jO0FBT2QscUJBQUssYUFBTCxDQUFtQixNQUFuQixFQUEyQixNQUEzQixFQUFtQyxNQUFuQyxFQVBjOztBQVNkLGFBQU8sTUFBUCxDQVRjOzs7Ozs7Ozs7OzJCQWdCWCxVQUFVO0FBQ2IsVUFBTSxVQUFVLGVBQUssTUFBTCxFQUFWLENBRE87QUFFYixVQUFNLFVBQVUsZUFBSyxNQUFMLEVBQVYsQ0FGTztBQUdiLHFCQUFLLE1BQUwsQ0FBWSxPQUFaLEVBQXFCLEtBQUssUUFBTCxFQUFlLFFBQXBDLEVBQThDLEtBQUssRUFBTCxDQUE5QyxDQUhhO0FBSWIscUJBQUssU0FBTCxDQUFlLE9BQWYsRUFBd0IsT0FBeEIsRUFKYTtBQUtiLHFCQUFLLFFBQUwsQ0FBYyxPQUFkLEVBQXVCLE9BQXZCLEVBTGE7QUFNYixxQkFBSyxRQUFMLENBQWMsS0FBSyxVQUFMLEVBQWlCLE9BQS9CLEVBTmE7O0FBUWIsYUFBTyxJQUFQLENBUmE7Ozs7U0E3RWY7OztrQkF5RlMiLCJmaWxlIjoiQ2FtZXJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9iamVjdDNEIGZyb20gJy4uL09iamVjdDNEJztcbmltcG9ydCB7dmVjMywgbWF0MywgbWF0NCwgcXVhdH0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQmtCw0LzQtdGA0LBcbiAqXG4gKiBAZXh0ZW5kcyBPYmplY3QzRFxuICovXG5jbGFzcyBDYW1lcmEgZXh0ZW5kcyBPYmplY3QzRCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0L/QtdGG0LjRhNC40YfQvdGL0Lkg0LTQu9GPINC60LDQvNC10YDRiyDQstC10LrRgtC+0YAsINC/0L7QvNC+0LPQsNGO0YnQuNC5INC+0L/RgNC10LTQtdC70LjRgtGMINC10ZEg0L/QvtC70L7QttC10L3QuNC1XG4gICAgICAgICAqIEB0eXBlIHt2ZWMzfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51cCA9IHZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LXQutGG0LjQvtC90L3QsNGPINC80LDRgtGA0LjRhtCwXG4gICAgICAgICAqIEB0eXBlIHttYXQ0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQsNGC0YDQuNGG0LAg0LzQvtC00LXQu9GMLdCy0LjQtNCwINC40YHQv9C+0LvRjNC30YPRjtGJ0LDRj9GB0Y8g0LIg0YjQtdC50LTQtdGA0LDRhSDQtNC70Y8g0L/QvtC70YPRh9C10L3QuNGPINC60L7QvdC10YfQvdC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPXG4gICAgICAgICAqIEB0eXBlIHttYXQ0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb2RlbFZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YLRgNC40YbQsCwg0L7QsdGA0LDRgtC90LDRjyDQuiB3b3JsZE1hdHJpeFxuICAgICAgICAgKiBAdHlwZSB7bWF0NH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud29ybGRJbnZlcnNlTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntCx0L3QvtCy0LvRj9C10YIg0L/RgNC+0LXQutGG0LjQvtC90L3Rg9GOINC80LDRgtGA0LjRhtGDLiDQntCx0YvRh9C90L4g0Y3RgtC+INC90YPQttC90L4g0L/QvtGB0LvQtSDQuNC30LzQtdC90LXQvdC40Y8g0L/QsNGA0LDQvNC10YLRgNC+0LIg0LrQsNC80LXRgNGLLlxuICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQsiDQvdCw0YHQu9C10LTRg9C10LzRi9GFINC60LvQsNGB0YHQsNGFLlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKSB7fVxuXG4gICAgLyoqXG4gICAgICog0J7QsdC90L7QstC70Y/QtdGCINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwINC4INC80LDRgtGA0LjRhtGDINC80L7QtNC10LvRjC3QstC40LTQsC5cbiAgICAgKiAqL1xuICAgIHVwZGF0ZVdvcmxkTWF0cml4KCkge1xuICAgICAgICBzdXBlci51cGRhdGVXb3JsZE1hdHJpeCgpO1xuXG4gICAgICAgIG1hdDQuaW52ZXJ0KHRoaXMud29ybGRJbnZlcnNlTWF0cml4LCB0aGlzLndvcmxkTWF0cml4KTtcbiAgICAgICAgbWF0NC5tdWx0aXBseSh0aGlzLm1vZGVsVmlld01hdHJpeCwgdGhpcy5wcm9qZWN0aW9uTWF0cml4LCB0aGlzLndvcmxkSW52ZXJzZU1hdHJpeCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LXRhtC40YDRg9C10YIg0LLQtdC60YLQvtGAINC40Lcg0LPQu9C+0LHQsNC70YzQvdC+0Lkg0YHQuNGB0YLQtdC80Ysg0LrQvtC+0YDQtNC40L3QsNGCINC90LAg0Y3QutGA0LDQvVxuICAgICAqIEBwYXJhbSB7dmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybnMge3ZlYzN9XG4gICAgICovXG4gICAgcHJvamVjdCh2ZWN0b3IpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmVjMy5jcmVhdGUoKTtcbiAgICAgICAgdmVjMy50cmFuc2Zvcm1NYXQ0KHJlc3VsdCwgdmVjdG9yLCB0aGlzLm1vZGVsVmlld01hdHJpeCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LXRhtC40YDRg9C10YIg0LLQtdC60YLQvtGAINC40Lcg0YHQuNGB0YLQtdC80Ysg0LrQvtC+0YDQtNC40L3QsNGCINGN0LrRgNCw0L3QsCDQsiDQs9C70L7QsdCw0LvRjNC90YPRjlxuICAgICAqIEBwYXJhbSB7dmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybnMge3ZlYzN9XG4gICAgICovXG4gICAgdW5wcm9qZWN0KHZlY3Rvcikge1xuICAgICAgICBjb25zdCBtYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBjb25zdCBpbnZlcnNlTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdmVjMy5jcmVhdGUoKTtcblxuICAgICAgICBtYXQ0LmludmVydChpbnZlcnNlTWF0cml4LCB0aGlzLnByb2plY3Rpb25NYXRyaXgpO1xuICAgICAgICBtYXQ0Lm11bChtYXRyaXgsIHRoaXMud29ybGRNYXRyaXgsIGludmVyc2VNYXRyaXgpO1xuICAgICAgICB2ZWMzLnRyYW5zZm9ybU1hdDQocmVzdWx0LCB2ZWN0b3IsIG1hdHJpeCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9C+0LLQvtGA0LDRh9C40LLQsNC10YIg0LrQsNC80LXRgNGDINGC0LDQuiwg0YfRgtC+0LHRiyDRhtC10L3RgtGAINGN0LrRgNCw0L3QsCDRgtC+0YfQvdC+INGB0LzQvtGC0YDQtdC7INC90LAg0YPQutCw0LfQsNC90L3Rg9GOINC/0L7Qt9C40YbQuNGOXG4gICAgICogQHBhcmFtIHt2ZWMzfSBwb3NpdGlvblxuICAgICAqL1xuICAgIGxvb2tBdChwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBtYXRyaXg0ID0gbWF0NC5jcmVhdGUoKTtcbiAgICAgICAgY29uc3QgbWF0cml4MyA9IG1hdDMuY3JlYXRlKCk7XG4gICAgICAgIG1hdDQubG9va0F0KG1hdHJpeDQsIHRoaXMucG9zaXRpb24sIHBvc2l0aW9uLCB0aGlzLnVwKTtcbiAgICAgICAgbWF0NC50cmFuc3Bvc2UobWF0cml4NCwgbWF0cml4NCk7XG4gICAgICAgIG1hdDMuZnJvbU1hdDQobWF0cml4MywgbWF0cml4NCk7XG4gICAgICAgIHF1YXQuZnJvbU1hdDModGhpcy5xdWF0ZXJuaW9uLCBtYXRyaXgzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbWVyYTtcbiJdfQ==