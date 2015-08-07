var Stats = require('stats-js');

var data = {"quarter":{"outerArea":[-7.5,5.5,0,-7.5,-7.5,0,-5.5,-5.5,0,3.5,-5.5,0,-5.5,-5.5,0,-7.5,-7.5,0,-7.5,5.5,0,-5.5,-5.5,0,-5.5,3.5,0,3.5,-5.5,0,-7.5,-7.5,0,5.5,-7.5,0,5.5,5.5,0,-7.5,5.5,0,-5.5,3.5,0,3.5,3.5,0,3.5,-5.5,0,5.5,-7.5,0,5.5,5.5,0,-5.5,3.5,0,3.5,3.5,0,3.5,3.5,0,5.5,-7.5,0,5.5,5.5,0],"walls":[-5.5,-5.5,0,-5.5,-5.5,1,-5.5,-3.5,0,-5.5,-3.5,1,-5.5,-3.5,0,-5.5,-5.5,1,-5.5,-3.5,0,-5.5,-3.5,1,-4.5,-3.5,0,-4.5,-3.5,1,-4.5,-3.5,0,-5.5,-3.5,1,-4.5,-3.5,0,-4.5,-3.5,1,-4.5,-4.5,0,-4.5,-4.5,1,-4.5,-4.5,0,-4.5,-3.5,1,-4.5,-4.5,0,-4.5,-4.5,1,-1.5,-4.5,0,-1.5,-4.5,1,-1.5,-4.5,0,-4.5,-4.5,1,-1.5,-4.5,0,-1.5,-4.5,1,-1.5,-1.5,0,-1.5,-1.5,1,-1.5,-1.5,0,-1.5,-4.5,1,-1.5,-1.5,0,-1.5,-1.5,1,-4.5,-1.5,0,-4.5,-1.5,1,-4.5,-1.5,0,-1.5,-1.5,1,-4.5,-1.5,0,-4.5,-1.5,1,-4.5,-2.5,0,-4.5,-2.5,1,-4.5,-2.5,0,-4.5,-1.5,1,-4.5,-2.5,0,-4.5,-2.5,1,-5.5,-2.5,0,-5.5,-2.5,1,-5.5,-2.5,0,-4.5,-2.5,1,-5.5,-2.5,0,-5.5,-2.5,1,-5.5,0.5,0,-5.5,0.5,1,-5.5,0.5,0,-5.5,-2.5,1,-5.5,0.5,0,-5.5,0.5,1,-4.5,0.5,0,-4.5,0.5,1,-4.5,0.5,0,-5.5,0.5,1,-4.5,0.5,0,-4.5,0.5,1,-4.5,-0.5,0,-4.5,-0.5,1,-4.5,-0.5,0,-4.5,0.5,1,-4.5,-0.5,0,-4.5,-0.5,1,-1.5,-0.5,0,-1.5,-0.5,1,-1.5,-0.5,0,-4.5,-0.5,1,-1.5,-0.5,0,-1.5,-0.5,1,-1.5,2.5,0,-1.5,2.5,1,-1.5,2.5,0,-1.5,-0.5,1,-1.5,2.5,0,-1.5,2.5,1,-4.5,2.5,0,-4.5,2.5,1,-4.5,2.5,0,-1.5,2.5,1,-4.5,2.5,0,-4.5,2.5,1,-4.5,1.5,0,-4.5,1.5,1,-4.5,1.5,0,-4.5,2.5,1,-4.5,1.5,0,-4.5,1.5,1,-5.5,1.5,0,-5.5,1.5,1,-5.5,1.5,0,-4.5,1.5,1,-5.5,1.5,0,-5.5,1.5,1,-5.5,3.5,0,-5.5,3.5,1,-5.5,3.5,0,-5.5,1.5,1,-5.5,3.5,0,-5.5,3.5,1,3.5,3.5,0,3.5,3.5,1,3.5,3.5,0,-5.5,3.5,1,3.5,3.5,0,3.5,3.5,1,3.5,1.5,0,3.5,1.5,1,3.5,1.5,0,3.5,3.5,1,3.5,1.5,0,3.5,1.5,1,2.5,1.5,0,2.5,1.5,1,2.5,1.5,0,3.5,1.5,1,2.5,1.5,0,2.5,1.5,1,2.5,2.5,0,2.5,2.5,1,2.5,2.5,0,2.5,1.5,1,2.5,2.5,0,2.5,2.5,1,-0.5,2.5,0,-0.5,2.5,1,-0.5,2.5,0,2.5,2.5,1,-0.5,2.5,0,-0.5,2.5,1,-0.5,-0.5,0,-0.5,-0.5,1,-0.5,-0.5,0,-0.5,2.5,1,-0.5,-0.5,0,-0.5,-0.5,1,2.5,-0.5,0,2.5,-0.5,1,2.5,-0.5,0,-0.5,-0.5,1,2.5,-0.5,0,2.5,-0.5,1,2.5,0.5,0,2.5,0.5,1,2.5,0.5,0,2.5,-0.5,1,2.5,0.5,0,2.5,0.5,1,3.5,0.5,0,3.5,0.5,1,3.5,0.5,0,2.5,0.5,1,3.5,0.5,0,3.5,0.5,1,3.5,-2.5,0,3.5,-2.5,1,3.5,-2.5,0,3.5,0.5,1,3.5,-2.5,0,3.5,-2.5,1,2.5,-2.5,0,2.5,-2.5,1,2.5,-2.5,0,3.5,-2.5,1,2.5,-2.5,0,2.5,-2.5,1,2.5,-1.5,0,2.5,-1.5,1,2.5,-1.5,0,2.5,-2.5,1,2.5,-1.5,0,2.5,-1.5,1,-0.5,-1.5,0,-0.5,-1.5,1,-0.5,-1.5,0,2.5,-1.5,1,-0.5,-1.5,0,-0.5,-1.5,1,-0.5,-4.5,0,-0.5,-4.5,1,-0.5,-4.5,0,-0.5,-1.5,1,-0.5,-4.5,0,-0.5,-4.5,1,2.5,-4.5,0,2.5,-4.5,1,2.5,-4.5,0,-0.5,-4.5,1,2.5,-4.5,0,2.5,-4.5,1,2.5,-3.5,0,2.5,-3.5,1,2.5,-3.5,0,2.5,-4.5,1,2.5,-3.5,0,2.5,-3.5,1,3.5,-3.5,0,3.5,-3.5,1,3.5,-3.5,0,2.5,-3.5,1,3.5,-3.5,0,3.5,-3.5,1,3.5,-5.5,0,3.5,-5.5,1,3.5,-5.5,0,3.5,-3.5,1,3.5,-5.5,0,3.5,-5.5,1,-5.5,-5.5,0,-5.5,-5.5,1,-5.5,-5.5,0,3.5,-5.5,1],"topArea":[-4.5,-3.5,1,-5.5,-3.5,1,-5.5,-5.5,1,3.5,-5.5,1,3.5,-3.5,1,2.5,-3.5,1,2.5,-1.5,1,2.5,-2.5,1,3.5,-2.5,1,3.5,-2.5,1,3.5,0.5,1,2.5,0.5,1,2.5,2.5,1,2.5,1.5,1,3.5,1.5,1,-5.5,3.5,1,-5.5,1.5,1,-4.5,1.5,1,-4.5,-0.5,1,-4.5,0.5,1,-5.5,0.5,1,-5.5,0.5,1,-5.5,-2.5,1,-4.5,-2.5,1,-4.5,-4.5,1,-4.5,-3.5,1,-5.5,-5.5,1,3.5,-5.5,1,2.5,-3.5,1,2.5,-4.5,1,3.5,-2.5,1,2.5,0.5,1,2.5,-0.5,1,2.5,2.5,1,3.5,1.5,1,3.5,3.5,1,-5.5,3.5,1,-4.5,1.5,1,-4.5,2.5,1,-5.5,0.5,1,-4.5,-2.5,1,-4.5,-1.5,1,-1.5,-4.5,1,-4.5,-4.5,1,-5.5,-5.5,1,-5.5,-5.5,1,3.5,-5.5,1,2.5,-4.5,1,2.5,-1.5,1,3.5,-2.5,1,2.5,-0.5,1,-0.5,2.5,1,2.5,2.5,1,3.5,3.5,1,3.5,3.5,1,-5.5,3.5,1,-4.5,2.5,1,-4.5,-0.5,1,-5.5,0.5,1,-4.5,-1.5,1,-5.5,-5.5,1,2.5,-4.5,1,-0.5,-4.5,1,-0.5,-1.5,1,2.5,-1.5,1,2.5,-0.5,1,3.5,3.5,1,-4.5,2.5,1,-1.5,2.5,1,-1.5,-0.5,1,-4.5,-0.5,1,-4.5,-1.5,1,-1.5,-4.5,1,-5.5,-5.5,1,-0.5,-4.5,1,-0.5,-1.5,1,2.5,-0.5,1,-0.5,-0.5,1,-0.5,2.5,1,3.5,3.5,1,-1.5,2.5,1,-1.5,-0.5,1,-4.5,-1.5,1,-1.5,-1.5,1,-1.5,-1.5,1,-1.5,-4.5,1,-0.5,-4.5,1,-0.5,-0.5,1,-0.5,2.5,1,-1.5,2.5,1,-1.5,-0.5,1,-1.5,-1.5,1,-0.5,-4.5,1,-0.5,-1.5,1,-0.5,-0.5,1,-1.5,2.5,1,-1.5,2.5,1,-1.5,-0.5,1,-0.5,-4.5,1,-0.5,-4.5,1,-0.5,-1.5,1,-1.5,2.5,1],"area":[-4.5,-2.5,0,-5.5,-2.5,0,-5.5,-3.5,0,-4.5,-3.5,0,-4.5,-4.5,0,-1.5,-4.5,0,-1.5,-4.5,0,-1.5,-1.5,0,-4.5,-1.5,0,-4.5,-2.5,0,-5.5,-3.5,0,-4.5,-3.5,0,-1.5,-4.5,0,-4.5,-1.5,0,-4.5,-2.5,0,-4.5,-2.5,0,-4.5,-3.5,0,-1.5,-4.5,0,-4.5,1.5,0,-5.5,1.5,0,-5.5,0.5,0,-4.5,0.5,0,-4.5,-0.5,0,-1.5,-0.5,0,-1.5,-0.5,0,-1.5,2.5,0,-4.5,2.5,0,-4.5,1.5,0,-5.5,0.5,0,-4.5,0.5,0,-1.5,-0.5,0,-4.5,2.5,0,-4.5,1.5,0,-4.5,1.5,0,-4.5,0.5,0,-1.5,-0.5,0,2.5,0.5,0,3.5,0.5,0,3.5,1.5,0,2.5,1.5,0,2.5,2.5,0,-0.5,2.5,0,-0.5,2.5,0,-0.5,-0.5,0,2.5,-0.5,0,2.5,0.5,0,3.5,1.5,0,2.5,1.5,0,-0.5,2.5,0,2.5,-0.5,0,2.5,0.5,0,2.5,0.5,0,2.5,1.5,0,-0.5,2.5,0,2.5,-3.5,0,3.5,-3.5,0,3.5,-2.5,0,2.5,-2.5,0,2.5,-1.5,0,-0.5,-1.5,0,-0.5,-1.5,0,-0.5,-4.5,0,2.5,-4.5,0,2.5,-3.5,0,3.5,-2.5,0,2.5,-2.5,0,-0.5,-1.5,0,2.5,-4.5,0,2.5,-3.5,0,2.5,-3.5,0,2.5,-2.5,0,-0.5,-1.5,0]},"emptyQuarter":{"outerArea":[-7.5,-7.5,0,5.5,5.5,0,-7.5,5.5,0,-7.5,-7.5,0,5.5,-7.5,0,5.5,5.5,0]}};

