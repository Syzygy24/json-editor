QUnit.module('editor/table', function () {
  QUnit.test('JSON Editor editor/table exists', function (assert) {
    assert.ok(!!JSONEditor.defaults.editors.table, "passed");
    assert.ok(typeof JSONEditor.defaults.editors.table === "function", "passed");
  });
});
