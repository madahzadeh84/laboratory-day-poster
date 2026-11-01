const RAW_ELEMENTS = [
  [1, "H", "هیدروژن", "Hydrogen", 1, 1, "nonmetal"],
  [2, "He", "هلیوم", "Helium", 18, 1, "noble"],

  [3, "Li", "لیتیوم", "Lithium", 1, 2, "alkali"],
  [4, "Be", "بریلیم", "Beryllium", 2, 2, "alkaline"],
  [5, "B", "بور", "Boron", 13, 2, "metalloid"],
  [6, "C", "کربن", "Carbon", 14, 2, "nonmetal"],
  [7, "N", "نیتروژن", "Nitrogen", 15, 2, "nonmetal"],
  [8, "O", "اکسیژن", "Oxygen", 16, 2, "nonmetal"],
  [9, "F", "فلوئور", "Fluorine", 17, 2, "halogen"],
  [10, "Ne", "نئون", "Neon", 18, 2, "noble"],

  [11, "Na", "سدیم", "Sodium", 1, 3, "alkali"],
  [12, "Mg", "منیزیم", "Magnesium", 2, 3, "alkaline"],
  [13, "Al", "آلومینیوم", "Aluminium", 13, 3, "post-transition"],
  [14, "Si", "سیلیسیم", "Silicon", 14, 3, "metalloid"],
  [15, "P", "فسفر", "Phosphorus", 15, 3, "nonmetal"],
  [16, "S", "گوگرد", "Sulfur", 16, 3, "nonmetal"],
  [17, "Cl", "کلر", "Chlorine", 17, 3, "halogen"],
  [18, "Ar", "آرگون", "Argon", 18, 3, "noble"],

  [19, "K", "پتاسیم", "Potassium", 1, 4, "alkali"],
  [20, "Ca", "کلسیم", "Calcium", 2, 4, "alkaline"],
  [21, "Sc", "اسکاندیم", "Scandium", 3, 4, "transition"],
  [22, "Ti", "تیتانیم", "Titanium", 4, 4, "transition"],
  [23, "V", "وانادیم", "Vanadium", 5, 4, "transition"],
  [24, "Cr", "کروم", "Chromium", 6, 4, "transition"],
  [25, "Mn", "منگنز", "Manganese", 7, 4, "transition"],
  [26, "Fe", "آهن", "Iron", 8, 4, "transition"],
  [27, "Co", "کبالت", "Cobalt", 9, 4, "transition"],
  [28, "Ni", "نیکل", "Nickel", 10, 4, "transition"],
  [29, "Cu", "مس", "Copper", 11, 4, "transition"],
  [30, "Zn", "روی", "Zinc", 12, 4, "transition"],
  [31, "Ga", "گالیم", "Gallium", 13, 4, "post-transition"],
  [32, "Ge", "ژرمانیم", "Germanium", 14, 4, "metalloid"],
  [33, "As", "آرسنیک", "Arsenic", 15, 4, "metalloid"],
  [34, "Se", "سلنیوم", "Selenium", 16, 4, "nonmetal"],
  [35, "Br", "برم", "Bromine", 17, 4, "halogen"],
  [36, "Kr", "کریپتون", "Krypton", 18, 4, "noble"],

  [37, "Rb", "روبیدیم", "Rubidium", 1, 5, "alkali"],
  [38, "Sr", "استرانسیم", "Strontium", 2, 5, "alkaline"],
  [39, "Y", "ایتریم", "Yttrium", 3, 5, "transition"],
  [40, "Zr", "زیرکونیم", "Zirconium", 4, 5, "transition"],
  [41, "Nb", "نیوبیم", "Niobium", 5, 5, "transition"],
  [42, "Mo", "مولیبدن", "Molybdenum", 6, 5, "transition"],
  [43, "Tc", "تکنسیم", "Technetium", 7, 5, "transition"],
  [44, "Ru", "روتنیم", "Ruthenium", 8, 5, "transition"],
  [45, "Rh", "رودیم", "Rhodium", 9, 5, "transition"],
  [46, "Pd", "پالادیم", "Palladium", 10, 5, "transition"],
  [47, "Ag", "نقره", "Silver", 11, 5, "transition"],
  [48, "Cd", "کادمیم", "Cadmium", 12, 5, "transition"],
  [49, "In", "ایندیم", "Indium", 13, 5, "post-transition"],
  [50, "Sn", "قلع", "Tin", 14, 5, "post-transition"],
  [51, "Sb", "آنتیموان", "Antimony", 15, 5, "metalloid"],
  [52, "Te", "تلوریم", "Tellurium", 16, 5, "metalloid"],
  [53, "I", "ید", "Iodine", 17, 5, "halogen"],
  [54, "Xe", "زنون", "Xenon", 18, 5, "noble"],

  [55, "Cs", "سزیم", "Caesium", 1, 6, "alkali"],
  [56, "Ba", "باریم", "Barium", 2, 6, "alkaline"],

  [57, "La", "لانتان", "Lanthanum", 3, 6, "lanthanide"],
  [58, "Ce", "سریم", "Cerium", 3, 6, "lanthanide"],
  [59, "Pr", "پرازئودیمیم", "Praseodymium", 3, 6, "lanthanide"],
  [60, "Nd", "نئودیمیم", "Neodymium", 3, 6, "lanthanide"],
  [61, "Pm", "پرومتیم", "Promethium", 3, 6, "lanthanide"],
  [62, "Sm", "ساماریم", "Samarium", 3, 6, "lanthanide"],
  [63, "Eu", "یوروپیم", "Europium", 3, 6, "lanthanide"],
  [64, "Gd", "گادولینیم", "Gadolinium", 3, 6, "lanthanide"],
  [65, "Tb", "تربیم", "Terbium", 3, 6, "lanthanide"],
  [66, "Dy", "دیسپروزیم", "Dysprosium", 3, 6, "lanthanide"],
  [67, "Ho", "هولمیم", "Holmium", 3, 6, "lanthanide"],
  [68, "Er", "اربیوم", "Erbium", 3, 6, "lanthanide"],
  [69, "Tm", "تولیم", "Thulium", 3, 6, "lanthanide"],
  [70, "Yb", "ایتربیم", "Ytterbium", 3, 6, "lanthanide"],
  [71, "Lu", "لوتتیم", "Lutetium", 3, 6, "lanthanide"],

  [72, "Hf", "هافنیم", "Hafnium", 4, 6, "transition"],
  [73, "Ta", "تانتال", "Tantalum", 5, 6, "transition"],
  [74, "W", "تنگستن", "Tungsten", 6, 6, "transition"],
  [75, "Re", "رنیم", "Rhenium", 7, 6, "transition"],
  [76, "Os", "اسمیم", "Osmium", 8, 6, "transition"],
  [77, "Ir", "ایریدیم", "Iridium", 9, 6, "transition"],
  [78, "Pt", "پلاتین", "Platinum", 10, 6, "transition"],
  [79, "Au", "طلا", "Gold", 11, 6, "transition"],
  [80, "Hg", "جیوه", "Mercury", 12, 6, "transition"],
  [81, "Tl", "تالیم", "Thallium", 13, 6, "post-transition"],
  [82, "Pb", "سرب", "Lead", 14, 6, "post-transition"],
  [83, "Bi", "بیسموت", "Bismuth", 15, 6, "post-transition"],
  [84, "Po", "پولونیم", "Polonium", 16, 6, "post-transition"],
  [85, "At", "آستاتین", "Astatine", 17, 6, "halogen"],
  [86, "Rn", "رادون", "Radon", 18, 6, "noble"],

  [87, "Fr", "فرانسیم", "Francium", 1, 7, "alkali"],
  [88, "Ra", "رادیم", "Radium", 2, 7, "alkaline"],

  [89, "Ac", "اکتینیم", "Actinium", 3, 7, "actinide"],
  [90, "Th", "توریم", "Thorium", 3, 7, "actinide"],
  [91, "Pa", "پروتاکتینیم", "Protactinium", 3, 7, "actinide"],
  [92, "U", "اورانیوم", "Uranium", 3, 7, "actinide"],
  [93, "Np", "نپتونیم", "Neptunium", 3, 7, "actinide"],
  [94, "Pu", "پلوتونیم", "Plutonium", 3, 7, "actinide"],
  [95, "Am", "آمریسیم", "Americium", 3, 7, "actinide"],
  [96, "Cm", "کوریم", "Curium", 3, 7, "actinide"],
  [97, "Bk", "برکلیم", "Berkelium", 3, 7, "actinide"],
  [98, "Cf", "کالیفرنیم", "Californium", 3, 7, "actinide"],
  [99, "Es", "اینشتینیم", "Einsteinium", 3, 7, "actinide"],
  [100, "Fm", "فرمیم", "Fermium", 3, 7, "actinide"],
  [101, "Md", "مندلیفیم", "Mendelevium", 3, 7, "actinide"],
  [102, "No", "نوبلیم", "Nobelium", 3, 7, "actinide"],
  [103, "Lr", "لارنسیم", "Lawrencium", 3, 7, "actinide"],

  [104, "Rf", "رادرفوردیم", "Rutherfordium", 4, 7, "transition"],
  [105, "Db", "دوبنیم", "Dubnium", 5, 7, "transition"],
  [106, "Sg", "سیبورگیم", "Seaborgium", 6, 7, "transition"],
  [107, "Bh", "بوهریم", "Bohrium", 7, 7, "transition"],
  [108, "Hs", "هاسیم", "Hassium", 8, 7, "transition"],
  [109, "Mt", "مایتنریم", "Meitnerium", 9, 7, "unknown"],
  [110, "Ds", "دارمشتاتیم", "Darmstadtium", 10, 7, "unknown"],
  [111, "Rg", "رونتگنیم", "Roentgenium", 11, 7, "unknown"],
  [112, "Cn", "کوپرنیسیم", "Copernicium", 12, 7, "transition"],
  [113, "Nh", "نیهونیم", "Nihonium", 13, 7, "unknown"],
  [114, "Fl", "فلروویم", "Flerovium", 14, 7, "unknown"],
  [115, "Mc", "مسکوویم", "Moscovium", 15, 7, "unknown"],
  [116, "Lv", "لیورموریم", "Livermorium", 16, 7, "unknown"],
  [117, "Ts", "تنسین", "Tennessine", 17, 7, "halogen"],
  [118, "Og", "اوگانسون", "Oganesson", 18, 7, "noble"],
];

