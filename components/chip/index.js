$("body").on("click", ".chip svg", function () {
  const chip = $(this).closest(".chip");
  chip.remove();
});