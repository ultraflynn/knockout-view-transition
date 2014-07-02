"use strict";

// The moule to be exported.
var transition = module.exports = {};

transition["ko"] = require("knockout");
transition.using = function(ko) {
  transition["ko"] = ko;
  return transition;
};

function exportedRequire(name) {
  return transition[name] = require("./knockout-view-transition/" + name);
}

var config = exportedRequire("config");
var runner = exportedRequire("runner");
var actions = exportedRequire("actions");

function exportedExpose(obj, methodName, newMethodName) {
  transition[newMethodName || methodName] = obj[methodName].bind(obj);
}

exportedExpose(config, "init", "initConfig");
exportedExpose(runner, "start");
exportedExpose(actions, "toView");
