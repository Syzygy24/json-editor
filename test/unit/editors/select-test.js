QUnit.module('editor/select', function () {
  QUnit.test('JSON Editor editor/select exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.select, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.select === "function", "passed");
  });
});