var quarters = [data.quarter, data.quarter, data.emptyQuarter];
var quarterSize = 13;
var w = 50;
var h = 50;
var i, j;

var topAreaColor = [0.95, 0.95, 0.95, 1];
var outerAreaColor = [0.9, 0.9, 0.9, 1];

function getRandomRGBA() {
    return [Math.random(), Math.random(), Math.random(), 1];
}

function getQuarter(x, y) {
    var i;

    var n = Math.round(Math.random() * (quarters.length - 1));
    var quarter = quarters[n];

    var outerArea = new Float32Array(quarter.outerArea || 0);
    for (i = 0; i < outerArea.length; i += 3) {
        outerArea[i] = x + outerArea[i];
        outerArea[i + 1] = y + outerArea[i + 1];
        outerArea[i + 2] = outerArea[i + 2];
    }

    var area = new Float32Array(quarter.area || 0);
    for (i = 0; i < area.length; i += 3) {
        area[i] = x + area[i];
        area[i + 1] = y + area[i + 1];
        area[i + 2] = area[i + 2];
    }

    var topArea = new Float32Array(quarter.topArea || 0);
    for (i = 0; i < topArea.length; i += 3) {
        topArea[i] = x + topArea[i];
        topArea[i + 1] = y + topArea[i + 1];
        topArea[i + 2] = topArea[i + 2];
    }

    var walls = new Float32Array(quarter.walls || 0);
    for (i = 0; i < walls.length; i += 3) {
        walls[i] = x + walls[i];
        walls[i + 1] = y + walls[i + 1];
        walls[i + 2] = walls[i + 2];
    }

    return {
        outerArea: outerArea,
        area: area,
        topArea: topArea,
        walls: walls
    };
}

