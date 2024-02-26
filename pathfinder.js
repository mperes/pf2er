$(".proficiency-level").on("change", function () {
  const level = $(this).val();
  if (level === "untrained") $(this).removeClass("picker--active");
  else $(this).addClass("picker--active");
});

$(".initiative-skill").on("change", function () {
  const level = $(this).val();
  if (level === "perception") $(this).removeClass("picker--active");
  else $(this).addClass("picker--active");
});

$(".picker--disable-first-option").on("change", function () {
  const level = $(this).val();
  const firstOption = $(this).find("option").first().attr("value");
  if (level === firstOption) $(this).removeClass("picker--active");
  else $(this).addClass("picker--active");
});

$("input[name=hero_points]").on("change", function () {
  const value = Math.min(Math.max($(this).val(), 0), 3);
  $(this).val(value);
  const steps = $("input[name=hero_points]")
    .parent()
    .find(".pill .attribute-card__step");
  steps.each(function (index) {
    const step = $(this);
    if (value > index) step.addClass("attribute-card__step--checked");
    else step.removeClass("attribute-card__step--checked");
  });
});

$("input[name=dying]").on("change", function () {
  const value = Math.min(Math.max($(this).val(), 0), 4);
  $(this).val(value);
  const steps = $("input[name=dying]")
    .parent()
    .find(".pill .attribute-card__step");
  steps.each(function (index) {
    const step = $(this);
    if (value > index) step.addClass("attribute-card__step--checked--negative");
    else step.removeClass("attribute-card__step--checked--negative");
  });
});

const updateHPBar = () => {
  $("input[name=current_hp]").each(function () {
    const sheet = $(this).closest(".sheet");
    const currentHP = sheet.find("input[name=current_hp]").val();
    const maxHP = sheet.find("input[name=max_hp]").val();
    const percentage = sheet
      .find("input[name=current_hp]")
      .parent()
      .find(".pill .attribute-card__current-range");
    percentage.width(`${(currentHP / maxHP) * 100}%`);
  });
};
$("input[name=current_hp], input[name=max_hp]").on("change", function () {
  updateHPBar();
});

updateHPBar();

$("button.card__disclose").click(function () {
  const card = $(this).closest(".discloseable-card");
  const openClass = "discloseable-card--open";
  const isOpen = card.hasClass(openClass);

  if (isOpen) {
    card.removeClass(openClass);
    const visibleSummaries = card.find(".card__summary:visible");
    if (visibleSummaries.length > 0) {
      card.find(".card__empty").addClass("card__empty--hidden");
    } else {
      card.find(".card__empty").removeClass("card__empty--hidden");
    }
  } else {
    card.addClass(openClass);
  }
});

$(".linked-element").on("mouseenter", function (e) {
  const target = $(this).attr("data-link");
  $(target).addClass("hover");
});
$(".linked-element").on("mouseleave", function (e) {
  const target = $(this).attr("data-link");
  $(target).removeClass("hover");
});

$(".resistances-weaknesses input[type=number]").change(function () {
  const target = $(this);
  const value = target.val();
  const card = $(this).closest(".damage-type");
  const checked = card.find(".partial-bonus__checkbox").is(":checked");
  if (value != 0) {
    target.closest(".damage-type").addClass("card__summary");
    target.closest(".damage-type").removeClass("card__details");
    if (value > 0) {
      $(this).removeClass("negative");
      $(this).addClass("positive");
    } else {
      $(this).addClass("negative");
      $(this).removeClass("positive");
    }
  } else {
    if (!checked) {
      target.closest(".damage-type").addClass("card__details");
      target.closest(".damage-type").removeClass("card__summary");
    }
    $(this).removeClass("negative");
    $(this).removeClass("positive");
  }
});

$(".immune .partial-bonus__checkbox").change(function () {
  const target = $(this);
  const card = $(this).closest(".damage-type");
  const value = card.find(".attribute-with-title__input").val();
  if ($(this).is(":checked")) {
    card.addClass("immune");
    target.closest(".damage-type").addClass("card__summary");
    target.closest(".damage-type").removeClass("card__details");
  } else {
    card.removeClass("immune");
    if (value == 0) {
      target.closest(".damage-type").addClass("card__details");
      target.closest(".damage-type").removeClass("card__summary");
    }
  }
});

