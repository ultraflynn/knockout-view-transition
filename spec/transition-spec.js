var Knockout = require("./knockout-view-transition/fake-knockout.js");
var ko = new Knockout();

describe("transition-spec.js", function() {
  var transition, viewModel = null;

  beforeEach(function() {
    transition = require("../lib/transition").using(ko);
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
    ko.assertTemplate("viewName");
    ko.assertModel(model);
  });

  it("should allow a transition to a second view", function() {
    var modelOne = {
      dataItem: "value"
    };
    var modelTwo = {
      aDifferentDataItem: "another-value"
    };
    transition.initConfig({
      viewOne: {
        model: modelOne
      },
      viewTwo: {
        model: modelTwo
      }
    });
    transition.start("viewOne");
    transition.toView("viewTwo");

    ko.assertTemplate("viewTwo");
    ko.assertModel(modelTwo);
  });
});