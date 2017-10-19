QUnit.module('editor/upload', function () {
  QUnit.test('JSON Editor editor/upload exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.upload, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.upload === "function", "passed");
  });
});
