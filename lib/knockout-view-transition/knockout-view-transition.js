// TODO Implement register 2 views, and the transition between them
function KnockoutViewTransition(ko, config) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(ko, config);
  }

  this.ko = ko;
  this.config = config;

  init(ko, config);
}
module.exports = KnockoutViewTransition;

function init(ko, config) {
  var view = findInitialView(config);
  ko.applyBindings(view.model());
}

function findInitialView(config) {
  var potentials = [];
  for (var view in config) {
    if (config.hasOwnProperty(view)) {
      potentials.push(config[view]);
    }
  }
  if (potentials.length == 1) {
    return potentials[0];
  } else {
    throw new Error("Only one view can have no dependencies");
  }
}