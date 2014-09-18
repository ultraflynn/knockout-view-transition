function Actions(config) {
  if (!(this instanceof Actions)) {
    return new Actions(config);
  }
  this.config = config;
}
module.exports = Actions;

Actions.prototype.start = function(view) {
  this.toView(view);
};

Actions.prototype.toView = function(view, callbacks) {
  var self = this, leaving = self.config.leavingHook(), entering = self.config.enteringHook(view),
      allowed, denied, data;

  if (callbacks) {
    allowed = callbacks ? callbacks["allowed"] : null;
    denied = callbacks ? callbacks["denied"] : null;
    data = callbacks ? callbacks["data"] : null;
  }

  if (leaving) {
    leaving(
        function() {
          self.checkEnteringAndSwitch(entering, view, allowed, denied, data);
        },

        function(reason) {
          if (denied) denied(reason);
        });
  } else {
    self.checkEnteringAndSwitch(entering, view, allowed, denied, data);
  }
};

Actions.prototype.checkEnteringAndSwitch = function(entering, view, allowed, denied, data) {
  var self = this;
  if (entering) {
    entering(
        function() {
          self.switchView(view, allowed, data);
        },

        function(reason) {
          if (denied) denied(reason);
        });
  } else {
    self.switchView(view, allowed, data);
  }
};

Actions.prototype.switchView = function(view, allowed, data) {
  // Clear the current template otherwise it will error because its model is missing
  this.config.template(null);

  // Set the new model and template
  this.config.model(view);
  this.config.template(view);

  if (allowed) allowed();

  var left = this.config.leftHook();
  if (left) left();

  this.config.currentView(view);

  var entered = this.config.enteredHook();
  if (entered) {
    if (data) {
      if (data instanceof Function) {
        entered(data());
      } else {
        entered(data);
      }
    } else {
      entered();
    }
  }
};
