/**
 * Родительский класс для плагинов рендера.
 * Для того, чтобы добавить плагин к рендеру, нужно вызывать {@link Renderer#addPlugin}.
 * На этапе рендринга каждый объект сам добавляется к нужному плагину для отрисовки.
 * После отрисовки всех объектов список объектов в плагине очищается.
 */
class RendererPlugin {
    constructor() {
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
    render() {
        this._objects = [];
    }

    /**
     * Добавляет объект к плагину на этапе рендеринга
     * @param {Object3D} object
     */
    addObject(object) {
        this._objects.push(object);
        return this;
    }

    haveObjects() {
        return this._objects.length > 0;
    }
}

export default RendererPlugin;
