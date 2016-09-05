'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _libConstants = require('./libConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Базовый класс для 3D объектов.
 * @class Object3D
 * */
var Object3D = function () {
  function Object3D() {
    _classCallCheck(this, Object3D);

    /**
     * Каждый Object3D может включать в себя другие объекты.
     * Позиция, поворот и масштаб дочерних объектов будет зависеть от родителя.
     * @type {Object3D[]}
     */
    this.children = [];

    /**
     * Родитель, т.е. объект в котором данный Object3D будет дочерним
     * @type {?Object3D}
     */
    this.parent = null;

    /**
     * Будет ли объект отображаться на сцене, если нет, то все дочерние объекты тоже не будут отображаться.
     * @type {boolean}
     */
    this.visible = true;

    /**
     * Масштаб объекта
     * @type {vec3}
     */
    this.scale = _glMatrix.vec3.fromValues(1, 1, 1);

    /**
     * Позиция объекта в локальной системе координат относительно родителя
     * @type {vec3}
     */
    this.position = _glMatrix.vec3.create();

    /**
     * Отвечает за поворот объекта
     * @type {quat}
     */
    this.quaternion = _glMatrix.quat.create();

    /**
     * Матрица определяющая поворот, масштаб и позицию объекта в локальной системе координат
     * относительно родителя.
     * @type {mat4}
     */
    this.localMatrix = _glMatrix.mat4.create();

    /**
     * Матрица определяющая поворот, масштаб и позицию объекта в глобальной системе координат.
     * @type {mat4}
     */
    this.worldMatrix = _glMatrix.mat4.create();

    /**
     * Если true, то worldMatrix будет обновлена перед рендерингом
     * @type {boolean}
     */
    this.worldMatrixNeedsUpdate = false;

    /**
     * Используется для обозначения типа объекта
     * @type {Number}
     */
    this.type = _libConstants.OBJECT_3D;
  }

  /**
   * Добавляет дочерний объект
   * @param {Object3D} object Дочерний объект
   */


  _createClass(Object3D, [{
    key: 'add',
    value: function add(object) {
      if (object.parent) {
        object.parent.remove(object);
      }

      object.parent = this;
      this.children.push(object);

      return this;
    }

    /**
     * Убирает дочерний объект
     * @param {Object3D} object Дочерний объект
     */

  }, {
    key: 'remove',
    value: function remove(object) {
      var index = this.children.indexOf(object);

      if (index !== -1) {
        object.parent = null;
        this.children.splice(index, 1);
      }

      return this;
    }

    /**
     * Вызывается рендером для подготовки и отрисовки объекта.
     * @param {State} state Текущие состояние рендера
     */

  }, {
    key: 'render',
    value: function render(state) {
      if (!this.visible) {
        return this;
      }

      if (this.worldMatrixNeedsUpdate) {
        this.updateWorldMatrix();
      }

      return this;
    }

    /**
     * Обновляет локальную матрицу объекта. Необходимо использовать каждый раз после изменения position, scale
     * и quaternion.
     * */

  }, {
    key: 'updateLocalMatrix',
    value: function updateLocalMatrix() {
      _glMatrix.mat4.fromRotationTranslationScale(this.localMatrix, this.quaternion, this.position, this.scale);

      this.worldMatrixNeedsUpdate = true;

      return this;
    }

    /**
     * Обновляет глобальную матрицу объекта.
     * */

  }, {
    key: 'updateWorldMatrix',
    value: function updateWorldMatrix() {
      if (this.parent) {
        _glMatrix.mat4.mul(this.worldMatrix, this.parent.worldMatrix, this.localMatrix);
      } else {
        _glMatrix.mat4.copy(this.worldMatrix, this.localMatrix);
      }

      this.children.forEach(function (child) {
        return child.updateWorldMatrix();
      });

      this.worldMatrixNeedsUpdate = false;

      return this;
    }

    /**
     * Возвращает позицию объекта относительно глобальных координат.
     */

  }, {
    key: 'getWorldPosition',
    value: function getWorldPosition() {
      return _glMatrix.vec3.fromValues(this.worldMatrix[12], this.worldMatrix[13], this.worldMatrix[14]);
    }

    /**
     * Вызывает переданный callback для себя и для каждого дочернего класса.
     * @param {Function} callback
     */

  }, {
    key: 'traverse',
    value: function traverse(callback) {
      callback(this);

      this.children.forEach(function (child) {
        return child.traverse(callback);
      });

      return this;
    }

    /**
     * Работает также как и {@link Object3D#traverse}, но только для объектов с visible = true
     * @param {Function} callback
     */

  }, {
    key: 'traverseVisible',
    value: function traverseVisible(callback) {
      if (!this.visible) {
        return this;
      }

      callback(this);

      this.children.forEach(function (child) {
        return child.traverseVisible(callback);
      });

      return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * @param {Object} renderPlugins
     */

  }, {
    key: 'typifyForRender',
    value: function typifyForRender(renderPlugins) {
      if (!this.visible) {
        return this;
      }

      renderPlugins[_libConstants.OBJECT_3D_RENDERER].addObject(this);

      this.children.forEach(function (child) {
        return child.typifyForRender(renderPlugins);
      });

      return this;
    }
  }]);

  return Object3D;
}();

exports.default = Object3D;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QWUsUUFBZixDQUFUO0FBQUEsT0FBdEI7O0FBRUEsYUFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7b0NBSWdCLFEsRUFBVTtBQUN0QixVQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQUUsZUFBTyxJQUFQO0FBQWM7O0FBRW5DLGVBQVMsSUFBVDs7QUFFQSxXQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO0FBQUEsZUFBUyxNQUFNLGVBQU4sQ0FBc0IsUUFBdEIsQ0FBVDtBQUFBLE9BQXRCOztBQUVBLGFBQU8sSUFBUDtBQUNIOztBQUVEOzs7Ozs7O29DQUlnQixhLEVBQWU7QUFDM0IsVUFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUVuQyxzREFBa0MsU0FBbEMsQ0FBNEMsSUFBNUM7O0FBRUEsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtBQUFBLGVBQVMsTUFBTSxlQUFOLENBQXNCLGFBQXRCLENBQVQ7QUFBQSxPQUF0Qjs7QUFFQSxhQUFPLElBQVA7QUFDSDs7Ozs7O2tCQUdVLFEiLCJmaWxlIjoiT2JqZWN0M0QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlYzMsIG1hdDQsIHF1YXR9IGZyb20gJ2dsLW1hdHJpeCc7XG5pbXBvcnQge09CSkVDVF8zRCwgT0JKRUNUXzNEX1JFTkRFUkVSfSBmcm9tICcuL2xpYkNvbnN0YW50cyc7XG5cbi8qKlxuICog0JHQsNC30L7QstGL0Lkg0LrQu9Cw0YHRgSDQtNC70Y8gM0Qg0L7QsdGK0LXQutGC0L7Qsi5cbiAqIEBjbGFzcyBPYmplY3QzRFxuICogKi9cbmNsYXNzIE9iamVjdDNEIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCa0LDQttC00YvQuSBPYmplY3QzRCDQvNC+0LbQtdGCINCy0LrQu9GO0YfQsNGC0Ywg0LIg0YHQtdCx0Y8g0LTRgNGD0LPQuNC1INC+0LHRitC10LrRgtGLLlxuICAgICAgICAgKiDQn9C+0LfQuNGG0LjRjywg0L/QvtCy0L7RgNC+0YIg0Lgg0LzQsNGB0YjRgtCw0LEg0LTQvtGH0LXRgNC90LjRhSDQvtCx0YrQtdC60YLQvtCyINCx0YPQtNC10YIg0LfQsNCy0LjRgdC10YLRjCDQvtGCINGA0L7QtNC40YLQtdC70Y8uXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3QzRFtdfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQoNC+0LTQuNGC0LXQu9GMLCDRgi7QtS4g0L7QsdGK0LXQutGCINCyINC60L7RgtC+0YDQvtC8INC00LDQvdC90YvQuSBPYmplY3QzRCDQsdGD0LTQtdGCINC00L7Rh9C10YDQvdC40LxcbiAgICAgICAgICogQHR5cGUgez9PYmplY3QzRH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JHRg9C00LXRgiDQu9C4INC+0LHRitC10LrRgiDQvtGC0L7QsdGA0LDQttCw0YLRjNGB0Y8g0L3QsCDRgdGG0LXQvdC1LCDQtdGB0LvQuCDQvdC10YIsINGC0L4g0LLRgdC1INC00L7Rh9C10YDQvdC40LUg0L7QsdGK0LXQutGC0Ysg0YLQvtC20LUg0L3QtSDQsdGD0LTRg9GCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRjy5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YHRiNGC0LDQsSDQvtCx0YrQtdC60YLQsFxuICAgICAgICAgKiBAdHlwZSB7dmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGUgPSB2ZWMzLmZyb21WYWx1ZXMoMSwgMSwgMSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCf0L7Qt9C40YbQuNGPINC+0LHRitC10LrRgtCwINCyINC70L7QutCw0LvRjNC90L7QuSDRgdC40YHRgtC10LzQtSDQutC+0L7RgNC00LjQvdCw0YIg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INGA0L7QtNC40YLQtdC70Y9cbiAgICAgICAgICogQHR5cGUge3ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdmVjMy5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J7RgtCy0LXRh9Cw0LXRgiDQt9CwINC/0L7QstC+0YDQvtGCINC+0LHRitC10LrRgtCwXG4gICAgICAgICAqIEB0eXBlIHtxdWF0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5xdWF0ZXJuaW9uID0gcXVhdC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQsNGC0YDQuNGG0LAg0L7Qv9GA0LXQtNC10LvRj9GO0YnQsNGPINC/0L7QstC+0YDQvtGCLCDQvNCw0YHRiNGC0LDQsSDQuCDQv9C+0LfQuNGG0LjRjiDQvtCx0YrQtdC60YLQsCDQsiDQu9C+0LrQsNC70YzQvdC+0Lkg0YHQuNGB0YLQtdC80LUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgICAgICAqINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDRgNC+0LTQuNGC0LXQu9GPLlxuICAgICAgICAgKiBAdHlwZSB7bWF0NH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9jYWxNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YLRgNC40YbQsCDQvtC/0YDQtdC00LXQu9GP0Y7RidCw0Y8g0L/QvtCy0L7RgNC+0YIsINC80LDRgdGI0YLQsNCxINC4INC/0L7Qt9C40YbQuNGOINC+0LHRitC10LrRgtCwINCyINCz0LvQvtCx0LDQu9GM0L3QvtC5INGB0LjRgdGC0LXQvNC1INC60L7QvtGA0LTQuNC90LDRgi5cbiAgICAgICAgICogQHR5cGUge21hdDR9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndvcmxkTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70LggdHJ1ZSwg0YLQviB3b3JsZE1hdHJpeCDQsdGD0LTQtdGCINC+0LHQvdC+0LLQu9C10L3QsCDQv9C10YDQtdC0INGA0LXQvdC00LXRgNC40L3Qs9C+0LxcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC+0LHRitC10LrRgtCwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBPQkpFQ1RfM0Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JTQvtCx0LDQstC70Y/QtdGCINC00L7Rh9C10YDQvdC40Lkg0L7QsdGK0LXQutGCXG4gICAgICogQHBhcmFtIHtPYmplY3QzRH0gb2JqZWN0INCU0L7Rh9C10YDQvdC40Lkg0L7QsdGK0LXQutGCXG4gICAgICovXG4gICAgYWRkKG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0LnBhcmVudCkge1xuICAgICAgICAgICAgb2JqZWN0LnBhcmVudC5yZW1vdmUob2JqZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iamVjdC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gob2JqZWN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9Cx0LjRgNCw0LXRgiDQtNC+0YfQtdGA0L3QuNC5INC+0LHRitC10LrRglxuICAgICAqIEBwYXJhbSB7T2JqZWN0M0R9IG9iamVjdCDQlNC+0YfQtdGA0L3QuNC5INC+0LHRitC10LrRglxuICAgICAqL1xuICAgIHJlbW92ZShvYmplY3QpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2Yob2JqZWN0KTtcblxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBvYmplY3QucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YLRgdGPINGA0LXQvdC00LXRgNC+0Lwg0LTQu9GPINC/0L7QtNCz0L7RgtC+0LLQutC4INC4INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQsC5cbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZSDQotC10LrRg9GJ0LjQtSDRgdC+0YHRgtC+0Y/QvdC40LUg0YDQtdC90LTQtdGA0LBcbiAgICAgKi9cbiAgICByZW5kZXIoc3RhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICBpZiAodGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntCx0L3QvtCy0LvRj9C10YIg0LvQvtC60LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwLiDQndC10L7QsdGF0L7QtNC40LzQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LrQsNC20LTRi9C5INGA0LDQtyDQv9C+0YHQu9C1INC40LfQvNC10L3QtdC90LjRjyBwb3NpdGlvbiwgc2NhbGVcbiAgICAgKiDQuCBxdWF0ZXJuaW9uLlxuICAgICAqICovXG4gICAgdXBkYXRlTG9jYWxNYXRyaXgoKSB7XG4gICAgICAgIG1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSh0aGlzLmxvY2FsTWF0cml4LCB0aGlzLnF1YXRlcm5pb24sIHRoaXMucG9zaXRpb24sIHRoaXMuc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QsdC90L7QstC70Y/QtdGCINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwLlxuICAgICAqICovXG4gICAgdXBkYXRlV29ybGRNYXRyaXgoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgbWF0NC5tdWwodGhpcy53b3JsZE1hdHJpeCwgdGhpcy5wYXJlbnQud29ybGRNYXRyaXgsIHRoaXMubG9jYWxNYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0NC5jb3B5KHRoaXMud29ybGRNYXRyaXgsIHRoaXMubG9jYWxNYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KCkpO1xuXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0L7Qt9C40YbQuNGOINC+0LHRitC10LrRgtCwINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQs9C70L7QsdCw0LvRjNC90YvRhSDQutC+0L7RgNC00LjQvdCw0YIuXG4gICAgICovXG4gICAgZ2V0V29ybGRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZlYzMuZnJvbVZhbHVlcyh0aGlzLndvcmxkTWF0cml4WzEyXSwgdGhpcy53b3JsZE1hdHJpeFsxM10sIHRoaXMud29ybGRNYXRyaXhbMTRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGCINC/0LXRgNC10LTQsNC90L3Ri9C5IGNhbGxiYWNrINC00LvRjyDRgdC10LHRjyDQuCDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LTQvtGH0LXRgNC90LXQs9C+INC60LvQsNGB0YHQsC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIHRyYXZlcnNlKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50cmF2ZXJzZShjYWxsYmFjaykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCg0LDQsdC+0YLQsNC10YIg0YLQsNC60LbQtSDQutCw0Log0Lgge0BsaW5rIE9iamVjdDNEI3RyYXZlcnNlfSwg0L3QviDRgtC+0LvRjNC60L4g0LTQu9GPINC+0LHRitC10LrRgtC+0LIg0YEgdmlzaWJsZSA9IHRydWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIHRyYXZlcnNlVmlzaWJsZShjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50cmF2ZXJzZVZpc2libGUoY2FsbGJhY2spKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQvdCwINGN0YLQsNC/0LUg0YDQtdC90LTQtdGA0LjQvdCz0LAsINGH0YLQvtCx0Ysg0L7Qv9GA0LXQtNC10LvQuNGC0Ywg0Log0LrQsNC60L7QvNGDINGC0LjQv9GDINGA0LXQvdC00LXRgNCwINC/0YDQuNC90LDQtNC70LXQttC40YIg0L7QsdGK0LXQutGCLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJQbHVnaW5zXG4gICAgICovXG4gICAgdHlwaWZ5Rm9yUmVuZGVyKHJlbmRlclBsdWdpbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICByZW5kZXJQbHVnaW5zW09CSkVDVF8zRF9SRU5ERVJFUl0uYWRkT2JqZWN0KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50eXBpZnlGb3JSZW5kZXIocmVuZGVyUGx1Z2lucykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0M0Q7XG4iXX0=