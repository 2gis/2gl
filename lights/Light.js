'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Object3D2 = require('../Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Базовый класс для создания источника света.
 * Сам по себе не используется.
 *
 * @extends Object3D
 */

var Light = function (_Object3D) {
  _inherits(Light, _Object3D);

  /**
   * @param {Array} color Цвет в формате RGB
   */

  function Light(color) {
    _classCallCheck(this, Light);

    /**
     * Цвет в формате RGB
     * @type {Array}
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Light).call(this));

    _this.color = color;
    return _this;
  }

  return Light;
}(_Object3D3.default);

exports.default = Light;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWdodHMvTGlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRTTs7Ozs7OztBQUlGLFdBSkUsS0FJRixDQUFZLEtBQVosRUFBbUI7MEJBSmpCLE9BSWlCOzs7Ozs7O3VFQUpqQixtQkFJaUI7O0FBT2YsVUFBSyxLQUFMLEdBQWEsS0FBYixDQVBlOztHQUFuQjs7U0FKRTs7O2tCQWVTIiwiZmlsZSI6IkxpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9iamVjdDNEIGZyb20gJy4uL09iamVjdDNEJztcblxuLyoqXG4gKiDQkdCw0LfQvtCy0YvQuSDQutC70LDRgdGBINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINC40YHRgtC+0YfQvdC40LrQsCDRgdCy0LXRgtCwLlxuICog0KHQsNC8INC/0L4g0YHQtdCx0LUg0L3QtSDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8uXG4gKlxuICogQGV4dGVuZHMgT2JqZWN0M0RcbiAqL1xuY2xhc3MgTGlnaHQgZXh0ZW5kcyBPYmplY3QzRCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheX0gY29sb3Ig0KbQstC10YIg0LIg0YTQvtGA0LzQsNGC0LUgUkdCXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29sb3IpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KbQstC10YIg0LIg0YTQvtGA0LzQsNGC0LUgUkdCXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpZ2h0O1xuIl19