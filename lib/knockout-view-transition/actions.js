(function() {
  "use strict";

  var transition = require("../transition");
  var config = require("./config");

  exports.toView = function(view) {
    // Clear the current template otherwise it will error because its model is missing
    transition["viewModel"].view.template(null);

    // Set the new model and template
    transition["viewModel"].view.model(config.data[view].model);
    transition["viewModel"].view.template(view);
  };
})();