"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Шейдерный атрибут, используется только {@link ShaderProgram}
 *
 * @param {AttributeDefinition} options
 * @ignore
 */
var ShaderAttribute = function () {
    function ShaderAttribute(options) {
        _classCallCheck(this, ShaderAttribute);

        this.name = options.name;
        this.index = options.index;
        this.location = options.location !== undefined ? options.location : -1;

        this._enable = false;
    }

    _createClass(ShaderAttribute, [{
        key: "bindLocation",
        value: function bindLocation(gl, shaderProgram) {
            if (this.location !== -1 && this.index !== true) {
                gl.bindAttribLocation(shaderProgram, this.location, this.name);
            }
            return this;
        }
    }, {
        key: "getLocation",
        value: function getLocation(gl, shaderProgram) {
            if (this.location === -1 && this.index !== true) {
                this.location = gl.getAttribLocation(shaderProgram, this.name);
            }
            return this;
        }
    }, {
        key: "bind",
        value: function bind(gl, buffer) {
            if (!this._enable && this.index !== true) {
                gl.enableVertexAttribArray(this.location);
                this._enable = true;
            }

            buffer.bind(gl, this.location);
            return this;
        }
    }, {
        key: "disable",
        value: function disable(gl) {
            if (this._enable && this.index !== true) {
                gl.disableVertexAttribArray(this.location);
                this._enable = false;
            }
            return this;
        }
    }]);

    return ShaderAttribute;
}();

exports.default = ShaderAttribute;

/**
 * Описание шейдерного атрибута
 *
 * @typedef {Object} AttributeDefinition
 * @property {String} name Название атрибута
 * @property {Boolean} [index] Если атрибут используется для передачи индексов, то true
 * @property {Number} location Можно напрямую выставить location атрибуту, чтобы не вызывался getAttributeLocation
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TaGFkZXJBdHRyaWJ1dGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFNTSxlO0FBQ0YsNkJBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLLElBQUwsR0FBWSxRQUFRLElBQXBCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsUUFBUSxLQUFyQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLFFBQVIsS0FBcUIsU0FBckIsR0FBaUMsUUFBUSxRQUF6QyxHQUFvRCxDQUFDLENBQXJFOztBQUVBLGFBQUssT0FBTCxHQUFlLEtBQWY7QUFDSDs7OztxQ0FFWSxFLEVBQUksYSxFQUFlO0FBQzVCLGdCQUFJLEtBQUssUUFBTCxLQUFrQixDQUFDLENBQW5CLElBQXdCLEtBQUssS0FBTCxLQUFlLElBQTNDLEVBQWlEO0FBQzdDLG1CQUFHLGtCQUFILENBQXNCLGFBQXRCLEVBQXFDLEtBQUssUUFBMUMsRUFBb0QsS0FBSyxJQUF6RDtBQUNIO0FBQ0QsbUJBQU8sSUFBUDtBQUNIOzs7b0NBRVcsRSxFQUFJLGEsRUFBZTtBQUMzQixnQkFBSSxLQUFLLFFBQUwsS0FBa0IsQ0FBQyxDQUFuQixJQUF3QixLQUFLLEtBQUwsS0FBZSxJQUEzQyxFQUFpRDtBQUM3QyxxQkFBSyxRQUFMLEdBQWdCLEdBQUcsaUJBQUgsQ0FBcUIsYUFBckIsRUFBb0MsS0FBSyxJQUF6QyxDQUFoQjtBQUNIO0FBQ0QsbUJBQU8sSUFBUDtBQUNIOzs7NkJBRUksRSxFQUFJLE0sRUFBUTtBQUNiLGdCQUFJLENBQUMsS0FBSyxPQUFOLElBQWlCLEtBQUssS0FBTCxLQUFlLElBQXBDLEVBQTBDO0FBQ3RDLG1CQUFHLHVCQUFILENBQTJCLEtBQUssUUFBaEM7QUFDQSxxQkFBSyxPQUFMLEdBQWUsSUFBZjtBQUNIOztBQUVELG1CQUFPLElBQVAsQ0FBWSxFQUFaLEVBQWdCLEtBQUssUUFBckI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztnQ0FFTyxFLEVBQUk7QUFDUixnQkFBSSxLQUFLLE9BQUwsSUFBZ0IsS0FBSyxLQUFMLEtBQWUsSUFBbkMsRUFBeUM7QUFDckMsbUJBQUcsd0JBQUgsQ0FBNEIsS0FBSyxRQUFqQztBQUNBLHFCQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0g7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7Ozs7OztrQkFHVSxlOztBQUVmIiwiZmlsZSI6IlNoYWRlckF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICog0KjQtdC50LTQtdGA0L3Ri9C5INCw0YLRgNC40LHRg9GCLCDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0YLQvtC70YzQutC+IHtAbGluayBTaGFkZXJQcm9ncmFtfVxuICpcbiAqIEBwYXJhbSB7QXR0cmlidXRlRGVmaW5pdGlvbn0gb3B0aW9uc1xuICogQGlnbm9yZVxuICovXG5jbGFzcyBTaGFkZXJBdHRyaWJ1dGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICB0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleDtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubG9jYXRpb24gOiAtMTtcblxuICAgICAgICB0aGlzLl9lbmFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kTG9jYXRpb24oZ2wsIHNoYWRlclByb2dyYW0pIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYXRpb24gIT09IC0xICYmIHRoaXMuaW5kZXggIT09IHRydWUpIHtcbiAgICAgICAgICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCB0aGlzLmxvY2F0aW9uLCB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldExvY2F0aW9uKGdsLCBzaGFkZXJQcm9ncmFtKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2F0aW9uID09PSAtMSAmJiB0aGlzLmluZGV4ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgdGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBiaW5kKGdsLCBidWZmZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGUgJiYgdGhpcy5pbmRleCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5sb2NhdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmZmVyLmJpbmQoZ2wsIHRoaXMubG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkaXNhYmxlKGdsKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGUgJiYgdGhpcy5pbmRleCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMubG9jYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGFkZXJBdHRyaWJ1dGU7XG5cbi8qKlxuICog0J7Qv9C40YHQsNC90LjQtSDRiNC10LnQtNC10YDQvdC+0LPQviDQsNGC0YDQuNCx0YPRgtCwXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gQXR0cmlidXRlRGVmaW5pdGlvblxuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUg0J3QsNC30LLQsNC90LjQtSDQsNGC0YDQuNCx0YPRgtCwXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtpbmRleF0g0JXRgdC70Lgg0LDRgtGA0LjQsdGD0YIg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQv9C10YDQtdC00LDRh9C4INC40L3QtNC10LrRgdC+0LIsINGC0L4gdHJ1ZVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGxvY2F0aW9uINCc0L7QttC90L4g0L3QsNC/0YDRj9C80YPRjiDQstGL0YHRgtCw0LLQuNGC0YwgbG9jYXRpb24g0LDRgtGA0LjQsdGD0YLRgywg0YfRgtC+0LHRiyDQvdC1INCy0YvQt9GL0LLQsNC70YHRjyBnZXRBdHRyaWJ1dGVMb2NhdGlvblxuICovXG4iXX0=