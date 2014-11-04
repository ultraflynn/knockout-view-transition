var Config = require("./knockout-view-transition/config");
var Actions = require("./knockout-view-transition/actions");

transition = module.exports = {};

function exportedExpose(obj, methodName, newMethodName) {
  transition[newMethodName || methodName] = obj[methodName].bind(obj);
}

function init(ko) {
  var config = transition.config = new Config(ko);
  var actions = new Actions(config);

  exportedExpose(config, "init", "initConfig");
  exportedExpose(actions, "toView", "start");
  exportedExpose(actions, "toView");
}

transition.using = function(ko) {
  init(ko);
  return transition;
};

init(typeof ko !== "undefined" ? ko : undefined);
