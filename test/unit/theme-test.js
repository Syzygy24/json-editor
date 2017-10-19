QUnit.module('theme', function () {
  QUnit.test('JSON Editor AbstractTheme exists', function (assert) {
    assert.ok(!!JSONEditor.AbstractTheme, "passed");
    assert.ok(typeof JSONEditor.AbstractTheme === "function", "passed");
  });
});
