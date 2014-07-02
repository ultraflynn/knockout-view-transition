var Knockout = require("./knockout-view-transition/fake-knockout.js");
ko = new Knockout();
var transition = require("../lib/transition").using(ko);

describe("transition-spec.js", function() {
  it("should provide an init() function", function() {
    transition.initConfig({});
  });

  it("should bind a view model to knockout", function() {
    transition.start("view");
    var viewModel = ko.getViewModel();
    expect(viewModel).not.toBe(null);
  });

  it("should provide a start() function", function() {
    transition.start("view");
  });

  it("should provide a toView() function", function() {
    transition.toView("view");
  });
});