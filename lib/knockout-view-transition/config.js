function Config(ko) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(ko);
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
  return obtainHook(this, "leaving", this.view);
};

Config.prototype.leftHook = function() {
  return obtainHook(this, "left", this.view);
};

Config.prototype.enteringHook = function(view) {
  return obtainHook(this, "entering", view);
};

Config.prototype.enteredHook = function() {
  return obtainHook(this, "entered", this.view);
};

function obtainHook(self, name, view) {
  if (!view) {
    return undefined;
  }

  if (!self.data) {
    return undefined;
  }

  var current = self.data[view];
  if (!current) {
    return undefined;
  }

  if (!current[name]) {
    return undefined;
  }

  return current[name];
}

Config.prototype.template = function(template) {
  this.viewModel.view.template(template);
};

Config.prototype.model = function(view) {
  this.viewModel.view.model(this.data[view].model);
};

Config.prototype.currentView = function(view) {
  this.view = view;
};