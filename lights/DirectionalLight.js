'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _libConstants = require('../libConstants');

var _Light2 = require('./Light');

var _Light3 = _interopRequireDefault(_Light2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Источник направленного освещения.
 * Для этого типа света важно направление.
 *
 * @extends Light
 */
var DirectionalLight = function (_Light) {
  _inherits(DirectionalLight, _Light);

  function DirectionalLight(color) {
    _classCallCheck(this, DirectionalLight);

    /**
     * Используется для обозначения типа света
     * @type {Number}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalLight).call(this, color));

    _this.type = _libConstants.DIRECTIONAL_LIGHT;
    return _this;
  }

  return DirectionalLight;
}(_Light3.default);

exports.default = DirectionalLight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztJQU1NLGdCOzs7QUFDRiw0QkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBR2Y7Ozs7QUFIZSxvR0FDVCxLQURTOztBQU9mLFVBQUssSUFBTDtBQVBlO0FBUWxCOzs7OztrQkFHVSxnQiIsImZpbGUiOiJEaXJlY3Rpb25hbExpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtESVJFQ1RJT05BTF9MSUdIVH0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcbmltcG9ydCBMaWdodCBmcm9tICcuL0xpZ2h0JztcblxuLyoqXG4gKiDQmNGB0YLQvtGH0L3QuNC6INC90LDQv9GA0LDQstC70LXQvdC90L7Qs9C+INC+0YHQstC10YnQtdC90LjRjy5cbiAqINCU0LvRjyDRjdGC0L7Qs9C+INGC0LjQv9CwINGB0LLQtdGC0LAg0LLQsNC20L3QviDQvdCw0L/RgNCw0LLQu9C10L3QuNC1LlxuICpcbiAqIEBleHRlbmRzIExpZ2h0XG4gKi9cbmNsYXNzIERpcmVjdGlvbmFsTGlnaHQgZXh0ZW5kcyBMaWdodCB7XG4gICAgY29uc3RydWN0b3IoY29sb3IpIHtcbiAgICAgICAgc3VwZXIoY29sb3IpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0LHQvtC30L3QsNGH0LXQvdC40Y8g0YLQuNC/0LAg0YHQstC10YLQsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gRElSRUNUSU9OQUxfTElHSFQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXJlY3Rpb25hbExpZ2h0O1xuIl19