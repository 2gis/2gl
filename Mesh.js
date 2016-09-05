'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _libConstants = require('./libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для отрисовки 3D объектов. Каждому мешу необходимо задать программу и геометрию.
 *
 * @extends {Object3D}
 */
var Mesh = function (_Object3D) {
  _inherits(Mesh, _Object3D);

  /**
   * @param {Geometry} geometry Геометрия меша
   * @param {Material} material Программа для отрисовки меша
   */
  function Mesh(geometry, material) {
    _classCallCheck(this, Mesh);

    /**
     * Геометрия меша
     * @type {Geometry}
     */
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mesh).call(this));

    _this.geometry = geometry;

    /**
     * Программа для отрисовки меша
     * @type {Material}
     */
    _this.material = material;

    /**
     * Определяет порядок отрисовки объектов с выключенным фильтром глубины.
     * Работает примерно также как и z-index у dom элементов.
     * Также этот порядок учитывается при отрисовки прозрачных мешей.
     * @type {number}
     */
    _this.renderOrder = 0;

    /**
     * Используется для обозначения типа объекта
     * @type {Number}
     */
    _this.type = _libConstants.MESH;
    return _this;
  }

  /**
   * Вызывается рендером для подготовки и отрисовки объекта.
   * @param {State} state Текущие состояние рендера
   */


  _createClass(Mesh, [{
    key: 'render',
    value: function render(state) {
      var gl = state.gl;

      if (!this.visible) {
        return this;
      }

      if (this.worldMatrixNeedsUpdate) {
        this.updateWorldMatrix();
      }

      state.object = this;
      this.material.enable(state);

      gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

      this.material.disable(gl);

      return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * Меши разделяются на прозрачные и нет.
     *
     * @param {Object} renderPlugins
     */

  }, {
    key: 'typifyForRender',
    value: function typifyForRender(renderPlugins) {
      if (!this.visible) {
        return this;
      }

      this.material.typifyForRender(renderPlugins, this);

      this.children.forEach(function (child) {
        return child.typifyForRender(renderPlugins);
      });

      return this;
    }
  }]);

  return Mesh;
}(_Object3D3.default);

