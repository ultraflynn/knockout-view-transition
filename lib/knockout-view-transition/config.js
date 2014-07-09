(function() {
  "use strict";

  var transition = require("../transition");

  var config = module.exports = {};
  config.data = {};

  config.init = function(data) {
    config.data = data || {};
  };
})();