console.time('init time');

var program = new dgl.MeshProgram();
var renderer = new dgl.Renderer({
    container: document.body
});

var geometry = new dgl.Geometry();
var wallGeometry = new dgl.Geometry();

var allVertices = [];
var allColors = [];

var allWallVertices = [];
var allWallColors = [];

for (i = Math.ceil(-w / 2); i < w / 2; i++) {
    for (j = Math.ceil(-h / 2); j < h / 2; j++) {
        (function(el) {
            var randomColor = getRandomRGBA();
            var i;

            var color = randomColor;
            Array.prototype.push.apply(allVertices, el.area);
            for (i = 0; i < el.area.length / 3; i++) {
                Array.prototype.push.apply(allColors, color);
            }

            color = topAreaColor;
            Array.prototype.push.apply(allVertices, el.topArea);
            for (i = 0; i < el.topArea.length / 3; i++) {
                Array.prototype.push.apply(allColors, color);
            }

            color = outerAreaColor;
            Array.prototype.push.apply(allVertices, el.outerArea);
            for (i = 0; i < el.outerArea.length / 3; i++) {
                Array.prototype.push.apply(allColors, color);
            }

            color = [randomColor[0] * 0.95, randomColor[1] * 0.95, randomColor[2] * 0.95, 1];
            Array.prototype.push.apply(allWallVertices, el.walls);
            for (i = 0; i < el.walls.length / 3; i++) {
                Array.prototype.push.apply(allWallColors, color);
            }
        })(getQuarter(quarterSize * i, quarterSize * j));
    }
}