let firstTime = true;
const updateTab = (tab) => {
  const navigation = tab.closest(".tab-navigation");
  const selection = navigation.find(".tab-navigation__selection");
  const selected = navigation.find(".tab--selected");
  const position = selected.position();
  const width = firstTime ? 111 : selected.width();
  firstTime = false;
  selection.css("left", position.left);
  selection.width(width + 20);
};
$(".tab-navigation .tab").click(function () {
  const navigation = $(this).closest(".tab-navigation");
  navigation.find(".tab").removeClass("tab--selected");
  $(this).addClass("tab--selected");
  $(".sheet-content--open").removeClass("sheet-content--open");
  const contentID = `.sheet-content--${$(this).text().toLowerCase()}`;
  $(contentID).addClass("sheet-content--open");
  updateTab($(this));
});

updateTab($(".current-section"));

$(".accordion .accordion__summary").click(function () {
  const accordion = $(this).closest(".accordion");
  const group = accordion.closest(".accordion-group");
  const minimizeAll = group.hasClass("accordion-group--minimize-all");
  const openClass = "accordion--open";
  if (minimizeAll) {
    accordion.toggleClass(openClass);
  } else {
    if (!accordion.hasClass(openClass)) {
      group.find(`.${openClass}`).removeClass(openClass);
      accordion.addClass(openClass);
    }
  }
});

$(".square-toggle").click(function () {
  $(this).toggleClass("square-toggle--checked");
});

$(".button-group--toggle").click(function () {
  $(this).toggleClass("button-group--toggle--pressed");
});

$(".disclose-resistances-weaknesses").click(function () {
  $("html, body").animate({ scrollTop: $(document).height() }, 200);
});

$(".condition-list .square-toggle").click(function () {
  const toggle = $(this);
  const listItem = toggle.closest(".condition");
  const removeButton = listItem.find(".condition__remove");
  if (toggle.hasClass("square-toggle--checked")) {
    //removeButton.addClass("button-group--disabled");
  } else {
    //removeButton.removeClass("button-group--disabled");
  }
});

$(".condition-list .condition__remove button").click(function () {
  const button = $(this);
  const listItem = button.closest(".condition");
  const group = button.closest(".button-group");
  const details = button.closest(".accordion__details");
  const counter = $(".accordion-conditions .accordion__counter span");
  if (!group.hasClass("button-group--disabled")) {
    counter.animate({ top: -20 }, 100, "swing", function () {
      counter.text(parseInt(counter.text()) - 1);
      counter.css("top", "20px");
      counter.animate({ top: 0 }, 100, "swing");
    });
    listItem.slideUp(200, function () {
      listItem.remove();
      document.documentElement.style.setProperty(
        "--conditions-height",
        `${details.height()}px`
      );
    });
  }
});

$(".feature__icon img").on("error", function () {
  const icon = $(this);
  const parent = $(icon).parent();
  const classes = parent.attr("class").split(" ");
  const typeClass = classes.filter((c) => c.includes("--type--"))[0];
  const defaultImg = typeClass.split("--")[typeClass.split("--").length - 1];
  icon.attr("src", `imgs/${defaultImg}.png`);
});

function replace(el) {
  const icon = $(el);
  const parent = $(icon).parent();
  const classes = parent.attr("class").split(" ");
  const typeClass = classes.filter((c) => c.includes("--type--"))[0];
  const defaultImg = typeClass.split("--")[typeClass.split("--").length - 1];
  icon.attr("src", `imgs/${defaultImg}.png`);
}

$(".square-select select").change(function () {
  const value = parseInt($(this).val());
  const container = $(this).parent();
  if (value > 0) container.addClass("square-select--selected");
  else container.removeClass("square-select--selected");
});

$(".open-modal").on("mouseenter", function () {
  $(this).parent().addClass("card--corner-decoration");
});
$(".open-modal").on("mouseleave", function () {
  $(this).parent().removeClass("card--corner-decoration");
});

$(".positive-number .positive-number__edit").on("change", function () {
  const edit = $(this);
  const display = edit.parent().find(".positive-number__display");
  const value = isNaN(edit.val()) ? 0 : parseInt(edit.val());
  const displayValue = value > 0 ? `+${value}` : String(value);
  display.text(displayValue);
});

$("[value]").each(function () {
  $(this).val($(this).attr("value"));
});

