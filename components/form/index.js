$(".form .tabbed-content .tabbed-content__tabs li").click(function () {
  if ($(this).hasClass("selected")) return;
  const id = $(this).attr("data-id");
  const modal = $(this).closest(".tabbed-content");
  const firstElement = modal.find(`.tabbed-content__tab:nth-child(${id}) > *:first-child`);
  setTimeout(function () { firstElement.focus() }, 50);
});