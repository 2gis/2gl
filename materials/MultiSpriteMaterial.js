'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libConstants = require('../libConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Материал для мультиспрайтов. Она не наследуются от {@link Material}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */
var MultiSpriteMaterial = function () {
    function MultiSpriteMaterial() {
        _classCallCheck(this, MultiSpriteMaterial);

        this.smoothing = 1;
        this._texture = null;

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        this.type = _libConstants.MULTI_SPRITE_MATERIAL;
    }

    /**
     * Устанавливает текстуру для спрайта
     * @param {Texture} texture
     */


    _createClass(MultiSpriteMaterial, [{
        key: 'setTexture',
        value: function setTexture(texture) {
            this._texture = texture;

            return this;
        }

        /**
         * Возвращает текущую текстуру
         * @returns {?Texture}
         */

    }, {
        key: 'getTexture',
        value: function getTexture() {
            return this._texture;
        }
    }, {
        key: 'enable',
        value: function enable(_ref) {
            var gl = _ref.gl;
            var shaderProgram = _ref.shaderProgram;

            shaderProgram.bind(gl, {
                uSmoothing: this.smoothing
            });

            if (this._texture) {
                this._texture.enable(gl);
            }
        }
    }, {
        key: 'disable',
        value: function disable() {}
    }]);

    return MultiSpriteMaterial;
}();

exports.default = MultiSpriteMaterial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbHMvTXVsdGlTcHJpdGVNYXRlcmlhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7O0lBS00sbUI7QUFDRixtQ0FBYztBQUFBOztBQUNWLGFBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNBLGFBQUssUUFBTCxHQUFnQixJQUFoQjs7QUFFQTs7OztBQUlBLGFBQUssSUFBTDtBQUNIOztBQUVEOzs7Ozs7OzttQ0FJVyxPLEVBQVM7QUFDaEIsaUJBQUssUUFBTCxHQUFnQixPQUFoQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7cUNBSWE7QUFDVCxtQkFBTyxLQUFLLFFBQVo7QUFDSDs7O3FDQUUyQjtBQUFBLGdCQUFwQixFQUFvQixRQUFwQixFQUFvQjtBQUFBLGdCQUFoQixhQUFnQixRQUFoQixhQUFnQjs7QUFDeEIsMEJBQWMsSUFBZCxDQUFtQixFQUFuQixFQUF1QjtBQUNuQiw0QkFBWSxLQUFLO0FBREUsYUFBdkI7O0FBSUEsZ0JBQUksS0FBSyxRQUFULEVBQW1CO0FBQ2YscUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsRUFBckI7QUFDSDtBQUNKOzs7a0NBRVMsQ0FBRTs7Ozs7O2tCQUdELG1CIiwiZmlsZSI6Ik11bHRpU3ByaXRlTWF0ZXJpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01VTFRJX1NQUklURV9NQVRFUklBTH0gZnJvbSAnLi4vbGliQ29uc3RhbnRzJztcblxuLyoqXG4gKiDQnNCw0YLQtdGA0LjQsNC7INC00LvRjyDQvNGD0LvRjNGC0LjRgdC/0YDQsNC50YLQvtCyLiDQntC90LAg0L3QtSDQvdCw0YHQu9C10LTRg9GO0YLRgdGPINC+0YIge0BsaW5rIE1hdGVyaWFsfVxuICog0Lgg0LLRi9C/0L7Qu9C90Y/QtdGCINGC0L7Qu9GM0LrQviDRgdCy0Y/Qt9GL0LLQsNC90LjQtSDRiNC10LnQtNC10YDQsCDRgSDRg9C90LjRhNC+0YDQvNCw0LzQuC5cbiAqINCe0YHRgtCw0LLQu9C10L3QsCDQtNC70Y8g0LXQtNC40L3QvtC+0LHRgNCw0LfQuNGPINGB0LjQvdGC0LDQutGB0LjRgdCwLlxuICovXG5jbGFzcyBNdWx0aVNwcml0ZU1hdGVyaWFsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zbW9vdGhpbmcgPSAxO1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC80LDRgtC10YDQuNCw0LvQsFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gTVVMVElfU1BSSVRFX01BVEVSSUFMO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGB0YLRg9GA0YMg0LTQu9GPINGB0L/RgNCw0LnRgtCwXG4gICAgICogQHBhcmFtIHtUZXh0dXJlfSB0ZXh0dXJlXG4gICAgICovXG4gICAgc2V0VGV4dHVyZSh0ZXh0dXJlKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0ZXh0dXJlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGC0LXQutGD0YnRg9GOINGC0LXQutGB0YLRg9GA0YNcbiAgICAgKiBAcmV0dXJucyB7P1RleHR1cmV9XG4gICAgICovXG4gICAgZ2V0VGV4dHVyZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gICAgfVxuXG4gICAgZW5hYmxlKHtnbCwgc2hhZGVyUHJvZ3JhbX0pIHtcbiAgICAgICAgc2hhZGVyUHJvZ3JhbS5iaW5kKGdsLCB7XG4gICAgICAgICAgICB1U21vb3RoaW5nOiB0aGlzLnNtb290aGluZ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5lbmFibGUoZ2wpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpU3ByaXRlTWF0ZXJpYWw7XG4iXX0=