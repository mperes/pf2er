$(".add-custom").click(function () {
  if ($(this).hasClass("add-custom--open")) return;
  $(this).addClass("add-custom--open");
  $(this).find(".tabbed-content .tabbed-content__tabs li:first-child").addClass("selected");
  $(this).find(".tabbed-content .tabbed-content__tab:first-child").addClass("selected");
  const firstElement = $(".tabbed-content .tabbed-content__tab:first-child > *:first-child");
  setTimeout(function () { firstElement.focus() }, 50);
});

$(".add-custom__delete").click(function (event) {
  const addCustom = $(this).closest(".add-custom");
  addCustom.find("label *:not(.title)").val("");
  addCustom.removeClass("add-custom--open");
  event.stopPropagation();
});

$(".add-custom__done").click(function (event) {
  const addCustom = $(this).closest(".add-custom");
  addCustom.find("label *:not(.title)").val("");
  addCustom.removeClass("add-custom--open");
  event.stopPropagation();
});