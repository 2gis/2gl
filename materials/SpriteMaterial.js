'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libConstants = require('../libConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Материал для спрайтов. Она не наследуются от {@link Material}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */
var SpriteMaterial = function () {
    function SpriteMaterial() {
        _classCallCheck(this, SpriteMaterial);

        this.opacity = 1;
        this.smoothing = 0;
        this._texture = null;

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        this.type = _libConstants.SPRITE_MATERIAL;
    }

    /**
     * Устанавливает текстуру для спрайта
     * @param {Texture} texture
     */


    _createClass(SpriteMaterial, [{
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
            var object = _ref.object;
            var shaderProgram = _ref.shaderProgram;
            var renderer = _ref.renderer;

            var size = renderer.getSize();

            shaderProgram.bind(gl, {
                uColorAlpha: this.opacity,
                uSmoothing: this.smoothing,
                uHalfSize: [size[0] / 2, size[1] / 2],
                uOffset: object.offset,
                uScale: object.scale,
                uPosition: [object.worldMatrix[12], object.worldMatrix[13], object.worldMatrix[14]]
            });

            if (this._texture) {
                this._texture.enable(gl);
            }
        }
    }, {
        key: 'disable',
        value: function disable() {}
    }]);

    return SpriteMaterial;
}();

exports.default = SpriteMaterial;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbHMvU3ByaXRlTWF0ZXJpYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7OztJQUtNLGM7QUFDRiw4QkFBYztBQUFBOztBQUNWLGFBQUssT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUE7Ozs7QUFJQSxhQUFLLElBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7bUNBSVcsTyxFQUFTO0FBQ2hCLGlCQUFLLFFBQUwsR0FBZ0IsT0FBaEI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7O3FDQUlhO0FBQ1QsbUJBQU8sS0FBSyxRQUFaO0FBQ0g7OztxQ0FFNkM7QUFBQSxnQkFBdEMsRUFBc0MsUUFBdEMsRUFBc0M7QUFBQSxnQkFBbEMsTUFBa0MsUUFBbEMsTUFBa0M7QUFBQSxnQkFBMUIsYUFBMEIsUUFBMUIsYUFBMEI7QUFBQSxnQkFBWCxRQUFXLFFBQVgsUUFBVzs7QUFDMUMsZ0JBQU0sT0FBTyxTQUFTLE9BQVQsRUFBYjs7QUFFQSwwQkFBYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCO0FBQ25CLDZCQUFhLEtBQUssT0FEQztBQUVuQiw0QkFBWSxLQUFLLFNBRkU7QUFHbkIsMkJBQVcsQ0FBQyxLQUFLLENBQUwsSUFBVSxDQUFYLEVBQWMsS0FBSyxDQUFMLElBQVUsQ0FBeEIsQ0FIUTtBQUluQix5QkFBUyxPQUFPLE1BSkc7QUFLbkIsd0JBQVEsT0FBTyxLQUxJO0FBTW5CLDJCQUFXLENBQUMsT0FBTyxXQUFQLENBQW1CLEVBQW5CLENBQUQsRUFBeUIsT0FBTyxXQUFQLENBQW1CLEVBQW5CLENBQXpCLEVBQWlELE9BQU8sV0FBUCxDQUFtQixFQUFuQixDQUFqRDtBQU5RLGFBQXZCOztBQVNBLGdCQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNmLHFCQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEVBQXJCO0FBQ0g7QUFDSjs7O2tDQUVTLENBQUU7Ozs7OztrQkFHRCxjIiwiZmlsZSI6IlNwcml0ZU1hdGVyaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTUFJJVEVfTUFURVJJQUx9IGZyb20gJy4uL2xpYkNvbnN0YW50cyc7XG5cbi8qKlxuICog0JzQsNGC0LXRgNC40LDQuyDQtNC70Y8g0YHQv9GA0LDQudGC0L7Qsi4g0J7QvdCwINC90LUg0L3QsNGB0LvQtdC00YPRjtGC0YHRjyDQvtGCIHtAbGluayBNYXRlcmlhbH1cbiAqINC4INCy0YvQv9C+0LvQvdGP0LXRgiDRgtC+0LvRjNC60L4g0YHQstGP0LfRi9Cy0LDQvdC40LUg0YjQtdC50LTQtdGA0LAg0YEg0YPQvdC40YTQvtGA0LzQsNC80LguXG4gKiDQntGB0YLQsNCy0LvQtdC90LAg0LTQu9GPINC10LTQuNC90L7QvtCx0YDQsNC30LjRjyDRgdC40L3RgtCw0LrRgdC40YHQsC5cbiAqL1xuY2xhc3MgU3ByaXRlTWF0ZXJpYWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSAxO1xuICAgICAgICB0aGlzLnNtb290aGluZyA9IDA7XG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0LHQvtC30L3QsNGH0LXQvdC40Y8g0YLQuNC/0LAg0LzQsNGC0LXRgNC40LDQu9CwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBTUFJJVEVfTUFURVJJQUw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YHRgtGD0YDRgyDQtNC70Y8g0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge1RleHR1cmV9IHRleHR1cmVcbiAgICAgKi9cbiAgICBzZXRUZXh0dXJlKHRleHR1cmUpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YLQtdC60YPRidGD0Y4g0YLQtdC60YHRgtGD0YDRg1xuICAgICAqIEByZXR1cm5zIHs/VGV4dHVyZX1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICB9XG5cbiAgICBlbmFibGUoe2dsLCBvYmplY3QsIHNoYWRlclByb2dyYW0sIHJlbmRlcmVyfSkge1xuICAgICAgICBjb25zdCBzaXplID0gcmVuZGVyZXIuZ2V0U2l6ZSgpO1xuXG4gICAgICAgIHNoYWRlclByb2dyYW0uYmluZChnbCwge1xuICAgICAgICAgICAgdUNvbG9yQWxwaGE6IHRoaXMub3BhY2l0eSxcbiAgICAgICAgICAgIHVTbW9vdGhpbmc6IHRoaXMuc21vb3RoaW5nLFxuICAgICAgICAgICAgdUhhbGZTaXplOiBbc2l6ZVswXSAvIDIsIHNpemVbMV0gLyAyXSxcbiAgICAgICAgICAgIHVPZmZzZXQ6IG9iamVjdC5vZmZzZXQsXG4gICAgICAgICAgICB1U2NhbGU6IG9iamVjdC5zY2FsZSxcbiAgICAgICAgICAgIHVQb3NpdGlvbjogW29iamVjdC53b3JsZE1hdHJpeFsxMl0sIG9iamVjdC53b3JsZE1hdHJpeFsxM10sIG9iamVjdC53b3JsZE1hdHJpeFsxNF1dXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlLmVuYWJsZShnbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3ByaXRlTWF0ZXJpYWw7XG4iXX0=