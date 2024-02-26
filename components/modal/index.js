$(".modal__action--search").click(function () {
  const modal = $(this).closest(".modal");
  const search = modal.find(".modal__search input");
  modal.toggleClass("modal--searching");
  if (!modal.hasClass("modal--searching")) {
    search.val("");
    toggleCounterSearch(modal.find(".counter"), false);
  } else {
    setTimeout(function () {
      const hasFocus = search.is(":focus");
      const isEmpty = search.val().trim() === "";
      if (!hasFocus && isEmpty) {
        search.val("");
        modal.removeClass("modal--searching");
        toggleCounterSearch(modal.find(".counter"), false);
      }
    }, 5000);
  }
});

$(".modal__search input").change(function () {
  const modal = $(this).closest(".modal");
  toggleCounterSearch(modal.find(".counter"), true);
  if ($(this).val().trim() === "") {
    $(this).val("");
    modal.removeClass("modal--searching");
    toggleCounterSearch(modal.find(".counter"), false);
  }
});

$(".modal__action--close").click(function () {
  const modal = $(this).closest(".modal");
  closeModal(modal);
});

$(".background-blocker").hide();

const showModal = (modal => {
  $(".sheet").addClass("sheet--showing-modal");
  const blocker = modal.closest(".background-blocker");
  blocker.fadeIn(100, "swing");
});

const closeModal = (modal => {
  $(".sheet").removeClass("sheet--showing-modal");
  const blocker = modal.closest(".background-blocker");
  modal.find(".modal__search input").val("");
  modal.removeClass("modal--searching");
  toggleCounterSearch(modal.find(".counter"), false);
  blocker.fadeOut(100, "swing");
});