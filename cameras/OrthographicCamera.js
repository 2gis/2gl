'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Camera2 = require('./Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Задаёт орфографическую камеру
 *
 * @extends Camera
 */
var OrthographicCamera = function (_Camera) {
  _inherits(OrthographicCamera, _Camera);

  /**
   * @param {Number} left Левая плоскость камеры
   * @param {Number} right Правая плоскость камеры
   * @param {Number} top Верхняя плоскость камеры
   * @param {Number} bottom Нижняя плоскость камеры
   * @param {Number} near Минимальное расстояние от камеры до объектов, которые будут отображаться
   * @param {Number} far Максимальное расстояние от камеры до объектов, которые будут отображаться
   */
  function OrthographicCamera(left, right, top, bottom, near, far) {
    _classCallCheck(this, OrthographicCamera);

    /**
     * Левая плоскость камеры
     * @type {Number}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OrthographicCamera).call(this));

    _this.left = left;

    /**
     * Правая плоскость камеры
     * @type {Number}
     */
    _this.right = right;

    /**
     * Верхняя плоскость камеры
     * @type {Number}
     */
    _this.top = top;

    /**
     * Нижняя плоскость камеры
     * @type {Number}
     */
    _this.bottom = bottom;

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

    /**
     * Используется для обозначения типа камеры
     * @type {Number}
     */
    _this.type = _libConstants.ORTHOGRAPHIC_CAMERA;
    return _this;
  }

  _createClass(OrthographicCamera, [{
    key: 'updateProjectionMatrix',
    value: function updateProjectionMatrix() {
      _glMatrix.mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);
    }
  }]);

  return OrthographicCamera;
}(_Camera3.default);

exports.default = OrthographicCamera;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL09ydGhvZ3JhcGhpY0NhbWVyYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTSxrQjs7O0FBQ0Y7Ozs7Ozs7O0FBUUEsOEJBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QixHQUF6QixFQUE4QixNQUE5QixFQUFzQyxJQUF0QyxFQUE0QyxHQUE1QyxFQUFpRDtBQUFBOztBQUc3Qzs7OztBQUg2Qzs7QUFPN0MsVUFBSyxJQUFMLEdBQVksSUFBWjs7QUFFQTs7OztBQUlBLFVBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUE7Ozs7QUFJQSxVQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBOzs7O0FBSUEsVUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQTs7OztBQUlBLFVBQUssSUFBTCxHQUFZLElBQVo7O0FBRUE7Ozs7QUFJQSxVQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBOzs7O0FBSUEsVUFBSyxJQUFMO0FBM0M2QztBQTRDaEQ7Ozs7NkNBRXdCO0FBQ3JCLHFCQUFLLEtBQUwsQ0FBVyxLQUFLLGdCQUFoQixFQUFrQyxLQUFLLElBQXZDLEVBQTZDLEtBQUssS0FBbEQsRUFBeUQsS0FBSyxNQUE5RCxFQUFzRSxLQUFLLEdBQTNFLEVBQWdGLEtBQUssSUFBckYsRUFBMkYsS0FBSyxHQUFoRztBQUNIOzs7Ozs7a0JBR1Usa0IiLCJmaWxlIjoiT3J0aG9ncmFwaGljQ2FtZXJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttYXQ0fSBmcm9tICdnbC1tYXRyaXgnO1xuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XG5pbXBvcnQge09SVEhPR1JBUEhJQ19DQU1FUkF9IGZyb20gJy4uL2xpYkNvbnN0YW50cyc7XG5cbi8qKlxuICog0JfQsNC00LDRkdGCINC+0YDRhNC+0LPRgNCw0YTQuNGH0LXRgdC60YPRjiDQutCw0LzQtdGA0YNcbiAqXG4gKiBAZXh0ZW5kcyBDYW1lcmFcbiAqL1xuY2xhc3MgT3J0aG9ncmFwaGljQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVmdCDQm9C10LLQsNGPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmlnaHQg0J/RgNCw0LLQsNGPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9wINCS0LXRgNGF0L3Rj9GPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYm90dG9tINCd0LjQttC90Y/RjyDQv9C70L7RgdC60L7RgdGC0Ywg0LrQsNC80LXRgNGLXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIg0JzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZhciDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutCw0LzQtdGA0Ysg0LTQviDQvtCx0YrQtdC60YLQvtCyLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRj1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgbmVhciwgZmFyKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCb0LXQstCw0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNCw0LLQsNGPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JLQtdGA0YXQvdGP0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b3AgPSB0b3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCd0LjQttC90Y/RjyDQv9C70L7RgdC60L7RgdGC0Ywg0LrQsNC80LXRgNGLXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5lYXIgPSBuZWFyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutCw0LzQtdGA0Ysg0LTQviDQvtCx0YrQtdC60YLQvtCyLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRj1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mYXIgPSBmYXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7QsdC+0LfQvdCw0YfQtdC90LjRjyDRgtC40L/QsCDQutCw0LzQtdGA0YtcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IE9SVEhPR1JBUEhJQ19DQU1FUkE7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpIHtcbiAgICAgICAgbWF0NC5vcnRobyh0aGlzLnByb2plY3Rpb25NYXRyaXgsIHRoaXMubGVmdCwgdGhpcy5yaWdodCwgdGhpcy5ib3R0b20sIHRoaXMudG9wLCB0aGlzLm5lYXIsIHRoaXMuZmFyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9ydGhvZ3JhcGhpY0NhbWVyYTtcbiJdfQ==