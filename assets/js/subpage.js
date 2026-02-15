(function () {
  document.querySelectorAll("a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try {
        localStorage.setItem("g2_lang", a.getAttribute("data-lang"));
      } catch (e) {}
    });
  });

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function focusContact() {
    var el = document.getElementById("contactName");
    if (!el) return;
    try {
      el.focus({ preventScroll: true });
    } catch (e) {
      el.focus();
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
      if (id === "#contact") {
        if (prefersReduced) return focusContact();
        window.setTimeout(focusContact, 350);
      }
    });
  });

  var floating = document.querySelector(".floatMail");
  var contact = document.querySelector("#contact");
  if (!floating || !contact) return;

  var setHidden = function (hidden) {
    floating.classList.toggle("is-hidden", !!hidden);
  };

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.target !== contact) return;
          setHidden(entry.isIntersecting);
        });
      },
      { threshold: 0.18 }
    );
    io.observe(contact);
  } else {
    var onScroll = function () {
      var r = contact.getBoundingClientRect();
      var inView = r.top < window.innerHeight * 0.7 && r.bottom > window.innerHeight * 0.2;
      setHidden(inView);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();