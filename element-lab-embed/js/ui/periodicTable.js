import { CATEGORY_LABELS } from "../data/elements.js";
import { ELEMENT_PROPERTIES } from "../data/elementProperties.js";
import { getElementHistory, getElementUse, getIsotopeExamples } from "../data/elementContent.js";

import { faNumber, normalizeSearchText } from "../core/utils.js";

let previouslyFocusedElement = null;
let currentModalElement = null;
let comparedElements = [];

const STATE_LABELS = {
  Gas: "گاز",
  Liquid: "مایع",
  Solid: "جامد",
  "Expected to be a Gas": "احتمالاً گاز",
  "Expected to be a Liquid": "احتمالاً مایع",
  "Expected to be a Solid": "احتمالاً جامد",
};

function displayValue(value, suffix = "") {
  if (value === null || value === undefined || value === "") return "نامشخص";
  return `${faNumber(value)}${suffix}`;
}

function discoveryLabel(value) {
  if (!value) return "نامشخص";
  if (value === "Ancient") return "دوران باستان";
  return faNumber(value);
}

function renderAtomModel(element, shells) {
  const model = document.getElementById("modalAtomModel");
  model.innerHTML = `<span class="atom-model-aura"></span><div class="atom-model-nucleus"><strong>${element.symbol}</strong><span>Z = ${faNumber(element.z)}</span></div>`;

  shells.forEach((electronCount, shellIndex) => {
    const radius = 38 + shellIndex * 10.5;
    const shell = document.createElement("span");
    shell.className = "atom-model-shell";
    shell.style.width = `${radius * 2}px`;
    shell.style.height = `${radius * 2}px`;

    for (let index = 0; index < electronCount; index += 1) {
      const angle = (Math.PI * 2 * index) / electronCount - Math.PI / 2;
      const electron = document.createElement("span");
      electron.className = "atom-model-electron";
      electron.style.left = `${50 + Math.cos(angle) * 50}%`;
      electron.style.top = `${50 + Math.sin(angle) * 50}%`;
      shell.appendChild(electron);
    }

    model.appendChild(shell);
  });

  const shellNames = ["K", "L", "M", "N", "O", "P", "Q"];
  document.getElementById("modalShellLegend").innerHTML = shells
    .map((count, index) => `<span>${shellNames[index]}<sup>${faNumber(count)}</sup></span>`)
    .join("");
}

function formatElectronConfiguration(configuration) {
  if (!configuration) return "نامشخص";
  const predicted = configuration.includes("(predicted)");
  const orbitals = configuration
    .replace("(predicted)", "")
    .trim()
    .split(/\s+/)
    .map((token) => {
      const match = token.match(/^(\d)([spdfg])(\d+)$/i);
      return match ? `<span class="orbital">${match[1]}${match[2].toLowerCase()}<sup>${match[3]}</sup></span>` : token;
    })
    .join("");
  return `${orbitals}${predicted ? '<small class="predicted-label">پیش‌بینی‌شده</small>' : ""}`;
}

