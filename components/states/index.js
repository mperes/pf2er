$(".tabbed-content__tabs li").click(function () {
  if ($(this).hasClass("selected")) return;
  const id = $(this).attr("data-id");
  const modal = $(this).closest(".tabbed-content");
  modal.find(".tabbed-content__tabs .selected").removeClass("selected");
  $(this).addClass("selected");
  modal.find(".tabbed-content__tab.selected").removeClass("selected");
  modal.find(`.tabbed-content__tab:nth-child(${id})`).addClass("selected");
});

$(".states").each(function () {
  $(this).find(".states__state:first-child").addClass("states__state--selected");
});

const toggleState = (statesContainer) => {
  const active = statesContainer.find(".states__state--selected");
  const inactive = statesContainer.find(".states__state:not(.states__state--selected)");
  active.removeClass("states__state--selected");
  inactive.addClass("states__state--selected");
};