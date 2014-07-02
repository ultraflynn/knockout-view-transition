"use strict";

var transition = require("../transition");

exports.start = function(view) {
  transition.ko.applyBindings({});
};
