"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Программа для спрайтов. Она не наследуюется от {@link Program}
 * и выполняет только связывание шейдера с униформами.
 * Оставлена для единообразия синтаксиса.
 */

var SpriteProgram = function () {
    function SpriteProgram() {
        _classCallCheck(this, SpriteProgram);

        this.opacity = 1;
        this.smoothing = 0;
        this._texture = null;
    }

    /**
     * Устанавливает текстуру для спрайта
     * @param {Texture} texture
     */


    _createClass(SpriteProgram, [{
        key: "setTexture",
        value: function setTexture(texture) {
            this._texture = texture;

            return this;
        }

        /**
         * Возвращает текущую текстуру
         * @returns {?Texture}
         */

    }, {
        key: "getTexture",
        value: function getTexture() {
            return this._texture;
        }
    }, {
        key: "enable",
        value: function enable(_ref) {
            var gl = _ref.gl;
            var object = _ref.object;
            var uniforms = _ref.uniforms;
            var renderer = _ref.renderer;

            gl.uniform1f(uniforms.uColorAlpha, this.opacity);
            gl.uniform1f(uniforms.uSmoothing, this.smoothing);

            var size = renderer.getSize();
            gl.uniform2f(uniforms.uHalfSize, size[0] / 2, size[1] / 2);
            gl.uniform2f(uniforms.uOffset, object.offset[0], object.offset[1]);
            gl.uniform2f(uniforms.uScale, object.scale[0], object.scale[1]);
            gl.uniform3f(uniforms.uPosition, object.worldMatrix[12], object.worldMatrix[13], object.worldMatrix[14]);

            if (this._texture) {
                this._texture.enable(gl);
            }
        }
    }, {
        key: "disable",
        value: function disable() {}

        /**
         * Вызывается спрайтом, чтобы определить его к специфичному рендеру.
         *
         * @param {TypedObjects} typedObjects
         * @param {Sprite} object
         */

    }, {
        key: "typifyForRender",
        value: function typifyForRender(typedObjects, object) {
            typedObjects.sprites.push(object);
        }
    }]);

    return SpriteProgram;
}();

