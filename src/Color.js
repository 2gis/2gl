/**
 * Коридор 0
 *
 * Площадники организаций якорные    1100001
 * Площадники организаций неякорные    1100002
 * Площадники общепитов якорные    1100003
 * Площадники общепитов неякорные    1100004
 *
 * Фудкорты    150100
 * Атриумы    150200
 * Коридоры    150300
 * Катки    150400
 * Прочие площади    150500
 * Зона незарегестрированных пассажиров    150600
 * Зона для пассажиров, прошедших регистрацию    150700
 * Помещения для пассажиров    150800
 * Административные ппомещения    150900
 * Стойки регистрации    151000
 * Duty Free    151100
 */


/* eslint-disable */
const LIGHT = 0.55;
const SATURATION = 0.65;

const HOVER_LIGHT = 0.5;
const HOVER_SATURATION = 0.75;

const colorsByType = {
    0: {
        base: 0xededed,
        hover: 0xcdcdcd
    },
    1100001: {
        base: 0xfdf5a7,
        hover: 0xeadb65
    },
    1100002: {
        base: 0xb9e3f5,
        hover: 0x85c9ea
    },
    1100003: {
        base: [107, SATURATION, LIGHT],
        hover: [107, HOVER_SATURATION, HOVER_LIGHT]
    },
    1100004:  {
        base: 0xffa36b,
        hover: 0xf4833e
    },
    150100:  {
        base: 0xffd3b7,
        hover: 0xF6B891
    },
    150200:  {
        base: 0xfafafa,
        hover: 0xe5e5e5
    },
    150300: {
        base: [75, SATURATION, LIGHT],
        hover: [75, HOVER_SATURATION, HOVER_LIGHT]
    },
    150400: {
        base: 0x86caea,
        hover: 0x67bde5
    },
    150500:  {
        base: 0xc8cacc,
        hover: 0xa0a6ad
    },
    150600: {
        base: [280, SATURATION, LIGHT],
        hover: [280, HOVER_SATURATION, HOVER_LIGHT]
    },
    150700: {
        base: [150, SATURATION, LIGHT],
        hover: [150, HOVER_SATURATION, HOVER_LIGHT]
    },
    150800: {
        base: [250, SATURATION, LIGHT],
        hover: [250, HOVER_SATURATION, HOVER_LIGHT]
    },
    150900: {
        base: 0xbbe8b5,
        hover: 0xa1df98
    },
    151000: {
        base: [225, SATURATION, LIGHT],
        hover: [225, HOVER_SATURATION, HOVER_LIGHT]
    },
    151100: {
        base: [200, SATURATION, LIGHT],
        hover: [200, HOVER_SATURATION, HOVER_LIGHT]
    }
};

function getByType(type) {
    type = type || 0;

    var color = colorsByType[type].base;

    var rgb = Array.isArray(color) ? hslToRgb(color) : hexToRgb(color);

    return rgb.map(c => c / 264);
}
exports.getByType = getByType;

function getHoverByType(type) {
    type = type || 0;

    var color = colorsByType[type].hover;

    return Array.isArray(color) ? hslToHex(color) : color;
}
exports.getHoverByType = getHoverByType;

function randomHue() {
    return Math.round(Math.random() * 359000) / 1000;
}
exports.randomHue = randomHue;

function hslToHex(hsl) {
    return rgbToHex(hslToRgb(hsl));
}
exports.hslToHex = hslToHex;

function hslToRgb(hsl) {
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];
    var m1,
        m2;

    /* Some simple corrections for h, s and l. */
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;

    /* From FvD 13.37, CSS Color Module Level 3 */
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;

    function v(h) {
        if (h > 360) { h -= 360; }
        else if (h < 0) { h += 360; }
        if (h < 60) { return m1 + (m2 - m1) * h / 60; }
        if (h < 180) { return m2; }
        if (h < 240) { return m1 + (m2 - m1) * (240 - h) / 60; }
        return m1;
    }

    function vv(h) {
        return Math.round(v(h) * 255);
    }

    return [vv(h + 120), vv(h), vv(h - 120)];
}
exports.hslToRgb = hslToRgb;

function rgbToHsl(rgb) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2];

    var min = Math.min(r /= 255, g /= 255, b /= 255),
        max = Math.max(r, g, b),
        d = max - min,
        h,
        s,
        l = (max + min) / 2;
    if (d) {
        s = l < .5 ? d / (max + min) : d / (2 - max - min);
        if (r === max) { h = (g - b) / d + (g < b ? 6 : 0); }
        else if (g === max) { h = (b - r) / d + 2; }
        else { h = (r - g) / d + 4; }
        h *= 60;
    } else {
        h = NaN;
        s = l > 0 && l < 1 ? 0 : h;
    }
    return [h, s, l];
}
exports.rgbToHsl = rgbToHsl;

function hexToRgb(format) {
    var r, g, b, color;

    format = '#' + format.toString(16);

    if (format != null && format.charAt(0) === '#' && !isNaN(color = parseInt(format.slice(1), 16))) {
        if (format.length === 4) {
            r = (color & 0xf00) >> 4; r = (r >> 4) | r;
            g = (color & 0xf0); g = (g >> 4) | g;
            b = (color & 0xf); b = (b << 4) | b;
        } else if (format.length === 7) {
            r = (color & 0xff0000) >> 16;
            g = (color & 0xff00) >> 8;
            b = (color & 0xff);
        }
    }

    return [r, g, b];
}
exports.hexToRgb = hexToRgb;

function darkerRgb(rgb, k) {
    k = Math.pow(0.7, k);
    return [Math.round(k * rgb[0]), Math.round(k * rgb[1]), Math.round(k * rgb[2])];
}
exports.darkerRgb = darkerRgb;

function rgbToHex(rgb) {
    return '#' + _rgbHex(rgb[0]) + _rgbHex(rgb[1]) + _rgbHex(rgb[2]);
}
exports.rgbToHex = rgbToHex;

function _rgbHex(v) {
    return v < 0x10
        ? '0' + Math.max(0, v).toString(16)
        : Math.min(255, v).toString(16);
}

function randomHex() {
    return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6);
}
exports.randomHex = randomHex;

/* eslint-enable */
