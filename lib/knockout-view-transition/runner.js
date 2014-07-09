(function() {
  "use strict";

  var transition = require("../transition");
  var config = require("./config");
  var actions = require("./actions");

  exports.start = function(view) {
    var ko = transition["ko"];
    
    transition["viewModel"] = {
      view: {
        template: ko.observable(),
        model: ko.observable()
      }
    };

    ko.applyBindings(transition["viewModel"]);
    actions.toView(view);
  };
})();