$(".tabbed-content__tabs li").click(function () {
  if ($(this).hasClass("selected")) return;
  const id = $(this).attr("data-id");
  const modal = $(this).closest(".tabbed-content");
  modal.find(".tabbed-content__tabs .selected").removeClass("selected");
  $(this).addClass("selected");
  modal.find(".tabbed-content__tab.selected").removeClass("selected");
  modal.find(`.tabbed-content__tab:nth-child(${id})`).addClass("selected");
});

$(".tabbed-content").each(function () {
  const tabs = $(this).find(".tabbed-content__tabs");
  const content = $(this).find(".tabbed-content__content");

  tabs.find("li:first-child").addClass("selected");
  content.find(".tabbed-content__tab:first-child").addClass("selected");
});