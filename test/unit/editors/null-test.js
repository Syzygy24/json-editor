QUnit.module('editor/null', function () {
  QUnit.test('JSON Editor editor/null exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.null, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.null === "function", "passed");
  });
});
