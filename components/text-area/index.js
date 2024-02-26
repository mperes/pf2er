$(".text-area__edit").change(function () {
  const textArea = $(this).closest(".text-area");
  const display = textArea.find(".text-area__display");
  const isEmpty = $(this).val().trim() === "";
  console.log(1);
  if (isEmpty) {
    display.text($(this).attr("data-placeholder"));
    $(this).val("");
    textArea.addClass("text-area--empty");
  } else {
    display.text($(this).val());
    textArea.removeClass("text-area--empty");
  }
});