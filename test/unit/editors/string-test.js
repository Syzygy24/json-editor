QUnit.module('editor/string', function () {
  QUnit.test('JSON Editor editor/string exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.string, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.string === "function", "passed");
  });
});
