# 2gl [![Build Status](https://travis-ci.org/2gis/2gl.svg?branch=master)](https://travis-ci.org/2gis/2gl) [![Coverage Status](https://coveralls.io/repos/2gis/2gl/badge.svg?branch=master&service=github)](https://coveralls.io/github/2gis/2gl?branch=master)
Узкоспециализированная библиотека WebGL для использования в проектах 2GIS

**[Документация](https://2gis.github.io/2gl/docs)**

* Для работы с матрицами и векторами используется библиотека [glMatrix](http://glmatrix.net/)
* Работа с геометрическими объектами, например, Plane, Line3, Ray, взята из [three.js](http://threejs.org/)

На данный момент может работать со следующими типами объектов для отображения:

1. [Basic mesh](https://2gis.github.io/2gl/docs/BasicMeshMaterial.html) - меш, закрашивается в один цвет
2. [Complex mesh](https://2gis.github.io/2gl/docs/ComplexMeshMaterial.html) - меш, для которого можно устанавить: цвета для каждой из вершин, освещение, текстуру и определять для какой из вершин будет использоваться текстура
3. [Sprite](https://2gis.github.io/2gl/docs/Sprite.html) - спрайт, к камере расположен всегда одной гранью, удалённость не влияет на размеры изображения
4. [MultiSprite](https://2gis.github.io/2gl/docs/MultiSprite.html) - мультиспрайт представляет собой множество спрайтов, которые рисуются в один draw call

#### Examples
* [Basic mesh performance](https://2gis.github.io/2gl/examples/basicMeshPerformance)
* [Complex mesh performance](https://2gis.github.io/2gl/examples/complexMeshPerformance)
* [Sprite performance](https://2gis.github.io/2gl/examples/spritePerformance)
* [MultiSprite performance](https://2gis.github.io/2gl/examples/multiSpritePerformance)

#### Установка
* `npm install 2gl`

#### Подключение
Есть несколько способов подключения библиотеки:
* Напрямую через тег, скрипт `2gl.js` лежит в папке `dist` и содержит все компоненты библиотеки:
```html
<script src="2gl.js"></script>
```
* Если вы используете сборщики, например, `browserify` или `webpack`:
```js
var dgl = require('2gl'); // CommonJS
import dgl from '2gl'; // ES6
```
* Можно подключать только нужные компоненты для уменьшения размера:
```js
var Mesh = require('2gl/Mesh');
var AmbientLight = require('2gl/lights/AmbientLight');
```

#### Development
* `npm install`
* `npm start`

#### Examples
* Install `http-server`
* Run `http-server` at the root project directory
* Open http://localhost:8080/ and navigate to some `*.html` demo at the `examples` directory

#### Release
* [Create a new release](https://github.com/2gis/2gl/releases)
