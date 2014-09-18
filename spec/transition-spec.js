var Knockout = require("./knockout-view-transition/fake-knockout.js");
var Transition = require("../lib/transition");

describe("transition-spec.js", function() {
  var ko, transition, lastDeniedReason = null;
  var modelOne = {
        firstDataItem: "value"
      },
      modelTwo = {
        secondDataItem: "another-value"
      },
      modelThree = {
        thirdDataItem: "yet-another-value"
      };

  beforeEach(function() {
    ko = new Knockout();
    transition = Transition.using(ko);
    lastDeniedReason = null;
  });

  it("should bind a view model to knockout and start the first view", function() {
    var model = {
      dataItem: "value"
    };
    transition.initConfig({
      viewName: {
        model: model
      }
    });
    transition.start("viewName");

    expect(ko.template("viewName")).toBe("viewName");
    expect(ko.model()).toBe(model);
  });

  describe("ensure leaving trigger", function() {
    it("should allow a transition to a second view when no leaving trigger", function() {
      transitionWithLeaving(null, function(ko) {
        expect(ko.template()).toBe("viewTwo");
        expect(ko.model()).toBe(modelTwo);
      });
    });

    it("should transition to next view when leaving trigger allows", function() {
      transitionWithLeaving(function(allow, deny) {
        allow();
      }, function(ko) {
        expect(ko.template()).toBe("viewTwo");
        expect(ko.model()).toBe(modelTwo);
      });
    });

    it("should not transition to next view when leaving fails to trigger any callbacks", function() {
      transitionWithLeaving(function(allow, deny) {
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
      });
    });

    it("should not transition to next view when leaving callback denies", function() {
      transitionWithLeaving(function(allow, deny) {
        deny();
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
      });
    });

    it("should not transition to next view when leaving callback denies with a reason", function() {
      transitionWithLeaving(function(allow, deny) {
        deny("a-reason");
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
        expect(lastDeniedReason).toBe("a-reason");
      });
    });

    var transitionWithLeaving = function(leaving, assertion) {
      var viewOne;
      if (leaving) {
        viewOne = {
          model: modelOne,

          leaving: leaving
        };
      } else {
        viewOne = {
          model: modelOne
        };
      }

      transition.initConfig({
        viewOne: viewOne,

        viewTwo: {
          model: modelTwo
        }
      });
      transition.start("viewOne");
      transition.toView("viewTwo", {"allowed": function() {
      }, "denied": function(reason) {
        lastDeniedReason = reason;
      }});

      assertion(ko);
    };
  });

  describe("ensure final triggers are fired", function() {
    it("should trigger the left callback when transitioning out of a view", function() {
      var viewOneLeftCalled = false, viewTwoLeftCalled = false, viewThreeLeftCalled = false;
      transition.initConfig({
        viewOne: {
          model: modelOne,

          left: function() {
            viewOneLeftCalled = true;
          }
        },

        viewTwo: {
          model: modelTwo,

          left: function() {
            viewTwoLeftCalled = true;
          }
        },

        viewThree: {
          model: modelThree,

          left: function() {
            viewThreeLeftCalled = true;
          }
        }
      });
      transition.start("viewOne");
      transition.toView("viewTwo");

      expect(viewOneLeftCalled).toBe(true);
      expect(viewTwoLeftCalled).toBe(false);
      expect(viewThreeLeftCalled).toBe(false);
    });

    it("should trigger the entered callback when transitioning into a view", function() {
      var viewOneEnteredCalled = false, viewTwoEnteredCalled = false, viewThreeEnteredCalled = false;
      transition.initConfig({
        viewOne: {
          model: modelOne,

          entered: function() {
            viewOneEnteredCalled = true;
          }
        },

        viewTwo: {
          model: modelTwo,

          entered: function() {
            viewTwoEnteredCalled = true;
          }
        },

        viewThree: {
          model: modelThree,

          entered: function() {
            viewThreeEnteredCalled = true;
          }
        }
      });
      transition.start("viewOne");
      transition.toView("viewTwo");

      expect(viewOneEnteredCalled).toBe(true);
      expect(viewTwoEnteredCalled).toBe(true);
      expect(viewThreeEnteredCalled).toBe(false);
    });
  });

  describe("ensure entering trigger", function() {
    it("should allow a transition to a second view when no entering trigger", function() {
      transitionWithEntering(null, function(ko) {
        expect(ko.template()).toBe("viewTwo");
        expect(ko.model()).toBe(modelTwo);
      });
    });
    it("should transition to next view when entering trigger allows", function() {
      transitionWithEntering(function(allow, deny) {
        allow();
      }, function(ko) {
        expect(ko.template()).toBe("viewTwo");
        expect(ko.model()).toBe(modelTwo);
      });
    });
    it("should not transition to next view when entering fails to trigger any callbacks", function() {
      transitionWithEntering(function(allow, deny) {
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
      });
    });
    it("should not transition to next view when entering callback denies", function() {
      transitionWithEntering(function(allow, deny) {
        deny();
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
      });
    });
    it("should not transition to next view when entering callback denies with a reason", function() {
      transitionWithEntering(function(allow, deny) {
        deny("a-reason");
      }, function(ko) {
        expect(ko.template()).toBe("viewOne");
        expect(ko.model()).toBe(modelOne);
        expect(lastDeniedReason).toBe("a-reason");
      });
    });

    var transitionWithEntering = function(entering, assertion) {
      var viewTwo;
      if (entering) {
        viewTwo = {
          model: modelTwo,

          entering: entering
        };
      } else {
        viewTwo = {
          model: modelTwo
        };
      }

      transition.initConfig({
        viewOne: {
          model: modelOne
        },

        viewTwo: viewTwo
      });
      transition.start("viewOne");
      transition.toView("viewTwo", {"allowed": function() {
      }, "denied": function(reason) {
        lastDeniedReason = reason;
      }});

      assertion(ko);
    };
  });

  describe("ensure data is passed on transition to different view", function() {
    var config = {
      viewOne: {
        model: modelOne
      },

      viewTwo: {
        model: modelTwo
      }
    };

    beforeEach(function() {
      transition.initConfig(config);
      transition.start("viewOne");
    });

    it("should provide function data when transition is allowed", function() {
      transition.toView("viewTwo", {
        "allowed": function(data) {
          expect(data).toBe("transition-data-from-function");
        },

        "denied": function() {
          fail("Transition should have been allowed");
        },

        "data": function() {
          return "transition-data-from-function";
        }
      });
    });

    it("should provide object data when transition is allowed", function() {
      transition.toView("viewTwo", {
        "allowed": function(data) {
          expect(data).toBe("transition-data-from-object");
        },

        "denied": function() {
          fail("Transition should have been allowed");
        },

        "data": "transition-data-from-object"
      });
    });
  });
});