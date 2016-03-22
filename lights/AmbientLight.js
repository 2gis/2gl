'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AmbientLight).call(this, color));
    }

    return AmbientLight;
}(_Light3.default);

exports.default = AmbientLight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWdodHMvQW1iaWVudExpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPTTs7O0FBQ0YsYUFERSxZQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsY0FDaUI7O3NFQURqQix5QkFFUSxRQURTO0tBQW5COztXQURFOzs7a0JBTVMiLCJmaWxlIjoiQW1iaWVudExpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpZ2h0IGZyb20gJy4vTGlnaHQnO1xuXG4vKipcbiAqINCY0YHRgtC+0YfQvdC40Log0L/QvtGB0YLQvtGP0L3QvdC+0LPQviDRgdCy0LXRgtCwLiDQlNC10LnRgdGC0LLRg9C10YIg0L3QsCDQstGB0LUg0L7QsdGK0LXQutGC0Ysg0Lgg0LLQviDQstGB0LXRhSDQvdCw0L/RgNCw0LLQu9C10L3QuNGP0YUuXG4gKlxuICogQGV4dGVuZHMgTGlnaHRcbiAqL1xuY2xhc3MgQW1iaWVudExpZ2h0IGV4dGVuZHMgTGlnaHQge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgICAgIHN1cGVyKGNvbG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFtYmllbnRMaWdodDtcbiJdfQ==