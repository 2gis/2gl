'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Camera2 = require('./Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

var _Math = require('../math/Math');

var _libConstants = require('../libConstants');

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

    /**
     * Используется для обозначения типа камеры
     * @type {Number}
     */
    _this.type = _libConstants.PERSPECTIVE_CAMERA;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL1BlcnNwZWN0aXZlQ2FtZXJhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7OztJQUtNLGlCOzs7QUFDRjs7Ozs7O0FBTUEsNkJBQVksR0FBWixFQUFpQixNQUFqQixFQUF5QixJQUF6QixFQUErQixHQUEvQixFQUFvQztBQUFBOztBQUdoQzs7OztBQUhnQzs7QUFPaEMsVUFBSyxHQUFMLEdBQVcsR0FBWDs7QUFFQTs7OztBQUlBLFVBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUE7Ozs7QUFJQSxVQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBOzs7O0FBSUEsVUFBSyxHQUFMLEdBQVcsR0FBWDs7QUFFQTs7OztBQUlBLFVBQUssSUFBTDtBQS9CZ0M7QUFnQ25DOzs7OzZDQUV3QjtBQUNyQixxQkFBSyxXQUFMLENBQWlCLEtBQUssZ0JBQXRCLEVBQXdDLG9CQUFTLEtBQUssR0FBZCxDQUF4QyxFQUE0RCxLQUFLLE1BQWpFLEVBQXlFLEtBQUssSUFBOUUsRUFBb0YsS0FBSyxHQUF6RjtBQUNIOzs7Ozs7a0JBR1UsaUIiLCJmaWxlIjoiUGVyc3BlY3RpdmVDYW1lcmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21hdDR9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vQ2FtZXJhJztcbmltcG9ydCB7ZGVnVG9SYWR9IGZyb20gJy4uL21hdGgvTWF0aCc7XG5pbXBvcnQge1BFUlNQRUNUSVZFX0NBTUVSQX0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcblxuLyoqXG4gKiDQl9Cw0LTQsNGR0YIg0L/QtdGA0YHQv9C10LrRgtC40LLQvdGD0Y4g0LrQsNC80LXRgNGDXG4gKlxuICogQGV4dGVuZHMgQ2FtZXJhXG4gKi9cbmNsYXNzIFBlcnNwZWN0aXZlQ2FtZXJhIGV4dGVuZHMgQ2FtZXJhIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZm92INCj0LPQuyDQvtCx0LfQvtGA0LAg0LrQsNC80LXRgNGLINCyINCz0YDQsNC00YPRgdCw0YVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXNwZWN0INCh0L7QvtGC0L3QvtGI0LXQvdC40LUg0YHRgtC+0YDQvtC9XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIg0JzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZhciDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutCw0LzQtdGA0Ysg0LTQviDQvtCx0YrQtdC60YLQvtCyLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRj1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvdiwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KPQs9C7INC+0LHQt9C+0YDQsCDQutCw0LzQtdGA0Ysg0LIg0LPRgNCw0LTRg9GB0LDRhVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mb3YgPSBmb3Y7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0L7QvtGC0L3QvtGI0LXQvdC40LUg0YHRgtC+0YDQvtC9XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFzcGVjdCA9IGFzcGVjdDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQuNC90LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5lYXIgPSBuZWFyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQutCw0LzQtdGA0Ysg0LTQviDQvtCx0YrQtdC60YLQvtCyLCDQutC+0YLQvtGA0YvQtSDQsdGD0LTRg9GCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRj1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mYXIgPSBmYXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7QsdC+0LfQvdCw0YfQtdC90LjRjyDRgtC40L/QsCDQutCw0LzQtdGA0YtcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IFBFUlNQRUNUSVZFX0NBTUVSQTtcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9qZWN0aW9uTWF0cml4KCkge1xuICAgICAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgZGVnVG9SYWQodGhpcy5mb3YpLCB0aGlzLmFzcGVjdCwgdGhpcy5uZWFyLCB0aGlzLmZhcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQZXJzcGVjdGl2ZUNhbWVyYTtcbiJdfQ==