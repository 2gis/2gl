'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _Geometry = require('./Geometry');

var _Geometry2 = _interopRequireDefault(_Geometry);

var _GeometryBuffer = require('./GeometryBuffer');

var _GeometryBuffer2 = _interopRequireDefault(_GeometryBuffer);

var _libConstants = require('./libConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Используется для отрисовки мультиспрайтов. Мультиспрайт представляет собой множество
 * спрайтов, которые рисуются в один draw call. Спрайтами в мультиспрайте можно
 * управлять независимо друг от друга.
 *
 * Для отрисовки спрайтов нужно подключить {@link MultiSpritePlugin} к рендереру.
 *
 * @extends {Object3D}
 */
var MultiSprite = function (_Object3D) {
    _inherits(MultiSprite, _Object3D);

    /**
     * @param {SpriteDescriptor[]} sprites Описание спрайтов, входящих в мультиспрайт
     * @param {SpriteMaterial} material
     */
    function MultiSprite(sprites, material) {
        _classCallCheck(this, MultiSprite);

        /**
         * Программа отрисовки спрайта
         * @type {SpriteMaterial}
         */
        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MultiSprite).call(this));

        _this.material = material;

        /**
         * Используется для обозначения типа объекта
         * @type {Number}
         */
        _this.type = _libConstants.MULTI_SPRITE;

        _this._initArrays(sprites);
        _this._initGeometry();
        return _this;
    }

    /**
     * Устанавливает спрайту opacity
     *
     * @param {Number} spriteIndex Индекс спрайта
     * @param {Number} value       Новое значение opacity
     */


    _createClass(MultiSprite, [{
        key: 'setOpacity',
        value: function setOpacity(spriteIndex, value) {
            var arr = this._data.colorAlpha.array;
            var start = spriteIndex * 6;

            arr[start] = value;
            arr[start + 1] = value;
            arr[start + 2] = value;
            arr[start + 3] = value;
            arr[start + 4] = value;
            arr[start + 5] = value;

            this._data.colorAlpha.dirty = true;

            return this;
        }

        /**
         * Устанавливает спрайту позицию
         *
         * @param {Number} spriteIndex Индекс спрайта
         * @param {vec2}   value       Новое значение позиции
         */

    }, {
        key: 'setPosition',
        value: function setPosition(spriteIndex, value) {
            var arr = this._data.position.array;
            var start = spriteIndex * 18;

            arr[start] = value[0];arr[start + 1] = value[1];
            arr[start + 3] = value[0];arr[start + 4] = value[1];
            arr[start + 6] = value[0];arr[start + 7] = value[1];
            arr[start + 9] = value[0];arr[start + 10] = value[1];
            arr[start + 12] = value[0];arr[start + 13] = value[1];
            arr[start + 15] = value[0];arr[start + 16] = value[1];

            this._data.position.dirty = true;

            return this;
        }

        /**
         * Устанавливает спрайту высоту
         *
         * @param {Number} spriteIndex Индекс спрайта
         * @param {Number} value       Новое значение высоты
         */

    }, {
        key: 'setElevation',
        value: function setElevation(spriteIndex, value) {
            var arr = this._data.position.array;
            var start = spriteIndex * 18;

            arr[start + 2] = value;
            arr[start + 5] = value;
            arr[start + 8] = value;
            arr[start + 11] = value;
            arr[start + 14] = value;
            arr[start + 17] = value;

            this._data.position.dirty = true;

            return this;
        }

        /**
         * Устанавливает спрайту размер
         *
         * @param {Number} spriteIndex Индекс спрайта
         * @param {vec2}   value       Новое значение размера
         */

    }, {
        key: 'setSize',
        value: function setSize(spriteIndex, value) {
            var arr = this._data.scale.array;
            var start = spriteIndex * 12;

            arr[start] = value[0];arr[start + 1] = value[1];
            arr[start + 2] = value[0];arr[start + 3] = value[1];
            arr[start + 4] = value[0];arr[start + 5] = value[1];
            arr[start + 6] = value[0];arr[start + 7] = value[1];
            arr[start + 8] = value[0];arr[start + 9] = value[1];
            arr[start + 10] = value[0];arr[start + 11] = value[1];

            this._data.scale.dirty = true;

            return this;
        }

        /**
         * Устанавливает спрайту cмещение
         *
         * @param {Number} spriteIndex Индекс спрайта
         * @param {vec2}   value       Новое значение смещения
         */

    }, {
        key: 'setOffset',
        value: function setOffset(spriteIndex, value) {
            var arr = this._data.offset.array;
            var start = spriteIndex * 12;

            arr[start] = value[0];arr[start + 1] = value[1];
            arr[start + 2] = value[0];arr[start + 3] = value[1];
            arr[start + 4] = value[0];arr[start + 5] = value[1];
            arr[start + 6] = value[0];arr[start + 7] = value[1];
            arr[start + 8] = value[0];arr[start + 9] = value[1];
            arr[start + 10] = value[0];arr[start + 11] = value[1];

            this._data.offset.dirty = true;

            return this;
        }

        /**
         * Устанавливает спрайту новые UV-координаты
         *
         * @param {Number} spriteIndex Индекс спрайта
         * @param {Array}  bound       Новое значение координат
         */

    }, {
        key: 'setUV',
        value: function setUV(spriteIndex, bound) {
            var arr = this._data.texture.array;
            var start = spriteIndex * 12;

            arr[start] = bound[2];arr[start + 1] = 1 - bound[3];
            arr[start + 2] = bound[2];arr[start + 3] = 1 - bound[1];
            arr[start + 4] = bound[0];arr[start + 5] = 1 - bound[3];
            arr[start + 6] = bound[0];arr[start + 7] = 1 - bound[1];
            arr[start + 8] = bound[0];arr[start + 9] = 1 - bound[3];
            arr[start + 10] = bound[2];arr[start + 11] = 1 - bound[1];

            this._data.texture.dirty = true;

            return this;
        }
    }, {
        key: 'render',
        value: function render(state) {
            var gl = state.gl;
            var shaderProgram = state.shaderProgram;

            var geometry = this._geometry;

            shaderProgram.bind(gl, null, {
                texture: geometry.getBuffer('texture'),
                position: geometry.getBuffer('position'),
                colorAlpha: geometry.getBuffer('colorAlpha'),
                scale: geometry.getBuffer('scale'),
                offset: geometry.getBuffer('offset'),
                disposition: geometry.getBuffer('disposition')
            });

            for (var key in this._data) {
                if (this._data[key].dirty) {
                    this._geometry.getBuffer(key).subData(gl, 0, this._data[key].array);
                    this._data[key].dirty = false;
                }
            }

            this.material.enable(state);
            gl.drawArrays(gl.TRIANGLES, 0, this._geometry.getBuffer('disposition').length);
            this.material.disable();

            return this;
        }

        /**
         * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
         * Спрайты рисуются отдельным рендером.
         *
         * @param {Object} renderPlugins
         */

    }, {
        key: 'typifyForRender',
        value: function typifyForRender(renderPlugins) {
            // Если cпрайт невидим или у программы спрайта не установлена текстура, то не рендерим его
            if (!this.visible || !this.material.getTexture()) {
                return this;
            }

            renderPlugins[_libConstants.MULTI_SPRITE_RENDERER].addObject(this);

            this.children.forEach(function (child) {
                return child.typifyForRender(renderPlugins);
            });

            return this;
        }
    }, {
        key: '_initArrays',
        value: function _initArrays(sprites) {
            var spriteCount = sprites.length;

            var elementDisposition = [0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0];

            var dispositionArray = new Float32Array(spriteCount * 18);
            var textureArray = new Float32Array(spriteCount * 12);

            var positionArray = new Float32Array(spriteCount * 18);
            var scaleArray = new Float32Array(spriteCount * 12);
            var offsetArray = new Float32Array(spriteCount * 12);
            var colorAlphaArray = new Float32Array(spriteCount * 6);

            this._data = {
                disposition: { array: dispositionArray, dirty: false },
                texture: { array: textureArray, dirty: false },
                position: { array: positionArray, dirty: false },
                scale: { array: scaleArray, dirty: false },
                offset: { array: offsetArray, dirty: false },
                colorAlpha: { array: colorAlphaArray, dirty: false }
            };

            for (var i = 0; i < spriteCount; i++) {
                var sprite = sprites[i];

                dispositionArray.set(elementDisposition, i * 18);

                this.setUV(i, sprite.uv || [0, 0, 1, 1]);
                this.setSize(i, sprite.size || [0, 0]);
                this.setOffset(i, sprite.offset || [0, 0]);
                this.setOpacity(i, sprite.opacity !== undefined ? sprite.opacity : 1);
                this.setPosition(i, sprite.position);
                this.setElevation(i, sprite.elevation || 0);
            }
        }
    }, {
        key: '_initGeometry',
        value: function _initGeometry() {
            this._geometry = new _Geometry2.default();

            var textureBuffer = new _GeometryBuffer2.default(this._data.texture.array, { itemSize: 2 });
            textureBuffer.drawType = _GeometryBuffer2.default.DynamicDraw;

            var positionBuffer = new _GeometryBuffer2.default(this._data.position.array, { itemSize: 3 });
            positionBuffer.drawType = _GeometryBuffer2.default.DynamicDraw;

            var scaleBuffer = new _GeometryBuffer2.default(this._data.scale.array, { itemSize: 2 });
            scaleBuffer.drawType = _GeometryBuffer2.default.DynamicDraw;

            var offsetBuffer = new _GeometryBuffer2.default(this._data.offset.array, { itemSize: 2 });
            offsetBuffer.drawType = _GeometryBuffer2.default.DynamicDraw;

            var colorAlphaBuffer = new _GeometryBuffer2.default(this._data.colorAlpha.array, { itemSize: 1 });
            colorAlphaBuffer.drawType = _GeometryBuffer2.default.DynamicDraw;

            var dispositionBuffer = new _GeometryBuffer2.default(this._data.disposition.array, { itemSize: 3 });

            this._geometry.setBuffer('disposition', dispositionBuffer).setBuffer('texture', textureBuffer).setBuffer('position', positionBuffer).setBuffer('scale', scaleBuffer).setBuffer('offset', offsetBuffer).setBuffer('colorAlpha', colorAlphaBuffer);
        }
    }]);

    return MultiSprite;
}(_Object3D3.default);

