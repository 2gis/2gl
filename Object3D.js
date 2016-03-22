'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

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
     * Определяет порядок отрисовки объектов с выключенным фильтром глубины.
     * Работает примерно также как и z-index у dom элементов.
     * Также этот порядок учитывается при отрисовки прозрачных мешей.
     * @type {number}
     */
    this.renderOrder = 0;

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
     * Проверяет пересекает ли {@link Raycaster} данный объект, вносит все пересечения в массив intersects.
     * @param {Raycaster} raycaster
     * @param {Intersect[]} intersects
     * @param {Boolean} recursive Проверять ли пересечения с дочерними объектами
     */

  }, {
    key: 'raycast',
    value: function raycast(raycaster, intersects, recursive) {
      // у Object3D пустой метод, проверяем только дочерние объекты

      if (recursive) {
        this.children.forEach(function (child) {
          return child.raycast(raycaster, intersects, recursive);
        });
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
     * @param {TypedObjects} typedObjects
     */

  }, {
    key: 'typifyForRender',
    value: function typifyForRender(typedObjects) {
      if (!this.visible) {
        return this;
      }

      typedObjects.common.push(this);

      this.children.forEach(function (child) {
        return child.typifyForRender(typedObjects);
      });

      return this;
    }
  }]);

  return Object3D;
}();

