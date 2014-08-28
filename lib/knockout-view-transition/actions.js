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

Actions.prototype.toView = function(view, allowed, denied) {
  var self = this;
  var leaving = self.config.leavingHook();
  var entering = self.config.enteringHook(view);
  if (leaving) {
    leaving(
      function() {
        checkEnteringAndSwitch(self, entering, view, allowed, denied);
      },

      function(reason) {
        if (denied) denied(reason);
      });
  } else {
    checkEnteringAndSwitch(self, entering, view, allowed, denied);
  }
};

var checkEnteringAndSwitch = function(self, entering, view, allowed, denied) {
  if (entering) {
    entering(
      function() {
        switchView(self, view, allowed);
      },

      function(reason) {
        if (denied) denied(reason);
      });
  } else {
    switchView(self, view, allowed);
  }
};

var switchView = function(self, view, allowed) {
  // Clear the current template otherwise it will error because its model is missing
  self.config.template(null);

  // Set the new model and template
  self.config.model(view);
  self.config.template(view);

  if (allowed) allowed();

  var left = self.config.leftHook();
  if (left) left();

  self.config.currentView(view);

  var entered = self.config.enteredHook();
  if (entered) entered();
};
