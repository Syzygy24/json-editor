QUnit.module('editor/array', function () {
  QUnit.test('JSON Editor editor/array exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.array, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.array === "function", "passed");
  });
});
