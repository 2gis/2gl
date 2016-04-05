function Stats() {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.top = 0;
    this.element.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    this.element.style.width = '150px';

    this.reset();
    this.update();
}

Stats.prototype.start = function() {
    this._startTime = Date.now();
};

Stats.prototype.end = function() {
    var time = Date.now();

    this.elapsedTime = time - this._createTime;

    this.ms = time - this._startTime;
    this._msTickNumbers++;

    if (this.averageMs === null) {
        this.averageMs = this.ms;
    } else {
        this.averageMs += (this.ms - this.averageMs) / this._msTickNumbers;
    }

    this._frames++;

    if (time > this._prevTime + 1000) {
        this.fps = Math.round((this._frames * 1000) / (time - this._prevTime));
        this._fpsTickNumbers++;

        if (this.averageFps === null) {
            this.averageFps = this.fps;
        } else {
            this.averageFps += (this.fps - this.averageFps) / this._fpsTickNumbers;
        }

        this._frames = 0;
        this._prevTime = time;

        this.update();
    }
};

Stats.prototype.update = function() {
    this.element.innerHTML = 'FPS: ' + this.fps + '<br>Average FPS: ' + Math.round(this.averageFps * 1000) / 1000 +
        '<br>MS: ' + this.ms + '<br>Average MS: ' + Math.round(this.averageMs * 1000) / 1000 +
        '<br>Elapsed time: ' + Math.round(this.elapsedTime / 1000) + 's';
};

Stats.prototype.reset = function() {
    this._createTime = Date.now();
    this.elapsedTime = 0;

    this._prevTime = Date.now();
    this._startTime = this._prevTime;

    this.ms = 0;
    this.averageMs = null;
    this._msTickNumbers = 1;

    this._frames = 0;
    this.fps = 0;
    this.averageFps = null;
    this._fpsTickNumbers = 1;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Stats;
}

if (window) {
    window.Stats = Stats;
}
