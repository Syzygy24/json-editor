QUnit.module('editor/selectize', function () {
  QUnit.test('JSON Editor editor/selectize exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.selectize, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.selectize === "function", "passed");
  });
});
