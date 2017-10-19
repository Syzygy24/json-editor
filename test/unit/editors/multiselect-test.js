QUnit.module('editor/multiselect', function () {
  QUnit.test('JSON Editor editor/multiselect exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.multiselect, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.multiselect === "function", "passed");
  });
});
