'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Camera2 = require('./Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

var _Math = require('../math/Math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Задаёт перспективную камеру
 *
 * @extends Camera
 */

var PerspectiveCamera = function (_Camera) {
  _inherits(PerspectiveCamera, _Camera);

  /**
   * @param {Number} fov Угл обзора камеры в градусах
   * @param {Number} aspect Соотношение сторон
   * @param {Number} near Минимальное расстояние от камеры до объектов, которые будут отображаться
   * @param {Number} far Максимальное расстояние от камеры до объектов, которые будут отображаться
   */

  function PerspectiveCamera(fov, aspect, near, far) {
    _classCallCheck(this, PerspectiveCamera);

    /**
     * Угл обзора камеры в градусах
     * @type {Number}
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectiveCamera).call(this));

    _this.fov = fov;

    /**
     * Соотношение сторон
     * @type {Number}
     */
    _this.aspect = aspect;

    /**
     * Минимальное расстояние от камеры до объектов, которые будут отображаться
     * @type {Number}
     */
    _this.near = near;

    /**
     * Максимальное расстояние от камеры до объектов, которые будут отображаться
     * @type {Number}
     */
    _this.far = far;
    return _this;
  }

  _createClass(PerspectiveCamera, [{
    key: 'updateProjectionMatrix',
    value: function updateProjectionMatrix() {
      _glMatrix.mat4.perspective(this.projectionMatrix, (0, _Math.degToRad)(this.fov), this.aspect, this.near, this.far);
    }
  }]);

  return PerspectiveCamera;
}(_Camera3.default);

exports.default = PerspectiveCamera;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQU9NOzs7Ozs7Ozs7O0FBT0YsV0FQRSxpQkFPRixDQUFZLEdBQVosRUFBaUIsTUFBakIsRUFBeUIsSUFBekIsRUFBK0IsR0FBL0IsRUFBb0M7MEJBUGxDLG1CQU9rQzs7Ozs7Ozt1RUFQbEMsK0JBT2tDOztBQU9oQyxVQUFLLEdBQUwsR0FBVyxHQUFYOzs7Ozs7QUFQZ0MsU0FhaEMsQ0FBSyxNQUFMLEdBQWMsTUFBZDs7Ozs7O0FBYmdDLFNBbUJoQyxDQUFLLElBQUwsR0FBWSxJQUFaOzs7Ozs7QUFuQmdDLFNBeUJoQyxDQUFLLEdBQUwsR0FBVyxHQUFYLENBekJnQzs7R0FBcEM7O2VBUEU7OzZDQW1DdUI7QUFDckIscUJBQUssV0FBTCxDQUFpQixLQUFLLGdCQUFMLEVBQXVCLG9CQUFTLEtBQUssR0FBTCxDQUFqRCxFQUE0RCxLQUFLLE1BQUwsRUFBYSxLQUFLLElBQUwsRUFBVyxLQUFLLEdBQUwsQ0FBcEYsQ0FEcUI7Ozs7U0FuQ3ZCOzs7a0JBd0NTIiwiZmlsZSI6IlBlcnNwZWN0aXZlQ2FtZXJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttYXQ0fSBmcm9tICdnbC1tYXRyaXgnO1xuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XG5pbXBvcnQge2RlZ1RvUmFkfSBmcm9tICcuLi9tYXRoL01hdGgnO1xuXG4vKipcbiAqINCX0LDQtNCw0ZHRgiDQv9C10YDRgdC/0LXQutGC0LjQstC90YPRjiDQutCw0LzQtdGA0YNcbiAqXG4gKiBAZXh0ZW5kcyBDYW1lcmFcbiAqL1xuY2xhc3MgUGVyc3BlY3RpdmVDYW1lcmEgZXh0ZW5kcyBDYW1lcmEge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmb3Yg0KPQs9C7INC+0LHQt9C+0YDQsCDQutCw0LzQtdGA0Ysg0LIg0LPRgNCw0LTRg9GB0LDRhVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhc3BlY3Qg0KHQvtC+0YLQvdC+0YjQtdC90LjQtSDRgdGC0L7RgNC+0L1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbmVhciDQnNC40L3QuNC80LDQu9GM0L3QvtC1INGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQsNC80LXRgNGLINC00L4g0L7QsdGK0LXQutGC0L7Qsiwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQvtGC0L7QsdGA0LDQttCw0YLRjNGB0Y9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZmFyINCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZm92LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQo9Cz0Lsg0L7QsdC30L7RgNCwINC60LDQvNC10YDRiyDQsiDQs9GA0LDQtNGD0YHQsNGFXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZvdiA9IGZvdjtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KHQvtC+0YLQvdC+0YjQtdC90LjQtSDRgdGC0L7RgNC+0L1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXNwZWN0ID0gYXNwZWN0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNC40L3QuNC80LDQu9GM0L3QvtC1INGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQsNC80LXRgNGLINC00L4g0L7QsdGK0LXQutGC0L7Qsiwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQvtGC0L7QsdGA0LDQttCw0YLRjNGB0Y9cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmVhciA9IG5lYXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZhciA9IGZhcjtcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9qZWN0aW9uTWF0cml4KCkge1xuICAgICAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgZGVnVG9SYWQodGhpcy5mb3YpLCB0aGlzLmFzcGVjdCwgdGhpcy5uZWFyLCB0aGlzLmZhcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQZXJzcGVjdGl2ZUNhbWVyYTtcbiJdfQ==