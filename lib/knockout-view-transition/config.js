function Config(transition) {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee(transition);
  }
  this.transition = transition;
}
module.exports = Config;

Config.prototype.init = function(data) {
  this.data = data || {};
};