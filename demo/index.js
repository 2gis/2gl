var dat = require('dat-gui');
var Stats = require('./Stats');

var stats = new Stats();
document.body.appendChild(stats.element);

var settings = {
    trianglesSize: 10,
    triangles: 100000,
    rotationCamera: true,
    rotationMesh: true,
    cameraOffset: 200
};

function getRandomRGB() {
    return [Math.random(), Math.random(), Math.random()];
}

function getTriangle(size) {
    var x = (0.5 - Math.random()) * size;
    var y = (0.5 - Math.random()) * size;
    var z = (0.5 - Math.random()) * size;

    var tr = [
        Math.random() + x, Math.random() + y, Math.random() + z,
        Math.random() + x, Math.random() + y, Math.random() + z,
        Math.random() + x, Math.random() + y, Math.random() + z
    ];

    var blockSize = settings.trianglesSize;

    return tr.map(function(x) {
        return x * blockSize;
    });
}

function getMesh() {
    var vertices = [];
    var colors = [];
    var size = Math.pow(settings.triangles, 1 / 3);

    for (var i = 0; i < settings.triangles; i++) {
        var tr = getTriangle(size);
        var randomColor = getRandomRGB();
        var j;

        Array.prototype.push.apply(vertices, tr);

        for (j = 0; j < tr.length / 3; j++) {
            Array.prototype.push.apply(colors, randomColor);
        }
    }

    var program = new dgl.ComplexMeshProgram();
    var geometry = new dgl.Geometry();

    var vertexBuffer = new dgl.Buffer(new Float32Array(vertices), 3);
    var colorBuffer = new dgl.Buffer(new Float32Array(colors), 3);

    var lightAlphaVertices = new Float32Array(vertices.length / 3);
    for (i = 0; i < lightAlphaVertices.length; i++) {
        lightAlphaVertices[i] = 1;
    }
    var lightAlphaBuffer = new dgl.Buffer(lightAlphaVertices, 1);

    var uv = [];
    var textureEnable = [];
    var l = 0;
    for (var k = 0; k < vertices.length / 9; k++) {
        uv.push(0, 0, 0.5, 1, 1, 0);
        textureEnable.push(l % 2, l % 2, l % 2);
        l++;
    }
    var uvBuffer = new dgl.Buffer(new Float32Array(uv), 2);
    var textureEnableBuffer = new dgl.Buffer(new Float32Array(textureEnable), 1);
    var emissiveBuffer = new dgl.Buffer(new Float32Array(vertices.length ), 3);

    geometry
        .setBuffer('position', vertexBuffer)
        .setBuffer('color', colorBuffer)
        .setBuffer('emissive', emissiveBuffer)
        .setBuffer('lightEnable', lightAlphaBuffer)
        .setBuffer('texture', uvBuffer)
        .setBuffer('textureEnable', textureEnableBuffer);

    geometry.computeNormals();

    return new dgl.Mesh(geometry, program);
}

var img = document.createElement('img');
var texture;
var mesh;

img.onload = function() {
    texture = new dgl.Texture(img);
    mesh = getMesh();
    mesh.program.setTexture(texture);
    scene.add(mesh);

    var sp = new dgl.SpriteProgram();
    sp.setTexture(texture);

    var s = new dgl.Sprite(sp);
    s.scale[0] = 10;
    s.scale[1] = 10;
    s.updateLocalMatrix();

    scene.add(s);
};
img.src = './demo/texture.png';

var scene = new dgl.Scene();

var camera = new dgl.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
camera.position[2] = settings.cameraOffset;
camera.updateProjectionMatrix();

var ambientLight = new dgl.AmbientLight([0.5, 0.5, 0.5]);
scene.addLight(ambientLight);

var directionalLight = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight.position[0] = 1;
scene.addLight(directionalLight);

var directionalLight2 = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight2.position[0] = -1;
scene.addLight(directionalLight2);

var renderer = new dgl.Renderer({
    container: document.body
});

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function() {
    stats.reset();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function rotateMesh(dt) {
    if (!settings.rotationMesh) { return; }

    dgl.quat.rotateX(mesh.quaternion, mesh.quaternion, dt / 3000);
    dgl.quat.rotateY(mesh.quaternion, mesh.quaternion, dt / 3000);

    mesh.updateLocalMatrix();
    mesh.updateWorldMatrix();
}

function rotateCamera(dt) {
    if (!settings.rotationCamera) { return; }

    dgl.quat.rotateZ(camera.quaternion, camera.quaternion, dt / 3000);
}

var lastUpdateTime = Date.now();

function render() {
    requestAnimationFrame(render);

    var dt = Date.now() - lastUpdateTime;

    stats.start();
    if (mesh) {
        rotateMesh(dt);
        rotateCamera(dt);
    }
    renderer.render(scene, camera);
    stats.end();

    lastUpdateTime = Date.now();
}

render();
stats.reset();

var gui = new dat.GUI();
var guiTriangles = gui.add(settings, 'triangles', 1, 1000000);
var guiTrianglesSize = gui.add(settings, 'trianglesSize', 1, 100);
var timeout;

function onChange() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        scene.remove(mesh);
        mesh = getMesh();
        mesh.program.setTexture(texture);
        scene.add(mesh);
        stats.reset();
    }, 1000);
}

guiTriangles.onChange(onChange);
guiTrianglesSize.onChange(onChange);

gui.add(settings, 'rotationMesh');
gui.add(settings, 'rotationCamera');

var guiCameraOffset = gui.add(settings, 'cameraOffset', 0, 10000);
guiCameraOffset.onChange(function(value) {
    camera.position[2] = value;
    stats.reset();
});