var vertexBuffer = new dgl.Buffer(allVertices, 3);
var colorBuffer = new dgl.Buffer(allColors, 4);
var normalBuffer = new dgl.Buffer(new Float32Array(allVertices.length), 3);
var lightAlphaBuffer = new dgl.Buffer(new Float32Array(allVertices.length / 3), 1);

geometry
    .setBuffer('position', vertexBuffer)
    .setBuffer('color', colorBuffer)
    .setBuffer('normal', normalBuffer)
    .setBuffer('directionLightAlpha', lightAlphaBuffer);

vertexBuffer = new dgl.Buffer(allWallVertices, 3);
colorBuffer = new dgl.Buffer(allWallColors, 4);

var lightAlphaVertices = new Float32Array(allWallVertices.length / 3);
for (i = 0; i < lightAlphaVertices.length; i++) {
    lightAlphaVertices[i] = 1;
}
lightAlphaBuffer = new dgl.Buffer(lightAlphaVertices, 1);

wallGeometry
    .setBuffer('position', vertexBuffer)
    .setBuffer('color', colorBuffer)
    .setBuffer('directionLightAlpha', lightAlphaBuffer);

wallGeometry.computeNormals();

geometry.concat(wallGeometry);

allVertices = null;
allColors = null;
allWallVertices = null;
allWallColors = null;

