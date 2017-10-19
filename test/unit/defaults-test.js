QUnit.module('defaults', function () {
  QUnit.test('JSON Editor exists', function (assert) {
    assert.ok(JSONEditor, "passed");
  });

  QUnit.test('JSON Editor defaults exists', function (assert) {
    assert.ok(JSONEditor.defaults, "passed");
  });

  QUnit.test('JSON Editor defaults theme shoule equal to html', function (assert) {
    assert.ok(JSONEditor.defaults.theme === 'html', "passed");
  });
});
