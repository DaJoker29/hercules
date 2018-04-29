module.exports = (function() {
  String.prototype.toTitleCase =
    String.prototype.toTitleCase ||
    function() {
      return this.replace(
        /\b\S*/g,
        t => t.charAt(0).toUpperCase() + t.slice(1)
      );
    };
})();
