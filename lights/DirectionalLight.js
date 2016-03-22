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
 * Источник направленного освещения.
 * Для этого типа света важно направление.
 *
 * @extends Light
 */

var DirectionalLight = function (_Light) {
    _inherits(DirectionalLight, _Light);

    function DirectionalLight(color) {
        _classCallCheck(this, DirectionalLight);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalLight).call(this, color));
    }

    return DirectionalLight;
}(_Light3.default);

exports.default = DirectionalLight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWdodHMvRGlyZWN0aW9uYWxMaWdodC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFNOzs7QUFDRixhQURFLGdCQUNGLENBQVksS0FBWixFQUFtQjs4QkFEakIsa0JBQ2lCOztzRUFEakIsNkJBRVEsUUFEUztLQUFuQjs7V0FERTs7O2tCQU1TIiwiZmlsZSI6IkRpcmVjdGlvbmFsTGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGlnaHQgZnJvbSAnLi9MaWdodCc7XG5cbi8qKlxuICog0JjRgdGC0L7Rh9C90LjQuiDQvdCw0L/RgNCw0LLQu9C10L3QvdC+0LPQviDQvtGB0LLQtdGJ0LXQvdC40Y8uXG4gKiDQlNC70Y8g0Y3RgtC+0LPQviDRgtC40L/QsCDRgdCy0LXRgtCwINCy0LDQttC90L4g0L3QsNC/0YDQsNCy0LvQtdC90LjQtS5cbiAqXG4gKiBAZXh0ZW5kcyBMaWdodFxuICovXG5jbGFzcyBEaXJlY3Rpb25hbExpZ2h0IGV4dGVuZHMgTGlnaHQge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yKSB7XG4gICAgICAgIHN1cGVyKGNvbG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpcmVjdGlvbmFsTGlnaHQ7XG4iXX0=