exports.default = SpriteProgram;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9ncmFtcy9TcHJpdGVQcm9ncmFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLTTtBQUNGLGFBREUsYUFDRixHQUFjOzhCQURaLGVBQ1k7O0FBQ1YsYUFBSyxPQUFMLEdBQWUsQ0FBZixDQURVO0FBRVYsYUFBSyxTQUFMLEdBQWlCLENBQWpCLENBRlU7QUFHVixhQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FIVTtLQUFkOzs7Ozs7OztpQkFERTs7bUNBV1MsU0FBUztBQUNoQixpQkFBSyxRQUFMLEdBQWdCLE9BQWhCLENBRGdCOztBQUdoQixtQkFBTyxJQUFQLENBSGdCOzs7Ozs7Ozs7O3FDQVVQO0FBQ1QsbUJBQU8sS0FBSyxRQUFMLENBREU7Ozs7cUNBSTRCO2dCQUFqQyxhQUFpQztnQkFBN0IscUJBQTZCO2dCQUFyQix5QkFBcUI7Z0JBQVgseUJBQVc7O0FBQ3JDLGVBQUcsU0FBSCxDQUFhLFNBQVMsV0FBVCxFQUFzQixLQUFLLE9BQUwsQ0FBbkMsQ0FEcUM7QUFFckMsZUFBRyxTQUFILENBQWEsU0FBUyxVQUFULEVBQXFCLEtBQUssU0FBTCxDQUFsQyxDQUZxQzs7QUFJckMsZ0JBQU0sT0FBTyxTQUFTLE9BQVQsRUFBUCxDQUorQjtBQUtyQyxlQUFHLFNBQUgsQ0FBYSxTQUFTLFNBQVQsRUFBb0IsS0FBSyxDQUFMLElBQVUsQ0FBVixFQUFhLEtBQUssQ0FBTCxJQUFVLENBQVYsQ0FBOUMsQ0FMcUM7QUFNckMsZUFBRyxTQUFILENBQWEsU0FBUyxPQUFULEVBQWtCLE9BQU8sTUFBUCxDQUFjLENBQWQsQ0FBL0IsRUFBaUQsT0FBTyxNQUFQLENBQWMsQ0FBZCxDQUFqRCxFQU5xQztBQU9yQyxlQUFHLFNBQUgsQ0FBYSxTQUFTLE1BQVQsRUFBaUIsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUE5QixFQUErQyxPQUFPLEtBQVAsQ0FBYSxDQUFiLENBQS9DLEVBUHFDO0FBUXJDLGVBQUcsU0FBSCxDQUFhLFNBQVMsU0FBVCxFQUFvQixPQUFPLFdBQVAsQ0FBbUIsRUFBbkIsQ0FBakMsRUFBeUQsT0FBTyxXQUFQLENBQW1CLEVBQW5CLENBQXpELEVBQWlGLE9BQU8sV0FBUCxDQUFtQixFQUFuQixDQUFqRixFQVJxQzs7QUFVckMsZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDZixxQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixFQUFyQixFQURlO2FBQW5COzs7O2tDQUtNOzs7Ozs7Ozs7Ozt3Q0FRTSxjQUFjLFFBQVE7QUFDbEMseUJBQWEsT0FBYixDQUFxQixJQUFyQixDQUEwQixNQUExQixFQURrQzs7OztXQWhEcEM7OztrQkFxRFMiLCJmaWxlIjoiU3ByaXRlUHJvZ3JhbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog0J/RgNC+0LPRgNCw0LzQvNCwINC00LvRjyDRgdC/0YDQsNC50YLQvtCyLiDQntC90LAg0L3QtSDQvdCw0YHQu9C10LTRg9GO0LXRgtGB0Y8g0L7RgiB7QGxpbmsgUHJvZ3JhbX1cbiAqINC4INCy0YvQv9C+0LvQvdGP0LXRgiDRgtC+0LvRjNC60L4g0YHQstGP0LfRi9Cy0LDQvdC40LUg0YjQtdC50LTQtdGA0LAg0YEg0YPQvdC40YTQvtGA0LzQsNC80LguXG4gKiDQntGB0YLQsNCy0LvQtdC90LAg0LTQu9GPINC10LTQuNC90L7QvtCx0YDQsNC30LjRjyDRgdC40L3RgtCw0LrRgdC40YHQsC5cbiAqL1xuY2xhc3MgU3ByaXRlUHJvZ3JhbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuc21vb3RoaW5nID0gMDtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YHRgtGD0YDRgyDQtNC70Y8g0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge1RleHR1cmV9IHRleHR1cmVcbiAgICAgKi9cbiAgICBzZXRUZXh0dXJlKHRleHR1cmUpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YLQtdC60YPRidGD0Y4g0YLQtdC60YHRgtGD0YDRg1xuICAgICAqIEByZXR1cm5zIHs/VGV4dHVyZX1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICB9XG5cbiAgICBlbmFibGUoe2dsLCBvYmplY3QsIHVuaWZvcm1zLCByZW5kZXJlcn0pIHtcbiAgICAgICAgZ2wudW5pZm9ybTFmKHVuaWZvcm1zLnVDb2xvckFscGhhLCB0aGlzLm9wYWNpdHkpO1xuICAgICAgICBnbC51bmlmb3JtMWYodW5pZm9ybXMudVNtb290aGluZywgdGhpcy5zbW9vdGhpbmcpO1xuXG4gICAgICAgIGNvbnN0IHNpemUgPSByZW5kZXJlci5nZXRTaXplKCk7XG4gICAgICAgIGdsLnVuaWZvcm0yZih1bmlmb3Jtcy51SGFsZlNpemUsIHNpemVbMF0gLyAyLCBzaXplWzFdIC8gMik7XG4gICAgICAgIGdsLnVuaWZvcm0yZih1bmlmb3Jtcy51T2Zmc2V0LCBvYmplY3Qub2Zmc2V0WzBdLCBvYmplY3Qub2Zmc2V0WzFdKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmKHVuaWZvcm1zLnVTY2FsZSwgb2JqZWN0LnNjYWxlWzBdLCBvYmplY3Quc2NhbGVbMV0pO1xuICAgICAgICBnbC51bmlmb3JtM2YodW5pZm9ybXMudVBvc2l0aW9uLCBvYmplY3Qud29ybGRNYXRyaXhbMTJdLCBvYmplY3Qud29ybGRNYXRyaXhbMTNdLCBvYmplY3Qud29ybGRNYXRyaXhbMTRdKTtcblxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5lbmFibGUoZ2wpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHt9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDRgdC/0YDQsNC50YLQvtC8LCDRh9GC0L7QsdGLINC+0L/RgNC10LTQtdC70LjRgtGMINC10LPQviDQuiDRgdC/0LXRhtC40YTQuNGH0L3QvtC80YMg0YDQtdC90LTQtdGA0YMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1R5cGVkT2JqZWN0c30gdHlwZWRPYmplY3RzXG4gICAgICogQHBhcmFtIHtTcHJpdGV9IG9iamVjdFxuICAgICAqL1xuICAgIHR5cGlmeUZvclJlbmRlcih0eXBlZE9iamVjdHMsIG9iamVjdCkge1xuICAgICAgICB0eXBlZE9iamVjdHMuc3ByaXRlcy5wdXNoKG9iamVjdCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcHJpdGVQcm9ncmFtO1xuIl19