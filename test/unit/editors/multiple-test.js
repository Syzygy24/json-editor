QUnit.module('editor/multiple', function () {
  QUnit.test('JSON Editor editor/multiple exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.multiple, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.multiple === "function", "passed");
  });
});
