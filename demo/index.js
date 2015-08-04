import Color from './Color';
import Stats from 'stats-js';
import utils from './utils';

let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0';
stats.domElement.style.bottom = '0';
document.body.appendChild(stats.domElement);

let floorData = mallData.floorGeometries[2];

/*let floorData = window.floorData = {
    rooms: [],
    islands: [],
    wallIndices: [],
    wallTopAreaIndices: [],
    vertices: [
        -100, 0, 0,
        0, 100, 0,
        100, 0, 0
    ],
    areaIndices: [0, 2, 1]
};*/

let addColorField = room => {
    room.color = Color.getByType(room.type);
    room.color[3] = 1;
};

addColorField(floorData);
floorData.rooms.forEach(addColorField);
floorData.islands.forEach(addColorField);

let camera = new dgl.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 100000);

/*let w = window.innerWidth / 2;
let h = window.innerHeight / 2;
let camera = new dgl.OrthographicCamera(-w, w, h, -h, 10, 100000);*/


camera.position[2] = 200;
camera.updateProjectionMatrix();


let renderer = new dgl.Renderer({
    container: 'container'
});

let retinaFactor = window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI) || 1;
renderer.setPixelRatio(retinaFactor);
renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new dgl.Scene();

let ambientLight = new dgl.AmbientLight([0.5, 0.5, 0.5]);

scene.addLight(ambientLight);

let directionalLight = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight.position[0] = 1;
scene.addLight(directionalLight);

let directionalLight2 = new dgl.DirectionalLight([0.5, 0.5, 0.5]);
directionalLight2.position[0] = -1;
scene.addLight(directionalLight2);

initRooms();

function renderLoop() {
    requestAnimationFrame(renderLoop);

    stats.begin();

    renderer.render(scene, camera);

    stats.end();
}
renderLoop();

var zoomDelta = 10;
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

function createWallTexture() {
    var canvas = document.createElement('canvas');
    let textureResolution = 128;

    canvas.width = 1;
    canvas.height = textureResolution;

    var context = canvas.getContext('2d');

    var gradient = context.createLinearGradient(0, 0, 0, textureResolution);

    gradient.addColorStop(0.65, '#ffffff');
    gradient.addColorStop(1, '#888888');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 1, textureResolution);

    return canvas;
}

function getUVArray(numVertices) {
    var result = new Array(numVertices * 2);

    var base = [
        0, 0,
        1, 0,
        0, 1,

        1, 0,
        1, 1,
        0, 1
    ];

    for (var i = 0; i < numVertices; i++) {
        result[i * 2] = base[i % (base.length / 2) * 2];
        result[i * 2 + 1] = base[i % (base.length / 2) * 2 + 1];
    }

    return result;
}

function initRooms() {
    let dataVertices = floorData.vertices;
    let dataRooms = floorData.rooms;
    let dataIslands = floorData.islands;
    let dataFloor = floorData;
    let geometries = [];

    let elementLength = 0;
    let allVertices = [];
    let allColorVertices = [];

    let allTextureVertices = [];
    let allTextureAlphaVertices = [];

    let addAreas = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.areaIndices);
        allVertices.push.apply(allVertices, vertices);

        elementLength += vertices.length / 3;

        for (let i = 0; i < vertices.length / 3; i++) {
            allColorVertices.push.apply(allColorVertices, room.color);
        }
    };

    let addWallTopAreas = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.wallTopAreaIndices);
        allVertices.push.apply(allVertices, vertices);

        elementLength += vertices.length / 3;

        for (let i = 0; i < vertices.length / 3; i++) {
            allColorVertices.push.apply(allColorVertices, [1, 1, 1, 1]);
        }
    };

    let addWalls = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.wallIndices);
        allVertices.push.apply(allVertices, vertices);

        let color = room.color.map(c => c * 0.95);
        color[3] = 1;

        allTextureVertices.push.apply(allTextureVertices, getUVArray(room.wallIndices.length));

        for (let i = 0; i < vertices.length / 3; i++) {
            allColorVertices.push.apply(allColorVertices, color);
            allTextureAlphaVertices.push(1);
        }
    };

    console.time('make geometries');

    // полы
    addAreas(dataFloor);
    dataRooms.forEach(addAreas);
    dataIslands.forEach(addAreas);

    // верхушки стен
    addWallTopAreas(dataFloor);
    dataRooms.forEach(addWallTopAreas);

    {
        let vertexBuffer = new dgl.Buffer(new Float32Array(allVertices), 3);
        let colorBuffer = new dgl.Buffer(new Float32Array(allColorVertices), 4);
        let textureBuffer = new dgl.Buffer(new Float32Array(elementLength * 2), 2);
        let textureAlphaBuffer = new dgl.Buffer(new Float32Array(elementLength), 1);
        let lightAlphaBuffer = new dgl.Buffer(new Float32Array(elementLength), 1);
        let normalBuffer = new dgl.Buffer(new Float32Array(elementLength * 3), 3);

        let geometry = new dgl.Geometry();

        geometry
            .setBuffer('position', vertexBuffer)
            .setBuffer('color', colorBuffer)
            .setBuffer('texture', textureBuffer)
            .setBuffer('textureAlpha', textureAlphaBuffer)
            .setBuffer('directionLightAlpha', lightAlphaBuffer)
            .setBuffer('normal', normalBuffer);

        geometries.push(geometry);
    }

    allVertices = [];
    allColorVertices = [];

    // стены
    addWalls(dataFloor);
    dataRooms.forEach(addWalls);
    dataIslands.forEach(addWalls);

    {
        let vertexBuffer = new dgl.Buffer(new Float32Array(allVertices), 3);
        let colorBuffer = new dgl.Buffer(new Float32Array(allColorVertices), 4);
        let textureBuffer = new dgl.Buffer(new Float32Array(allTextureVertices), 2);
        let textureAlphaBuffer = new dgl.Buffer(new Float32Array(allTextureAlphaVertices), 1);
        let lightAlphaBuffer = new dgl.Buffer(new Float32Array(allTextureAlphaVertices), 1);

        let geometry = new dgl.Geometry();

        geometry
            .setBuffer('position', vertexBuffer)
            .setBuffer('color', colorBuffer)
            .setBuffer('texture', textureBuffer)
            .setBuffer('textureAlpha', textureAlphaBuffer)
            .setBuffer('directionLightAlpha', lightAlphaBuffer);

        geometry.computeNormals();

        geometries.push(geometry);
    }

    let geometry = geometries[0];
    geometry.concat(geometries[1]);

    console.timeEnd('make geometries');

    let program = new dgl.MeshProgram();

    let mesh = new dgl.Mesh(geometry, program);

    mesh.setTexture(new dgl.Texture(createWallTexture()));
    scene.add(mesh);

    window.addEventListener('click', function(ev) {
        let coords = utils.normalizeMousePosition([ev.clientX, ev.clientY]);

        let raycaster = new dgl.Raycaster();
        raycaster.setFromCamera(coords, camera);

        console.log(raycaster.intersectObjects(scene.childs, true));
    });
}
