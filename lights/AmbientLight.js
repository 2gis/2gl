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
 * Источник постоянного света. Действует на все объекты и во всех направлениях.
 *
 * @extends Light
 */
var AmbientLight = function (_Light) {
  _inherits(AmbientLight, _Light);

  function AmbientLight(color) {
    _classCallCheck(this, AmbientLight);

    /**
     * Используется для обозначения типа света
     * @type {Number}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AmbientLight).call(this, color));

    _this.type = _libConstants.AMBIENT_LIGHT;
    return _this;
  }

  return AmbientLight;
}(_Light3.default);

exports.default = AmbientLight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWdodHMvQW1iaWVudExpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLTSxZOzs7QUFDRix3QkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBR2Y7Ozs7QUFIZSxnR0FDVCxLQURTOztBQU9mLFVBQUssSUFBTDtBQVBlO0FBUWxCOzs7OztrQkFHVSxZIiwiZmlsZSI6IkFtYmllbnRMaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QU1CSUVOVF9MSUdIVH0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcbmltcG9ydCBMaWdodCBmcm9tICcuL0xpZ2h0JztcblxuLyoqXG4gKiDQmNGB0YLQvtGH0L3QuNC6INC/0L7RgdGC0L7Rj9C90L3QvtCz0L4g0YHQstC10YLQsC4g0JTQtdC50YHRgtCy0YPQtdGCINC90LAg0LLRgdC1INC+0LHRitC10LrRgtGLINC4INCy0L4g0LLRgdC10YUg0L3QsNC/0YDQsNCy0LvQtdC90LjRj9GFLlxuICpcbiAqIEBleHRlbmRzIExpZ2h0XG4gKi9cbmNsYXNzIEFtYmllbnRMaWdodCBleHRlbmRzIExpZ2h0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb2xvcikge1xuICAgICAgICBzdXBlcihjb2xvcik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7QsdC+0LfQvdCw0YfQtdC90LjRjyDRgtC40L/QsCDRgdCy0LXRgtCwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBBTUJJRU5UX0xJR0hUO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW1iaWVudExpZ2h0O1xuIl19