exports.default = MultiSprite;

/**
 * Описание спрайта. Массив таких объектов передаётся в конструктор класса
 * MultiSprite
 *
 * @typedef {Object} SpriteDescriptor
 * @property {vec2} position Координаты спрайта в плоскости XY
 * @property {vec2} size Размер спрайта в пикселях
 * @property {vec2} offset Смещение спрайта в пикселях в плоскости экрана
 * @property {Number} elevation Высота спрайта по оси Z
 * @property {Number} opacity Опасити спрайта
 * @property {Array} uv Координаты текстуры спрайта
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9NdWx0aVNwcml0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7OztJQVNNLFc7OztBQUNGOzs7O0FBSUEseUJBQVksT0FBWixFQUFxQixRQUFyQixFQUErQjtBQUFBOztBQUczQjs7OztBQUgyQjs7QUFPM0IsY0FBSyxRQUFMLEdBQWdCLFFBQWhCOztBQUVBOzs7O0FBSUEsY0FBSyxJQUFMOztBQUVBLGNBQUssV0FBTCxDQUFpQixPQUFqQjtBQUNBLGNBQUssYUFBTDtBQWhCMkI7QUFpQjlCOztBQUVEOzs7Ozs7Ozs7O21DQU1XLFcsRUFBYSxLLEVBQU87QUFDM0IsZ0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQWxDO0FBQ0EsZ0JBQU0sUUFBUSxjQUFjLENBQTVCOztBQUVBLGdCQUFJLEtBQUosSUFBYSxLQUFiO0FBQ0EsZ0JBQUksUUFBUSxDQUFaLElBQWlCLEtBQWpCO0FBQ0EsZ0JBQUksUUFBUSxDQUFaLElBQWlCLEtBQWpCO0FBQ0EsZ0JBQUksUUFBUSxDQUFaLElBQWlCLEtBQWpCO0FBQ0EsZ0JBQUksUUFBUSxDQUFaLElBQWlCLEtBQWpCO0FBQ0EsZ0JBQUksUUFBUSxDQUFaLElBQWlCLEtBQWpCOztBQUVBLGlCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCLEdBQThCLElBQTlCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O29DQU1ZLFcsRUFBYSxLLEVBQU87QUFDNUIsZ0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQWhDO0FBQ0EsZ0JBQU0sUUFBUSxjQUFjLEVBQTVCOztBQUVBLGdCQUFJLEtBQUosSUFBYSxNQUFNLENBQU4sQ0FBYixDQUF1QixJQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakI7QUFDdkIsZ0JBQUksUUFBUSxDQUFaLElBQWlCLE1BQU0sQ0FBTixDQUFqQixDQUEyQixJQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakI7QUFDM0IsZ0JBQUksUUFBUSxDQUFaLElBQWlCLE1BQU0sQ0FBTixDQUFqQixDQUEyQixJQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakI7QUFDM0IsZ0JBQUksUUFBUSxDQUFaLElBQWlCLE1BQU0sQ0FBTixDQUFqQixDQUEyQixJQUFJLFFBQVEsRUFBWixJQUFrQixNQUFNLENBQU4sQ0FBbEI7QUFDM0IsZ0JBQUksUUFBUSxFQUFaLElBQWtCLE1BQU0sQ0FBTixDQUFsQixDQUE0QixJQUFJLFFBQVEsRUFBWixJQUFrQixNQUFNLENBQU4sQ0FBbEI7QUFDNUIsZ0JBQUksUUFBUSxFQUFaLElBQWtCLE1BQU0sQ0FBTixDQUFsQixDQUE0QixJQUFJLFFBQVEsRUFBWixJQUFrQixNQUFNLENBQU4sQ0FBbEI7O0FBRTVCLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLEdBQTRCLElBQTVCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O3FDQU1hLFcsRUFBYSxLLEVBQU87QUFDN0IsZ0JBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQWhDO0FBQ0EsZ0JBQU0sUUFBUSxjQUFjLEVBQTVCOztBQUVBLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixLQUFqQjtBQUNBLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixLQUFqQjtBQUNBLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixLQUFqQjtBQUNBLGdCQUFJLFFBQVEsRUFBWixJQUFrQixLQUFsQjtBQUNBLGdCQUFJLFFBQVEsRUFBWixJQUFrQixLQUFsQjtBQUNBLGdCQUFJLFFBQVEsRUFBWixJQUFrQixLQUFsQjs7QUFFQSxpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFwQixHQUE0QixJQUE1Qjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztnQ0FNUSxXLEVBQWEsSyxFQUFPO0FBQ3hCLGdCQUFNLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUE3QjtBQUNBLGdCQUFNLFFBQVEsY0FBYyxFQUE1Qjs7QUFFQSxnQkFBSSxLQUFKLElBQWEsTUFBTSxDQUFOLENBQWIsQ0FBdUIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQ3ZCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsRUFBWixJQUFrQixNQUFNLENBQU4sQ0FBbEIsQ0FBNEIsSUFBSSxRQUFRLEVBQVosSUFBa0IsTUFBTSxDQUFOLENBQWxCOztBQUU1QixpQkFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUFqQixHQUF5QixJQUF6Qjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztrQ0FNVSxXLEVBQWEsSyxFQUFPO0FBQzFCLGdCQUFNLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUE5QjtBQUNBLGdCQUFNLFFBQVEsY0FBYyxFQUE1Qjs7QUFFQSxnQkFBSSxLQUFKLElBQWEsTUFBTSxDQUFOLENBQWIsQ0FBdUIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQ3ZCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCO0FBQzNCLGdCQUFJLFFBQVEsRUFBWixJQUFrQixNQUFNLENBQU4sQ0FBbEIsQ0FBNEIsSUFBSSxRQUFRLEVBQVosSUFBa0IsTUFBTSxDQUFOLENBQWxCOztBQUU1QixpQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUEwQixJQUExQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs4QkFNTSxXLEVBQWEsSyxFQUFPO0FBQ3RCLGdCQUFNLE1BQU0sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUEvQjtBQUNBLGdCQUFNLFFBQVEsY0FBYyxFQUE1Qjs7QUFFQSxnQkFBSSxLQUFKLElBQWEsTUFBTSxDQUFOLENBQWIsQ0FBdUIsSUFBSSxRQUFRLENBQVosSUFBaUIsSUFBSSxNQUFNLENBQU4sQ0FBckI7QUFDdkIsZ0JBQUksUUFBUSxDQUFaLElBQWlCLE1BQU0sQ0FBTixDQUFqQixDQUEyQixJQUFJLFFBQVEsQ0FBWixJQUFpQixJQUFJLE1BQU0sQ0FBTixDQUFyQjtBQUMzQixnQkFBSSxRQUFRLENBQVosSUFBaUIsTUFBTSxDQUFOLENBQWpCLENBQTJCLElBQUksUUFBUSxDQUFaLElBQWlCLElBQUksTUFBTSxDQUFOLENBQXJCO0FBQzNCLGdCQUFJLFFBQVEsQ0FBWixJQUFpQixNQUFNLENBQU4sQ0FBakIsQ0FBMkIsSUFBSSxRQUFRLENBQVosSUFBaUIsSUFBSSxNQUFNLENBQU4sQ0FBckI7QUFDM0IsZ0JBQUksUUFBUSxDQUFaLElBQWlCLE1BQU0sQ0FBTixDQUFqQixDQUEyQixJQUFJLFFBQVEsQ0FBWixJQUFpQixJQUFJLE1BQU0sQ0FBTixDQUFyQjtBQUMzQixnQkFBSSxRQUFRLEVBQVosSUFBa0IsTUFBTSxDQUFOLENBQWxCLENBQTRCLElBQUksUUFBUSxFQUFaLElBQWtCLElBQUksTUFBTSxDQUFOLENBQXRCOztBQUU1QixpQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUFuQixHQUEyQixJQUEzQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7OzsrQkFFTSxLLEVBQU87QUFBQSxnQkFDSCxFQURHLEdBQ2tCLEtBRGxCLENBQ0gsRUFERztBQUFBLGdCQUNDLGFBREQsR0FDa0IsS0FEbEIsQ0FDQyxhQUREOztBQUVWLGdCQUFNLFdBQVcsS0FBSyxTQUF0Qjs7QUFFQSwwQkFBYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCLElBQXZCLEVBQTZCO0FBQ3pCLHlCQUFTLFNBQVMsU0FBVCxDQUFtQixTQUFuQixDQURnQjtBQUV6QiwwQkFBVSxTQUFTLFNBQVQsQ0FBbUIsVUFBbkIsQ0FGZTtBQUd6Qiw0QkFBWSxTQUFTLFNBQVQsQ0FBbUIsWUFBbkIsQ0FIYTtBQUl6Qix1QkFBTyxTQUFTLFNBQVQsQ0FBbUIsT0FBbkIsQ0FKa0I7QUFLekIsd0JBQVEsU0FBUyxTQUFULENBQW1CLFFBQW5CLENBTGlCO0FBTXpCLDZCQUFhLFNBQVMsU0FBVCxDQUFtQixhQUFuQjtBQU5ZLGFBQTdCOztBQVNBLGlCQUFLLElBQU0sR0FBWCxJQUFrQixLQUFLLEtBQXZCLEVBQThCO0FBQzFCLG9CQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsS0FBcEIsRUFBMkI7QUFDdkIseUJBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsR0FBekIsRUFBOEIsT0FBOUIsQ0FBc0MsRUFBdEMsRUFBMEMsQ0FBMUMsRUFBNkMsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixLQUE3RDtBQUNBLHlCQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEtBQWhCLEdBQXdCLEtBQXhCO0FBQ0g7QUFDSjs7QUFFRCxpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixLQUFyQjtBQUNBLGVBQUcsVUFBSCxDQUFjLEdBQUcsU0FBakIsRUFBNEIsQ0FBNUIsRUFBK0IsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixhQUF6QixFQUF3QyxNQUF2RTtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxPQUFkOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O3dDQU1nQixhLEVBQWU7QUFDM0I7QUFDQSxnQkFBSSxDQUFDLEtBQUssT0FBTixJQUFpQixDQUFDLEtBQUssUUFBTCxDQUFjLFVBQWQsRUFBdEIsRUFBa0Q7QUFBRSx1QkFBTyxJQUFQO0FBQWM7O0FBRWxFLCtEQUFxQyxTQUFyQyxDQUErQyxJQUEvQzs7QUFFQSxpQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtBQUFBLHVCQUFTLE1BQU0sZUFBTixDQUFzQixhQUF0QixDQUFUO0FBQUEsYUFBdEI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7b0NBRVcsTyxFQUFTO0FBQ2pCLGdCQUFNLGNBQWMsUUFBUSxNQUE1Qjs7QUFFQSxnQkFBTSxxQkFBcUIsQ0FDdkIsR0FEdUIsRUFDbEIsQ0FBQyxHQURpQixFQUNaLENBRFksRUFFdkIsR0FGdUIsRUFFbEIsR0FGa0IsRUFFYixDQUZhLEVBR3ZCLENBQUMsR0FIc0IsRUFHakIsQ0FBQyxHQUhnQixFQUdYLENBSFcsRUFLdkIsQ0FBQyxHQUxzQixFQUtqQixHQUxpQixFQUtaLENBTFksRUFNdkIsQ0FBQyxHQU5zQixFQU1qQixDQUFDLEdBTmdCLEVBTVgsQ0FOVyxFQU92QixHQVB1QixFQU9sQixHQVBrQixFQU9iLENBUGEsQ0FBM0I7O0FBVUEsZ0JBQU0sbUJBQW1CLElBQUksWUFBSixDQUFpQixjQUFjLEVBQS9CLENBQXpCO0FBQ0EsZ0JBQU0sZUFBZSxJQUFJLFlBQUosQ0FBaUIsY0FBYyxFQUEvQixDQUFyQjs7QUFFQSxnQkFBTSxnQkFBZ0IsSUFBSSxZQUFKLENBQWlCLGNBQWMsRUFBL0IsQ0FBdEI7QUFDQSxnQkFBTSxhQUFhLElBQUksWUFBSixDQUFpQixjQUFjLEVBQS9CLENBQW5CO0FBQ0EsZ0JBQU0sY0FBYyxJQUFJLFlBQUosQ0FBaUIsY0FBYyxFQUEvQixDQUFwQjtBQUNBLGdCQUFNLGtCQUFrQixJQUFJLFlBQUosQ0FBaUIsY0FBYyxDQUEvQixDQUF4Qjs7QUFFQSxpQkFBSyxLQUFMLEdBQWE7QUFDVCw2QkFBYSxFQUFDLE9BQU8sZ0JBQVIsRUFBMEIsT0FBTyxLQUFqQyxFQURKO0FBRVQseUJBQVMsRUFBQyxPQUFPLFlBQVIsRUFBc0IsT0FBTyxLQUE3QixFQUZBO0FBR1QsMEJBQVUsRUFBQyxPQUFPLGFBQVIsRUFBdUIsT0FBTyxLQUE5QixFQUhEO0FBSVQsdUJBQU8sRUFBQyxPQUFPLFVBQVIsRUFBb0IsT0FBTyxLQUEzQixFQUpFO0FBS1Qsd0JBQVEsRUFBQyxPQUFPLFdBQVIsRUFBcUIsT0FBTyxLQUE1QixFQUxDO0FBTVQsNEJBQVksRUFBQyxPQUFPLGVBQVIsRUFBeUIsT0FBTyxLQUFoQztBQU5ILGFBQWI7O0FBU0EsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxXQUFwQixFQUFpQyxHQUFqQyxFQUFzQztBQUNsQyxvQkFBTSxTQUFTLFFBQVEsQ0FBUixDQUFmOztBQUVBLGlDQUFpQixHQUFqQixDQUFxQixrQkFBckIsRUFBeUMsSUFBSSxFQUE3Qzs7QUFFQSxxQkFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLE9BQU8sRUFBUCxJQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUEzQjtBQUNBLHFCQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLE9BQU8sSUFBUCxJQUFlLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBL0I7QUFDQSxxQkFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixPQUFPLE1BQVAsSUFBaUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFuQztBQUNBLHFCQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsT0FBTyxPQUFQLEtBQW1CLFNBQW5CLEdBQStCLE9BQU8sT0FBdEMsR0FBZ0QsQ0FBbkU7QUFDQSxxQkFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLE9BQU8sUUFBM0I7QUFDQSxxQkFBSyxZQUFMLENBQWtCLENBQWxCLEVBQXFCLE9BQU8sU0FBUCxJQUFvQixDQUF6QztBQUNIO0FBQ0o7Ozt3Q0FFZTtBQUNaLGlCQUFLLFNBQUwsR0FBaUIsd0JBQWpCOztBQUVBLGdCQUFNLGdCQUFnQiw2QkFBbUIsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixLQUF0QyxFQUE2QyxFQUFDLFVBQVUsQ0FBWCxFQUE3QyxDQUF0QjtBQUNBLDBCQUFjLFFBQWQsR0FBeUIseUJBQWUsV0FBeEM7O0FBRUEsZ0JBQU0saUJBQWlCLDZCQUFtQixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXZDLEVBQThDLEVBQUMsVUFBVSxDQUFYLEVBQTlDLENBQXZCO0FBQ0EsMkJBQWUsUUFBZixHQUEwQix5QkFBZSxXQUF6Qzs7QUFFQSxnQkFBTSxjQUFjLDZCQUFtQixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQXBDLEVBQTJDLEVBQUMsVUFBVSxDQUFYLEVBQTNDLENBQXBCO0FBQ0Esd0JBQVksUUFBWixHQUF1Qix5QkFBZSxXQUF0Qzs7QUFFQSxnQkFBTSxlQUFlLDZCQUFtQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQXJDLEVBQTRDLEVBQUMsVUFBVSxDQUFYLEVBQTVDLENBQXJCO0FBQ0EseUJBQWEsUUFBYixHQUF3Qix5QkFBZSxXQUF2Qzs7QUFFQSxnQkFBTSxtQkFBbUIsNkJBQW1CLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBekMsRUFBZ0QsRUFBQyxVQUFVLENBQVgsRUFBaEQsQ0FBekI7QUFDQSw2QkFBaUIsUUFBakIsR0FBNEIseUJBQWUsV0FBM0M7O0FBRUEsZ0JBQU0sb0JBQW9CLDZCQUFtQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQTFDLEVBQWlELEVBQUMsVUFBVSxDQUFYLEVBQWpELENBQTFCOztBQUVBLGlCQUFLLFNBQUwsQ0FDSyxTQURMLENBQ2UsYUFEZixFQUM4QixpQkFEOUIsRUFFSyxTQUZMLENBRWUsU0FGZixFQUUwQixhQUYxQixFQUlLLFNBSkwsQ0FJZSxVQUpmLEVBSTJCLGNBSjNCLEVBS0ssU0FMTCxDQUtlLE9BTGYsRUFLd0IsV0FMeEIsRUFNSyxTQU5MLENBTWUsUUFOZixFQU15QixZQU56QixFQU9LLFNBUEwsQ0FPZSxZQVBmLEVBTzZCLGdCQVA3QjtBQVFIOzs7Ozs7a0JBR1UsVzs7QUFFZiIsImZpbGUiOiJNdWx0aVNwcml0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPYmplY3QzRCBmcm9tICcuL09iamVjdDNEJztcbmltcG9ydCBHZW9tZXRyeSBmcm9tICcuL0dlb21ldHJ5JztcbmltcG9ydCBHZW9tZXRyeUJ1ZmZlciBmcm9tICcuL0dlb21ldHJ5QnVmZmVyJztcbmltcG9ydCB7TVVMVElfU1BSSVRFLCBNVUxUSV9TUFJJVEVfUkVOREVSRVJ9IGZyb20gJy4vbGliQ29uc3RhbnRzJztcblxuLyoqXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8g0LTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDQvNGD0LvRjNGC0LjRgdC/0YDQsNC50YLQvtCyLiDQnNGD0LvRjNGC0LjRgdC/0YDQsNC50YIg0L/RgNC10LTRgdGC0LDQstC70Y/QtdGCINGB0L7QsdC+0Lkg0LzQvdC+0LbQtdGB0YLQstC+XG4gKiDRgdC/0YDQsNC50YLQvtCyLCDQutC+0YLQvtGA0YvQtSDRgNC40YHRg9GO0YLRgdGPINCyINC+0LTQuNC9IGRyYXcgY2FsbC4g0KHQv9GA0LDQudGC0LDQvNC4INCyINC80YPQu9GM0YLQuNGB0L/RgNCw0LnRgtC1INC80L7QttC90L5cbiAqINGD0L/RgNCw0LLQu9GP0YLRjCDQvdC10LfQsNCy0LjRgdC40LzQviDQtNGA0YPQsyDQvtGCINC00YDRg9Cz0LAuXG4gKlxuICog0JTQu9GPINC+0YLRgNC40YHQvtCy0LrQuCDRgdC/0YDQsNC50YLQvtCyINC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywge0BsaW5rIE11bHRpU3ByaXRlUGx1Z2lufSDQuiDRgNC10L3QtNC10YDQtdGA0YMuXG4gKlxuICogQGV4dGVuZHMge09iamVjdDNEfVxuICovXG5jbGFzcyBNdWx0aVNwcml0ZSBleHRlbmRzIE9iamVjdDNEIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Nwcml0ZURlc2NyaXB0b3JbXX0gc3ByaXRlcyDQntC/0LjRgdCw0L3QuNC1INGB0L/RgNCw0LnRgtC+0LIsINCy0YXQvtC00Y/RidC40YUg0LIg0LzRg9C70YzRgtC40YHQv9GA0LDQudGCXG4gICAgICogQHBhcmFtIHtTcHJpdGVNYXRlcmlhbH0gbWF0ZXJpYWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVzLCBtYXRlcmlhbCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9GA0L7Qs9GA0LDQvNC80LAg0L7RgtGA0LjRgdC+0LLQutC4INGB0L/RgNCw0LnRgtCwXG4gICAgICAgICAqIEB0eXBlIHtTcHJpdGVNYXRlcmlhbH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0JjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPINC00LvRjyDQvtCx0L7Qt9C90LDRh9C10L3QuNGPINGC0LjQv9CwINC+0LHRitC10LrRgtCwXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSBNVUxUSV9TUFJJVEU7XG5cbiAgICAgICAgdGhpcy5faW5pdEFycmF5cyhzcHJpdGVzKTtcbiAgICAgICAgdGhpcy5faW5pdEdlb21ldHJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHQv9GA0LDQudGC0YMgb3BhY2l0eVxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNwcml0ZUluZGV4INCY0L3QtNC10LrRgSDRgdC/0YDQsNC50YLQsFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAgICAgICDQndC+0LLQvtC1INC30L3QsNGH0LXQvdC40LUgb3BhY2l0eVxuICAgICAqL1xuICAgIHNldE9wYWNpdHkoc3ByaXRlSW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2RhdGEuY29sb3JBbHBoYS5hcnJheTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBzcHJpdGVJbmRleCAqIDY7XG5cbiAgICAgICAgYXJyW3N0YXJ0XSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyAxXSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyAyXSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyAzXSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyA0XSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyA1XSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuX2RhdGEuY29sb3JBbHBoYS5kaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHQv9GA0LDQudGC0YMg0L/QvtC30LjRhtC40Y5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcHJpdGVJbmRleCDQmNC90LTQtdC60YEg0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge3ZlYzJ9ICAgdmFsdWUgICAgICAg0J3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC/0L7Qt9C40YbQuNC4XG4gICAgICovXG4gICAgc2V0UG9zaXRpb24oc3ByaXRlSW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2RhdGEucG9zaXRpb24uYXJyYXk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gc3ByaXRlSW5kZXggKiAxODtcblxuICAgICAgICBhcnJbc3RhcnRdID0gdmFsdWVbMF07IGFycltzdGFydCArIDFdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDNdID0gdmFsdWVbMF07IGFycltzdGFydCArIDRdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDZdID0gdmFsdWVbMF07IGFycltzdGFydCArIDddID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDldID0gdmFsdWVbMF07IGFycltzdGFydCArIDEwXSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyAxMl0gPSB2YWx1ZVswXTsgYXJyW3N0YXJ0ICsgMTNdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDE1XSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyAxNl0gPSB2YWx1ZVsxXTtcblxuICAgICAgICB0aGlzLl9kYXRhLnBvc2l0aW9uLmRpcnR5ID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgdC/0YDQsNC50YLRgyDQstGL0YHQvtGC0YNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcHJpdGVJbmRleCDQmNC90LTQtdC60YEg0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgICAgICAg0J3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INCy0YvRgdC+0YLRi1xuICAgICAqL1xuICAgIHNldEVsZXZhdGlvbihzcHJpdGVJbmRleCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5fZGF0YS5wb3NpdGlvbi5hcnJheTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBzcHJpdGVJbmRleCAqIDE4O1xuXG4gICAgICAgIGFycltzdGFydCArIDJdID0gdmFsdWU7XG4gICAgICAgIGFycltzdGFydCArIDVdID0gdmFsdWU7XG4gICAgICAgIGFycltzdGFydCArIDhdID0gdmFsdWU7XG4gICAgICAgIGFycltzdGFydCArIDExXSA9IHZhbHVlO1xuICAgICAgICBhcnJbc3RhcnQgKyAxNF0gPSB2YWx1ZTtcbiAgICAgICAgYXJyW3N0YXJ0ICsgMTddID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5fZGF0YS5wb3NpdGlvbi5kaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YHQv9GA0LDQudGC0YMg0YDQsNC30LzQtdGAXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3ByaXRlSW5kZXgg0JjQvdC00LXQutGBINGB0L/RgNCw0LnRgtCwXG4gICAgICogQHBhcmFtIHt2ZWMyfSAgIHZhbHVlICAgICAgINCd0L7QstC+0LUg0LfQvdCw0YfQtdC90LjQtSDRgNCw0LfQvNC10YDQsFxuICAgICAqL1xuICAgIHNldFNpemUoc3ByaXRlSW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2RhdGEuc2NhbGUuYXJyYXk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gc3ByaXRlSW5kZXggKiAxMjtcblxuICAgICAgICBhcnJbc3RhcnRdID0gdmFsdWVbMF07IGFycltzdGFydCArIDFdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDJdID0gdmFsdWVbMF07IGFycltzdGFydCArIDNdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDRdID0gdmFsdWVbMF07IGFycltzdGFydCArIDVdID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDZdID0gdmFsdWVbMF07IGFycltzdGFydCArIDddID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDhdID0gdmFsdWVbMF07IGFycltzdGFydCArIDldID0gdmFsdWVbMV07XG4gICAgICAgIGFycltzdGFydCArIDEwXSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyAxMV0gPSB2YWx1ZVsxXTtcblxuICAgICAgICB0aGlzLl9kYXRhLnNjYWxlLmRpcnR5ID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXRgiDRgdC/0YDQsNC50YLRgyBj0LzQtdGJ0LXQvdC40LVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcHJpdGVJbmRleCDQmNC90LTQtdC60YEg0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge3ZlYzJ9ICAgdmFsdWUgICAgICAg0J3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INGB0LzQtdGJ0LXQvdC40Y9cbiAgICAgKi9cbiAgICBzZXRPZmZzZXQoc3ByaXRlSW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2RhdGEub2Zmc2V0LmFycmF5O1xuICAgICAgICBjb25zdCBzdGFydCA9IHNwcml0ZUluZGV4ICogMTI7XG5cbiAgICAgICAgYXJyW3N0YXJ0XSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyAxXSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyAyXSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyAzXSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyA0XSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyA1XSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyA2XSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyA3XSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyA4XSA9IHZhbHVlWzBdOyBhcnJbc3RhcnQgKyA5XSA9IHZhbHVlWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyAxMF0gPSB2YWx1ZVswXTsgYXJyW3N0YXJ0ICsgMTFdID0gdmFsdWVbMV07XG5cbiAgICAgICAgdGhpcy5fZGF0YS5vZmZzZXQuZGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGB0L/RgNCw0LnRgtGDINC90L7QstGL0LUgVVYt0LrQvtC+0YDQtNC40L3QsNGC0YtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcHJpdGVJbmRleCDQmNC90LTQtdC60YEg0YHQv9GA0LDQudGC0LBcbiAgICAgKiBAcGFyYW0ge0FycmF5fSAgYm91bmQgICAgICAg0J3QvtCy0L7QtSDQt9C90LDRh9C10L3QuNC1INC60L7QvtGA0LTQuNC90LDRglxuICAgICAqL1xuICAgIHNldFVWKHNwcml0ZUluZGV4LCBib3VuZCkge1xuICAgICAgICBjb25zdCBhcnIgPSB0aGlzLl9kYXRhLnRleHR1cmUuYXJyYXk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gc3ByaXRlSW5kZXggKiAxMjtcblxuICAgICAgICBhcnJbc3RhcnRdID0gYm91bmRbMl07IGFycltzdGFydCArIDFdID0gMSAtIGJvdW5kWzNdO1xuICAgICAgICBhcnJbc3RhcnQgKyAyXSA9IGJvdW5kWzJdOyBhcnJbc3RhcnQgKyAzXSA9IDEgLSBib3VuZFsxXTtcbiAgICAgICAgYXJyW3N0YXJ0ICsgNF0gPSBib3VuZFswXTsgYXJyW3N0YXJ0ICsgNV0gPSAxIC0gYm91bmRbM107XG4gICAgICAgIGFycltzdGFydCArIDZdID0gYm91bmRbMF07IGFycltzdGFydCArIDddID0gMSAtIGJvdW5kWzFdO1xuICAgICAgICBhcnJbc3RhcnQgKyA4XSA9IGJvdW5kWzBdOyBhcnJbc3RhcnQgKyA5XSA9IDEgLSBib3VuZFszXTtcbiAgICAgICAgYXJyW3N0YXJ0ICsgMTBdID0gYm91bmRbMl07IGFycltzdGFydCArIDExXSA9IDEgLSBib3VuZFsxXTtcblxuICAgICAgICB0aGlzLl9kYXRhLnRleHR1cmUuZGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbmRlcihzdGF0ZSkge1xuICAgICAgICBjb25zdCB7Z2wsIHNoYWRlclByb2dyYW19ID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5fZ2VvbWV0cnk7XG5cbiAgICAgICAgc2hhZGVyUHJvZ3JhbS5iaW5kKGdsLCBudWxsLCB7XG4gICAgICAgICAgICB0ZXh0dXJlOiBnZW9tZXRyeS5nZXRCdWZmZXIoJ3RleHR1cmUnKSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBnZW9tZXRyeS5nZXRCdWZmZXIoJ3Bvc2l0aW9uJyksXG4gICAgICAgICAgICBjb2xvckFscGhhOiBnZW9tZXRyeS5nZXRCdWZmZXIoJ2NvbG9yQWxwaGEnKSxcbiAgICAgICAgICAgIHNjYWxlOiBnZW9tZXRyeS5nZXRCdWZmZXIoJ3NjYWxlJyksXG4gICAgICAgICAgICBvZmZzZXQ6IGdlb21ldHJ5LmdldEJ1ZmZlcignb2Zmc2V0JyksXG4gICAgICAgICAgICBkaXNwb3NpdGlvbjogZ2VvbWV0cnkuZ2V0QnVmZmVyKCdkaXNwb3NpdGlvbicpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhW2tleV0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW9tZXRyeS5nZXRCdWZmZXIoa2V5KS5zdWJEYXRhKGdsLCAwLCB0aGlzLl9kYXRhW2tleV0uYXJyYXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFba2V5XS5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXRlcmlhbC5lbmFibGUoc3RhdGUpO1xuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgdGhpcy5fZ2VvbWV0cnkuZ2V0QnVmZmVyKCdkaXNwb3NpdGlvbicpLmxlbmd0aCk7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwuZGlzYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0YvQt9GL0LLQsNC10YLRgdGPINC90LAg0Y3RgtCw0L/QtSDRgNC10L3QtNC10YDQuNC90LPQsCwg0YfRgtC+0LHRiyDQvtC/0YDQtdC00LXQu9C40YLRjCDQuiDQutCw0LrQvtC80YMg0YLQuNC/0YMg0YDQtdC90LTQtdGA0LAg0L/RgNC40L3QsNC00LvQtdC20LjRgiDQvtCx0YrQtdC60YIuXG4gICAgICog0KHQv9GA0LDQudGC0Ysg0YDQuNGB0YPRjtGC0YHRjyDQvtGC0LTQtdC70YzQvdGL0Lwg0YDQtdC90LTQtdGA0L7QvC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZW5kZXJQbHVnaW5zXG4gICAgICovXG4gICAgdHlwaWZ5Rm9yUmVuZGVyKHJlbmRlclBsdWdpbnMpIHtcbiAgICAgICAgLy8g0JXRgdC70LggY9C/0YDQsNC50YIg0L3QtdCy0LjQtNC40Lwg0LjQu9C4INGDINC/0YDQvtCz0YDQsNC80LzRiyDRgdC/0YDQsNC50YLQsCDQvdC1INGD0YHRgtCw0L3QvtCy0LvQtdC90LAg0YLQtdC60YHRgtGD0YDQsCwg0YLQviDQvdC1INGA0LXQvdC00LXRgNC40Lwg0LXQs9C+XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlIHx8ICF0aGlzLm1hdGVyaWFsLmdldFRleHR1cmUoKSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHJlbmRlclBsdWdpbnNbTVVMVElfU1BSSVRFX1JFTkRFUkVSXS5hZGRPYmplY3QodGhpcyk7XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnR5cGlmeUZvclJlbmRlcihyZW5kZXJQbHVnaW5zKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2luaXRBcnJheXMoc3ByaXRlcykge1xuICAgICAgICBjb25zdCBzcHJpdGVDb3VudCA9IHNwcml0ZXMubGVuZ3RoO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnREaXNwb3NpdGlvbiA9IFtcbiAgICAgICAgICAgIDAuNSwgLTAuNSwgMCxcbiAgICAgICAgICAgIDAuNSwgMC41LCAwLFxuICAgICAgICAgICAgLTAuNSwgLTAuNSwgMCxcblxuICAgICAgICAgICAgLTAuNSwgMC41LCAwLFxuICAgICAgICAgICAgLTAuNSwgLTAuNSwgMCxcbiAgICAgICAgICAgIDAuNSwgMC41LCAwXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgZGlzcG9zaXRpb25BcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoc3ByaXRlQ291bnQgKiAxOCk7XG4gICAgICAgIGNvbnN0IHRleHR1cmVBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoc3ByaXRlQ291bnQgKiAxMik7XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb25BcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoc3ByaXRlQ291bnQgKiAxOCk7XG4gICAgICAgIGNvbnN0IHNjYWxlQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHNwcml0ZUNvdW50ICogMTIpO1xuICAgICAgICBjb25zdCBvZmZzZXRBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoc3ByaXRlQ291bnQgKiAxMik7XG4gICAgICAgIGNvbnN0IGNvbG9yQWxwaGFBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoc3ByaXRlQ291bnQgKiA2KTtcblxuICAgICAgICB0aGlzLl9kYXRhID0ge1xuICAgICAgICAgICAgZGlzcG9zaXRpb246IHthcnJheTogZGlzcG9zaXRpb25BcnJheSwgZGlydHk6IGZhbHNlfSxcbiAgICAgICAgICAgIHRleHR1cmU6IHthcnJheTogdGV4dHVyZUFycmF5LCBkaXJ0eTogZmFsc2V9LFxuICAgICAgICAgICAgcG9zaXRpb246IHthcnJheTogcG9zaXRpb25BcnJheSwgZGlydHk6IGZhbHNlfSxcbiAgICAgICAgICAgIHNjYWxlOiB7YXJyYXk6IHNjYWxlQXJyYXksIGRpcnR5OiBmYWxzZX0sXG4gICAgICAgICAgICBvZmZzZXQ6IHthcnJheTogb2Zmc2V0QXJyYXksIGRpcnR5OiBmYWxzZX0sXG4gICAgICAgICAgICBjb2xvckFscGhhOiB7YXJyYXk6IGNvbG9yQWxwaGFBcnJheSwgZGlydHk6IGZhbHNlfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ByaXRlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gc3ByaXRlc1tpXTtcblxuICAgICAgICAgICAgZGlzcG9zaXRpb25BcnJheS5zZXQoZWxlbWVudERpc3Bvc2l0aW9uLCBpICogMTgpO1xuXG4gICAgICAgICAgICB0aGlzLnNldFVWKGksIHNwcml0ZS51diB8fCBbMCwgMCwgMSwgMV0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKGksIHNwcml0ZS5zaXplIHx8IFswLCAwXSk7XG4gICAgICAgICAgICB0aGlzLnNldE9mZnNldChpLCBzcHJpdGUub2Zmc2V0IHx8IFswLCAwXSk7XG4gICAgICAgICAgICB0aGlzLnNldE9wYWNpdHkoaSwgc3ByaXRlLm9wYWNpdHkgIT09IHVuZGVmaW5lZCA/IHNwcml0ZS5vcGFjaXR5IDogMSk7XG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKGksIHNwcml0ZS5wb3NpdGlvbik7XG4gICAgICAgICAgICB0aGlzLnNldEVsZXZhdGlvbihpLCBzcHJpdGUuZWxldmF0aW9uIHx8IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2luaXRHZW9tZXRyeSgpIHtcbiAgICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBuZXcgR2VvbWV0cnkoKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlQnVmZmVyID0gbmV3IEdlb21ldHJ5QnVmZmVyKHRoaXMuX2RhdGEudGV4dHVyZS5hcnJheSwge2l0ZW1TaXplOiAyfSk7XG4gICAgICAgIHRleHR1cmVCdWZmZXIuZHJhd1R5cGUgPSBHZW9tZXRyeUJ1ZmZlci5EeW5hbWljRHJhdztcblxuICAgICAgICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IG5ldyBHZW9tZXRyeUJ1ZmZlcih0aGlzLl9kYXRhLnBvc2l0aW9uLmFycmF5LCB7aXRlbVNpemU6IDN9KTtcbiAgICAgICAgcG9zaXRpb25CdWZmZXIuZHJhd1R5cGUgPSBHZW9tZXRyeUJ1ZmZlci5EeW5hbWljRHJhdztcblxuICAgICAgICBjb25zdCBzY2FsZUJ1ZmZlciA9IG5ldyBHZW9tZXRyeUJ1ZmZlcih0aGlzLl9kYXRhLnNjYWxlLmFycmF5LCB7aXRlbVNpemU6IDJ9KTtcbiAgICAgICAgc2NhbGVCdWZmZXIuZHJhd1R5cGUgPSBHZW9tZXRyeUJ1ZmZlci5EeW5hbWljRHJhdztcblxuICAgICAgICBjb25zdCBvZmZzZXRCdWZmZXIgPSBuZXcgR2VvbWV0cnlCdWZmZXIodGhpcy5fZGF0YS5vZmZzZXQuYXJyYXksIHtpdGVtU2l6ZTogMn0pO1xuICAgICAgICBvZmZzZXRCdWZmZXIuZHJhd1R5cGUgPSBHZW9tZXRyeUJ1ZmZlci5EeW5hbWljRHJhdztcblxuICAgICAgICBjb25zdCBjb2xvckFscGhhQnVmZmVyID0gbmV3IEdlb21ldHJ5QnVmZmVyKHRoaXMuX2RhdGEuY29sb3JBbHBoYS5hcnJheSwge2l0ZW1TaXplOiAxfSk7XG4gICAgICAgIGNvbG9yQWxwaGFCdWZmZXIuZHJhd1R5cGUgPSBHZW9tZXRyeUJ1ZmZlci5EeW5hbWljRHJhdztcblxuICAgICAgICBjb25zdCBkaXNwb3NpdGlvbkJ1ZmZlciA9IG5ldyBHZW9tZXRyeUJ1ZmZlcih0aGlzLl9kYXRhLmRpc3Bvc2l0aW9uLmFycmF5LCB7aXRlbVNpemU6IDN9KTtcblxuICAgICAgICB0aGlzLl9nZW9tZXRyeVxuICAgICAgICAgICAgLnNldEJ1ZmZlcignZGlzcG9zaXRpb24nLCBkaXNwb3NpdGlvbkJ1ZmZlcilcbiAgICAgICAgICAgIC5zZXRCdWZmZXIoJ3RleHR1cmUnLCB0ZXh0dXJlQnVmZmVyKVxuXG4gICAgICAgICAgICAuc2V0QnVmZmVyKCdwb3NpdGlvbicsIHBvc2l0aW9uQnVmZmVyKVxuICAgICAgICAgICAgLnNldEJ1ZmZlcignc2NhbGUnLCBzY2FsZUJ1ZmZlcilcbiAgICAgICAgICAgIC5zZXRCdWZmZXIoJ29mZnNldCcsIG9mZnNldEJ1ZmZlcilcbiAgICAgICAgICAgIC5zZXRCdWZmZXIoJ2NvbG9yQWxwaGEnLCBjb2xvckFscGhhQnVmZmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpU3ByaXRlO1xuXG4vKipcbiAqINCe0L/QuNGB0LDQvdC40LUg0YHQv9GA0LDQudGC0LAuINCc0LDRgdGB0LjQsiDRgtCw0LrQuNGFINC+0LHRitC10LrRgtC+0LIg0L/QtdGA0LXQtNCw0ZHRgtGB0Y8g0LIg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQutC70LDRgdGB0LBcbiAqIE11bHRpU3ByaXRlXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU3ByaXRlRGVzY3JpcHRvclxuICogQHByb3BlcnR5IHt2ZWMyfSBwb3NpdGlvbiDQmtC+0L7RgNC00LjQvdCw0YLRiyDRgdC/0YDQsNC50YLQsCDQsiDQv9C70L7RgdC60L7RgdGC0LggWFlcbiAqIEBwcm9wZXJ0eSB7dmVjMn0gc2l6ZSDQoNCw0LfQvNC10YAg0YHQv9GA0LDQudGC0LAg0LIg0L/QuNC60YHQtdC70Y/RhVxuICogQHByb3BlcnR5IHt2ZWMyfSBvZmZzZXQg0KHQvNC10YnQtdC90LjQtSDRgdC/0YDQsNC50YLQsCDQsiDQv9C40LrRgdC10LvRj9GFINCyINC/0LvQvtGB0LrQvtGB0YLQuCDRjdC60YDQsNC90LBcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbGV2YXRpb24g0JLRi9GB0L7RgtCwINGB0L/RgNCw0LnRgtCwINC/0L4g0L7RgdC4IFpcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvcGFjaXR5INCe0L/QsNGB0LjRgtC4INGB0L/RgNCw0LnRgtCwXG4gKiBAcHJvcGVydHkge0FycmF5fSB1diDQmtC+0L7RgNC00LjQvdCw0YLRiyDRgtC10LrRgdGC0YPRgNGLINGB0L/RgNCw0LnRgtCwXG4gKi9cbiJdfQ==