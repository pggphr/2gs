(function () {
  var wrap = document.querySelector(".snapWrap");
  var pages = document.querySelectorAll(".snapPage");
  var dots = document.querySelectorAll(".navDot");
  var progressBar = document.querySelector(".scrollProgress");
  var floating = document.querySelector(".floatMail");
  var contactPage = document.getElementById("contact");
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try {
        localStorage.setItem("g2_lang", a.getAttribute("data-lang"));
      } catch (e) {}
    });
  });

  if ("IntersectionObserver" in window && wrap) {
    var pageObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);

          if (entry.isIntersecting) {
            var idx = Array.prototype.indexOf.call(pages, entry.target);
            dots.forEach(function (d, i) {
              d.classList.toggle("is-current", i === idx);
            });

            if (floating) {
              floating.classList.toggle("is-hidden", entry.target === contactPage);
            }
          }
        });
      },
      { root: wrap, threshold: 0.5 }
    );

    pages.forEach(function (p) {
      pageObs.observe(p);
    });
  } else {
    pages.forEach(function (p) {
      p.classList.add("is-active");
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var idx = parseInt(dot.getAttribute("data-page"), 10);
      if (pages[idx]) {
        pages[idx].scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
    });
  });

  if (floating) {
    var floatingLink = floating.querySelector("a");
    if (floatingLink) {
      floatingLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (contactPage) {
          contactPage.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        }
        setTimeout(function () {
          var el = document.getElementById("contactName");
          if (el) {
            try {
              el.focus({ preventScroll: true });
            } catch (e) {
              el.focus();
            }
          }
        }, 600);
      });
    }
  }

  if (wrap) {
    var ticking = false;
    wrap.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var scrollTop = wrap.scrollTop;
          var scrollHeight = wrap.scrollHeight - wrap.clientHeight;
          if (progressBar && scrollHeight > 0) {
            progressBar.style.transform = "scaleX(" + scrollTop / scrollHeight + ")";
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  var params = new URLSearchParams(window.location.search);
  if (params.has("focus") && params.get("focus") === "contactName") {
    if (contactPage) contactPage.scrollIntoView();
    setTimeout(function () {
      var el = document.getElementById("contactName");
      if (el) {
        try {
          el.focus({ preventScroll: true });
        } catch (e) {
          el.focus();
        }
      }
    }, 600);
  }
})();
