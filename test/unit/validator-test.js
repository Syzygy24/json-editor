QUnit.module('validator', function () {
  QUnit.test('JSON Editor Validator exists', function (assert) {
    assert.ok(!!JSONEditor.Validator, "passed");
    assert.ok(typeof JSONEditor.Validator === "function", "passed");
  });
});
