var tape = require("tape"),
    vec2 = require("vec2"),
    aabb2 = require("..");


tape("aabb2.intersects(a, b)", function(assert) {
    var a = aabb2.create(
            vec2.create(-1, -1),
            vec2.create(1, 1)
        ),
        b = aabb2.create(
            vec2.create(0, 0),
            vec2.create(2, 2)
        );

    assert.equals(aabb2.intersects(a, b), true);
    assert.end();
});
