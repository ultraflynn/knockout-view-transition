"use strict";

var transition = require("../transition");

var config = module.exports = function(prop, value) {
  if (arguments.length === 2) {
    return config.set(prop, value);
  } else {
    return config.get(prop);
  }
};

config.data = {};

config.init = function(obj) {
  return (config.data || {});
};