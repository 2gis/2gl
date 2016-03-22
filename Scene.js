'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Сцена включает в себя все объекты необходимые для рендеринга
 *
 * @extends Object3D
 */

var Scene = function (_Object3D) {
    _inherits(Scene, _Object3D);

    function Scene() {
        _classCallCheck(this, Scene);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scene).call(this));

        _this._lights = [];
        return _this;
    }

    /**
     * Добавляет источник света на сцену
     * @param {Light} light
     */


    _createClass(Scene, [{
        key: 'addLight',
        value: function addLight(light) {
            this._lights.push(light);

            return this;
        }

        /**
         * Возвращает все источники света сцены
         * @returns {Light[]}
         */

    }, {
        key: 'getLights',
        value: function getLights() {
            return this._lights;
        }
    }]);

    return Scene;
}(_Object3D3.default);

exports.default = Scene;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TY2VuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPTTs7O0FBQ0YsYUFERSxLQUNGLEdBQWM7OEJBRFosT0FDWTs7MkVBRFosbUJBQ1k7O0FBR1YsY0FBSyxPQUFMLEdBQWUsRUFBZixDQUhVOztLQUFkOzs7Ozs7OztpQkFERTs7aUNBV08sT0FBTztBQUNaLGlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCLEVBRFk7O0FBR1osbUJBQU8sSUFBUCxDQUhZOzs7Ozs7Ozs7O29DQVVKO0FBQ1IsbUJBQU8sS0FBSyxPQUFMLENBREM7Ozs7V0FyQlY7OztrQkEwQlMiLCJmaWxlIjoiU2NlbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2JqZWN0M0QgZnJvbSAnLi9PYmplY3QzRCc7XG5cbi8qKlxuICog0KHRhtC10L3QsCDQstC60LvRjtGH0LDQtdGCINCyINGB0LXQsdGPINCy0YHQtSDQvtCx0YrQtdC60YLRiyDQvdC10L7QsdGF0L7QtNC40LzRi9C1INC00LvRjyDRgNC10L3QtNC10YDQuNC90LPQsFxuICpcbiAqIEBleHRlbmRzIE9iamVjdDNEXG4gKi9cbmNsYXNzIFNjZW5lIGV4dGVuZHMgT2JqZWN0M0Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2xpZ2h0cyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCU0L7QsdCw0LLQu9GP0LXRgiDQuNGB0YLQvtGH0L3QuNC6INGB0LLQtdGC0LAg0L3QsCDRgdGG0LXQvdGDXG4gICAgICogQHBhcmFtIHtMaWdodH0gbGlnaHRcbiAgICAgKi9cbiAgICBhZGRMaWdodChsaWdodCkge1xuICAgICAgICB0aGlzLl9saWdodHMucHVzaChsaWdodCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LLRgdC1INC40YHRgtC+0YfQvdC40LrQuCDRgdCy0LXRgtCwINGB0YbQtdC90YtcbiAgICAgKiBAcmV0dXJucyB7TGlnaHRbXX1cbiAgICAgKi9cbiAgICBnZXRMaWdodHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saWdodHM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY2VuZTtcbiJdfQ==