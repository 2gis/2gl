'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _glMatrix = require('gl-matrix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для отрисовки спрайтов. Спрайты всегда рисуются лицевой стороной
 * и их размеры не зависят от положения. Т.е. координаты спрайта проецируются в плоскость экрана,
 * и уже на ней отрисовываются.
 *
 * @extends {Object3D}
 */

var Sprite = function (_Object3D) {
  _inherits(Sprite, _Object3D);

  /**
   * @param {SpriteProgram} program
   */

  function Sprite(program) {
    _classCallCheck(this, Sprite);

    /**
     * Программа отрисовки спрайта
     * @type {SpriteProgram}
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));

    _this.program = program;

    /**
     * Смещение спрайта в плоскости экрана
     * @type {vec2}
     */
    _this.offset = _glMatrix.vec2.create();
    return _this;
  }

  _createClass(Sprite, [{
    key: 'render',
    value: function render(state) {
      // Если cпрайт невидим или у программы спрайта не установлена текстура, то не рендерим его
      if (!this.visible || !this.program.getTexture()) {
        return this;
      }

      if (this.worldMatrixNeedsUpdate) {
        this.updateWorldMatrix();
      }

      var gl = state.gl;

      state.object = this;

      this.program.enable(state);

      // draw for indices
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      this.program.disable(state.gl);

      return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * Спрайты рисуются отдельным рендером.
     *
     * @param {TypedObjects} typedObjects
     */

  }, {
    key: 'typifyForRender',
    value: function typifyForRender(typedObjects) {
      if (!this.visible) {
        return this;
      }

      this.program.typifyForRender(typedObjects, this);

      this.children.forEach(function (child) {
        return child.typifyForRender(typedObjects);
      });

      return this;
    }
  }]);

  return Sprite;
}(_Object3D3.default);

exports.default = Sprite;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TcHJpdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFTTTs7Ozs7OztBQUlGLFdBSkUsTUFJRixDQUFZLE9BQVosRUFBcUI7MEJBSm5CLFFBSW1COzs7Ozs7O3VFQUpuQixvQkFJbUI7O0FBT2pCLFVBQUssT0FBTCxHQUFlLE9BQWY7Ozs7OztBQVBpQixTQWFqQixDQUFLLE1BQUwsR0FBYyxlQUFLLE1BQUwsRUFBZCxDQWJpQjs7R0FBckI7O2VBSkU7OzJCQW9CSyxPQUFPOztBQUVWLFVBQUksQ0FBQyxLQUFLLE9BQUwsSUFBZ0IsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQUQsRUFBNEI7QUFBRSxlQUFPLElBQVAsQ0FBRjtPQUFqRDs7QUFFQSxVQUFJLEtBQUssc0JBQUwsRUFBNkI7QUFDN0IsYUFBSyxpQkFBTCxHQUQ2QjtPQUFqQzs7QUFJQSxVQUFNLEtBQUssTUFBTSxFQUFOLENBUkQ7O0FBVVYsWUFBTSxNQUFOLEdBQWUsSUFBZixDQVZVOztBQVlWLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBcEI7OztBQVpVLFFBZVYsQ0FBRyxZQUFILENBQWdCLEdBQUcsU0FBSCxFQUFjLENBQTlCLEVBQWlDLEdBQUcsY0FBSCxFQUFtQixDQUFwRCxFQWZVOztBQWlCVixXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLE1BQU0sRUFBTixDQUFyQixDQWpCVTs7QUFtQlYsYUFBTyxJQUFQLENBbkJVOzs7Ozs7Ozs7Ozs7b0NBNEJFLGNBQWM7QUFDMUIsVUFBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQUUsZUFBTyxJQUFQLENBQUY7T0FBbkI7O0FBRUEsV0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixZQUE3QixFQUEyQyxJQUEzQyxFQUgwQjs7QUFLMUIsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtlQUFTLE1BQU0sZUFBTixDQUFzQixZQUF0QjtPQUFULENBQXRCLENBTDBCOztBQU8xQixhQUFPLElBQVAsQ0FQMEI7Ozs7U0FoRDVCOzs7a0JBMkRTIiwiZmlsZSI6IlNwcml0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPYmplY3QzRCBmcm9tICcuL09iamVjdDNEJztcbmltcG9ydCB7dmVjMn0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDRgdC/0YDQsNC50YLQvtCyLiDQodC/0YDQsNC50YLRiyDQstGB0LXQs9C00LAg0YDQuNGB0YPRjtGC0YHRjyDQu9C40YbQtdCy0L7QuSDRgdGC0L7RgNC+0L3QvtC5XG4gKiDQuCDQuNGFINGA0LDQt9C80LXRgNGLINC90LUg0LfQsNCy0LjRgdGP0YIg0L7RgiDQv9C+0LvQvtC20LXQvdC40Y8uINCiLtC1LiDQutC+0L7RgNC00LjQvdCw0YLRiyDRgdC/0YDQsNC50YLQsCDQv9GA0L7QtdGG0LjRgNGD0Y7RgtGB0Y8g0LIg0L/Qu9C+0YHQutC+0YHRgtGMINGN0LrRgNCw0L3QsCxcbiAqINC4INGD0LbQtSDQvdCwINC90LXQuSDQvtGC0YDQuNGB0L7QstGL0LLQsNGO0YLRgdGPLlxuICpcbiAqIEBleHRlbmRzIHtPYmplY3QzRH1cbiAqL1xuY2xhc3MgU3ByaXRlIGV4dGVuZHMgT2JqZWN0M0Qge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3ByaXRlUHJvZ3JhbX0gcHJvZ3JhbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb2dyYW0pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/RgNC+0LPRgNCw0LzQvNCwINC+0YLRgNC40YHQvtCy0LrQuCDRgdC/0YDQsNC50YLQsFxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlUHJvZ3JhbX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0LzQtdGJ0LXQvdC40LUg0YHQv9GA0LDQudGC0LAg0LIg0L/Qu9C+0YHQutC+0YHRgtC4INGN0LrRgNCw0L3QsFxuICAgICAgICAgKiBAdHlwZSB7dmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdmVjMi5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoc3RhdGUpIHtcbiAgICAgICAgLy8g0JXRgdC70LggY9C/0YDQsNC50YIg0L3QtdCy0LjQtNC40Lwg0LjQu9C4INGDINC/0YDQvtCz0YDQsNC80LzRiyDRgdC/0YDQsNC50YLQsCDQvdC1INGD0YHRgtCw0L3QvtCy0LvQtdC90LAg0YLQtdC60YHRgtGD0YDQsCwg0YLQviDQvdC1INGA0LXQvdC00LXRgNC40Lwg0LXQs9C+XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlIHx8ICF0aGlzLnByb2dyYW0uZ2V0VGV4dHVyZSgpKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgaWYgKHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZ2wgPSBzdGF0ZS5nbDtcblxuICAgICAgICBzdGF0ZS5vYmplY3QgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbS5lbmFibGUoc3RhdGUpO1xuXG4gICAgICAgIC8vIGRyYXcgZm9yIGluZGljZXNcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgNiwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXG4gICAgICAgIHRoaXMucHJvZ3JhbS5kaXNhYmxlKHN0YXRlLmdsKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQvdCwINGN0YLQsNC/0LUg0YDQtdC90LTQtdGA0LjQvdCz0LAsINGH0YLQvtCx0Ysg0L7Qv9GA0LXQtNC10LvQuNGC0Ywg0Log0LrQsNC60L7QvNGDINGC0LjQv9GDINGA0LXQvdC00LXRgNCwINC/0YDQuNC90LDQtNC70LXQttC40YIg0L7QsdGK0LXQutGCLlxuICAgICAqINCh0L/RgNCw0LnRgtGLINGA0LjRgdGD0Y7RgtGB0Y8g0L7RgtC00LXQu9GM0L3Ri9C8INGA0LXQvdC00LXRgNC+0LwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1R5cGVkT2JqZWN0c30gdHlwZWRPYmplY3RzXG4gICAgICovXG4gICAgdHlwaWZ5Rm9yUmVuZGVyKHR5cGVkT2JqZWN0cykge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMucHJvZ3JhbS50eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzLCB0aGlzKTtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQudHlwaWZ5Rm9yUmVuZGVyKHR5cGVkT2JqZWN0cykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlO1xuIl19