import type { Density, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";
import * as Logic from "../logic/logic.ts";

import { LETTERS, LOWERCASE_LETTERS, UPPERCASE_LETTERS } from "../constants.ts";
import UnicodeRanges from "../../data/unicode_ranges.json" with {
  type: "json",
};

/**
 * Construct a string from a wrapped substring and wrapped string-length
 *
 * @param val A wrapped substring
 * @param size A wrapped integer that represents the length of the string
 *
 * @returns A thunk that returns a string with the chosen number of substrings
 *   determined by the val fuzzer
 */
export function from(
  val: Wrapped<string>,
  size: Wrapped<number>,
): Thunk<string> {
  return (): string => {
    const parts: string[] = [];
    const tgt = unwrap(size);

    for (let idx = 0; idx < tgt; idx++) {
      parts.push(unwrap(val));
    }

    return parts.join("");
  };
}

/*
 * Construct a joined string from a separator and several wrapped substrings
 *
 * @param separator A wrapped string to use as a separator
 * @param elems A list of wrapped substrings to join
 *
 * @returns A thunk that returns a string with the chosen substrings joined
 *   by the separator
 */
export function join(
  separator: Wrapped<string>,
  ...elems: Wrapped<string>[]
) {
  return (): string => {
    const sep = unwrap(separator);
    const parts: string[] = elems.map((elem) => unwrap(elem));

    return parts.join(sep);
  };
}

/**
 * Return a random digit
 *
 * @param density A discrete density function that determines the probability of a particular digit being chosen
 *
 * @returns A thunk that returns a random digit
 */
export function digit(density: Density) {
  return (): string => {
    return `${unwrap(density(0, 10))}`;
  };
}

/**
 * Return a random non-zero digit
 *
 * @param density A discrete density function that determines the probability of a particular digit being chosen
 *
 * @returns A thunk that returns a random non-zero digit
 */
export function nonZeroDigit(density: Density) {
  return (): string => {
    return `${unwrap(density(1, 10))}`;
  };
}

/**
 * A fuzzer that always returns the unix newline
 */
export function unixNewline() {
  return () => `\n`;
}

/**
 * A fuzzer that always returns the windows newline
 */
export function windowsNewline() {
  return () => `\r\n`;
}

/**
 * A fuzzer that returns an OS newline
 *
 *  @param density A discrete density function that determines the probability of a particular newline being chosen
 *
 * @returns A thunk that returns a random newline
 */
export function newline(density: Density): Thunk<string> {
  return () => {
    return Logic.oneOf(density, ["\n", "\r\n"])();
  };
}

/**
 * A fuzzer that always returns a space
 */
export function space(): Thunk<string> {
  return () => " ";
}

/**
 * A fuzzer that always returns a tab
 */
export function tab(): Thunk<string> {
  return () => "\t";
}

/**
 * A fuzzer that always returns an hyphen
 */
export function hyphen(): Thunk<string> {
  return () => "-";
}

/**
 * A fuzzer that always returns an underscore
 */
export function underscore(): Thunk<string> {
  return () => "_";
}

/**
 * A fuzzer tha returns a lowercase latin letter
 *
 *  @param density A discrete density function that determines the probability of a particular letter being chosen
 *
 * @returns A thunk that returns a random letter
 */
export function lowercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LOWERCASE_LETTERS);
}

/**
 * A fuzzer tha returns an uppercase latin letter
 *
 *  @param density A discrete density function that determines the probability of a particular letter being chosen
 *
 * @returns A thunk that returns a random letter
 */
export function uppercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, UPPERCASE_LETTERS);
}

/**
 * A fuzzer tha returns a latin letter
 *
 *  @param density A discrete density function that determines the probability of a particular letter being chosen
 *
 * @returns A thunk that returns a random letter
 */
export function letters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LETTERS);
}

/**
 * Chain several fuzzers into a string
 *
 * @param elems A list of fuzzers
 *
 * @returns A thunk that returns an string of the results of each fuzzer
 */
