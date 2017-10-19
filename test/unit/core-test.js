QUnit.module('core', function () {
  QUnit.test('JSON Editor exists', function (assert) {
    assert.ok(JSONEditor, "JSON Editor existence passed");
  });

  QUnit.test('JSON Editor defaults exists', function (assert) {
    assert.ok(JSONEditor.defaults, "JSON Editor defaults existence passed");
  });
});