function switchElementTab(tabName) {
  document.querySelectorAll("[data-element-tab]").forEach((button) => {
    const active = button.dataset.elementTab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-element-panel]").forEach((panel) => {
    const active = panel.dataset.elementPanel === tabName;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

function comparisonCell(element, field) {
  const props = ELEMENT_PROPERTIES[element.z] ?? {};
  const values = {
    atomic: faNumber(element.z),
    mass: displayValue(props.atomicMass),
    period: faNumber(element.period),
    group: faNumber(element.group),
    category: CATEGORY_LABELS[element.category],
    state: STATE_LABELS[props.standardState] ?? "نامشخص",
    configuration: props.electronConfiguration?.replace("(predicted)", "(پیش‌بینی‌شده)") ?? "نامشخص",
    electronegativity: displayValue(props.electronegativity),
    radius: displayValue(props.atomicRadius, " pm"),
    melting: displayValue(props.meltingPoint, " K"),
    boiling: displayValue(props.boilingPoint, " K"),
    density: displayValue(props.density, " g/cm³"),
    discovered: discoveryLabel(props.yearDiscovered),
  };
  return values[field];
}

function renderComparison() {
  const panel = document.getElementById("comparisonPanel");
  const content = document.getElementById("comparisonContent");
  if (!panel || !content) return;

  panel.hidden = comparedElements.length === 0;
  if (comparedElements.length === 0) return;

  if (comparedElements.length === 1) {
    const element = comparedElements[0];
    content.innerHTML = `<p class="comparison-empty"><strong>${element.name} (${element.symbol})</strong> انتخاب شد. یک عنصر دیگر را باز و به مقایسه اضافه کن.</p>`;
    return;
  }

  const rows = [
    ["عدد اتمی", "atomic"], ["جرم اتمی", "mass"], ["دوره", "period"],
    ["گروه", "group"], ["دسته", "category"], ["حالت استاندارد", "state"],
    ["آرایش الکترونی", "configuration"], ["الکترونگاتیوی", "electronegativity"],
    ["شعاع اتمی", "radius"], ["نقطه ذوب", "melting"],
    ["نقطه جوش", "boiling"], ["چگالی", "density"], ["کشف", "discovered"],
  ];
  const [first, second] = comparedElements;
  content.innerHTML = `
    <div class="table-scroll"><table class="comparison-table">
      <thead><tr><th>ویژگی</th><th class="comparison-element-heading">${first.name}<small>${first.symbol}</small></th><th class="comparison-element-heading">${second.name}<small>${second.symbol}</small></th></tr></thead>
      <tbody>${rows.map(([label, field]) => {
        const scientific = ["mass", "configuration", "electronegativity", "radius", "melting", "boiling", "density"].includes(field);
        const attributes = scientific ? ' class="scientific-value" dir="ltr"' : "";
        return `<tr><th>${label}</th><td${attributes}>${comparisonCell(first, field)}</td><td${attributes}>${comparisonCell(second, field)}</td></tr>`;
      }).join("")}</tbody>
    </table></div>`;
}

function updateComparisonButton() {
  const button = document.getElementById("addToComparisonBtn");
  if (!button || !currentModalElement) return;
  const selected = comparedElements.some((item) => item.z === currentModalElement.z);
  button.innerHTML = selected
    ? '<span aria-hidden="true">✓</span><span>در مقایسه</span>'
    : '<span aria-hidden="true">⚖️</span><span>مقایسه</span>';
  button.setAttribute("aria-label", selected ? "حذف عنصر از مقایسه" : "افزودن عنصر به مقایسه");
  button.classList.toggle("selected", selected);
}

export function getElementGridPosition(element) {
  if (element.z >= 58 && element.z <= 71) {
    return {
      row: 9,
      column: element.z - 54,
    };
  }

  if (element.z >= 90 && element.z <= 103) {
    return {
      row: 10,
      column: element.z - 86,
    };
  }

  if (element.z === 57) {
    return {
      row: 6,
      column: 3,
    };
  }

  if (element.z === 89) {
    return {
      row: 7,
      column: 3,
    };
  }

  return {
    row: element.period,

    column: element.group,
  };
}

export function renderPeriodicTable(
  elements,
  {
    containerId = "periodicTable",

    onElementClick = openElementModal,

    gameMode = false,
  } = {},
) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (gameMode) {
    container.classList.add("game-periodic-table");
  } else {
    container.classList.remove("game-periodic-table");
  }

  elements.forEach((element) => {
    const position = getElementGridPosition(element);

    const node = document.createElement("button");

    node.type = "button";

    node.className = `element ${element.category}`;

    node.style.gridColumn = position.column;

    node.style.gridRow = position.row;

    node.dataset.z = String(element.z);

    node.dataset.search = normalizeSearchText(
      [element.z, element.symbol, element.name, element.en].join(" "),
    );

    node.setAttribute(
      "aria-label",
      `${element.name}، نماد ${element.symbol}، عدد اتمی ${faNumber(element.z)}`,
    );

    node.innerHTML = `

            <span class="atomic-number">
                ${faNumber(element.z)}
            </span>

            <strong class="symbol">
                ${element.symbol}
            </strong>

            <span class="element-name">
                ${element.name}
            </span>

        `;

    node.addEventListener("click", () => {
      onElementClick(element, node);
    });

    container.appendChild(node);
  });
}

export function filterPeriodicTable(query) {
  const normalized = normalizeSearchText(query);

  document.querySelectorAll("#periodicTable .element").forEach((node) => {
    const matches = node.dataset.search.includes(normalized);

    node.classList.toggle("hidden-search", normalized && !matches);
  });
}

export function openElementModal(element, _trigger = null, initialTab = "overview") {
  previouslyFocusedElement = document.activeElement;
  currentModalElement = element;
  const properties = ELEMENT_PROPERTIES[element.z] ?? {};
  document.getElementById("modalSymbol").textContent = element.symbol;

  document.getElementById("modalName").textContent = element.name;

  document.getElementById("modalEnglishName").textContent = element.en;

  document.getElementById("modalAtomic").textContent = faNumber(element.z);

  document.getElementById("modalPeriod").textContent = faNumber(element.period);

  document.getElementById("modalGroup").textContent = faNumber(element.group);

  document.getElementById("modalCategory").textContent =
    CATEGORY_LABELS[element.category];

  document.getElementById("modalMass").textContent = displayValue(properties.atomicMass);
  document.getElementById("modalState").textContent = STATE_LABELS[properties.standardState] ?? "نامشخص";
  document.getElementById("modalConfiguration").innerHTML = formatElectronConfiguration(properties.electronConfiguration);
  document.getElementById("modalShells").innerHTML = properties.shells?.length
    ? properties.shells.map((count) => `<bdi>${faNumber(count)}</bdi>`).join('<i aria-hidden="true">›</i>')
    : "نامشخص";
  document.getElementById("modalElectronegativity").textContent = displayValue(properties.electronegativity);
  document.getElementById("modalRadius").textContent = displayValue(properties.atomicRadius, " pm");
  document.getElementById("modalOxidation").textContent = properties.oxidationStates || "نامشخص";
  document.getElementById("modalMelting").textContent = displayValue(properties.meltingPoint, " K");
  document.getElementById("modalBoiling").textContent = displayValue(properties.boilingPoint, " K");
  document.getElementById("modalDensity").textContent = displayValue(properties.density, " g/cm³");
  document.getElementById("modalDiscovered").textContent = discoveryLabel(properties.yearDiscovered);
  document.getElementById("modalUses").textContent = getElementUse(element);
  document.getElementById("modalHistory").textContent = getElementHistory(element, properties.yearDiscovered);

  const isotopes = getIsotopeExamples(element);
  document.getElementById("modalIsotopes").innerHTML = isotopes.length
    ? isotopes.map((mass) => `<span class="isotope-badge"><sup>${faNumber(mass)}</sup>${element.symbol}</span>`).join("")
    : "برای این عنصر، نمونه‌ای در فهرست آموزشی ثبت نشده است.";

  document.getElementById("modalSourceLink").href = `https://pubchem.ncbi.nlm.nih.gov/element/${element.z}`;
  renderAtomModel(element, properties.shells ?? []);
  switchElementTab(["overview", "physical", "story"].includes(initialTab) ? initialTab : "overview");
  updateComparisonButton();

  const modal = document.getElementById("elementModal");

  modal.classList.add("show");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  document.getElementById("app").inert = true;

  document.getElementById("closeElementModalBtn").focus();
}

export function closeElementModal() {
  const modal = document.getElementById("elementModal");

  modal.classList.remove("show");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  document.getElementById("app").inert = false;

  previouslyFocusedElement?.focus();

  previouslyFocusedElement = null;
}

export function setupElementModal() {
  const modal = document.getElementById("elementModal");

  const closeButton = document.getElementById("closeElementModalBtn");

  closeButton.addEventListener("click", closeElementModal);

  document.querySelectorAll("[data-element-tab]").forEach((button) => {
    button.addEventListener("click", () => switchElementTab(button.dataset.elementTab));
  });

  document.getElementById("addToComparisonBtn")?.addEventListener("click", () => {
    if (!currentModalElement) return;
    const selectedIndex = comparedElements.findIndex((item) => item.z === currentModalElement.z);
    if (selectedIndex >= 0) {
      comparedElements.splice(selectedIndex, 1);
    } else {
      if (comparedElements.length === 2) comparedElements.shift();
      comparedElements.push(currentModalElement);
    }
    renderComparison();
    updateComparisonButton();
  });

  document.getElementById("clearComparisonBtn")?.addEventListener("click", () => {
    comparedElements = [];
    renderComparison();
    updateComparisonButton();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeElementModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeElementModal();
    }

    if (event.key === "Tab" && modal.classList.contains("show")) {
      const focusable = [...modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

