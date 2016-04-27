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

#### Development
* `npm install`
* `npm start`

#### Release
* `npm version patch` - поднять патч версию
* `npm run pub` - собрать проект, отправить в npm, вернуть в исходное состояние
