// Sample test that qunit is working

QUnit.test('qunit valid', function( assert ) {
  assert.ok(1 == "1", "Passed!" );
});

QUnit.module('class', function () {
  QUnit.test('Class exists', function (assert) {
    assert.ok(Class, "class existence passed");
  });
});