export function concat(...strings: Wrapped<string>[]): Thunk<string> {
  return () => {
    return strings.map((str) => unwrap(str)).join("");
  };
}

type UnicodeCategoryData = {
  range: number[];
  hexrange: string[];
  category: string;
};

/*
 * fromCharCode fails for code-points above 0xFFFF
 *
 * @param codePt A code-point
 *
 * @returns A string representation of the code-point
 */
function fixedFromCharCode(codePt: number) {
  if (codePt > 0xFFFF) {
    codePt -= 0x10000;
    return String.fromCharCode(
      0xD800 + (codePt >> 10),
      0xDC00 + (codePt & 0x3FF),
    );
  } else {
    return String.fromCharCode(codePt);
  }
}

function unicodeCategory(category: string) {
  const data: UnicodeCategoryData | undefined = UnicodeRanges.find((range) => range.category === category);

  if (typeof data == "undefined") {
    throw new Error(`attempted to use unknown unicode category ${category}`);
  }
  const range = data.range;

  return function (density: Density) {
    return () => {
      const codePoint = unwrap(density(range[0], range[1]));

      return fixedFromCharCode(codePoint);
    };
  };
}

/**
 * A fuzzer that returns a random unicode character
 *
 * @param density A discrete density function that determines the probability of a particular character being chosen
 *
 * @returns A thunk that returns a random unicode character
 */
export function unicode(density: Density) {
  return () => {
    const codePoint = unwrap(density(0x0, 0x10FFFF));

    return fixedFromCharCode(codePoint);
  };
}

/**
 * These fuzzers generate unicode characters from each unicode block
 */
