'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Texture = require('./Texture');

var _Texture2 = _interopRequireDefault(_Texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Используется для создания фреймбуфера, куда можно отрендерить кадр.
 *
 * @param {Object} options
 * @param {vec2} [options.size] Размер фреймбуфера
 */
var RenderTarget = function () {
    function RenderTarget() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, RenderTarget);

        this._size = options.size;
    }

    /**
     * Связывает компоненты с контекстом WebGL
     * @param {WebGLRenderingContext} gl
     */


    _createClass(RenderTarget, [{
        key: 'bind',
        value: function bind(gl) {
            if (this._sizeChanged) {
                this._unprepare(gl);
                this._sizeChanged = false;
            }

            if (!this._frameBuffer) {
                this._prepare(gl);
            }

            gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

            return this;
        }

        /**
         * Устанавливает пустой фреймбуфер у контекста WebGL
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'unbind',
        value: function unbind(gl) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return this;
        }

        /**
         * Удаляет фреймбуфер из видеокарты
         * @param {WebGLRenderingContext} gl
         */

    }, {
        key: 'remove',
        value: function remove(gl) {
            this._unprepare(gl);
            return this;
        }

        /**
         * Устанавливает размер фреймбуферу
         * @param {vec2} size
         */

    }, {
        key: 'setSize',
        value: function setSize(size) {
            this._size = size;
            this._sizeChanged = true;
            return this;
        }

        /**
         * Инициализирует фреймбуфер, текстуры и рендербуфер
         * @param {WebGLRenderingContext} gl
         * @ignore
         */

    }, {
        key: '_prepare',
        value: function _prepare(gl) {
            this._texture = new _Texture2.default();
            this._texture.generateMipmaps = false;
            this._texture.size = this._size;

            this._texture._prepare(gl);

            this._frameBuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

            this._renderBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._size[0], this._size[1]);

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture._texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);

            this._checkComplete(gl);

            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        /**
         * Удаляет данные из видеокарты
         * @param {WebGLRenderingContext} gl
         * @ignore
         */

    }, {
        key: '_unprepare',
        value: function _unprepare(gl) {
            if (this._frameBuffer) {
                this._texture.remove(gl);
                gl.deleteFramebuffer(this._frameBuffer);
                gl.deleteRenderbuffer(this._renderBuffer);
                this._frameBuffer = null;
            }
        }

        /**
         * Проверяет инициализацию фреймбуфера
         * @param {WebGLRenderingContext} gl
         * @ignore
         */

    }, {
        key: '_checkComplete',
        value: function _checkComplete(gl) {
            var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

            if (status === gl.FRAMEBUFFER_COMPLETE) {
                return;
            } else if (status === gl.FRAMEBUFFER_UNSUPPORTED) {
                console.log('Framebuffer is unsupported');
            } else if (status === gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT) {
                console.log('Framebuffer incomplete attachment');
            } else if (status === gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS) {
                console.log('Framebuffer incomplete dimensions');
            } else if (status === gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT) {
                console.log('Framebuffer incomplete missing attachment');
            } else {
                console.log('Unexpected framebuffer status: ' + status);
            }
        }
    }]);

    return RenderTarget;
}();

