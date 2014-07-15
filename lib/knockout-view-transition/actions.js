function Actions(transition, config) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(transition, config);
  }
  this.transition = transition;
  this.config = config;
}
module.exports = Actions;

Actions.prototype.toView = function(view) {
  // Clear the current template otherwise it will error because its model is missing
  transition["viewModel"].view.template(null);

  // Set the new model and template
  transition["viewModel"].view.model(this.config.data[view].model);
  transition["viewModel"].view.template(view);
};