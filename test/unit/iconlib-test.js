QUnit.module('iconlib', function () {
  QUnit.test('JSON Editor AbstractIconLib exists', function (assert) {
    assert.ok(!!JSONEditor.AbstractIconLib, "passed");
    assert.ok(typeof JSONEditor.AbstractIconLib === "function", "passed");
  });
});
