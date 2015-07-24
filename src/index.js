import Floor from './floor';
//import Triangle from './triangle';
import Renderer from './renderer';
import Object3D from './Object3D';
import Color from './Color';
import Camera from './Camera';
import Stats from 'stats-js';

let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0';
stats.domElement.style.bottom = '0';
document.body.appendChild(stats.domElement);

let floorData = mallData.floorGeometries[2];

/*let floorData = {
    vertices: [
        -1, -1, 0,
        -1, 1, 0,
        1, -1, 0,
        1, 1, 0
    ],
    rooms: [{
        areaIndices: [0, 2, 1, 1, 2, 3]
    }]
};*/

let addColorField = room => {
    room.color = Color.getByType(room.type);
    room.color[3] = 1;
};

addColorField(floorData);
floorData.rooms.forEach(addColorField);
floorData.islands.forEach(addColorField);


let floor = new Floor(floorData);

let camera = new Camera();
camera.position[2] = -200;


let renderer = new Renderer({
    container: 'container'
});

renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new Object3D();

scene.add(floor);

//let triangle = new Triangle();

//scene.add(triangle);

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
