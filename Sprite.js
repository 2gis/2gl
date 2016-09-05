'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _glMatrix = require('gl-matrix');

var _libConstants = require('./libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для отрисовки спрайтов. Спрайты всегда рисуются лицевой стороной
 * и их размеры не зависят от положения. Т.е. координаты спрайта проецируются в плоскость экрана,
 * и уже на ней отрисовываются.
 *
 * Для отрисовки спрайтов нужно подключить {@link SpritePlugin} к рендереру.
 *
 * @extends {Object3D}
 */
var Sprite = function (_Object3D) {
  _inherits(Sprite, _Object3D);

  /**
   * @param {SpriteMaterial} material
   */
  function Sprite(material) {
    _classCallCheck(this, Sprite);

    /**
     * Программа отрисовки спрайта
     * @type {SpriteMaterial}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));

    _this.material = material;

    /**
     * Смещение спрайта в плоскости экрана
     * @type {vec2}
     */
    _this.offset = _glMatrix.vec2.create();

    /**
     * Используется для обозначения типа объекта
     * @type {Number}
     */
    _this.type = _libConstants.SPRITE;
    return _this;
  }

  _createClass(Sprite, [{
    key: 'render',
    value: function render(state) {
      // Если cпрайт невидим или у программы спрайта не установлена текстура, то не рендерим его
      if (!this.visible || !this.material.getTexture()) {
        return this;
      }

      if (this.worldMatrixNeedsUpdate) {
        this.updateWorldMatrix();
      }

      var gl = state.gl;

      state.object = this;

      this.material.enable(state);

      // draw for indices
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      this.material.disable(state.gl);

      return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * Спрайты рисуются отдельным рендером.
     *
     * @param {Object} renderPlugins
     */

  }, {
    key: 'typifyForRender',
    value: function typifyForRender(renderPlugins) {
      if (!this.visible) {
        return this;
      }

      renderPlugins[_libConstants.SPRITE_RENDERER].addObject(this);

      this.children.forEach(function (child) {
        return child.typifyForRender(renderPlugins);
      });

      return this;
    }
  }]);

  return Sprite;
}(_Object3D3.default);

exports.default = Sprite;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TcHJpdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7OztJQVNNLE07OztBQUNGOzs7QUFHQSxrQkFBWSxRQUFaLEVBQXNCO0FBQUE7O0FBR2xCOzs7O0FBSGtCOztBQU9sQixVQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7Ozs7QUFJQSxVQUFLLE1BQUwsR0FBYyxlQUFLLE1BQUwsRUFBZDs7QUFFQTs7OztBQUlBLFVBQUssSUFBTDtBQW5Ca0I7QUFvQnJCOzs7OzJCQUVNLEssRUFBTztBQUNWO0FBQ0EsVUFBSSxDQUFDLEtBQUssT0FBTixJQUFpQixDQUFDLEtBQUssUUFBTCxDQUFjLFVBQWQsRUFBdEIsRUFBa0Q7QUFBRSxlQUFPLElBQVA7QUFBYzs7QUFFbEUsVUFBSSxLQUFLLHNCQUFULEVBQWlDO0FBQzdCLGFBQUssaUJBQUw7QUFDSDs7QUFFRCxVQUFNLEtBQUssTUFBTSxFQUFqQjs7QUFFQSxZQUFNLE1BQU4sR0FBZSxJQUFmOztBQUVBLFdBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsS0FBckI7O0FBRUE7QUFDQSxTQUFHLFlBQUgsQ0FBZ0IsR0FBRyxTQUFuQixFQUE4QixDQUE5QixFQUFpQyxHQUFHLGNBQXBDLEVBQW9ELENBQXBEOztBQUVBLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsTUFBTSxFQUE1Qjs7QUFFQSxhQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O29DQU1nQixhLEVBQWU7QUFDM0IsVUFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUVuQyxtREFBK0IsU0FBL0IsQ0FBeUMsSUFBekM7O0FBRUEsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtBQUFBLGVBQVMsTUFBTSxlQUFOLENBQXNCLGFBQXRCLENBQVQ7QUFBQSxPQUF0Qjs7QUFFQSxhQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLE0iLCJmaWxlIjoiU3ByaXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9iamVjdDNEIGZyb20gJy4vT2JqZWN0M0QnO1xuaW1wb3J0IHt2ZWMyfSBmcm9tICdnbC1tYXRyaXgnO1xuaW1wb3J0IHtTUFJJVEUsIFNQUklURV9SRU5ERVJFUn0gZnJvbSAnLi9saWJDb25zdGFudHMnO1xuXG4vKipcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7RgtGA0LjRgdC+0LLQutC4INGB0L/RgNCw0LnRgtC+0LIuINCh0L/RgNCw0LnRgtGLINCy0YHQtdCz0LTQsCDRgNC40YHRg9GO0YLRgdGPINC70LjRhtC10LLQvtC5INGB0YLQvtGA0L7QvdC+0LlcbiAqINC4INC40YUg0YDQsNC30LzQtdGA0Ysg0L3QtSDQt9Cw0LLQuNGB0Y/RgiDQvtGCINC/0L7Qu9C+0LbQtdC90LjRjy4g0KIu0LUuINC60L7QvtGA0LTQuNC90LDRgtGLINGB0L/RgNCw0LnRgtCwINC/0YDQvtC10YbQuNGA0YPRjtGC0YHRjyDQsiDQv9C70L7RgdC60L7RgdGC0Ywg0Y3QutGA0LDQvdCwLFxuICog0Lgg0YPQttC1INC90LAg0L3QtdC5INC+0YLRgNC40YHQvtCy0YvQstCw0Y7RgtGB0Y8uXG4gKlxuICog0JTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDRgdC/0YDQsNC50YLQvtCyINC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywge0BsaW5rIFNwcml0ZVBsdWdpbn0g0Log0YDQtdC90LTQtdGA0LXRgNGDLlxuICpcbiAqIEBleHRlbmRzIHtPYmplY3QzRH1cbiAqL1xuY2xhc3MgU3ByaXRlIGV4dGVuZHMgT2JqZWN0M0Qge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3ByaXRlTWF0ZXJpYWx9IG1hdGVyaWFsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWF0ZXJpYWwpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LPRgNCw0LzQvNCwINC+0YLRgNC40YHQvtCy0LrQuCDRgdC/0YDQsNC50YLQsFxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlTWF0ZXJpYWx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0LzQtdGJ0LXQvdC40LUg0YHQv9GA0LDQudGC0LAg0LIg0L/Qu9C+0YHQutC+0YHRgtC4INGN0LrRgNCw0L3QsFxuICAgICAgICAgKiBAdHlwZSB7dmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdmVjMi5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC+0LHRitC10LrRgtCwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBTUFJJVEU7XG4gICAgfVxuXG4gICAgcmVuZGVyKHN0YXRlKSB7XG4gICAgICAgIC8vINCV0YHQu9C4IGPQv9GA0LDQudGCINC90LXQstC40LTQuNC8INC40LvQuCDRgyDQv9GA0L7Qs9GA0LDQvNC80Ysg0YHQv9GA0LDQudGC0LAg0L3QtSDRg9GB0YLQsNC90L7QstC70LXQvdCwINGC0LXQutGB0YLRg9GA0LAsINGC0L4g0L3QtSDRgNC10L3QtNC10YDQuNC8INC10LPQvlxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSB8fCAhdGhpcy5tYXRlcmlhbC5nZXRUZXh0dXJlKCkpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICBpZiAodGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnbCA9IHN0YXRlLmdsO1xuXG4gICAgICAgIHN0YXRlLm9iamVjdCA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC5lbmFibGUoc3RhdGUpO1xuXG4gICAgICAgIC8vIGRyYXcgZm9yIGluZGljZXNcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgNiwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZGlzYWJsZShzdGF0ZS5nbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L3QsCDRjdGC0LDQv9C1INGA0LXQvdC00LXRgNC40L3Qs9CwLCDRh9GC0L7QsdGLINC+0L/RgNC10LTQtdC70LjRgtGMINC6INC60LDQutC+0LzRgyDRgtC40L/RgyDRgNC10L3QtNC10YDQsCDQv9GA0LjQvdCw0LTQu9C10LbQuNGCINC+0LHRitC10LrRgi5cbiAgICAgKiDQodC/0YDQsNC50YLRiyDRgNC40YHRg9GO0YLRgdGPINC+0YLQtNC10LvRjNC90YvQvCDRgNC10L3QtNC10YDQvtC8LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbmRlclBsdWdpbnNcbiAgICAgKi9cbiAgICB0eXBpZnlGb3JSZW5kZXIocmVuZGVyUGx1Z2lucykge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHJlbmRlclBsdWdpbnNbU1BSSVRFX1JFTkRFUkVSXS5hZGRPYmplY3QodGhpcyk7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnR5cGlmeUZvclJlbmRlcihyZW5kZXJQbHVnaW5zKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGU7XG4iXX0=