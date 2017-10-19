QUnit.module("utilities", function () {
  QUnit.test("$isplainobject is good", function (assert) {
    assert.ok($isplainobject, "passed");
    assert.ok($isplainobject({}), "passed");
    assert.ok(!$isplainobject(undefined), "passed");
    assert.ok(!$isplainobject("abcdef"), "passed");
  });

  QUnit.test("$extend is good", function (assert) {
    assert.ok($extend, "passed");
    var a = {a: "a"};
    $extend(a, {a: "b", b: "c"});
    assert.ok(a.a === "b", "passed");
    assert.ok(a.b === "c", "passed");
  });

  QUnit.test("$each is good with arrays", function (assert) {
    assert.ok($each, "passed");
    var fn = [function () {
      assert.step('first');
    }, function () {
      assert.step('second');
    }, function () {
      assert.step('third');
    }];
    $each(fn, function (i, f) {
      f();
    });
    assert.verifySteps(['first', 'second', 'third']);
  });

  QUnit.test("$trigger is good", function (assert) {
    assert.ok($trigger, "passed");
    var el = {
      dispatchEvent: function () {
        assert.step('called');
      }
    };
    $trigger(el, 'event');
    assert.verifySteps(['called']);
  });

  QUnit.test("$triggerc is good", function (assert) {
    assert.ok($triggerc, "passed");
    var el = {
      dispatchEvent: function () {
        assert.step('called');
      }
    };
    $triggerc(el, 'event');
    assert.verifySteps(['called']);
  });
});
