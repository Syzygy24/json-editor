QUnit.module('editor/integer', function () {
  QUnit.test('JSON Editor editor/integer exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.integer, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.integer === "function", "passed");
  });
});
