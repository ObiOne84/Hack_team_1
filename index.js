const allSections = Array.from(document.querySelectorAll("section"));

function isSectionInView(section) {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === section) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            // Perform actions when section is in view
          } else {
            // entry.target.classList.remove("animate");
            // Perform actions when section is out of view
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
}

allSections.forEach((section) => isSectionInView(section));
