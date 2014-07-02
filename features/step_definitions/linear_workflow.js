var transition = require("../../lib/transition");
var Knockout = require("../../spec/knockout-view-transition/fake-knockout.js");
var ko = new Knockout();

var linearWorkflow = function linearWorkflow() {
  var config = {};

  this.Given(/^a view called "(.*)" which transitions to "(.*)":$/, function(view, transitionsTo, model, cb) {
    config[view] = {
      model: model,
      transitionsTo: [transitionsTo]
    };
    cb();
  });

  this.Given(/^a view called "(.*)" which does not transition:$/, function(view, model, cb) {
    config[view] = {
      model: model
    };
    cb();
  });

  this.When(/^transition is started using "(.*)" as the starting view/, function(view, cb) {
    transition.initConfig(config);
    transition.start(view);
    cb();
  });

  this.Given(/^transition is requested to "(.*)"/, function(view, cb) {
    cb();
  });

  this.Then(/^template should be set to "(.*)"$/, function(expected, cb) {
    cb(ko.assertTemplate("Wrong model", expected));
  });

  this.Then(/^model should be set to "(.*)"$/, function(expected, cb) {
    cb(ko.assertModel("Wrong view", expected));
  });
};

module.exports = linearWorkflow;