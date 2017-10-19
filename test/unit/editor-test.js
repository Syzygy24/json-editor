QUnit.module('editor', function () {
  QUnit.test('JSON Editor Abstract exists', function (assert) {
    assert.ok(!!JSONEditor.AbstractEditor, "passed");
    assert.ok(typeof JSONEditor.AbstractEditor === "function", "passed");
  });
});
