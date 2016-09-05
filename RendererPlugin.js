"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Родительский класс для плагинов рендера.
 * Для того, чтобы добавить плагин к рендеру, его нужно создать и вызывать {@link Renderer#addPlugin}.
 * На этапе рендринга каждый объект сам добавляется к нужному плагину для отрисовки,
 * ориентируясь на поле type плагина.
 *
 * После отрисовки всех объектов список объектов в плагине очищается.
 */
var RendererPlugin = function () {
    function RendererPlugin() {
        _classCallCheck(this, RendererPlugin);

        this._objects = [];

        /**
         * Используется для обозначения типа плагина
         * @type {Number}
         */
        this.type = 0;
    }

    /**
     * Рисует сцену с помощью этого плагина
     * @param {State} state
     */


    _createClass(RendererPlugin, [{
        key: "render",
        value: function render() {
            this._objects = [];
        }

        /**
         * Добавляет объект к плагину на этапе рендеринга
         * @param {Object3D} object
         */

    }, {
        key: "addObject",
        value: function addObject(object) {
            this._objects.push(object);
            return this;
        }
    }, {
        key: "hasObjects",
        value: function hasObjects() {
            return this._objects.length > 0;
        }
    }]);

    return RendererPlugin;
}();

exports.default = RendererPlugin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9SZW5kZXJlclBsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBUU0sYztBQUNGLDhCQUFjO0FBQUE7O0FBQ1YsYUFBSyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBOzs7O0FBSUEsYUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNIOztBQUVEOzs7Ozs7OztpQ0FJUztBQUNMLGlCQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDSDs7QUFFRDs7Ozs7OztrQ0FJVSxNLEVBQVE7QUFDZCxpQkFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixNQUFuQjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7O3FDQUVZO0FBQ1QsbUJBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUE5QjtBQUNIOzs7Ozs7a0JBR1UsYyIsImZpbGUiOiJSZW5kZXJlclBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog0KDQvtC00LjRgtC10LvRjNGB0LrQuNC5INC60LvQsNGB0YEg0LTQu9GPINC/0LvQsNCz0LjQvdC+0LIg0YDQtdC90LTQtdGA0LAuXG4gKiDQlNC70Y8g0YLQvtCz0L4sINGH0YLQvtCx0Ysg0LTQvtCx0LDQstC40YLRjCDQv9C70LDQs9C40L0g0Log0YDQtdC90LTQtdGA0YMsINC10LPQviDQvdGD0LbQvdC+INGB0L7Qt9C00LDRgtGMINC4INCy0YvQt9GL0LLQsNGC0Ywge0BsaW5rIFJlbmRlcmVyI2FkZFBsdWdpbn0uXG4gKiDQndCwINGN0YLQsNC/0LUg0YDQtdC90LTRgNC40L3Qs9CwINC60LDQttC00YvQuSDQvtCx0YrQtdC60YIg0YHQsNC8INC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0Log0L3Rg9C20L3QvtC80YMg0L/Qu9Cw0LPQuNC90YMg0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCxcbiAqINC+0YDQuNC10L3RgtC40YDRg9GP0YHRjCDQvdCwINC/0L7Qu9C1IHR5cGUg0L/Qu9Cw0LPQuNC90LAuXG4gKlxuICog0J/QvtGB0LvQtSDQvtGC0YDQuNGB0L7QstC60Lgg0LLRgdC10YUg0L7QsdGK0LXQutGC0L7QsiDRgdC/0LjRgdC+0Log0L7QsdGK0LXQutGC0L7QsiDQsiDQv9C70LDQs9C40L3QtSDQvtGH0LjRidCw0LXRgtGB0Y8uXG4gKi9cbmNsYXNzIFJlbmRlcmVyUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0LHQvtC30L3QsNGH0LXQvdC40Y8g0YLQuNC/0LAg0L/Qu9Cw0LPQuNC90LBcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdGCINGB0YbQtdC90YMg0YEg0L/QvtC80L7RidGM0Y4g0Y3RgtC+0LPQviDQv9C70LDQs9C40L3QsFxuICAgICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLl9vYmplY3RzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JTQvtCx0LDQstC70Y/QtdGCINC+0LHRitC10LrRgiDQuiDQv9C70LDQs9C40L3RgyDQvdCwINGN0YLQsNC/0LUg0YDQtdC90LTQtdGA0LjQvdCz0LBcbiAgICAgKiBAcGFyYW0ge09iamVjdDNEfSBvYmplY3RcbiAgICAgKi9cbiAgICBhZGRPYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHRoaXMuX29iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBoYXNPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0cy5sZW5ndGggPiAwO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyZXJQbHVnaW47XG4iXX0=