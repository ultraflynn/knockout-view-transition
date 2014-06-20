var KnockoutViewTransition = require("../../lib/knockout-view-transition/knockout-view-transition");
var FakeView = require("../../spec/knockout-view-transition/fake-view"); // TODO This should be a real view

var registerSingleViewSteps = function registerSingleViewSteps() {
  var transition = null,
    ko = null,
    config = null;

  this.Given(/^a configuration that has one view$/, function(callback) {
    // TODO Put proper KO in here
    ko = {
      applyBindings: function(view) {}
    };

    var view = new FakeView();
    config = {
      view_name: {
        model: function() {
          return view;
        }
      }
    };
    callback();
  });

  this.When(/^knockout-view-transition is started$/, function(callback) {
    transition = new KnockoutViewTransition(ko, config);
    callback();
  });

  this.Then(/^Knockout is set up with that view$/, function(callback) {
    callback("TODO Check whether knockout is set up right");
  });
};

module.exports = registerSingleViewSteps;