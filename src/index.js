import Floor from './floor';
//import Triangle from './triangle';
import Renderer from './renderer';
import Scene from './scene';
import Color from './Color';

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

floorData.rooms.forEach(room => {
    room.color = Color.getByType(room.type);
    room.color[3] = 1;
});


let floor = new Floor(floorData);

let renderer = new Renderer({
    container: 'container'
});

renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new Scene();

scene.add(floor);

//let triangle = new Triangle();

//scene.add(triangle);

renderer.render(scene);
