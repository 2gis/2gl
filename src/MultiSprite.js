import Object3D from './Object3D';
import Geometry from './Geometry';
import Buffer from './Buffer';

/**
 * Используется для отрисовки мультиспрайтов. Мультиспрайт представляет собой множество
 * спрайтов, которые рисуются в один draw call. Спрайтами в мультиспрайте можно
 * управлять независимо друг от друга.
 *
 * @extends {Object3D}
 */
class MultiSprite extends Object3D {
    /**
     * @param {SpriteDescriptor[]} sprites Описание спрайтов, входящих в мультиспрайт
     * @param {SpriteMaterial} material
     */
    constructor(sprites, material) {
        super();

        /**
         * Программа отрисовки спрайта
         * @type {SpriteMaterial}
         */
        this.material = material;

        this._initArrays(sprites);
        this._initGeometry();
    }

    /**
     * Устанавливает спрайту opacity
     *
     * @param {Number} spriteIndex Индекс спрайта
     * @param {Number} value       Новое значение opacity
     */
    setOpacity(spriteIndex, value) {
        const arr = this._data.colorAlpha.array;
        const start = spriteIndex * 6;

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
    setPosition(spriteIndex, value) {
        const arr = this._data.position.array;
        const start = spriteIndex * 18;

        arr[start] = value[0]; arr[start + 1] = value[1];
        arr[start + 3] = value[0]; arr[start + 4] = value[1];
        arr[start + 6] = value[0]; arr[start + 7] = value[1];
        arr[start + 9] = value[0]; arr[start + 10] = value[1];
        arr[start + 12] = value[0]; arr[start + 13] = value[1];
        arr[start + 15] = value[0]; arr[start + 16] = value[1];

        this._data.position.dirty = true;

        return this;
    }

    /**
     * Устанавливает спрайту высоту
     *
     * @param {Number} spriteIndex Индекс спрайта
     * @param {Number} value       Новое значение высоты
     */
    setElevation(spriteIndex, value) {
        const arr = this._data.position.array;
        const start = spriteIndex * 18;

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
    setSize(spriteIndex, value) {
        const arr = this._data.scale.array;
        const start = spriteIndex * 12;

        arr[start] = value[0]; arr[start + 1] = value[1];
        arr[start + 2] = value[0]; arr[start + 3] = value[1];
        arr[start + 4] = value[0]; arr[start + 5] = value[1];
        arr[start + 6] = value[0]; arr[start + 7] = value[1];
        arr[start + 8] = value[0]; arr[start + 9] = value[1];
        arr[start + 10] = value[0]; arr[start + 11] = value[1];

        this._data.scale.dirty = true;

        return this;
    }

    /**
     * Устанавливает спрайту cмещение
     *
     * @param {Number} spriteIndex Индекс спрайта
     * @param {vec2}   value       Новое значение смещения
     */
    setOffset(spriteIndex, value) {
        const arr = this._data.offset.array;
        const start = spriteIndex * 12;

        arr[start] = value[0]; arr[start + 1] = value[1];
        arr[start + 2] = value[0]; arr[start + 3] = value[1];
        arr[start + 4] = value[0]; arr[start + 5] = value[1];
        arr[start + 6] = value[0]; arr[start + 7] = value[1];
        arr[start + 8] = value[0]; arr[start + 9] = value[1];
        arr[start + 10] = value[0]; arr[start + 11] = value[1];

        this._data.offset.dirty = true;

        return this;
    }

    /**
     * Устанавливает спрайту новые UV-координаты
     *
     * @param {Number} spriteIndex Индекс спрайта
     * @param {Array}  bound       Новое значение координат
     */
    setUV(spriteIndex, bound) {
        const arr = this._data.texture.array;
        const start = spriteIndex * 12;

        arr[start] = bound[2]; arr[start + 1] = 1 - bound[3];
        arr[start + 2] = bound[2]; arr[start + 3] = 1 - bound[1];
        arr[start + 4] = bound[0]; arr[start + 5] = 1 - bound[3];
        arr[start + 6] = bound[0]; arr[start + 7] = 1 - bound[1];
        arr[start + 8] = bound[0]; arr[start + 9] = 1 - bound[3];
        arr[start + 10] = bound[2]; arr[start + 11] = 1 - bound[1];

        this._data.texture.dirty = true;

        return this;
    }

    render(state) {
        const {gl, shaderProgram} = state;
        const geometry = this._geometry;

        shaderProgram.bind(gl, null, {
            texture: geometry.getBuffer('texture'),
            position: geometry.getBuffer('position'),
            colorAlpha: geometry.getBuffer('colorAlpha'),
            scale: geometry.getBuffer('scale'),
            offset: geometry.getBuffer('offset'),
            disposition: geometry.getBuffer('disposition')
        });

        for (const key in this._data) {
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
     * @param {TypedObjects} typedObjects
     */
    typifyForRender(typedObjects) {
        // Если cпрайт невидим или у программы спрайта не установлена текстура, то не рендерим его
        if (!this.visible || !this.material.getTexture()) { return this; }

        this.material.typifyForRender(typedObjects, this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }

    _initArrays(sprites) {
        const spriteCount = sprites.length;

        const elementDisposition = [
            0.5, -0.5, 0,
            0.5, 0.5, 0,
            -0.5, -0.5, 0,

            -0.5, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, 0.5, 0
        ];

        const dispositionArray = new Float32Array(spriteCount * 18);
        const textureArray = new Float32Array(spriteCount * 12);

        const positionArray = new Float32Array(spriteCount * 18);
        const scaleArray = new Float32Array(spriteCount * 12);
        const offsetArray = new Float32Array(spriteCount * 12);
        const colorAlphaArray = new Float32Array(spriteCount * 6);

        this._data = {
            disposition: {array: dispositionArray, dirty: false},
            texture: {array: textureArray, dirty: false},
            position: {array: positionArray, dirty: false},
            scale: {array: scaleArray, dirty: false},
            offset: {array: offsetArray, dirty: false},
            colorAlpha: {array: colorAlphaArray, dirty: false}
        };

        for (let i = 0; i < spriteCount; i++) {
            const sprite = sprites[i];

            dispositionArray.set(elementDisposition, i * 18);

            this.setUV(i, sprite.uv || [0, 0, 1, 1]);
            this.setSize(i, sprite.size || [0, 0]);
            this.setOffset(i, sprite.offset || [0, 0]);
            this.setOpacity(i, sprite.opacity !== undefined ? sprite.opacity : 1);
            this.setPosition(i, sprite.position);
            this.setElevation(i, sprite.elevation || 0);
        }
    }

    _initGeometry() {
        this._geometry = new Geometry();

        const textureBuffer = new Buffer(this._data.texture.array, 2);
        textureBuffer.drawType = Buffer.DynamicDraw;

        const positionBuffer = new Buffer(this._data.position.array, 3);
        positionBuffer.drawType = Buffer.DynamicDraw;

        const scaleBuffer = new Buffer(this._data.scale.array, 2);
        scaleBuffer.drawType = Buffer.DynamicDraw;

        const offsetBuffer = new Buffer(this._data.offset.array, 2);
        offsetBuffer.drawType = Buffer.DynamicDraw;

        const colorAlphaBuffer = new Buffer(this._data.colorAlpha.array, 1);
        colorAlphaBuffer.drawType = Buffer.DynamicDraw;

        const dispositionBuffer = new Buffer(this._data.disposition.array, 3);

        this._geometry
            .setBuffer('disposition', dispositionBuffer)
            .setBuffer('texture', textureBuffer)

            .setBuffer('position', positionBuffer)
            .setBuffer('scale', scaleBuffer)
            .setBuffer('offset', offsetBuffer)
            .setBuffer('colorAlpha', colorAlphaBuffer);
    }
}

export default MultiSprite;

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
