'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _Camera2 = require('./Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYW1lcmFzL09ydGhvZ3JhcGhpY0NhbWVyYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPTTs7Ozs7Ozs7Ozs7O0FBU0YsV0FURSxrQkFTRixDQUFZLElBQVosRUFBa0IsS0FBbEIsRUFBeUIsR0FBekIsRUFBOEIsTUFBOUIsRUFBc0MsSUFBdEMsRUFBNEMsR0FBNUMsRUFBaUQ7MEJBVC9DLG9CQVMrQzs7Ozs7Ozt1RUFUL0MsZ0NBUytDOztBQU83QyxVQUFLLElBQUwsR0FBWSxJQUFaOzs7Ozs7QUFQNkMsU0FhN0MsQ0FBSyxLQUFMLEdBQWEsS0FBYjs7Ozs7O0FBYjZDLFNBbUI3QyxDQUFLLEdBQUwsR0FBVyxHQUFYOzs7Ozs7QUFuQjZDLFNBeUI3QyxDQUFLLE1BQUwsR0FBYyxNQUFkOzs7Ozs7QUF6QjZDLFNBK0I3QyxDQUFLLElBQUwsR0FBWSxJQUFaOzs7Ozs7QUEvQjZDLFNBcUM3QyxDQUFLLEdBQUwsR0FBVyxHQUFYLENBckM2Qzs7R0FBakQ7O2VBVEU7OzZDQWlEdUI7QUFDckIscUJBQUssS0FBTCxDQUFXLEtBQUssZ0JBQUwsRUFBdUIsS0FBSyxJQUFMLEVBQVcsS0FBSyxLQUFMLEVBQVksS0FBSyxNQUFMLEVBQWEsS0FBSyxHQUFMLEVBQVUsS0FBSyxJQUFMLEVBQVcsS0FBSyxHQUFMLENBQTNGLENBRHFCOzs7O1NBakR2Qjs7O2tCQXNEUyIsImZpbGUiOiJPcnRob2dyYXBoaWNDYW1lcmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21hdDR9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vQ2FtZXJhJztcblxuLyoqXG4gKiDQl9Cw0LTQsNGR0YIg0L7RgNGE0L7Qs9GA0LDRhNC40YfQtdGB0LrRg9GOINC60LDQvNC10YDRg1xuICpcbiAqIEBleHRlbmRzIENhbWVyYVxuICovXG5jbGFzcyBPcnRob2dyYXBoaWNDYW1lcmEgZXh0ZW5kcyBDYW1lcmEge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0INCb0LXQstCw0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCDQn9GA0LDQstCw0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3Ag0JLQtdGA0YXQvdGP0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20g0J3QuNC20L3Rj9GPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbmVhciDQnNC40L3QuNC80LDQu9GM0L3QvtC1INGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQsNC80LXRgNGLINC00L4g0L7QsdGK0LXQutGC0L7Qsiwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQvtGC0L7QsdGA0LDQttCw0YLRjNGB0Y9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZmFyINCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCBuZWFyLCBmYXIpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JvQtdCy0LDRjyDQv9C70L7RgdC60L7RgdGC0Ywg0LrQsNC80LXRgNGLXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9GA0LDQstCw0Y8g0L/Qu9C+0YHQutC+0YHRgtGMINC60LDQvNC10YDRi1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQktC10YDRhdC90Y/RjyDQv9C70L7RgdC60L7RgdGC0Ywg0LrQsNC80LXRgNGLXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRvcCA9IHRvcDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J3QuNC20L3Rj9GPINC/0LvQvtGB0LrQvtGB0YLRjCDQutCw0LzQtdGA0YtcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNC40L3QuNC80LDQu9GM0L3QvtC1INGA0LDRgdGB0YLQvtGP0L3QuNC1INC+0YIg0LrQsNC80LXRgNGLINC00L4g0L7QsdGK0LXQutGC0L7Qsiwg0LrQvtGC0L7RgNGL0LUg0LHRg9C00YPRgiDQvtGC0L7QsdGA0LDQttCw0YLRjNGB0Y9cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmVhciA9IG5lYXI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINC60LDQvNC10YDRiyDQtNC+INC+0LHRitC10LrRgtC+0LIsINC60L7RgtC+0YDRi9C1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZhciA9IGZhcjtcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9qZWN0aW9uTWF0cml4KCkge1xuICAgICAgICBtYXQ0Lm9ydGhvKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgdGhpcy5sZWZ0LCB0aGlzLnJpZ2h0LCB0aGlzLmJvdHRvbSwgdGhpcy50b3AsIHRoaXMubmVhciwgdGhpcy5mYXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3J0aG9ncmFwaGljQ2FtZXJhO1xuIl19