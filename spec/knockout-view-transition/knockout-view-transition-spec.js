var KnockoutViewTransition = require("../../lib/knockout-view-transition/knockout-view-transition");
var FakeView = require("./fake-view");

describe("transition.js", function() {
  var ko = null;

  beforeEach(function() {
    ko = {
      applyBindings: function(view) {}
    };
    spyOn(ko, "applyBindings");
  });

  it("should start with a single view named 'view1'", function() {
    var view1 = new FakeView();
    var transition = createTransition(ko, {
      view1: {
        model: function() {
          return view1;
        }
      }
    });
    expect(ko.applyBindings).toHaveBeenCalledWith(view1);
  });

  it("should start with a single view named 'view2'", function() {
    var view2 = new FakeView();
    var transition = createTransition(ko, {
      view2: {
        model: function() {
          return view2;
        }
      }
    });
    expect(ko.applyBindings).toHaveBeenCalledWith(view2);
  });

  it("should allow only one view with no views transitioning to it", function() {
    var view1 = new FakeView();
    var view2 = new FakeView();
    var transition = createTransition(ko, {
      view1: {
        model: function() {
          return view1;
        }
      },

      view2: {
        model: function() {
          return view2;
        }
      }
    }, "Only one view can have no dependencies");
  });

  function createTransition(ko, config, expectedInitErr) {
    var transition = null, actualInitError = null;
    try {
      transition = new KnockoutViewTransition(ko, config);
    } catch (e) {
      actualInitError = e;
    }

    if (expectedInitErr) {
      expect(transition).toBe(null);
      expect(actualInitError.message).toBe(expectedInitErr);
    } else {
      expect(transition).not.toBe(null);
      expect(actualInitError).toBe(null);
    }
    return transition;
  }
});