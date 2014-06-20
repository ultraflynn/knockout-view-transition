function FakeView() {
  if (!(this instanceof arguments.callee)) {
    return new arguments.callee();
  }
}
module.exports = FakeView;