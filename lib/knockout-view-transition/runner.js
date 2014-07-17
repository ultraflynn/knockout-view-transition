function Runner(transition, config, actions) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(transition, config, actions);
  }
  this.transition = transition;
  this.config = config;
  this.actions = actions;
}
module.exports = Runner;

Runner.prototype.start = function(view) {
  var ko = transition["ko"];
  
  transition["viewModel"] = {
    view: {
      template: ko.observable(),
      model: ko.observable()
    }
  };

  ko.applyBindings(transition["viewModel"]);
  this.actions.toView(view);
};