exports.default = RenderTarget;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9SZW5kZXJUYXJnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTs7Ozs7O0lBTU0sWTtBQUNGLDRCQUEwQjtBQUFBLFlBQWQsT0FBYyx5REFBSixFQUFJOztBQUFBOztBQUN0QixhQUFLLEtBQUwsR0FBYSxRQUFRLElBQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzZCQUlLLEUsRUFBSTtBQUNMLGdCQUFJLEtBQUssWUFBVCxFQUF1QjtBQUNuQixxQkFBSyxVQUFMLENBQWdCLEVBQWhCO0FBQ0EscUJBQUssWUFBTCxHQUFvQixLQUFwQjtBQUNIOztBQUVELGdCQUFJLENBQUMsS0FBSyxZQUFWLEVBQXdCO0FBQ3BCLHFCQUFLLFFBQUwsQ0FBYyxFQUFkO0FBQ0g7O0FBRUQsZUFBRyxlQUFILENBQW1CLEdBQUcsV0FBdEIsRUFBbUMsS0FBSyxZQUF4Qzs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7K0JBSU8sRSxFQUFJO0FBQ1AsZUFBRyxlQUFILENBQW1CLEdBQUcsV0FBdEIsRUFBbUMsSUFBbkM7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7K0JBSU8sRSxFQUFJO0FBQ1AsaUJBQUssVUFBTCxDQUFnQixFQUFoQjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7OztnQ0FJUSxJLEVBQU07QUFDVixpQkFBSyxLQUFMLEdBQWEsSUFBYjtBQUNBLGlCQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O2lDQUtTLEUsRUFBSTtBQUNULGlCQUFLLFFBQUwsR0FBZ0IsdUJBQWhCO0FBQ0EsaUJBQUssUUFBTCxDQUFjLGVBQWQsR0FBZ0MsS0FBaEM7QUFDQSxpQkFBSyxRQUFMLENBQWMsSUFBZCxHQUFxQixLQUFLLEtBQTFCOztBQUVBLGlCQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEVBQXZCOztBQUVBLGlCQUFLLFlBQUwsR0FBb0IsR0FBRyxpQkFBSCxFQUFwQjtBQUNBLGVBQUcsZUFBSCxDQUFtQixHQUFHLFdBQXRCLEVBQW1DLEtBQUssWUFBeEM7O0FBRUEsaUJBQUssYUFBTCxHQUFxQixHQUFHLGtCQUFILEVBQXJCO0FBQ0EsZUFBRyxnQkFBSCxDQUFvQixHQUFHLFlBQXZCLEVBQXFDLEtBQUssYUFBMUM7QUFDQSxlQUFHLG1CQUFILENBQXVCLEdBQUcsWUFBMUIsRUFBd0MsR0FBRyxpQkFBM0MsRUFBOEQsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUE5RCxFQUE2RSxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQTdFOztBQUVBLGVBQUcsb0JBQUgsQ0FBd0IsR0FBRyxXQUEzQixFQUF3QyxHQUFHLGlCQUEzQyxFQUE4RCxHQUFHLFVBQWpFLEVBQTZFLEtBQUssUUFBTCxDQUFjLFFBQTNGLEVBQXFHLENBQXJHO0FBQ0EsZUFBRyx1QkFBSCxDQUEyQixHQUFHLFdBQTlCLEVBQTJDLEdBQUcsZ0JBQTlDLEVBQWdFLEdBQUcsWUFBbkUsRUFBaUYsS0FBSyxhQUF0Rjs7QUFFQSxpQkFBSyxjQUFMLENBQW9CLEVBQXBCOztBQUVBLGVBQUcsZ0JBQUgsQ0FBb0IsR0FBRyxZQUF2QixFQUFxQyxJQUFyQztBQUNBLGVBQUcsZUFBSCxDQUFtQixHQUFHLFdBQXRCLEVBQW1DLElBQW5DO0FBQ0g7O0FBRUQ7Ozs7Ozs7O21DQUtXLEUsRUFBSTtBQUNYLGdCQUFJLEtBQUssWUFBVCxFQUF1QjtBQUNuQixxQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixFQUFyQjtBQUNBLG1CQUFHLGlCQUFILENBQXFCLEtBQUssWUFBMUI7QUFDQSxtQkFBRyxrQkFBSCxDQUFzQixLQUFLLGFBQTNCO0FBQ0EscUJBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7O3VDQUtlLEUsRUFBSTtBQUNmLGdCQUFNLFNBQVMsR0FBRyxzQkFBSCxDQUEwQixHQUFHLFdBQTdCLENBQWY7O0FBRUEsZ0JBQUksV0FBVyxHQUFHLG9CQUFsQixFQUF3QztBQUNwQztBQUNILGFBRkQsTUFFTyxJQUFJLFdBQVcsR0FBRyx1QkFBbEIsRUFBMkM7QUFDOUMsd0JBQVEsR0FBUixDQUFZLDRCQUFaO0FBQ0gsYUFGTSxNQUVBLElBQUksV0FBVyxHQUFHLGlDQUFsQixFQUFxRDtBQUN4RCx3QkFBUSxHQUFSLENBQVksbUNBQVo7QUFDSCxhQUZNLE1BRUEsSUFBSSxXQUFXLEdBQUcsaUNBQWxCLEVBQXFEO0FBQ3hELHdCQUFRLEdBQVIsQ0FBWSxtQ0FBWjtBQUNILGFBRk0sTUFFQSxJQUFJLFdBQVcsR0FBRyx5Q0FBbEIsRUFBNkQ7QUFDaEUsd0JBQVEsR0FBUixDQUFZLDJDQUFaO0FBQ0gsYUFGTSxNQUVBO0FBQ0gsd0JBQVEsR0FBUixDQUFZLG9DQUFvQyxNQUFoRDtBQUNIO0FBQ0o7Ozs7OztrQkFHVSxZIiwiZmlsZSI6IlJlbmRlclRhcmdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0dXJlIGZyb20gJy4vVGV4dHVyZSc7XG5cbi8qKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDRgdC+0LfQtNCw0L3QuNGPINGE0YDQtdC50LzQsdGD0YTQtdGA0LAsINC60YPQtNCwINC80L7QttC90L4g0L7RgtGA0LXQvdC00LXRgNC40YLRjCDQutCw0LTRgC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHt2ZWMyfSBbb3B0aW9ucy5zaXplXSDQoNCw0LfQvNC10YAg0YTRgNC10LnQvNCx0YPRhNC10YDQsFxuICovXG5jbGFzcyBSZW5kZXJUYXJnZXQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9zaXplID0gb3B0aW9ucy5zaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0LLRj9C30YvQstCw0LXRgiDQutC+0LzQv9C+0L3QtdC90YLRiyDRgSDQutC+0L3RgtC10LrRgdGC0L7QvCBXZWJHTFxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqL1xuICAgIGJpbmQoZ2wpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLl91bnByZXBhcmUoZ2wpO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZnJhbWVCdWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmUoZ2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9mcmFtZUJ1ZmZlcik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0L/Rg9GB0YLQvtC5INGE0YDQtdC50LzQsdGD0YTQtdGAINGDINC60L7QvdGC0LXQutGB0YLQsCBXZWJHTFxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqL1xuICAgIHVuYmluZChnbCkge1xuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C00LDQu9GP0LXRgiDRhNGA0LXQudC80LHRg9GE0LXRgCDQuNC3INCy0LjQtNC10L7QutCw0YDRgtGLXG4gICAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gICAgICovXG4gICAgcmVtb3ZlKGdsKSB7XG4gICAgICAgIHRoaXMuX3VucHJlcGFyZShnbCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGA0LDQt9C80LXRgCDRhNGA0LXQudC80LHRg9GE0LXRgNGDXG4gICAgICogQHBhcmFtIHt2ZWMyfSBzaXplXG4gICAgICovXG4gICAgc2V0U2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgICB0aGlzLl9zaXplQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10YIg0YTRgNC10LnQvNCx0YPRhNC10YAsINGC0LXQutGB0YLRg9GA0Ysg0Lgg0YDQtdC90LTQtdGA0LHRg9GE0LXRgFxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBfcHJlcGFyZShnbCkge1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbmV3IFRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZS5nZW5lcmF0ZU1pcG1hcHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZS5zaXplID0gdGhpcy5fc2l6ZTtcblxuICAgICAgICB0aGlzLl90ZXh0dXJlLl9wcmVwYXJlKGdsKTtcblxuICAgICAgICB0aGlzLl9mcmFtZUJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fZnJhbWVCdWZmZXIpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlckJ1ZmZlciA9IGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgdGhpcy5fcmVuZGVyQnVmZmVyKTtcbiAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShnbC5SRU5ERVJCVUZGRVIsIGdsLkRFUFRIX0NPTVBPTkVOVDE2LCB0aGlzLl9zaXplWzBdLCB0aGlzLl9zaXplWzFdKTtcblxuICAgICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUuX3RleHR1cmUsIDApO1xuICAgICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZ2wuREVQVEhfQVRUQUNITUVOVCwgZ2wuUkVOREVSQlVGRkVSLCB0aGlzLl9yZW5kZXJCdWZmZXIpO1xuXG4gICAgICAgIHRoaXMuX2NoZWNrQ29tcGxldGUoZ2wpO1xuXG4gICAgICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9C00LDQu9GP0LXRgiDQtNCw0L3QvdGL0LUg0LjQtyDQstC40LTQtdC+0LrQsNGA0YLRi1xuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBfdW5wcmVwYXJlKGdsKSB7XG4gICAgICAgIGlmICh0aGlzLl9mcmFtZUJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5yZW1vdmUoZ2wpO1xuICAgICAgICAgICAgZ2wuZGVsZXRlRnJhbWVidWZmZXIodGhpcy5fZnJhbWVCdWZmZXIpO1xuICAgICAgICAgICAgZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX3JlbmRlckJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZUJ1ZmZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQn9GA0L7QstC10YDRj9C10YIg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y4g0YTRgNC10LnQvNCx0YPRhNC10YDQsFxuICAgICAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBfY2hlY2tDb21wbGV0ZShnbCkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBnbC5jaGVja0ZyYW1lYnVmZmVyU3RhdHVzKGdsLkZSQU1FQlVGRkVSKTtcblxuICAgICAgICBpZiAoc3RhdHVzID09PSBnbC5GUkFNRUJVRkZFUl9DT01QTEVURSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gZ2wuRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGcmFtZWJ1ZmZlciBpcyB1bnN1cHBvcnRlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gZ2wuRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRnJhbWVidWZmZXIgaW5jb21wbGV0ZSBhdHRhY2htZW50Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBnbC5GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0RJTUVOU0lPTlMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGcmFtZWJ1ZmZlciBpbmNvbXBsZXRlIGRpbWVuc2lvbnMnKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IGdsLkZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRnJhbWVidWZmZXIgaW5jb21wbGV0ZSBtaXNzaW5nIGF0dGFjaG1lbnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVbmV4cGVjdGVkIGZyYW1lYnVmZmVyIHN0YXR1czogJyArIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlbmRlclRhcmdldDtcbiJdfQ==