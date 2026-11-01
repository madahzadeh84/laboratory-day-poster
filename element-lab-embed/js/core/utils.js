export function faNumber(value) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

export function normalizeSearchText(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک");
}

export function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function randomItem(array) {
  if (!array.length) {
    return undefined;
  }

  return array[Math.floor(Math.random() * array.length)];
}

export function sample(array, count) {
  return shuffle(array).slice(0, count);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

