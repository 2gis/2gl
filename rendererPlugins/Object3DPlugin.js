'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RendererPlugin2 = require('../RendererPlugin');

var _RendererPlugin3 = _interopRequireDefault(_RendererPlugin2);

var _libConstants = require('../libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Плагин - заглушка для {@link Object3D}.
 * Он не делает ничего лишнего, только вызывает метод {@link Object3D#render}.
 * Этот плагин должен всегда рендериться первым и добавляется автоматически.
 *
 * @extends RendererPlugin
 */
var Object3DPlugin = function (_RendererPlugin) {
  _inherits(Object3DPlugin, _RendererPlugin);

  function Object3DPlugin() {
    _classCallCheck(this, Object3DPlugin);

    /**
     * Используется для обозначения типа плагина
     * @type {Number}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Object3DPlugin).call(this));

    _this.type = _libConstants.OBJECT_3D_RENDERER;
    return _this;
  }

  /**
   * Вызывает {@link Object3D#render}
   * @param {State} state
   */


  _createClass(Object3DPlugin, [{
    key: 'render',
    value: function render(state) {
      this._objects.forEach(function (object) {
        return object.render(state);
      });
      this._objects = [];

      return this;
    }
  }]);

  return Object3DPlugin;
}(_RendererPlugin3.default);

exports.default = Object3DPlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlclBsdWdpbnMvT2JqZWN0M0RQbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPTSxjOzs7QUFDRiw0QkFBYztBQUFBOztBQUdWOzs7O0FBSFU7O0FBT1YsVUFBSyxJQUFMO0FBUFU7QUFRYjs7QUFFRDs7Ozs7Ozs7MkJBSU8sSyxFQUFPO0FBQ1YsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtBQUFBLGVBQVUsT0FBTyxNQUFQLENBQWMsS0FBZCxDQUFWO0FBQUEsT0FBdEI7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsYUFBTyxJQUFQO0FBQ0g7Ozs7OztrQkFHVSxjIiwiZmlsZSI6Ik9iamVjdDNEUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbmRlcmVyUGx1Z2luIGZyb20gJy4uL1JlbmRlcmVyUGx1Z2luJztcbmltcG9ydCB7T0JKRUNUXzNEX1JFTkRFUkVSfSBmcm9tICcuLi9saWJDb25zdGFudHMnO1xuXG4vKipcbiAqINCf0LvQsNCz0LjQvSAtINC30LDQs9C70YPRiNC60LAg0LTQu9GPIHtAbGluayBPYmplY3QzRH0uXG4gKiDQntC9INC90LUg0LTQtdC70LDQtdGCINC90LjRh9C10LPQviDQu9C40YjQvdC10LPQviwg0YLQvtC70YzQutC+INCy0YvQt9GL0LLQsNC10YIg0LzQtdGC0L7QtCB7QGxpbmsgT2JqZWN0M0QjcmVuZGVyfS5cbiAqINCt0YLQvtGCINC/0LvQsNCz0LjQvSDQtNC+0LvQttC10L0g0LLRgdC10LPQtNCwINGA0LXQvdC00LXRgNC40YLRjNGB0Y8g0L/QtdGA0LLRi9C8INC4INC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LguXG4gKlxuICogQGV4dGVuZHMgUmVuZGVyZXJQbHVnaW5cbiAqL1xuY2xhc3MgT2JqZWN0M0RQbHVnaW4gZXh0ZW5kcyBSZW5kZXJlclBsdWdpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7QsdC+0LfQvdCw0YfQtdC90LjRjyDRgtC40L/QsCDQv9C70LDQs9C40L3QsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gT0JKRUNUXzNEX1JFTkRFUkVSO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YIge0BsaW5rIE9iamVjdDNEI3JlbmRlcn1cbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZVxuICAgICAqL1xuICAgIHJlbmRlcihzdGF0ZSkge1xuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2gob2JqZWN0ID0+IG9iamVjdC5yZW5kZXIoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0M0RQbHVnaW47XG4iXX0=