export const ELEMENTS = RAW_ELEMENTS.map(
  ([z, symbol, name, en, group, period, category]) => ({
    z,
    symbol,
    name,
    en,
    group,
    period,
    category,
  }),
);

export const CATEGORY_LABELS = {
  alkali: "فلز قلیایی",

  alkaline: "فلز قلیایی خاکی",

  transition: "فلز واسطه",

  "post-transition": "فلز پس‌واسطه",

  metalloid: "شبه‌فلز",

  nonmetal: "نافلز",

  halogen: "هالوژن",

  noble: "گاز نجیب",

  lanthanide: "لانتانید",

  actinide: "اکتینید",

  unknown: "ویژگی‌های نامشخص",
};

const MASS_NUMBERS = {
  1: 1,
  2: 4,
  3: 7,
  4: 9,
  5: 11,
  6: 12,
  7: 14,
  8: 16,
  9: 19,
  10: 20,

  11: 23,
  12: 24,
  13: 27,
  14: 28,
  15: 31,
  16: 32,
  17: 35,
  18: 40,
  19: 39,
  20: 40,
};

export function getMassNumber(element) {
  return MASS_NUMBERS[element.z] ?? null;
}

export function getCommonIonCharge(element) {
  if (element.symbol === "H") {
    return 1;
  }

  if (element.symbol === "B") {
    return null;
  }

  switch (element.group) {
    case 1:
      return 1;

    case 2:
      return 2;

    case 13:
      return 3;

    case 15:
      return -3;

    case 16:
      return -2;

    case 17:
      return -1;

    case 18:
      return 0;

    default:
      return null;
  }
}

export const ELECTRONEGATIVITY = {
  H: 2.2,

  Li: 0.98,
  Be: 1.57,
  B: 2.04,
  C: 2.55,
  N: 3.04,
  O: 3.44,
  F: 3.98,

  Na: 0.93,
  Mg: 1.31,
  Al: 1.61,
  Si: 1.9,
  P: 2.19,
  S: 2.58,
  Cl: 3.16,

  K: 0.82,
  Ca: 1.0,

  Sc: 1.36,
  Ti: 1.54,
  V: 1.63,
  Cr: 1.66,
  Mn: 1.55,
  Fe: 1.83,
  Co: 1.88,
  Ni: 1.91,
  Cu: 1.9,
  Zn: 1.65,

  Ga: 1.81,
  Ge: 2.01,
  As: 2.18,
  Se: 2.55,
  Br: 2.96,

  Rb: 0.82,
  Sr: 0.95,
  I: 2.66,
};

