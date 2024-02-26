$(".incrementor__button--delete").click(function () {
  console.log(1);
  const toDelete = $(this).attr("data-closest");
  $(this).closest(toDelete).remove();
});

$(".incrementor__button--increase").click(function () {
  const incremetor = $(this).closest(".incrementor");
  const valueField = incremetor.find(".incrementor__value");
  const value = isNaN(parseInt(valueField.val())) ? 0 : parseInt(valueField.val());
  valueField.val(value + 1);
  incremetor.removeClass("incrementor--delete");
  $(this).blur();
});

$(".incrementor__button--decrease").click(function () {
  const incremetor = $(this).closest(".incrementor");
  const valueField = incremetor.find(".incrementor__value");
  const value = isNaN(parseInt(valueField.val())) ? 0 : parseInt(valueField.val());
  const finalValue = Math.max(value - 1, 0);
  valueField.val(finalValue);
  if (finalValue === 0) {
    incremetor.addClass("incrementor--delete");
  } else {
    incremetor.removeClass("incrementor--delete");
  }
  $(this).blur();
});