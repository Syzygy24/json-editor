QUnit.module('editor/object', function () {
  QUnit.test('JSON Editor editor/object exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.object, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.object === "function", "passed");
  });
});
