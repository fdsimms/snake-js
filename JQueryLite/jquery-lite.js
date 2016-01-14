(function () {

  window.$l = function (arg) {
    if (arg instanceof HTMLElement ) {
      return new DOMNodeCollection([arg]);
    } else {
      var htmEls = document.querySelectorAll(arg);
      htmEls = Array.prototype.slice.call(htmEls);
      return new DOMNodeCollection(htmEls);
    }

  };

  var DOMNodeCollection = function (htmEls) {
    this.htmEls = htmEls;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {

      var firstEl = this.htmEls[0];
      return firstEl.innerHTML;

    } else {

      this.htmEls.forEach(function (htmEl) {
        htmEl.innerHTML = string;
      });

      return this;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    return this.html("");
  };

  DOMNodeCollection.prototype.append = function (arg) {
    this.htmEls.forEach(function (htmEl) {
      var oldHTML = htmEl.innerHTML;

      if (arg instanceof String) {
        htmEl.innerHTML = oldHTML + arg;

      } else if (arg instanceof HTMLElement) {
        htmEl.innerHTML = oldHTML + arg.outerHTML;

      } else if (arg instanceof DOMNodeCollection) {

        var newHTML = arg.htmEls.map(function (newEl) {
          return newEl.outerHTML;
        });

        htmEl.innerHTML = oldHTML + newHTML.join("");
      }
    });

  };

  DOMNodeCollection.prototype.attr = function () {

  };
  DOMNodeCollection.prototype.addClass = function () {

  };

  DOMNodeCollection.prototype.removeClass = function () {

  };
})();
