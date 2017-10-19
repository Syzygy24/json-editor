QUnit.module('editor/enum', function () {
  QUnit.test('JSON Editor editor/enum exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.enum, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.enum === "function", "passed");
  });
});
