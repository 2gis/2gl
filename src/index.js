import Floor from './floor';
import Renderer from './renderer';
import Scene from './scene';

let floorData = mallData.floorGeometries[0];

let floor = new Floor(floorData);

let renderer = new Renderer({
    container: 'container'
});

renderer.setSize(window.innerWidth, window.innerHeight);

let scene = new Scene();

scene.add(floor);

renderer.render(scene);