exports.default = Mesh;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9NZXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7OztJQUtNLEk7OztBQUNGOzs7O0FBSUEsZ0JBQVksUUFBWixFQUFzQixRQUF0QixFQUFnQztBQUFBOztBQUc1Qjs7OztBQUg0Qjs7QUFPNUIsVUFBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7O0FBSUEsVUFBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7Ozs7QUFNQSxVQUFLLFdBQUwsR0FBbUIsQ0FBbkI7O0FBRUE7Ozs7QUFJQSxVQUFLLElBQUw7QUEzQjRCO0FBNEIvQjs7QUFFRDs7Ozs7Ozs7MkJBSU8sSyxFQUFPO0FBQ1YsVUFBTSxLQUFLLE1BQU0sRUFBakI7O0FBRUEsVUFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUVuQyxVQUFJLEtBQUssc0JBQVQsRUFBaUM7QUFDN0IsYUFBSyxpQkFBTDtBQUNIOztBQUVELFlBQU0sTUFBTixHQUFlLElBQWY7QUFDQSxXQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCOztBQUVBLFNBQUcsVUFBSCxDQUFjLEdBQUcsU0FBakIsRUFBNEIsQ0FBNUIsRUFBK0IsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixVQUF4QixFQUFvQyxNQUFuRTs7QUFFQSxXQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEVBQXRCOztBQUVBLGFBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7b0NBTWdCLGEsRUFBZTtBQUMzQixVQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQUUsZUFBTyxJQUFQO0FBQWM7O0FBRW5DLFdBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsYUFBOUIsRUFBNkMsSUFBN0M7O0FBRUEsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtBQUFBLGVBQVMsTUFBTSxlQUFOLENBQXNCLGFBQXRCLENBQVQ7QUFBQSxPQUF0Qjs7QUFFQSxhQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLEkiLCJmaWxlIjoiTWVzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPYmplY3QzRCBmcm9tICcuL09iamVjdDNEJztcbmltcG9ydCB7TUVTSH0gZnJvbSAnLi9saWJDb25zdGFudHMnO1xuXG4vKipcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGC0YHRjyDQtNC70Y8g0L7RgtGA0LjRgdC+0LLQutC4IDNEINC+0LHRitC10LrRgtC+0LIuINCa0LDQttC00L7QvNGDINC80LXRiNGDINC90LXQvtCx0YXQvtC00LjQvNC+INC30LDQtNCw0YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0Lgg0LPQtdC+0LzQtdGC0YDQuNGOLlxuICpcbiAqIEBleHRlbmRzIHtPYmplY3QzRH1cbiAqL1xuY2xhc3MgTWVzaCBleHRlbmRzIE9iamVjdDNEIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0dlb21ldHJ5fSBnZW9tZXRyeSDQk9C10L7QvNC10YLRgNC40Y8g0LzQtdGI0LBcbiAgICAgKiBAcGFyYW0ge01hdGVyaWFsfSBtYXRlcmlhbCDQn9GA0L7Qs9GA0LDQvNC80LAg0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDQvNC10YjQsFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQk9C10L7QvNC10YLRgNC40Y8g0LzQtdGI0LBcbiAgICAgICAgICogQHR5cGUge0dlb21ldHJ5fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9GA0L7Qs9GA0LDQvNC80LAg0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDQvNC10YjQsFxuICAgICAgICAgKiBAdHlwZSB7TWF0ZXJpYWx9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCe0L/RgNC10LTQtdC70Y/QtdGCINC/0L7RgNGP0LTQvtC6INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQvtCyINGBINCy0YvQutC70Y7Rh9C10L3QvdGL0Lwg0YTQuNC70YzRgtGA0L7QvCDQs9C70YPQsdC40L3Riy5cbiAgICAgICAgICog0KDQsNCx0L7RgtCw0LXRgiDQv9GA0LjQvNC10YDQvdC+INGC0LDQutC20LUg0LrQsNC6INC4IHotaW5kZXgg0YMgZG9tINGN0LvQtdC80LXQvdGC0L7Qsi5cbiAgICAgICAgICog0KLQsNC60LbQtSDRjdGC0L7RgiDQv9C+0YDRj9C00L7QuiDRg9GH0LjRgtGL0LLQsNC10YLRgdGPINC/0YDQuCDQvtGC0YDQuNGB0L7QstC60Lgg0L/RgNC+0LfRgNCw0YfQvdGL0YUg0LzQtdGI0LXQuS5cbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyT3JkZXIgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0LHQvtC30L3QsNGH0LXQvdC40Y8g0YLQuNC/0LAg0L7QsdGK0LXQutGC0LBcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IE1FU0g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0YDQtdC90LTQtdGA0L7QvCDQtNC70Y8g0L/QvtC00LPQvtGC0L7QstC60Lgg0Lgg0L7RgtGA0LjRgdC+0LLQutC4INC+0LHRitC10LrRgtCwLlxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlINCi0LXQutGD0YnQuNC1INGB0L7RgdGC0L7Rj9C90LjQtSDRgNC10L3QtNC10YDQsFxuICAgICAqL1xuICAgIHJlbmRlcihzdGF0ZSkge1xuICAgICAgICBjb25zdCBnbCA9IHN0YXRlLmdsO1xuXG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgaWYgKHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUub2JqZWN0ID0gdGhpcztcbiAgICAgICAgdGhpcy5tYXRlcmlhbC5lbmFibGUoc3RhdGUpO1xuXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLmdlb21ldHJ5LmdldEJ1ZmZlcigncG9zaXRpb24nKS5sZW5ndGgpO1xuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZGlzYWJsZShnbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLRi9C30YvQstCw0LXRgtGB0Y8g0L3QsCDRjdGC0LDQv9C1INGA0LXQvdC00LXRgNC40L3Qs9CwLCDRh9GC0L7QsdGLINC+0L/RgNC10LTQtdC70LjRgtGMINC6INC60LDQutC+0LzRgyDRgtC40L/RgyDRgNC10L3QtNC10YDQsCDQv9GA0LjQvdCw0LTQu9C10LbQuNGCINC+0LHRitC10LrRgi5cbiAgICAgKiDQnNC10YjQuCDRgNCw0LfQtNC10LvRj9GO0YLRgdGPINC90LAg0L/RgNC+0LfRgNCw0YfQvdGL0LUg0Lgg0L3QtdGCLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlbmRlclBsdWdpbnNcbiAgICAgKi9cbiAgICB0eXBpZnlGb3JSZW5kZXIocmVuZGVyUGx1Z2lucykge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMubWF0ZXJpYWwudHlwaWZ5Rm9yUmVuZGVyKHJlbmRlclBsdWdpbnMsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50eXBpZnlGb3JSZW5kZXIocmVuZGVyUGx1Z2lucykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzaDtcbiJdfQ==