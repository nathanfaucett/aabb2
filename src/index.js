var vec2 = require("@nathanfaucett/vec2");


var aabb2 = exports;


function AABB2() {
    this.min = vec2.create(Infinity, Infinity);
    this.max = vec2.create(-Infinity, -Infinity);
}


aabb2.AABB2 = AABB2;

aabb2.create = function(min, max) {
    var out = new AABB2();

    if (min) {
        vec2.copy(out.min, min);
    }
    if (max) {
        vec2.copy(out.max, max);
    }

    return out;
};

aabb2.copy = function(out, a) {

    vec2.copy(out.min, a.min);
    vec2.copy(out.max, a.max);

    return out;
};

aabb2.clone = function(a) {
    return aabb2.create(a.min, a.max);
};

aabb2.set = function(out, min, max) {

    if (min) {
        vec2.copy(out.min, min);
    }
    if (max) {
        vec2.copy(out.max, max);
    }

    return out;
};

aabb2.expandPoint = function(out, point) {

    vec2.min(out.min, point);
    vec2.max(out.max, point);

    return out;
};

aabb2.expandVector = function(out, vector) {

    vec2.sub(out.min, vector);
    vec2.add(out.max, vector);

    return out;
};

aabb2.expandScalar = function(out, scalar) {

    vec2.ssub(out.min, scalar);
    vec2.sadd(out.max, scalar);

    return out;
};

aabb2.union = function(out, a, b) {

    vec2.min(out.min, a.min, b.min);
    vec2.max(out.max, a.max, b.max);

    return out;
};

aabb2.clear = function(out) {

    vec2.set(out.min, Infinity, Infinity);
    vec2.set(out.max, -Infinity, -Infinity);

    return out;
};

aabb2.contains = function(out, point) {
    var min = out.min,
        max = out.max,
        px = point[0],
        py = point[1];

    return !(
        px < min[0] || px > max[0] ||
        py < min[1] || py > max[1]
    );
};

aabb2.intersects = function(a, b) {
    var aMin = a.min,
        aMax = a.max,
        bMin = b.min,
        bMax = b.max;

    return !(
        bMax[0] < aMin[0] || bMin[0] > aMax[0] ||
        bMax[1] < aMin[1] || bMin[1] > aMax[1]
    );
};

aabb2.fromPoints = function(out, points) {
    var i = points.length,
        minx = Infinity,
        miny = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        min = out.min,
        max = out.max,
        x, y, v;

    while (i--) {
        v = points[i];
        x = v[0];
        y = v[1];

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
    }

    min[0] = minx;
    min[1] = miny;
    max[0] = maxx;
    max[1] = maxy;

    return out;
};

aabb2.fromPointArray = function(out, points) {
    var i = 0,
        il = points.length,
        minx = Infinity,
        miny = Infinity,
        maxx = -Infinity,
        maxy = -Infinity,
        min = out.min,
        max = out.max,
        x, y;

    while (i < il) {
        x = points[i];
        y = points[i + 1];
        i += 2;

        minx = minx > x ? x : minx;
        miny = miny > y ? y : miny;

        maxx = maxx < x ? x : maxx;
        maxy = maxy < y ? y : maxy;
    }

    min[0] = minx;
    min[1] = miny;
    max[0] = maxx;
    max[1] = maxy;

    return out;
};

aabb2.fromCenterSize = function(out, center, size) {
    var min = out.min,
        max = out.max,
        x = center[0],
        y = center[1],
        hx = size[0] * 0.5,
        hy = size[1] * 0.5;

    min[0] = x - hx;
    min[1] = y - hy;

    max[0] = x + hx;
    max[1] = y + hy;

    return out;
};

aabb2.fromCenterRadius = function(out, center, radius) {
    var min = out.min,
        max = out.max,
        x = center[0],
        y = center[1];

    min[0] = x - radius;
    min[1] = y - radius;

    max[0] = x + radius;
    max[1] = y + radius;

    return out;
};

aabb2.equal = function(a, b) {
    return (
        vec2.equals(a.min, b.min) ||
        vec2.equals(a.max, b.max)
    );
};

aabb2.notEqual = function(a, b) {
    return (
        vec2.notEquals(a.min, b.min) ||
        vec2.notEquals(a.max, b.max)
    );
};

aabb2.str = function(out) {
    return "AABB2(" + vec2.str(out.min) + ", " + vec2.str(out.max) + ")";
};

aabb2.string = aabb2.toString = aabb2.str;

aabb2.toJSON = function(out, json) {
    json = json || {};

    json.min = vec2.copy(json.min || [], out.min);
    json.max = vec2.copy(json.max || [], out.max);

    return json;
};

aabb2.fromJSON = function(out, json) {

    vec2.copy(out.min, json.min);
    vec2.copy(out.max, json.max);

    return json;
};
