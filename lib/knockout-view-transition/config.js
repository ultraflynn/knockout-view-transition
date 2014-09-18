function Config(ko) {
  if (!(this instanceof Config)) {
    return new Config(ko);
  }

  if (ko) {
    this.viewModel = {
      view: {
        template: ko.observable(),
        model: ko.observable()
      }
    };
    ko.applyBindings(this.viewModel);
  }

  this.view = undefined;
}
module.exports = Config;

Config.prototype.init = function(data) {
  this.data = data || {};
};

Config.prototype.leavingHook = function() {
  return this.obtainHook("leaving", this.view);
};

Config.prototype.leftHook = function() {
  return this.obtainHook("left", this.view);
};

Config.prototype.enteringHook = function(view) {
  return this.obtainHook("entering", view);
};

Config.prototype.enteredHook = function() {
  return this.obtainHook("entered", this.view);
};

Config.prototype.obtainHook = function(name, view) {
  if (!view) {
    return undefined;
  }

  if (!this.data) {
    return undefined;
  }

  var current = this.data[view];
  if (!current) {
    return undefined;
  }

  if (!current[name]) {
    return undefined;
  }

  return current[name];
};

Config.prototype.template = function(template) {
  this.viewModel.view.template(template);
};

Config.prototype.model = function(view) {
  this.viewModel.view.model(this.data[view].model);
};

Config.prototype.currentView = function(view) {
  this.view = view;
};