exports.default = Object3D;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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OEIsS0FBOUIsQ0FUZ0I7O0FBV2hCLGFBQU8sSUFBUCxDQVhnQjs7Ozs7Ozs7O3VDQWlCRDtBQUNmLGFBQU8sZUFBSyxVQUFMLENBQWdCLEtBQUssV0FBTCxDQUFpQixFQUFqQixDQUFoQixFQUFzQyxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsQ0FBdEMsRUFBNEQsS0FBSyxXQUFMLENBQWlCLEVBQWpCLENBQTVELENBQVAsQ0FEZTs7Ozs7Ozs7Ozs2QkFRVixVQUFVO0FBQ2YsZUFBUyxJQUFULEVBRGU7O0FBR2YsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtlQUFTLE1BQU0sUUFBTixDQUFlLFFBQWY7T0FBVCxDQUF0QixDQUhlOztBQUtmLGFBQU8sSUFBUCxDQUxlOzs7Ozs7Ozs7O29DQVlILFVBQVU7QUFDdEIsVUFBSSxDQUFDLEtBQUssT0FBTCxFQUFjO0FBQUUsZUFBTyxJQUFQLENBQUY7T0FBbkI7O0FBRUEsZUFBUyxJQUFULEVBSHNCOztBQUt0QixXQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO2VBQVMsTUFBTSxlQUFOLENBQXNCLFFBQXRCO09BQVQsQ0FBdEIsQ0FMc0I7O0FBT3RCLGFBQU8sSUFBUCxDQVBzQjs7Ozs7Ozs7OztvQ0FjVixjQUFjO0FBQzFCLFVBQUksQ0FBQyxLQUFLLE9BQUwsRUFBYztBQUFFLGVBQU8sSUFBUCxDQUFGO09BQW5COztBQUVBLG1CQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsRUFIMEI7O0FBSzFCLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0I7ZUFBUyxNQUFNLGVBQU4sQ0FBc0IsWUFBdEI7T0FBVCxDQUF0QixDQUwwQjs7QUFPMUIsYUFBTyxJQUFQLENBUDBCOzs7O1NBak01Qjs7O2tCQTRNUyIsImZpbGUiOiJPYmplY3QzRC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dmVjMywgbWF0NCwgcXVhdH0gZnJvbSAnZ2wtbWF0cml4JztcblxuLyoqXG4gKiDQkdCw0LfQvtCy0YvQuSDQutC70LDRgdGBINC00LvRjyAzRCDQvtCx0YrQtdC60YLQvtCyLlxuICogQGNsYXNzIE9iamVjdDNEXG4gKiAqL1xuY2xhc3MgT2JqZWN0M0Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICog0JrQsNC20LTRi9C5IE9iamVjdDNEINC80L7QttC10YIg0LLQutC70Y7Rh9Cw0YLRjCDQsiDRgdC10LHRjyDQtNGA0YPQs9C40LUg0L7QsdGK0LXQutGC0YsuXG4gICAgICAgICAqINCf0L7Qt9C40YbQuNGPLCDQv9C+0LLQvtGA0L7RgiDQuCDQvNCw0YHRiNGC0LDQsSDQtNC+0YfQtdGA0L3QuNGFINC+0LHRitC10LrRgtC+0LIg0LHRg9C00LXRgiDQt9Cw0LLQuNGB0LXRgtGMINC+0YIg0YDQvtC00LjRgtC10LvRjy5cbiAgICAgICAgICogQHR5cGUge09iamVjdDNEW119XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCg0L7QtNC40YLQtdC70YwsINGCLtC1LiDQvtCx0YrQtdC60YIg0LIg0LrQvtGC0L7RgNC+0Lwg0LTQsNC90L3Ri9C5IE9iamVjdDNEINCx0YPQtNC10YIg0LTQvtGH0LXRgNC90LjQvFxuICAgICAgICAgKiBAdHlwZSB7P09iamVjdDNEfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQkdGD0LTQtdGCINC70Lgg0L7QsdGK0LXQutGCINC+0YLQvtCx0YDQsNC20LDRgtGM0YHRjyDQvdCwINGB0YbQtdC90LUsINC10YHQu9C4INC90LXRgiwg0YLQviDQstGB0LUg0LTQvtGH0LXRgNC90LjQtSDQvtCx0YrQtdC60YLRiyDRgtC+0LbQtSDQvdC1INCx0YPQtNGD0YIg0L7RgtC+0LHRgNCw0LbQsNGC0YzRgdGPLlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCe0L/RgNC10LTQtdC70Y/QtdGCINC/0L7RgNGP0LTQvtC6INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQvtCyINGBINCy0YvQutC70Y7Rh9C10L3QvdGL0Lwg0YTQuNC70YzRgtGA0L7QvCDQs9C70YPQsdC40L3Riy5cbiAgICAgICAgICog0KDQsNCx0L7RgtCw0LXRgiDQv9GA0LjQvNC10YDQvdC+INGC0LDQutC20LUg0LrQsNC6INC4IHotaW5kZXgg0YMgZG9tINGN0LvQtdC80LXQvdGC0L7Qsi5cbiAgICAgICAgICog0KLQsNC60LbQtSDRjdGC0L7RgiDQv9C+0YDRj9C00L7QuiDRg9GH0LjRgtGL0LLQsNC10YLRgdGPINC/0YDQuCDQvtGC0YDQuNGB0L7QstC60Lgg0L/RgNC+0LfRgNCw0YfQvdGL0YUg0LzQtdGI0LXQuS5cbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyT3JkZXIgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YHRiNGC0LDQsSDQvtCx0YrQtdC60YLQsFxuICAgICAgICAgKiBAdHlwZSB7dmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGUgPSB2ZWMzLmZyb21WYWx1ZXMoMSwgMSwgMSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCf0L7Qt9C40YbQuNGPINC+0LHRitC10LrRgtCwINCyINC70L7QutCw0LvRjNC90L7QuSDRgdC40YHRgtC10LzQtSDQutC+0L7RgNC00LjQvdCw0YIg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INGA0L7QtNC40YLQtdC70Y9cbiAgICAgICAgICogQHR5cGUge3ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdmVjMy5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J7RgtCy0LXRh9Cw0LXRgiDQt9CwINC/0L7QstC+0YDQvtGCINC+0LHRitC10LrRgtCwXG4gICAgICAgICAqIEB0eXBlIHtxdWF0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5xdWF0ZXJuaW9uID0gcXVhdC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JzQsNGC0YDQuNGG0LAg0L7Qv9GA0LXQtNC10LvRj9GO0YnQsNGPINC/0L7QstC+0YDQvtGCLCDQvNCw0YHRiNGC0LDQsSDQuCDQv9C+0LfQuNGG0LjRjiDQvtCx0YrQtdC60YLQsCDQsiDQu9C+0LrQsNC70YzQvdC+0Lkg0YHQuNGB0YLQtdC80LUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgICAgICAqINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDRgNC+0LTQuNGC0LXQu9GPLlxuICAgICAgICAgKiBAdHlwZSB7bWF0NH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9jYWxNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQnNCw0YLRgNC40YbQsCDQvtC/0YDQtdC00LXQu9GP0Y7RidCw0Y8g0L/QvtCy0L7RgNC+0YIsINC80LDRgdGI0YLQsNCxINC4INC/0L7Qt9C40YbQuNGOINC+0LHRitC10LrRgtCwINCyINCz0LvQvtCx0LDQu9GM0L3QvtC5INGB0LjRgdGC0LXQvNC1INC60L7QvtGA0LTQuNC90LDRgi5cbiAgICAgICAgICogQHR5cGUge21hdDR9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndvcmxkTWF0cml4ID0gbWF0NC5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70LggdHJ1ZSwg0YLQviB3b3JsZE1hdHJpeCDQsdGD0LTQtdGCINC+0LHQvdC+0LLQu9C10L3QsCDQv9C10YDQtdC0INGA0LXQvdC00LXRgNC40L3Qs9C+0LxcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndvcmxkTWF0cml4TmVlZHNVcGRhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQlNC+0LHQsNCy0LvRj9C10YIg0LTQvtGH0LXRgNC90LjQuSDQvtCx0YrQtdC60YJcbiAgICAgKiBAcGFyYW0ge09iamVjdDNEfSBvYmplY3Qg0JTQvtGH0LXRgNC90LjQuSDQvtCx0YrQtdC60YJcbiAgICAgKi9cbiAgICBhZGQob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QucGFyZW50KSB7XG4gICAgICAgICAgICBvYmplY3QucGFyZW50LnJlbW92ZShvYmplY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqZWN0LnBhcmVudCA9IHRoaXM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChvYmplY3QpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0LHQuNGA0LDQtdGCINC00L7Rh9C10YDQvdC40Lkg0L7QsdGK0LXQutGCXG4gICAgICogQHBhcmFtIHtPYmplY3QzRH0gb2JqZWN0INCU0L7Rh9C10YDQvdC40Lkg0L7QsdGK0LXQutGCXG4gICAgICovXG4gICAgcmVtb3ZlKG9iamVjdCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihvYmplY3QpO1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9iamVjdC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J/RgNC+0LLQtdGA0Y/QtdGCINC/0LXRgNC10YHQtdC60LDQtdGCINC70Lgge0BsaW5rIFJheWNhc3Rlcn0g0LTQsNC90L3Ri9C5INC+0LHRitC10LrRgiwg0LLQvdC+0YHQuNGCINCy0YHQtSDQv9C10YDQtdGB0LXRh9C10L3QuNGPINCyINC80LDRgdGB0LjQsiBpbnRlcnNlY3RzLlxuICAgICAqIEBwYXJhbSB7UmF5Y2FzdGVyfSByYXljYXN0ZXJcbiAgICAgKiBAcGFyYW0ge0ludGVyc2VjdFtdfSBpbnRlcnNlY3RzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWN1cnNpdmUg0J/RgNC+0LLQtdGA0Y/RgtGMINC70Lgg0L/QtdGA0LXRgdC10YfQtdC90LjRjyDRgSDQtNC+0YfQtdGA0L3QuNC80Lgg0L7QsdGK0LXQutGC0LDQvNC4XG4gICAgICovXG4gICAgcmF5Y2FzdChyYXljYXN0ZXIsIGludGVyc2VjdHMsIHJlY3Vyc2l2ZSkge1xuICAgICAgICAvLyDRgyBPYmplY3QzRCDQv9GD0YHRgtC+0Lkg0LzQtdGC0L7QtCwg0L/RgNC+0LLQtdGA0Y/QtdC8INGC0L7Qu9GM0LrQviDQtNC+0YfQtdGA0L3QuNC1INC+0LHRitC10LrRgtGLXG5cbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnJheWNhc3QocmF5Y2FzdGVyLCBpbnRlcnNlY3RzLCByZWN1cnNpdmUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YLRgdGPINGA0LXQvdC00LXRgNC+0Lwg0LTQu9GPINC/0L7QtNCz0L7RgtC+0LLQutC4INC4INC+0YLRgNC40YHQvtCy0LrQuCDQvtCx0YrQtdC60YLQsC5cbiAgICAgKiBAcGFyYW0ge1N0YXRlfSBzdGF0ZSDQotC10LrRg9GJ0LjQtSDRgdC+0YHRgtC+0Y/QvdC40LUg0YDQtdC90LTQtdGA0LBcbiAgICAgKi9cbiAgICByZW5kZXIoc3RhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICBpZiAodGhpcy53b3JsZE1hdHJpeE5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntCx0L3QvtCy0LvRj9C10YIg0LvQvtC60LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwLiDQndC10L7QsdGF0L7QtNC40LzQviDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0LrQsNC20LTRi9C5INGA0LDQtyDQv9C+0YHQu9C1INC40LfQvNC10L3QtdC90LjRjyBwb3NpdGlvbiwgc2NhbGVcbiAgICAgKiDQuCBxdWF0ZXJuaW9uLlxuICAgICAqICovXG4gICAgdXBkYXRlTG9jYWxNYXRyaXgoKSB7XG4gICAgICAgIG1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSh0aGlzLmxvY2FsTWF0cml4LCB0aGlzLnF1YXRlcm5pb24sIHRoaXMucG9zaXRpb24sIHRoaXMuc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QsdC90L7QstC70Y/QtdGCINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC80LDRgtGA0LjRhtGDINC+0LHRitC10LrRgtCwLlxuICAgICAqICovXG4gICAgdXBkYXRlV29ybGRNYXRyaXgoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgbWF0NC5tdWwodGhpcy53b3JsZE1hdHJpeCwgdGhpcy5wYXJlbnQud29ybGRNYXRyaXgsIHRoaXMubG9jYWxNYXRyaXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0NC5jb3B5KHRoaXMud29ybGRNYXRyaXgsIHRoaXMubG9jYWxNYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KCkpO1xuXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXhOZWVkc1VwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC/0L7Qt9C40YbQuNGOINC+0LHRitC10LrRgtCwINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQs9C70L7QsdCw0LvRjNC90YvRhSDQutC+0L7RgNC00LjQvdCw0YIuXG4gICAgICovXG4gICAgZ2V0V29ybGRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZlYzMuZnJvbVZhbHVlcyh0aGlzLndvcmxkTWF0cml4WzEyXSwgdGhpcy53b3JsZE1hdHJpeFsxM10sIHRoaXMud29ybGRNYXRyaXhbMTRdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGCINC/0LXRgNC10LTQsNC90L3Ri9C5IGNhbGxiYWNrINC00LvRjyDRgdC10LHRjyDQuCDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0LTQvtGH0LXRgNC90LXQs9C+INC60LvQsNGB0YHQsC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIHRyYXZlcnNlKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50cmF2ZXJzZShjYWxsYmFjaykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCg0LDQsdC+0YLQsNC10YIg0YLQsNC60LbQtSDQutCw0Log0Lgge0BsaW5rIE9iamVjdDNEI3RyYXZlcnNlfSwg0L3QviDRgtC+0LvRjNC60L4g0LTQu9GPINC+0LHRitC10LrRgtC+0LIg0YEgdmlzaWJsZSA9IHRydWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIHRyYXZlcnNlVmlzaWJsZShjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50cmF2ZXJzZVZpc2libGUoY2FsbGJhY2spKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktGL0LfRi9Cy0LDQtdGC0YHRjyDQvdCwINGN0YLQsNC/0LUg0YDQtdC90LTQtdGA0LjQvdCz0LAsINGH0YLQvtCx0Ysg0L7Qv9GA0LXQtNC10LvQuNGC0Ywg0Log0LrQsNC60L7QvNGDINGC0LjQv9GDINGA0LXQvdC00LXRgNCwINC/0YDQuNC90LDQtNC70LXQttC40YIg0L7QsdGK0LXQutGCLlxuICAgICAqIEBwYXJhbSB7VHlwZWRPYmplY3RzfSB0eXBlZE9iamVjdHNcbiAgICAgKi9cbiAgICB0eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgdHlwZWRPYmplY3RzLmNvbW1vbi5wdXNoKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC50eXBpZnlGb3JSZW5kZXIodHlwZWRPYmplY3RzKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QzRDtcbiJdfQ==