transition = module.exports = {};

transition["ko"] = require("knockout");
transition.using = function(ko) {
  transition["ko"] = ko;
  return transition;
};

var Config = require("./knockout-view-transition/config");
var Runner = require("./knockout-view-transition/runner");
var Actions = require("./knockout-view-transition/actions");

transition.config = new Config(this);
transition.actions = new Actions(this, transition.config);
transition.runner = new Runner(this, transition.config, transition.actions);

function exportedExpose(obj, methodName, newMethodName) {
  transition[newMethodName || methodName] = obj[methodName].bind(obj);
}

exportedExpose(transition.config, "init", "initConfig");
exportedExpose(transition.runner, "start");
exportedExpose(transition.actions, "toView");
