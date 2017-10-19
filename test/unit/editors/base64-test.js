QUnit.module('editor/base64', function () {
  QUnit.test('JSON Editor editor/base64 exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.base64, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.base64 === "function", "passed");
  });
});
