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

let addColorField = room => {
    room.color = Color.getByType(room.type);
    room.color[3] = 1;
};

addColorField(floorData);
floorData.rooms.forEach(addColorField);
floorData.islands.forEach(addColorField);

let camera = new four.Camera();
camera.position[2] = -200;


let renderer = new four.Renderer({
    container: 'container'
});

renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new four.Object3D();

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
        camera.position[2] = Math.max(zoomMin, z + zoomDelta);
    } else {
        camera.position[2] = Math.min(zoomMax, z - zoomDelta);
    }
});

function initRooms() {
    let dataVertices = floorData.vertices;
    let dataRooms = floorData.rooms;
    let dataIslands = floorData.islands;
    let dataFloor = floorData;
    let allVertices = [];
    let allColorVertices = [];

    let addAreas = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.areaIndices);
        allVertices = allVertices.concat(vertices);

        let colorVertices = [];

        for (let i = 0; i < vertices.length / 3; i++) {
            colorVertices = colorVertices.concat(room.color);
        }

        allColorVertices = allColorVertices.concat(colorVertices);
    };

    let addWalls = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.wallIndices);
        allVertices = allVertices.concat(vertices);

        let colorVertices = [];
        let color = room.color.map(c => c * 0.95);
        color[3] = 1;

        for (let i = 0; i < vertices.length / 3; i++) {
            colorVertices = colorVertices.concat(color);
        }

        allColorVertices = allColorVertices.concat(colorVertices);
    };

    let addWallTopAreas = room => {
        let vertices = utils.mapIndicesToVertices(dataVertices, room.wallTopAreaIndices);
        allVertices = allVertices.concat(vertices);

        let colorVertices = [];

        for (let i = 0; i < vertices.length / 3; i++) {
            colorVertices = colorVertices.concat([1, 1, 1, 1]);
        }

        allColorVertices = allColorVertices.concat(colorVertices);
    };

    // полы
    addAreas(dataFloor);
    dataRooms.forEach(addAreas);
    dataIslands.forEach(addAreas);

    // стены
    addWalls(dataFloor);
    dataRooms.forEach(addWalls);
    dataIslands.forEach(addWalls);

    // верхушки стен
    addWallTopAreas(dataFloor);
    dataRooms.forEach(addWallTopAreas);

    let vertexBuffer = new four.Buffer(new Float32Array(allVertices), 3);
    let colorBuffer = new four.Buffer(new Float32Array(allColorVertices), 4);

    let geometry = new four.Geometry();
    geometry
        .setBuffer('position', vertexBuffer)
        .setBuffer('color', colorBuffer);

    let program = new four.Program();

    let mesh = new four.Mesh(geometry, program);

    scene.add(mesh);
}
