module.exports = function(camera, settings) {
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

    // zoom
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

    // drag
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

    // rotate
/*    var rotateMouseDown;
    var rotateMouseMove;
    var rotateIsMouseDown;
    var rotateIsMouseMove;

    window.addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
    });

    window.addEventListener('mousedown', function(ev) {
        if (ev.which !== 3) { return; }

        rotateMouseDown = [ev.clientX, ev.clientY];
        rotateIsMouseDown = true;
    });

    window.addEventListener('mousemove', function(ev) {
        if (!rotateIsMouseDown) { return; }

        rotateMouseMove = [ev.clientX, ev.clientY];
        rotateIsMouseMove = true;
    });

    window.addEventListener('mouseup', function(ev) {
        if (ev.which !== 3) { return; }

        rotateIsMouseDown = false;
    });

    function rotateUpdate() {
        if (!rotateIsMouseMove) { return; }

        var sceneMouseDown = unproject(rotateMouseDown);
        var sceneMouseMove = unproject(rotateMouseMove);

        var downAlpha = Math.atan2(sceneMouseDown[1], sceneMouseDown[0]);
        var moveAlpha = Math.atan2(sceneMouseMove[1], sceneMouseMove[0]);
        var alpha = moveAlpha - downAlpha;

        dgl.quat.rotateZ(camera.quaternion, camera.quaternion, -alpha);

        rotateMouseDown = rotateMouseMove;
        rotateIsMouseMove = false;
    }*/

    var lastUpdateTime = Date.now();

    function rotateUpdate() {
        if (settings.rotate) {
            var dt = Date.now() - lastUpdateTime;

            dgl.quat.rotateZ(camera.quaternion, camera.quaternion, dt / 3000);
        }

        lastUpdateTime = Date.now();
    }

    return {
        update: function() {
            dragUpdate();
            rotateUpdate();
        }
    };
};