(function () {

  window.$l = function (arg) {
    if (arg instanceof HTMLElement ) {
      return new DOMNodeCollection([arg]);
    } else if (arg instanceof Function) {
      var tid = setInterval( function () {
        if (document.readyState === "complete") {
          clearInterval(tid);
          arg();
        }
      }, 50);
    } else {
      var htmEls = document.querySelectorAll(arg);
      htmEls = Array.prototype.slice.call(htmEls);
      return new DOMNodeCollection(htmEls);
    }
  };

  $l.extend = function () {
    var first = arguments[0];

    var args = [].slice.call(arguments, 1);
    args.forEach(function (arg) {
      var keys = Object.keys(arg);

      keys.forEach(function (key) {
        first[key] = arg[key];
      });

    });

    return first;
  };

  $l.ajax = function (options) {

    var defaults = {
      type: 'GET',
      url: document.URL,
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log(data);
      },
      data: "",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    this.extend(defaults, options);

    var xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        var response = JSON.parse(xmlhttp.responseText);
        if(xmlhttp.status == 200){
          options.success(response);
        } else if(xmlhttp.status == 400) {
          options.error(response);
        } else {
          alert('something else other than 200 was returned');
        }
      }
    };

    xmlhttp.open(options.type, options.url, true);
    xmlhttp.send();
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
      var oldHTML = htmEl.innerHTML || "";

      if (typeof arg === "string") {
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

    return this;
  };

  DOMNodeCollection.prototype.attr = function (attrName, val) {
    if (arguments.length > 1) {
      this.htmEls.forEach(function (htmEl) {
        htmEl.setAttribute(attrName, val);
      });

      return this;
    }

    return this.htmEls[0].getAttribute(attrName);
  };

  DOMNodeCollection.prototype.addClass = function (val) {
    this.htmEls.forEach(function (htmEl) {
      var oldVals = ($l(htmEl).attr("class"));
      var content;

      if (oldVals) {
        content = val + " " + oldVals;
      } else {
        content = val;
      }

      htmEl.setAttribute("class", content);
    });

    return this;
  };

  DOMNodeCollection.prototype.removeClass = function (val) {
    this.htmEls.forEach(function (htmEl) {
      var classVals = htmEl.getAttribute("class");
      if (classVals === null) {
        return this;
      }
      classVals = classVals.split(" ");
      var newClassVals = classVals.filter(function (classVal) {
        return classVal !== val;
      });

      newClassVals = newClassVals.join(" ");
      $l(htmEl).attr("class", newClassVals);
    });

    return this;
  };

  DOMNodeCollection.prototype.children = function () {
    var allChildren = [];
    this.htmEls.forEach(function (htmEl) {
      var children = [].slice.call(htmEl.children);
      allChildren = allChildren.concat(children);
    });

    return new DOMNodeCollection(allChildren);
  };

  DOMNodeCollection.prototype.parent = function () {
    var allParents = [];

    this.htmEls.forEach(function (htmEl) {
      var parent = htmEl.parentElement;

      if (allParents.indexOf(parent) === -1){
        allParents.push(parent);
      }
    });

    return new DOMNodeCollection(allParents);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var allMatchingEls = [];

    this.htmEls.forEach(function (htmEl) {
      var matchingEls = [].slice.call(htmEl.querySelectorAll(selector));
      allMatchingEls = allMatchingEls.concat(matchingEls);
    });

    return new DOMNodeCollection(allMatchingEls);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.htmEls.forEach(function (htmEl) {
      htmEl.remove();
    });
    this.htmEls = [];

    return this;
  };

  DOMNodeCollection.prototype.on = function (type, listener) {
    this.htmEls.forEach(function (htmEl) {
      htmEl.addEventListener(type, listener);
    });

    return this;
  };

  DOMNodeCollection.prototype.off = function (type, listener) {
    this.htmEls.forEach(function (htmEl) {
      htmEl.removeEventListener(type, listener);
    });

    return this;
  };

})();
