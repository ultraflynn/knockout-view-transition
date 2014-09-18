var Knockout = require("../../spec/knockout-view-transition/fake-knockout.js");
var ko = new Knockout();
var Transition = require("../../lib/transition");

var workflow = function workflow() {
  var config, activeModel, calls, allowCallCount, denyCallCount, lastDenyReason, lastAllowedData,
      transition;

  var reset = function() {
    config = {};
    activeModel = {};
    calls = [];
    allowCallCount = 0;
    denyCallCount = 0;
    lastDenyReason = "";
    lastAllowedData = "";
    transition = Transition.using(ko);
  };

  var models = {
    "viewOne": {
      field_one: "Field One"
    },

    "viewTwo": {
      field_two: "Field Two"
    }
  };
  var hooks = {
    "viewOne": {
      "allowed-leaving": function(allow, deny) {
        calls.push("leaving");
        allow();
      },

      "denied-leaving": function(allow, deny) {
        calls.push("leaving");
        deny();
      },

      "denied-leaving-with-reason": function(allow, deny) {
        calls.push("leaving");
        deny("denied-leaving-reason");
      },

      "left-notification": function() {
        calls.push("left");
      }
    },

    "viewTwo": {
      "allowed-entering": function(allow, deny) {
        calls.push("entering");
        allow();
      },

      "denied-entering": function(allow, deny) {
        calls.push("entering");
        deny();
      },

      "denied-entering-with-reason": function(allow, deny) {
        calls.push("entering");
        deny("denied-entering-reason");
      },

      "entered-notification": function() {
        calls.push("entered");
      }
    }
  };

  this.Given(/^an initial view called "(.*)"$/, function(view, cb) {
    reset();

    activeModel[view] = models[view];
    config[view] = {
      model: models[view]
    };
    cb();
  });

  this.Given(/^a view called "(.*)"$/, function(view, cb) {
    config[view] = {
      model: models[view]
    };
    cb();
  });

  this.Given(/^"([^"]*)" has a "([^"]*)" transition hook called "([^"]*)"$/, function(view, name, hook, cb) {
    config[view][name] = hooks[view][hook];
    cb();
  });

  this.When(/^transition is started using "(.*)" as the starting view/, function(view, cb) {
    transition.initConfig(config);
    transition.start(view);
    cb();
  });

  this.Given(/^a view transition is requested to "(.*)"$/, function(view, cb) {
    transition.toView(view, {
      "allowed": function(data) {
        allowCallCount++;
        activeModel[view] = models[view];
        lastAllowedData = data;
      },
      "denied": function(reason) {
        denyCallCount++;
        lastDenyReason = reason;
      }});

    cb();
  });

  this.Then(/^a view transition is requested to "([^"]*)" passing "([^"]*)"$/, function(view, data, cb) {
    transition.toView(view, {
      "allowed": function(data) {
        allowCallCount++;
        activeModel[view] = models[view];
        lastAllowedData = data;
      },
      "denied": function(reason) {
        denyCallCount++;
        lastDenyReason = reason;
      },
      "data": function() {
        return data;
      }});

    cb();
  });

  this.Then(/^template should be set to "([^"]*)"$/, function(expected, cb) {
    if (ko.template() === expected) {
      cb();
    } else {
      cb("Expected template to be " + expected + " but was " + ko.template());
    }
  });

  this.Then(/^model for "([^"]*)" should be active$/, function(view, cb) {
    if (ko.model() === activeModel[view]) {
      cb();
    } else {
      cb("Expected model to be " + activeModel(view) + " but was " + ko.model());
    }
  });

  this.Then(/^"([^"]*)" should have received "([^"]*)" during the transition$/, function(view, data, cb) {
    verify(cb, lastAllowedData === data, "Expected allowing callback data to be " + data + " but got [" + lastAllowedData + "]");
  });

  this.Then(/^allow callback on toView should have been called "([^"]*)" times$/, function(expected, cb) {
    verify(cb, "" + allowCallCount === expected,
            "allow callback on toView should have been called " + expected + " times. Actually was called " + allowCallCount + " times");
  });

  this.Then(/^denied callback on toView should have been called "([^"]*)" times$/, function(expected, cb) {
    verify(cb, "" + denyCallCount === expected,
            "denied callback on toView should have been called " + expected + " times. Actually was called " + allowCallCount + " times");
  });

  this.Then(/^calls should include "([^"]*)"$/, function(expected, cb) {
    verify(cb, calls.length === 1 && calls[0] === expected, "Expected '" + expected + "' to have been called");
  });

  this.Then(/^only "([^"]*)" callback on toView should have been triggered$/, function(name, cb) {
    verify(cb, calls.length == 1 && calls[0] === name, "Expected callback " + name + " but got [" + calls + "]");
  });

  this.Then(/^last denied callback should have no reason$/, function(cb) {
    verify(cb, lastDenyReason === undefined, "Denied callback should not have had the reason: " + lastDenyReason);
  });

  this.Then(/^last denied callback should have "([^"]*)" reason$/, function(reason, cb) {
    verify(cb, lastDenyReason === reason, "Expected denied callback reason to be " + reason + " but got [" + lastDenyReason + "]");
  });

  var verify = function(cb, condition, message) {
    if (condition) {
      cb();
    } else {
      cb(message);
    }
  };
};

module.exports = workflow;