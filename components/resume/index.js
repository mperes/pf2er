$(".resume").each(function () {
  const resume = $(this);
  const crop = resume.find(".resume__crop");
  const full = resume.find(".resume__full");

  const fullText = full.text();
  crop.find("span").text(fullText);
});

$(".resume .toggle-resume").click(function () {
  const resume = $(this).closest(".resume");
  resume.toggleClass("resume--open")
});