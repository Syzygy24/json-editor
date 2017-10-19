QUnit.module('editor/number', function () {
  QUnit.test('JSON Editor editor/number exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.number, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.number === "function", "passed");
  });
});