$("input[type=number]").on("keypress", function (event) {
  var regex = new RegExp("^[-|0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
});

$(".disclose-character-title").click(function () {
  const header = $(".sheet--pc .sheet-header");
  $(this).toggleClass("disclose-character-title--open");
  if (header.hasClass("sheet-header--transitioning")) return;
  header.addClass("sheet-header--transitioning");
  header.slideUp(200, function () {
    header.removeClass("sheet-header--transitioning");
    header.toggleClass("sheet-header--minimized");
    header.toggleClass("sheet-header--sticky");
    header.slideDown(200);
  });
});

$(".auto-resize-field__edit").on("keypress", function () {
  const edit = $(this);
  const display = edit.parent().find(".auto-resize-field__display");
  display.text(edit.val());
});
$(".auto-resize-field__edit").on("change", function () {
  const edit = $(this);
  const display = edit.parent().find(".auto-resize-field__display");
  const placeholder = edit.attr("data-placeholder");
  const value = edit.val().trim() === "" ? placeholder : edit.val().trim();
  display.removeClass("auto-resize-field__display--placeholder");
  if (edit.val().trim() === "")
    display.addClass("auto-resize-field__display--placeholder");
  display.text(value);
});

$("input[name=max_hp]").change(function () {
  const maxHP = $(this);
  const currentHP = $("input[name=current_hp]");
  const newValue = !isNaN(maxHP.val()) ? parseInt(maxHP.val()) : 0;
  const oldValue = parseInt(maxHP.attr("data-previous"));
  const difference = newValue - oldValue;
  currentHP.val(Math.max(parseInt(currentHP.val()) + difference, 0));
  updateHPBar();
});

$("input[name=shield_hp]").change(function () {
  const currentHP = $(this);
  const value = !isNaN(currentHP.val()) ? parseInt(currentHP.val()) : 0;
  currentHP.val(value);
  const enabledState = currentHP
    .closest(".discloseable-card")
    .find(".partial-bonus--enabled");
  const enabledDisabled = currentHP
    .closest(".discloseable-card")
    .find(".partial-bonus--disabled");
  const check = currentHP
    .closest(".discloseable-card")
    .find(".partial-bonus__checkbox");
  if (value === 0) {
    enabledState.hide();
    enabledDisabled.css("display", "flex");
    check.attr("checked", false);
  } else {
    enabledState.css("display", "flex");
    enabledDisabled.hide();
  }
});

$(".starred").click(function () {
  $(".starred").removeClass("starred--active");
  $(this).addClass("starred--active");
});

$(".accordion-conditions .accordion__config").click(function () {
  const modal = $(".conditions-modal");
  showModal(modal);
});

$(".accordion-strikes .accordion__config").click(function () {
  const modal = $(".strikes-modal");
  showModal(modal);
});

$(".accordion-actions .accordion__config").click(function () {
  const modal = $(".actions-modal");
  showModal(modal);
});

$(".accordion-reactions .accordion__config").click(function () {
  const modal = $(".reactions-modal");
  showModal(modal);
});

$(".accordion-free-actions .accordion__config").click(function () {
  const modal = $(".free-actions-modal");
  showModal(modal);
});

$("button.whatisnew").click(function () {
  const modal = $(".whatisnew-modal");
  showModal(modal);
});

$("button.pregens").click(function () {
  const modal = $(".pregens-modal");
  showModal(modal);
});

$(".accordion__config").click(function (event) {
  event.stopImmediatePropagation();
});

$(".custom-conditions h4, .custom-conditions .add-custom__done").click(
  function () {
    const states = $(this).closest(".states");
    toggleState(states);
    const firstElement = states.find(".tabbed-content__tabs li[data-id=1]");
    console.log(firstElement);
    setTimeout(function () {
      firstElement.click();
    }, 10);
  }
);

$(".add-custom__delete").click(function () {
  const item = $(this).closest("li[data-id]");
  item.remove();
});

$("select[name=custom-action-trackusage]").change(function () {
  console.log(2);
  const value = $(this).val();
  const relatedFields = $(".track-max-usages, .track-period");
  if (value === "yes") {
    relatedFields.removeClass("form__field--disabled");
    relatedFields.find("input").removeAttr("disabled");
  } else {
    relatedFields.addClass("form__field--disabled");
    relatedFields.find("input").attr("disabled", "disabled");
  }
});

$(".inventory-item__icon").click(function () {
  $(this).toggleClass("inventory-item__icon--equipped");
});

$(".show-description").click(function () {
  const item = $(this).closest(".inventory-item");
  item.find(".item-details").toggleClass("item-details--hidden");
});

$("body").on("click", ".roll__disclose", function () {
  $(this).toggleClass("roll__disclose--open");
});

const roll = (options) => {
  const author = options.author
    ? `<span class="roll__info roll__info--author">${options.author}</span>`
    : "";
  const entries = getRollEntries(options.entries);
  const details = getRollDetails(options.details);
  const detailsHTML = details
    ? `<div class="roll__details">${details}</div>`
    : "";
  const descriptionHTML = options.description
    ? `<div class="roll__description">${options.description}</div>`
    : "";
  const tags = Array.isArray(options.tags)
    ? `<div class="tags">${options.tags
      .sort()
      .map((tag) => {
        return `<span class="tag">${tag}</span>`;
      })
      .join("")}</div>`
    : "";
  const roll = $(`
  <div class="roll">
    ${author}
    <div class="layout layout--grid layout--cols--40px-1fr layout--gap--half feature__container" style="grid-template-columns: 40px 1fr;">
      <span class="roll__info roll__info--result">${entries.total}</span>
      <div class="roll__title">
        <span class="roll__info roll__info--type">${options.type}</span>
        <span class="roll__info roll__info--name">${options.name}</span>
      </div>
    </div>
    <div class="roll__exploded">
      <button class="roll__disclose"></button>
      ${entries.list}
    </div>
    ${detailsHTML}
    ${descriptionHTML}
    ${tags}
  </div>
  `);
  $(".rolls").append(roll);
};

const chatDescription = (options) => {
  const author = options.author
    ? `<span class="roll__info roll__info--author">${options.author}</span>`
    : "";
  const details = getRollDetails(options.details);
  const detailsHTML = details
    ? `<div class="roll__details">${details}</div>`
    : "";
  const descriptionHTML = options.description
    ? `<div class="roll__description">${options.description}</div>`
    : "";
  const defaultIcon = `
    <svg width="100%" height="100%" viewBox="0 0 10 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g transform="matrix(1,0,0,1,-170.855,-10.4146)">
          <path d="M175.778,45.536L175.778,45.543C176.904,45.543 178.03,45.567 179.153,45.526C179.396,45.518 179.703,45.333 179.839,45.132C179.914,45.019 179.715,44.695 179.605,44.484C179.475,44.235 179.226,44.024 179.17,43.767C178.884,42.433 178.56,41.099 178.413,39.747C178.287,38.593 178.413,37.411 178.372,36.245C178.324,34.862 178.921,33.852 180.005,33.076C180.853,32.469 180.859,32.358 180.057,31.748C178.938,30.893 178.241,29.869 178.363,28.348C178.457,27.155 178.434,25.946 178.368,24.748C178.272,22.972 178.521,21.312 179.636,19.863C179.732,19.738 179.788,19.407 179.728,19.368C179.549,19.243 179.303,19.153 179.085,19.157C178.809,19.163 178.535,19.336 178.262,19.327C176.879,19.278 175.496,19.178 174.112,19.132C173.61,19.116 173.1,19.182 172.6,19.249C172.26,19.294 171.928,19.405 171.593,19.487C171.682,19.765 171.698,20.105 171.87,20.312C172.735,21.355 172.957,22.576 172.948,23.882C172.936,25.376 172.895,26.872 172.961,28.362C173.019,29.673 172.55,30.661 171.57,31.488C170.591,32.315 170.623,32.576 171.628,33.349C172.478,34 173,34.839 172.94,35.946C172.832,37.973 172.752,40.005 172.544,42.021C172.463,42.813 172.074,43.574 171.817,44.346C171.732,44.601 171.483,45.025 171.537,45.064C171.815,45.276 172.163,45.501 172.495,45.516C173.585,45.571 174.68,45.536 175.774,45.536L175.778,45.536ZM176.017,18.032C176.236,17.819 176.402,17.663 176.564,17.501C177.422,16.645 178.274,15.779 179.141,14.931C179.757,14.328 179.761,13.889 179.141,13.289C178.326,12.499 177.516,11.703 176.717,10.896C176.091,10.264 175.832,10.25 175.167,10.878C174.304,11.695 173.44,12.515 172.579,13.334C171.958,13.925 172.009,14.379 172.644,14.96C173.566,15.803 174.437,16.7 175.341,17.562C175.513,17.726 175.733,17.839 176.015,18.034L176.017,18.032Z"/>
      </g>
    </svg>
  `;
  const defaultIconWithBG = `<img src="imgs/info_with_bg.svg">`;
  const selectedIcon =
    options.defaultIcon && options.defaultIcon === "branded"
      ? defaultIconWithBG
      : defaultIcon;
  const icon = options.defaultIcon
    ? `<div class="feature__icon feature__icon--default">${selectedIcon}</div>`
    : `<div class="feature__icon"><img src="imgs/${options.name
      .toLowerCase()
      .replace(/ /g, "_")}.png" alt="${options.name}"></div>`;
  const tags = Array.isArray(options.tags)
    ? `<div class="tags">${options.tags
      .sort()
      .map((tag) => {
        return `<span class="tag">${tag}</span>`;
      })
      .join("")}</div>`
    : "";
  let upcast = "";
  if (typeof options.upcast === "object") {
    let upcastContent = "";
    Object.keys(options.upcast).forEach((rank) => {
      upcastContent += `<span class="upcast__rank">${rank}</span><span class="upcast__description">${options.upcast[rank]}</span>`;
    });
    upcast = `<div class="upcast"><span class="roll__detail--name">heightened casting</span><span class="upcast__header upcast__rank">rank</span><span class="upcast__header upcast__description">description</span>${upcastContent}</div><button class="roll__disclose"></button>`;
  }
  const roll = $(`
  <div class="roll roll--feature-description">
    ${author}
    <div class="layout layout--grid layout--cols--40px-1fr layout--gap--half feature__container" style="grid-template-columns: 40px 1fr;">
      ${icon}
      <div class="roll__title">
        <span class="roll__info roll__info--type">${options.type}</span>
        <span class="roll__info roll__info--name">${options.name}</span>
      </div>
    </div>
    ${detailsHTML}
    ${descriptionHTML}
    ${tags}
    ${upcast}
  </div>
  `);
  $(".rolls").append(roll);
};

const dieRoll = (size) => {
  return 1 + Math.round(Math.random() * (size - 1));
};
const diceRoll = (dice) => {
  if (!String(dice).toLowerCase().includes("d")) return dice;
  const quantity = parseInt(dice.trim().toLowerCase().split("d")[0]);
  const size = parseInt(dice.trim().toLowerCase().split("d")[1]);
  let total = 0;
  for (let i = 0; i < quantity; i++) {
    total += dieRoll(size);
  }
  return total;
};

const getRollEntries = (entries) => {
  const rollEntries = {
    total: 0,
    list: "",
  };
  Object.keys(entries).forEach((entry) => {
    const icon = getRollEntryIcon(entries[entry]);
    const result = diceRoll(entries[entry]);
    rollEntries.total += result;
    rollEntries.list += `<div class="roll__entry"><img src="${icon}"><span>${entry} (${result})</span></div>`;
  });

  return rollEntries;
};

const getRollDetails = (details) => {
  let rollDetails = "";
  Object.keys(details).forEach((detail) => {
    rollDetails += `<div class="roll__detail"><span class="roll__detail--name">${detail}</span><span class="roll__detail--value">${details[detail]}</span>
  </div>`;
  });

  return rollDetails;
};

const getRollEntryIcon = (value) => {
  if (String(value).toLowerCase().includes("d"))
    return `imgs/Dice/yellow/d${String(value).trim().toLowerCase().split("d")[1]
      }.svg`;
  else if (parseInt(value) < 0)`imgs/Dice/yellow/minus.svg`;
  return `imgs/Dice/yellow/plus.svg`;
};

$(".languages .toggle").click(function () {
  const item = $(this).closest(".simple-list__item");
  item.toggleClass("card__details");
});

$(".level-card .open-modal").click(function () {
  const modal = $(".character-level-modal");
  showModal(modal);
});

const recalcXP = () => {
  const modal = $(".character-level-modal");
  const currentLevelField = modal.find(".attribute-card__input[name=level]");
  const levelCardField = $(".level-card input");
  const xpField = modal.find(".attribute-card__input[name=xp]");
  const xpBarFields = $(
    ".character-level-modal .attribute-card__current-range, .level-card .attribute-card__current-range"
  );
  const currentLevel = isNaN(parseInt(currentLevelField.val()))
    ? 1
    : parseInt(currentLevelField.val());
  const xp = isNaN(parseInt(xpField.val())) ? 0 : parseInt(xpField.val());
  const hasLeveled = xp >= 1000;
  const levelsGained = hasLeveled ? Math.floor(xp / 1000) : 0;
  const xpLeft = xp % 1000;
  const progress = (xpLeft / 1000) * 100;
  if (hasLeveled) {
    xpField.val(xpLeft);
    const newLevel = currentLevel + levelsGained;
    currentLevelField.val(newLevel);
    levelCardField.val(newLevel);
  }
  xpBarFields.css("width", `${progress}%`);
};

const applyXP = (mod = 1) => {
  console.log(1);
  const modal = $(".character-level-modal");
  const applyField = modal.find("input[name=apply-xp]");
  const parsedValue = isNaN(parseInt(applyField.val()))
    ? 0
    : parseInt(applyField.val()) * mod;
  const xpField = modal.find(".attribute-card__input[name=xp]");
  const xp = isNaN(parseInt(xpField.val())) ? 0 : parseInt(xpField.val());
  const newXP = xp + parsedValue;
  xpField.val(newXP);
  applyField.val("");
  recalcXP();
};

$(".add-xp").click(function () {
  console.log(1);
  applyXP();
});
$(".del-xp").click(function () {
  applyXP(-1);
});

$(".attribute-card__input[name=xp]").change(function () {
  recalcXP();
});

$(".level-card input").change(function () {
  const modalField = $(
    ".character-level-modal .attribute-card__input[name=level]"
  );
  modalField.val($(this).val());
});

$(".square-check").click(function () {
  $(this).toggleClass("square-check--checked");
});

$(".settings").click(function () {
  console.log(1);
  $("body").toggleClass("is--pc");
});

$(".pregens-modal .pregen").click(function () {
  $(".pregens-modal").addClass("show-confirmation");
});

$(".pregens-modal .cancel-pregen").click(function () {
  $(".pregens-modal").removeClass("show-confirmation");
});

roll({
  author: "sastified bat",
  type: "ability check",
  name: "strength check",
  entries: { "basic roll": "1d20", bless: "1d4", strength: 1 },
  details: {},
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
});

roll({
  author: "sastified bat",
  type: "check with tags",
  name: "strength check",
  entries: { "basic roll": "1d20", bless: "1d4", strength: 1 },
  details: {},
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
  tags: ["agile", "finess"],
});

chatDescription({
  author: "sastified bat",
  type: "feature description",
  name: "Unnarmed Strike",
  details: { "attack type": "melee", range: "5 feet" },
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
});

chatDescription({
  author: "sastified bat",
  type: "description with tags",
  name: "Unnarmed Strike",
  details: { "attack type": "melee", range: "5 feet" },
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
  tags: ["agile", "finess"],
});

chatDescription({
  author: "sastified bat",
  type: "description with tags",
  name: "Unnarmed Strike",
  details: { "attack type": "melee", range: "5 feet" },
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
  defaultIcon: true,
  tags: ["agile", "finess"],
});

chatDescription({
  author: "sastified bat",
  type: "description with tags",
  name: "Unnarmed Strike",
  details: { "attack type": "melee", range: "5 feet" },
  description:
    "Nostrud Ea In Enim Voluptate Amet Nisi Adipiscing Sint Consectetur Voluptate Adipiscing Dolor Ut Ipsum Ea Duis Tempor Voluptate Ut Voluptate Ea Laborum Do Non Velit Ut Ut Dolore Adipiscing Adipiscing",
  defaultIcon: "branded",
  tags: ["agile", "finess"],
  upcast: {
    1: "Enim voluptate amet nisi adipiscing sint consectetur voluptate adipiscing dolor ut ipsum ea duis tempor voluptate ut voluptate.",
    3: "Enim voluptate amet nisi adipiscing sint consectetur voluptate adipiscing dolor ut ipsum ea duis tempor voluptate ut voluptate.",
  },
});
