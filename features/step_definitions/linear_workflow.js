var Knockout = require("../../spec/knockout-view-transition/fake-knockout.js");
var ko = new Knockout();
var transition = require("../../lib/transition").using(ko);

var linearWorkflow = function linearWorkflow() {
  var config = {}, models = {};

  this.Given(/^a view called "(.*)" which transitions to "(.*)":$/, function(view, transitionsTo, model, cb) {
    models[view] = model;
    config[view] = {
      model: model,
      transitionsTo: [transitionsTo]
    };
    cb();
  });

  this.Given(/^a view called "(.*)" which does not transition:$/, function(view, model, cb) {
    models[view] = model;
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
    transition.toView(view);
    cb();
  });

  this.Then(/^template should be set to "([^"]*)"$/, function(expected, cb) {
    cb(ko.assertTemplate("Expected template to be " + expected + " but was", expected));
  });

  this.Then(/^model for "([^"]*)" should be active$/, function(view, cb) {
    var expected = models[view];
    cb(ko.assertModel("Expected model to be " + expected + " but was", expected));
  });
};

module.exports = linearWorkflow;