var mesh = new dgl.Mesh(geometry, program);

var scene = new dgl.Scene();
scene.add(mesh);

var camera = new dgl.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
camera.position[2] = 50;
camera.updateProjectionMatrix();

var ambientLight = new dgl.AmbientLight([0.5, 0.5, 0.5]);
scene.addLight(ambientLight);

var directionalLight = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight.position[0] = 1;
scene.addLight(directionalLight);

var directionalLight2 = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight2.position[0] = -1;
scene.addLight(directionalLight2);

renderer.setSize(window.innerWidth, window.innerHeight);

var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0';
stats.domElement.style.bottom = '0';
document.body.appendChild(stats.domElement);

function render() {
    requestAnimationFrame(render);

    stats.begin();
    dragUpdate();
    renderer.render(scene, camera);
    stats.end();
}

console.timeEnd('init time');

render();

var zoomDelta = 5;
var zoomMax = 20000;
var zoomMin = -20000;

window.addEventListener('mousewheel', function(ev) {
    var z = camera.position[2];

    if (ev.wheelDelta > 0) {
        camera.position[2] = Math.max(zoomMin, z - zoomDelta);
    } else {
        camera.position[2] = Math.min(zoomMax, z + zoomDelta);
    }
});

function normalizeMousePosition(point) {
    return [
        (point[0] / window.innerWidth) * 2 - 1,
        - (point[1] / window.innerHeight) * 2 + 1
    ];
}

var plane = new dgl.Plane(dgl.vec3.fromValues(0, 0, 1), 0);

function unproject(point) {
    var raycaster = new dgl.Raycaster();

    var mouse = normalizeMousePosition(point);

    raycaster.setFromCamera(mouse, camera);

    return raycaster.ray.intersectPlane(plane);
}

var mouseDown;
var mouseMove;
var isMouseDown;
var isMouseMove;

window.addEventListener('mousedown', function(ev) {
    if (ev.which !== 1) { return; }

    mouseDown = [ev.clientX, ev.clientY];
    isMouseDown = true;
});

window.addEventListener('mousemove', function(ev) {
    if (!isMouseDown) { return; }

    mouseMove = [ev.clientX, ev.clientY];
    isMouseMove = true;
});

window.addEventListener('mouseup', function(ev) {
    if (ev.which !== 1) { return; }

    isMouseDown = false;
});

function dragUpdate() {
    if (!isMouseMove) { return; }

    var sceneMouseDown = unproject(mouseDown);
    var sceneMouseMove = unproject(mouseMove);

    dgl.vec3.add(camera.position, camera.position, sceneMouseDown);
    dgl.vec3.sub(camera.position, camera.position, sceneMouseMove);

    mouseDown = mouseMove;
    isMouseMove = false;
}