export const blocks = {
  controlCharacter: unicodeCategory("Control Character"),
  basicLatin: unicodeCategory("Basic Latin"),
  latin1Supplement: unicodeCategory("Latin-1 Supplement"),
  latinExtendedA: unicodeCategory("Latin Extended-A"),
  latinExtendedB: unicodeCategory("Latin Extended-B"),
  ipaExtensions: unicodeCategory("IPA Extensions"),
  spacingModifierLetters: unicodeCategory("Spacing Modifier Letters"),
  combiningDiacriticalMarks: unicodeCategory("Combining Diacritical Marks"),
  greekAndCoptic: unicodeCategory("Greek and Coptic"),
  cyrillic: unicodeCategory("Cyrillic"),
  cyrillicSupplement: unicodeCategory("Cyrillic Supplement"),
  armenian: unicodeCategory("Armenian"),
  hebrew: unicodeCategory("Hebrew"),
  arabic: unicodeCategory("Arabic"),
  syriac: unicodeCategory("Syriac"),
  arabicSupplement: unicodeCategory("Arabic Supplement"),
  thaana: unicodeCategory("Thaana"),
  nko: unicodeCategory("NKo"),
  samaritan: unicodeCategory("Samaritan"),
  mandaic: unicodeCategory("Mandaic"),
  arabicExtendedA: unicodeCategory("Arabic Extended-A"),
  devanagari: unicodeCategory("Devanagari"),
  bengali: unicodeCategory("Bengali"),
  gurmukhi: unicodeCategory("Gurmukhi"),
  gujarati: unicodeCategory("Gujarati"),
  oriya: unicodeCategory("Oriya"),
  tamil: unicodeCategory("Tamil"),
  telugu: unicodeCategory("Telugu"),
  kannada: unicodeCategory("Kannada"),
  malayalam: unicodeCategory("Malayalam"),
  sinhala: unicodeCategory("Sinhala"),
  thai: unicodeCategory("Thai"),
  lao: unicodeCategory("Lao"),
  tibetan: unicodeCategory("Tibetan"),
  myanmar: unicodeCategory("Myanmar"),
  georgian: unicodeCategory("Georgian"),
  hangulJamo: unicodeCategory("Hangul Jamo"),
  ethiopic: unicodeCategory("Ethiopic"),
  ethiopicSupplement: unicodeCategory("Ethiopic Supplement"),
  cherokee: unicodeCategory("Cherokee"),
  unifiedCanadianAboriginalSyllabics: unicodeCategory(
    "Unified Canadian Aboriginal Syllabics",
  ),
  ogham: unicodeCategory("Ogham"),
  runic: unicodeCategory("Runic"),
  tagalog: unicodeCategory("Tagalog"),
  hanunoo: unicodeCategory("Hanunoo"),
  buhid: unicodeCategory("Buhid"),
  tagbanwa: unicodeCategory("Tagbanwa"),
  khmer: unicodeCategory("Khmer"),
  mongolian: unicodeCategory("Mongolian"),
  unifiedCanadianAboriginalSyllabicsExtended: unicodeCategory(
    "Unified Canadian Aboriginal Syllabics Extended",
  ),
  limbu: unicodeCategory("Limbu"),
  taiLe: unicodeCategory("Tai Le"),
  newTaiLue: unicodeCategory("New Tai Lue"),
  khmerSymbols: unicodeCategory("Khmer Symbols"),
  buginese: unicodeCategory("Buginese"),
  taiTham: unicodeCategory("Tai Tham"),
  combiningDiacriticalMarksExtended: unicodeCategory(
    "Combining Diacritical Marks Extended",
  ),
  balinese: unicodeCategory("Balinese"),
  sundanese: unicodeCategory("Sundanese"),
  batak: unicodeCategory("Batak"),
  lepcha: unicodeCategory("Lepcha"),
  olChiki: unicodeCategory("Ol Chiki"),
  sundaneseSupplement: unicodeCategory("Sundanese Supplement"),
  vedicExtensions: unicodeCategory("Vedic Extensions"),
  phoneticExtensions: unicodeCategory("Phonetic Extensions"),
  phoneticExtensionsSupplement: unicodeCategory(
    "Phonetic Extensions Supplement",
  ),
  combiningDiacriticalMarksSupplement: unicodeCategory(
    "Combining Diacritical Marks Supplement",
  ),
  latinExtendedAdditional: unicodeCategory("Latin Extended Additional"),
  greekExtended: unicodeCategory("Greek Extended"),
  generalPunctuation: unicodeCategory("General Punctuation"),
  superscriptsAndSubscripts: unicodeCategory("Superscripts and Subscripts"),
  currencySymbols: unicodeCategory("Currency Symbols"),
  combiningDiacriticalMarksForSymbols: unicodeCategory(
    "Combining Diacritical Marks for Symbols",
  ),
  letterlikeSymbols: unicodeCategory("Letterlike Symbols"),
  numberForms: unicodeCategory("Number Forms"),
  arrows: unicodeCategory("Arrows"),
  mathematicalOperators: unicodeCategory("Mathematical Operators"),
  miscellaneousTechnical: unicodeCategory("Miscellaneous Technical"),
  controlPictures: unicodeCategory("Control Pictures"),
  opticalCharacterRecognition: unicodeCategory("Optical Character Recognition"),
  enclosedAlphanumerics: unicodeCategory("Enclosed Alphanumerics"),
  boxDrawing: unicodeCategory("Box Drawing"),
  blockElements: unicodeCategory("Block Elements"),
  geometricShapes: unicodeCategory("Geometric Shapes"),
  miscellaneousSymbols: unicodeCategory("Miscellaneous Symbols"),
  dingbats: unicodeCategory("Dingbats"),
  miscellaneousMathematicalSymbolsA: unicodeCategory(
    "Miscellaneous Mathematical Symbols-A",
  ),
  supplementalArrowsA: unicodeCategory("Supplemental Arrows-A"),
  braillePatterns: unicodeCategory("Braille Patterns"),
  supplementalArrowsB: unicodeCategory("Supplemental Arrows-B"),
  miscellaneousMathematicalSymbolsB: unicodeCategory(
    "Miscellaneous Mathematical Symbols-B",
  ),
  supplementalMathematicalOperators: unicodeCategory(
    "Supplemental Mathematical Operators",
  ),
  miscellaneousSymbolsAndArrows: unicodeCategory(
    "Miscellaneous Symbols and Arrows",
  ),
  glagolitic: unicodeCategory("Glagolitic"),
  latinExtendedC: unicodeCategory("Latin Extended-C"),
  coptic: unicodeCategory("Coptic"),
  georgianSupplement: unicodeCategory("Georgian Supplement"),
  tifinagh: unicodeCategory("Tifinagh"),
  ethiopicExtended: unicodeCategory("Ethiopic Extended"),
  cyrillicExtendedA: unicodeCategory("Cyrillic Extended-A"),
  supplementalPunctuation: unicodeCategory("Supplemental Punctuation"),
  cJKRadicalsSupplement: unicodeCategory("CJK Radicals Supplement"),
  kangxiRadicals: unicodeCategory("Kangxi Radicals"),
  ideographicDescriptionCharacters: unicodeCategory(
    "Ideographic Description Characters",
  ),
  cJKSymbolsAndPunctuation: unicodeCategory("CJK Symbols and Punctuation"),
  hiragana: unicodeCategory("Hiragana"),
  katakana: unicodeCategory("Katakana"),
  bopomofo: unicodeCategory("Bopomofo"),
  hangulCompatibilityJamo: unicodeCategory("Hangul Compatibility Jamo"),
  kanbun: unicodeCategory("Kanbun"),
  bopomofoExtended: unicodeCategory("Bopomofo Extended"),
  cJKStrokes: unicodeCategory("CJK Strokes"),
  katakanaPhoneticExtensions: unicodeCategory("Katakana Phonetic Extensions"),
  enclosedCJKLettersAndMonths: unicodeCategory(
    "Enclosed CJK Letters and Months",
  ),
  cJKCompatibility: unicodeCategory("CJK Compatibility"),
  cJKUnifiedIdeographsExtensionA: unicodeCategory(
    "CJK Unified Ideographs Extension A",
  ),
  yijingHexagramSymbols: unicodeCategory("Yijing Hexagram Symbols"),
  cJKUnifiedIdeographs: unicodeCategory("CJK Unified Ideographs"),
  yiSyllables: unicodeCategory("Yi Syllables"),
  yiRadicals: unicodeCategory("Yi Radicals"),
  lisu: unicodeCategory("Lisu"),
  vai: unicodeCategory("Vai"),
  cyrillicExtendedB: unicodeCategory("Cyrillic Extended-B"),
  bamum: unicodeCategory("Bamum"),
  modifierToneLetters: unicodeCategory("Modifier Tone Letters"),
  latinExtendedD: unicodeCategory("Latin Extended-D"),
  sylotiNagri: unicodeCategory("Syloti Nagri"),
  commonIndicNumberForms: unicodeCategory("Common Indic Number Forms"),
  phagsPa: unicodeCategory("Phags-pa"),
  saurashtra: unicodeCategory("Saurashtra"),
  devanagariExtended: unicodeCategory("Devanagari Extended"),
  kayahLi: unicodeCategory("Kayah Li"),
  rejang: unicodeCategory("Rejang"),
  hangulJamoExtendedA: unicodeCategory("Hangul Jamo Extended-A"),
  javanese: unicodeCategory("Javanese"),
  myanmarExtendedB: unicodeCategory("Myanmar Extended-B"),
  cham: unicodeCategory("Cham"),
  myanmarExtendedA: unicodeCategory("Myanmar Extended-A"),
  taiViet: unicodeCategory("Tai Viet"),
  meeteiMayekExtensions: unicodeCategory("Meetei Mayek Extensions"),
  ethiopicExtendedA: unicodeCategory("Ethiopic Extended-A"),
  latinExtendedE: unicodeCategory("Latin Extended-E"),
  cherokeeSupplement: unicodeCategory("Cherokee Supplement"),
  meeteiMayek: unicodeCategory("Meetei Mayek"),
  hangulSyllables: unicodeCategory("Hangul Syllables"),
  hangulJamoExtendedB: unicodeCategory("Hangul Jamo Extended-B"),
  highSurrogates: unicodeCategory("High Surrogates"),
  highPrivateUseSurrogates: unicodeCategory("High Private Use Surrogates"),
  lowSurrogates: unicodeCategory("Low Surrogates"),
  privateUseArea: unicodeCategory("Private Use Area"),
  cJKCompatibilityIdeographs: unicodeCategory("CJK Compatibility Ideographs"),
  alphabeticPresentationForms: unicodeCategory("Alphabetic Presentation Forms"),
  arabicPresentationFormsA: unicodeCategory("Arabic Presentation Forms-A"),
  variationSelectors: unicodeCategory("Variation Selectors"),
  verticalForms: unicodeCategory("Vertical Forms"),
  combiningHalfMarks: unicodeCategory("Combining Half Marks"),
  cJKCompatibilityForms: unicodeCategory("CJK Compatibility Forms"),
  smallFormVariants: unicodeCategory("Small Form Variants"),
  arabicPresentationFormsB: unicodeCategory("Arabic Presentation Forms-B"),
  halfwidthAndFullwidthForms: unicodeCategory("Halfwidth and Fullwidth Forms"),
  specials: unicodeCategory("Specials"),
  linearBSyllabary: unicodeCategory("Linear B Syllabary"),
  linearBIdeograms: unicodeCategory("Linear B Ideograms"),
  aegeanNumbers: unicodeCategory("Aegean Numbers"),
  ancientGreekNumbers: unicodeCategory("Ancient Greek Numbers"),
  ancientSymbols: unicodeCategory("Ancient Symbols"),
  phaistosDisc: unicodeCategory("Phaistos Disc"),
  lycian: unicodeCategory("Lycian"),
  carian: unicodeCategory("Carian"),
  copticEpactNumbers: unicodeCategory("Coptic Epact Numbers"),
  oldItalic: unicodeCategory("Old Italic"),
  gothic: unicodeCategory("Gothic"),
  oldPermic: unicodeCategory("Old Permic"),
  ugaritic: unicodeCategory("Ugaritic"),
  oldPersian: unicodeCategory("Old Persian"),
  deseret: unicodeCategory("Deseret"),
  shavian: unicodeCategory("Shavian"),
  osmanya: unicodeCategory("Osmanya"),
  elbasan: unicodeCategory("Elbasan"),
  caucasianAlbanian: unicodeCategory("Caucasian Albanian"),
  linearA: unicodeCategory("Linear A"),
  cypriotSyllabary: unicodeCategory("Cypriot Syllabary"),
  imperialAramaic: unicodeCategory("Imperial Aramaic"),
  palmyrene: unicodeCategory("Palmyrene"),
  nabataean: unicodeCategory("Nabataean"),
  hatran: unicodeCategory("Hatran"),
  phoenician: unicodeCategory("Phoenician"),
  lydian: unicodeCategory("Lydian"),
  meroiticHieroglyphs: unicodeCategory("Meroitic Hieroglyphs"),
  meroiticCursive: unicodeCategory("Meroitic Cursive"),
  kharoshthi: unicodeCategory("Kharoshthi"),
  oldSouthArabian: unicodeCategory("Old South Arabian"),
  oldNorthArabian: unicodeCategory("Old North Arabian"),
  manichaean: unicodeCategory("Manichaean"),
  avestan: unicodeCategory("Avestan"),
  inscriptionalParthian: unicodeCategory("Inscriptional Parthian"),
  inscriptionalPahlavi: unicodeCategory("Inscriptional Pahlavi"),
  psalterPahlavi: unicodeCategory("Psalter Pahlavi"),
  oldTurkic: unicodeCategory("Old Turkic"),
  oldHungarian: unicodeCategory("Old Hungarian"),
  rumiNumeralSymbols: unicodeCategory("Rumi Numeral Symbols"),
  brahmi: unicodeCategory("Brahmi"),
  kaithi: unicodeCategory("Kaithi"),
  soraSompeng: unicodeCategory("Sora Sompeng"),
  chakma: unicodeCategory("Chakma"),
  mahajani: unicodeCategory("Mahajani"),
  sharada: unicodeCategory("Sharada"),
  sinhalaArchaicNumbers: unicodeCategory("Sinhala Archaic Numbers"),
  khojki: unicodeCategory("Khojki"),
  multani: unicodeCategory("Multani"),
  khudawadi: unicodeCategory("Khudawadi"),
  grantha: unicodeCategory("Grantha"),
  tirhuta: unicodeCategory("Tirhuta"),
  siddham: unicodeCategory("Siddham"),
  modi: unicodeCategory("Modi"),
  takri: unicodeCategory("Takri"),
  ahom: unicodeCategory("Ahom"),
  warangCiti: unicodeCategory("Warang Citi"),
  pauCinHau: unicodeCategory("Pau Cin Hau"),
  cuneiform: unicodeCategory("Cuneiform"),
  cuneiformNumbersAndPunctuation: unicodeCategory(
    "Cuneiform Numbers and Punctuation",
  ),
  earlyDynasticCuneiform: unicodeCategory("Early Dynastic Cuneiform"),
  egyptianHieroglyphs: unicodeCategory("Egyptian Hieroglyphs"),
  anatolianHieroglyphs: unicodeCategory("Anatolian Hieroglyphs"),
  bamumSupplement: unicodeCategory("Bamum Supplement"),
  mro: unicodeCategory("Mro"),
  bassaVah: unicodeCategory("Bassa Vah"),
  pahawhHmong: unicodeCategory("Pahawh Hmong"),
  miao: unicodeCategory("Miao"),
  kanaSupplement: unicodeCategory("Kana Supplement"),
  duployan: unicodeCategory("Duployan"),
  shorthandFormatControls: unicodeCategory("Shorthand Format Controls"),
  byzantineMusicalSymbols: unicodeCategory("Byzantine Musical Symbols"),
  musicalSymbols: unicodeCategory("Musical Symbols"),
  ancientGreekMusicalNotation: unicodeCategory(
    "Ancient Greek Musical Notation",
  ),
  taiXuanJingSymbols: unicodeCategory("Tai Xuan Jing Symbols"),
  countingRodNumerals: unicodeCategory("Counting Rod Numerals"),
  mathematicalAlphanumericSymbols: unicodeCategory(
    "Mathematical Alphanumeric Symbols",
  ),
  suttonSignWriting: unicodeCategory("Sutton SignWriting"),
  mendekikak: unicodeCategory("Mende Kikakui"),
  arabicMathematicalAlphabeticSymbols: unicodeCategory(
    "Arabic Mathematical Alphabetic Symbols",
  ),
  mahjongTiles: unicodeCategory("Mahjong Tiles"),
  dominoTiles: unicodeCategory("Domino Tiles"),
  playingCards: unicodeCategory("Playing Cards"),
  enclosedAlphanumericSupplement: unicodeCategory(
    "Enclosed Alphanumeric Supplement",
  ),
  enclosedIdeographicSupplement: unicodeCategory(
    "Enclosed Ideographic Supplement",
  ),
  miscellaneousSymbolsAndPictographs: unicodeCategory(
    "Miscellaneous Symbols and Pictographs",
  ),
  emoticons: unicodeCategory("Emoticons (Emoji)"),
  ornamentalDingbats: unicodeCategory("Ornamental Dingbats"),
  transportAndMapSymbols: unicodeCategory("Transport and Map Symbols"),
  alchemicalSymbols: unicodeCategory("Alchemical Symbols"),
  geometricShapesExtended: unicodeCategory("Geometric Shapes Extended"),
  supplementalArrowsC: unicodeCategory("Supplemental Arrows-C"),
  supplementalSymbolsAndPictographs: unicodeCategory(
    "Supplemental Symbols and Pictographs",
  ),
};

export const categories = {};
