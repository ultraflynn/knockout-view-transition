function Knockout() {
  if (!(this instanceof Knockout)) {
    return new Knockout();
  }
  this.observableCount = 0;
  this.viewModel = null;
}
module.exports = Knockout;

Knockout.prototype.observable = function (initialValue) {
  var _latestValue;
  if (initialValue === undefined) {
    _latestValue = "";
  } else {
    _latestValue = initialValue;
  }
  var _callback = null;

  function observable() {
    if (arguments.length > 0) {
      observable._latestValue = arguments[0];
      if (_callback) _callback(arguments[0]);
      return this;
    } else {
      return observable._latestValue;
    }
  }

  observable._latestValue = _latestValue;
  observable.subscribe = function (callback) {
    _callback = callback;
  };

  this.observableCount++;
  return observable;
};

Knockout.prototype.observableArray = function (initialValue) {
  var _latestValue = initialValue || [];

  function observableArray() {
    if (arguments.length > 0) {
      observableArray._latestValue = arguments[0];
      return this;
    } else {
      return observableArray._latestValue;
    }
  }

  observableArray._latestValue = _latestValue;

  observableArray.push = function (item) {
    this._latestValue.push(item);
  };

  observableArray.remove = function (item) {
    for (var i = _latestValue.length - 1; i >= 0; i--) {
      if (_latestValue[i] === item) {
        _latestValue.splice(i, 1);
      }
    }
  };

  return observableArray;
};
  
Knockout.prototype.utils = {
  arrayFilter: function (collection, filter) {
    var filtered = [];
    for (var i = 0; i < collection.length; i++) {
      if (filter(collection[i])) {
        filtered.push(collection[i]);
      }
    }
    return filtered;
  }
};

Knockout.prototype.bindingHandlers = {};

Knockout.prototype.applyBindings = function (viewModel) {
  this.viewModel = viewModel;
};

Knockout.prototype.getViewModel = function() {
  return this.viewModel;
};

// Assertions
Knockout.prototype.assertObservableCount = function(expected) {
  return this.observableCount === expected;
};
Knockout.prototype.template = function() {
  return this.viewModel.view.template();
};
Knockout.prototype.model = function() {
    return this.viewModel.view.model();
};
