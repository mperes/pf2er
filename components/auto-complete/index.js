$(".auto-complete input").change(function () {
  if ($(this).val().trim() === "") return;
  const autoComplete = $(this).closest(".auto-complete");
  const sampleChip = autoComplete.find(".chip--sample");
  const existingLabels = new Set();
  const defaultType = autoComplete.is("[data-default-type]") ? autoComplete.attr("data-default-type") : false;
  console.log(defaultType);
  existingLabels.add($(this).val());
  autoComplete.find(".chip:not(.chip--sample)").each(function () {
    existingLabels.add($(this).text());
  });
  autoComplete.find(".chip:not(.chip--sample)").remove();
  const list = Array.from(existingLabels).sort().reverse();
  list.forEach(trait => {
    const newChip = sampleChip.clone().prependTo(autoComplete);
    if (defaultType) newChip.attr("data-type", defaultType);
    console.log(trait.toLowerCase());
    if (defaultType && ["tiny", "small", "medium", "large", "huge", "gargantuan"].includes(trait.toLowerCase().trim())) newChip.attr("data-type", "size");
    if (defaultType && ["common", "uncommon", "rare", "very rare"].includes(trait.toLowerCase().trim())) newChip.attr("data-type", "rarity");
    newChip.find(".chip__title").text(trait);
    newChip.removeClass("chip--sample");
  });
  $(this).val("");
});

$(".auto-complete input").on("keydown", function (event) {
  const key = event.key;
  if (key === "Backspace") {
    const autoComplete = $(this).closest(".auto-complete");
    const lastChip = autoComplete.find(".chip:not(.chip--sample)").last();
    if (lastChip.length > 0) {
      lastChip.remove();
    }
  }
});