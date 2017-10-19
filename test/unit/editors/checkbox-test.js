QUnit.module('editor/checkbox', function () {
  QUnit.test('JSON Editor editor/checkbox exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.checkbox, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.checkbox === "function", "passed");
  });
});
