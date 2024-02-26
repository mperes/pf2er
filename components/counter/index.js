const updateCounter = (counter, value) => {
  const span = counter.find("span");
  span.animate({ top: -20 }, 100, "swing", function () {
    span.text(value);
    span.css("top", "20px");
    span.animate({ top: 0 }, 100, "swing");
  });
};

const toggleCounterSearch = (counter, value) => {
  if (typeof value === "undefined")
    counter.toggleClass("counter--searching");
  else if (typeof value === "boolean" && value === true)
    counter.addClass("counter--searching");
  else if (typeof value === "boolean" && value === false)
    counter.removeClass("counter--searching");
};