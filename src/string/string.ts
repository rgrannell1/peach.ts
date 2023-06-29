import type { Density, Thunk, Wrapped } from "../types.ts";
import { unwrap } from "../types.ts";
import * as Logic from "../logic/logic.ts";

import { LETTERS, LOWERCASE_LETTERS, UPPERCASE_LETTERS } from "../constants.ts";

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

export function digit(density: Density) {
  return (): string => {
    return `${unwrap(density(0, 10))}`;
  };
}

export function nonZeroDigit(density: Density) {
  return (): string => {
    return `${unwrap(density(1, 10))}`;
  };
}

export function unixNewline() {
  return () => `\n`;
}

export function windowsNewline() {
  return () => `\r\n`;
}

export function newline(density: Density): Thunk<string> {
  return () => {
    return Logic.oneOf(density, ["\n", "\r\n"])();
  };
}

export function space(): Thunk<string> {
  return () => " ";
}
export function tab(): Thunk<string> {
  return () => "\t";
}

export function hyphen(): Thunk<string> {
  return () => "-";
}

export function underscore(): Thunk<string> {
  return () => "_";
}

export function lowercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LOWERCASE_LETTERS);
}

export function uppercaseLetters(density: Density): Thunk<string> {
  return Logic.oneOf(density, UPPERCASE_LETTERS);
}

export function letters(density: Density): Thunk<string> {
  return Logic.oneOf(density, LETTERS);
}

export function concat(...strings: Wrapped<string>[]): Thunk<string> {
  return () => {
    return strings.map(str => unwrap(str)).join("");
  };
}

import UnicodeRanges from "https://raw.githubusercontent.com/radiovisual/unicode-range-json/master/unicode-ranges.json" assert {
  type: 'json'
}

type UnicodeCategoryData = {
  range: number[],
  hexrange: string[]
  category: string
}

function UnicodeCategory(category: string) {
  const data:UnicodeCategoryData | undefined = UnicodeRanges.find(range => range.category === category);

  if (typeof data == 'undefined') {
    throw new Error(`attempted to use unknown unicode category ${category}`);
  }
  const range = data.range

  return function(density: Density) {
    return () => {
      const codePoint = unwrap(density(range[0], range[1]))

      return String.fromCharCode(codePoint)
    }
  }
}

export const blocks = {
  controlCharacter: UnicodeCategory("Control Character"),
  basicLatin: UnicodeCategory("Basic Latin"),
  latin1Supplement: UnicodeCategory("Latin-1 Supplement"),
  latinExtendedA: UnicodeCategory("Latin Extended-A"),
  latinExtendedB: UnicodeCategory("Latin Extended-B"),
  ipaExtensions: UnicodeCategory("IPA Extensions"),
  spacingModifierLetters: UnicodeCategory("Spacing Modifier Letters"),
  combiningDiacriticalMarks: UnicodeCategory("Combining Diacritical Marks"),
  greekAndCoptic: UnicodeCategory("Greek and Coptic"),
  cyrillic: UnicodeCategory("Cyrillic"),
  cyrillicSupplement: UnicodeCategory("Cyrillic Supplement"),
  armenian: UnicodeCategory("Armenian"),
  hebrew: UnicodeCategory("Hebrew"),
  arabic: UnicodeCategory("Arabic"),
  syriac: UnicodeCategory("Syriac"),
  arabicSupplement: UnicodeCategory("Arabic Supplement"),
  thaana: UnicodeCategory("Thaana"),
  nko: UnicodeCategory("NKo"),
  samaritan: UnicodeCategory("Samaritan"),
  mandaic: UnicodeCategory("Mandaic"),
  arabicExtendedA: UnicodeCategory("Arabic Extended-A"),
  devanagari: UnicodeCategory("Devanagari"),
  bengali: UnicodeCategory("Bengali"),
  gurmukhi: UnicodeCategory("Gurmukhi"),
  gujarati: UnicodeCategory("Gujarati"),
  oriya: UnicodeCategory("Oriya"),
  tamil: UnicodeCategory("Tamil"),
  telugu: UnicodeCategory("Telugu"),
  kannada: UnicodeCategory("Kannada"),
  malayalam: UnicodeCategory("Malayalam"),
  sinhala: UnicodeCategory("Sinhala"),
  thai: UnicodeCategory("Thai"),
  lao: UnicodeCategory("Lao"),
  tibetan: UnicodeCategory("Tibetan"),
  myanmar: UnicodeCategory("Myanmar"),
  georgian: UnicodeCategory("Georgian"),
  hangulJamo: UnicodeCategory("Hangul Jamo"),
  ethiopic: UnicodeCategory("Ethiopic"),
  ethiopicSupplement: UnicodeCategory("Ethiopic Supplement"),
  cherokee: UnicodeCategory("Cherokee"),
  unifiedCanadianAboriginalSyllabics: UnicodeCategory("Unified Canadian Aboriginal Syllabics"),
  ogham: UnicodeCategory("Ogham"),
  runic: UnicodeCategory("Runic"),
  tagalog: UnicodeCategory("Tagalog"),
  hanunoo: UnicodeCategory("Hanunoo"),
  buhid: UnicodeCategory("Buhid"),
  tagbanwa: UnicodeCategory("Tagbanwa"),
  khmer: UnicodeCategory("Khmer"),
  mongolian: UnicodeCategory("Mongolian"),
  unifiedCanadianAboriginalSyllabicsExtended: UnicodeCategory("Unified Canadian Aboriginal Syllabics Extended"),
  limbu: UnicodeCategory("Limbu"),
  taiLe: UnicodeCategory("Tai Le"),
  newTaiLue: UnicodeCategory("New Tai Lue"),
  khmerSymbols: UnicodeCategory("Khmer Symbols"),
  buginese: UnicodeCategory("Buginese"),
  taiTham: UnicodeCategory("Tai Tham"),
  combiningDiacriticalMarksExtended: UnicodeCategory("Combining Diacritical Marks Extended"),
  balinese: UnicodeCategory("Balinese"),
  sundanese: UnicodeCategory("Sundanese"),
  batak: UnicodeCategory("Batak"),
  lepcha: UnicodeCategory("Lepcha"),
  olChiki: UnicodeCategory("Ol Chiki"),
  sundaneseSupplement: UnicodeCategory("Sundanese Supplement"),
  vedicExtensions: UnicodeCategory("Vedic Extensions"),
  phoneticExtensions: UnicodeCategory("Phonetic Extensions"),
  phoneticExtensionsSupplement: UnicodeCategory("Phonetic Extensions Supplement"),
  combiningDiacriticalMarksSupplement: UnicodeCategory("Combining Diacritical Marks Supplement"),
  latinExtendedAdditional: UnicodeCategory("Latin Extended Additional"),
  greekExtended: UnicodeCategory("Greek Extended"),
  generalPunctuation: UnicodeCategory("General Punctuation"),
  superscriptsAndSubscripts: UnicodeCategory("Superscripts and Subscripts"),
  currencySymbols: UnicodeCategory("Currency Symbols"),
  combiningDiacriticalMarksForSymbols: UnicodeCategory("Combining Diacritical Marks for Symbols"),
  letterlikeSymbols: UnicodeCategory("Letterlike Symbols"),
  numberForms: UnicodeCategory("Number Forms"),
  arrows: UnicodeCategory("Arrows"),
  mathematicalOperators: UnicodeCategory("Mathematical Operators"),
  miscellaneousTechnical: UnicodeCategory("Miscellaneous Technical"),
  controlPictures: UnicodeCategory("Control Pictures"),
  opticalCharacterRecognition: UnicodeCategory("Optical Character Recognition"),
  enclosedAlphanumerics: UnicodeCategory("Enclosed Alphanumerics"),
  boxDrawing: UnicodeCategory("Box Drawing"),
  blockElements: UnicodeCategory("Block Elements"),
  geometricShapes: UnicodeCategory("Geometric Shapes"),
  miscellaneousSymbols: UnicodeCategory("Miscellaneous Symbols"),
  dingbats: UnicodeCategory("Dingbats"),
  miscellaneousMathematicalSymbolsA: UnicodeCategory("Miscellaneous Mathematical Symbols-A"),
  supplementalArrowsA: UnicodeCategory("Supplemental Arrows-A"),
  braillePatterns: UnicodeCategory("Braille Patterns"),
  supplementalArrowsB: UnicodeCategory("Supplemental Arrows-B"),
  miscellaneousMathematicalSymbolsB: UnicodeCategory("Miscellaneous Mathematical Symbols-B"),
  supplementalMathematicalOperators: UnicodeCategory("Supplemental Mathematical Operators"),
  miscellaneousSymbolsAndArrows: UnicodeCategory("Miscellaneous Symbols and Arrows"),
  glagolitic: UnicodeCategory("Glagolitic"),
  latinExtendedC: UnicodeCategory("Latin Extended-C"),
  coptic: UnicodeCategory("Coptic"),
  georgianSupplement: UnicodeCategory("Georgian Supplement"),
  tifinagh: UnicodeCategory("Tifinagh"),
  ethiopicExtended: UnicodeCategory("Ethiopic Extended"),
  cyrillicExtendedA: UnicodeCategory("Cyrillic Extended-A"),
  supplementalPunctuation: UnicodeCategory("Supplemental Punctuation"),
  cJKRadicalsSupplement: UnicodeCategory("CJK Radicals Supplement"),
  kangxiRadicals: UnicodeCategory("Kangxi Radicals"),
  ideographicDescriptionCharacters: UnicodeCategory("Ideographic Description Characters"),
  cJKSymbolsAndPunctuation: UnicodeCategory("CJK Symbols and Punctuation"),
  hiragana: UnicodeCategory("Hiragana"),
  katakana: UnicodeCategory("Katakana"),
  bopomofo: UnicodeCategory("Bopomofo"),
  hangulCompatibilityJamo: UnicodeCategory("Hangul Compatibility Jamo"),
  kanbun: UnicodeCategory("Kanbun"),
  bopomofoExtended: UnicodeCategory("Bopomofo Extended"),
  cJKStrokes: UnicodeCategory("CJK Strokes"),
  katakanaPhoneticExtensions: UnicodeCategory("Katakana Phonetic Extensions"),
  enclosedCJKLettersAndMonths: UnicodeCategory("Enclosed CJK Letters and Months"),
  cJKCompatibility: UnicodeCategory("CJK Compatibility"),
  cJKUnifiedIdeographsExtensionA: UnicodeCategory("CJK Unified Ideographs Extension A"),
  yijingHexagramSymbols: UnicodeCategory("Yijing Hexagram Symbols"),
  cJKUnifiedIdeographs: UnicodeCategory("CJK Unified Ideographs"),
  yiSyllables: UnicodeCategory("Yi Syllables"),
  yiRadicals: UnicodeCategory("Yi Radicals"),
  lisu: UnicodeCategory("Lisu"),
  vai: UnicodeCategory("Vai"),
  cyrillicExtendedB: UnicodeCategory("Cyrillic Extended-B"),
  bamum: UnicodeCategory("Bamum"),
  modifierToneLetters: UnicodeCategory("Modifier Tone Letters"),
  latinExtendedD: UnicodeCategory("Latin Extended-D"),
  sylotiNagri: UnicodeCategory("Syloti Nagri"),
  commonIndicNumberForms: UnicodeCategory("Common Indic Number Forms"),
  phagsPa: UnicodeCategory("Phags-pa"),
  saurashtra: UnicodeCategory("Saurashtra"),
  devanagariExtended: UnicodeCategory("Devanagari Extended"),
  kayahLi: UnicodeCategory("Kayah Li"),
  rejang: UnicodeCategory("Rejang"),
  hangulJamoExtendedA: UnicodeCategory("Hangul Jamo Extended-A"),
  javanese: UnicodeCategory("Javanese"),
  myanmarExtendedB: UnicodeCategory("Myanmar Extended-B"),
  cham: UnicodeCategory("Cham"),
  myanmarExtendedA: UnicodeCategory("Myanmar Extended-A"),
  taiViet: UnicodeCategory("Tai Viet"),
  meeteiMayekExtensions: UnicodeCategory("Meetei Mayek Extensions"),
  ethiopicExtendedA: UnicodeCategory("Ethiopic Extended-A"),
  latinExtendedE: UnicodeCategory("Latin Extended-E"),
  cherokeeSupplement: UnicodeCategory("Cherokee Supplement"),
  meeteiMayek: UnicodeCategory("Meetei Mayek"),
  hangulSyllables: UnicodeCategory("Hangul Syllables"),
  hangulJamoExtendedB: UnicodeCategory("Hangul Jamo Extended-B"),
  highSurrogates: UnicodeCategory("High Surrogates"),
  highPrivateUseSurrogates: UnicodeCategory("High Private Use Surrogates"),
  lowSurrogates: UnicodeCategory("Low Surrogates"),
  privateUseArea: UnicodeCategory("Private Use Area"),
  cJKCompatibilityIdeographs: UnicodeCategory("CJK Compatibility Ideographs"),
  alphabeticPresentationForms: UnicodeCategory("Alphabetic Presentation Forms"),
  arabicPresentationFormsA: UnicodeCategory("Arabic Presentation Forms-A"),
  variationSelectors: UnicodeCategory("Variation Selectors"),
  verticalForms: UnicodeCategory("Vertical Forms"),
  combiningHalfMarks: UnicodeCategory("Combining Half Marks"),
  cJKCompatibilityForms: UnicodeCategory("CJK Compatibility Forms"),
  smallFormVariants: UnicodeCategory("Small Form Variants"),
  arabicPresentationFormsB: UnicodeCategory("Arabic Presentation Forms-B"),
  halfwidthAndFullwidthForms: UnicodeCategory("Halfwidth and Fullwidth Forms"),
  specials: UnicodeCategory("Specials"),
  linearBSyllabary: UnicodeCategory("Linear B Syllabary"),
  linearBIdeograms: UnicodeCategory("Linear B Ideograms"),
  aegeanNumbers: UnicodeCategory("Aegean Numbers"),
  ancientGreekNumbers: UnicodeCategory("Ancient Greek Numbers"),
  ancientSymbols: UnicodeCategory("Ancient Symbols"),
  phaistosDisc: UnicodeCategory("Phaistos Disc"),
  lycian: UnicodeCategory("Lycian"),
  carian: UnicodeCategory("Carian"),
  copticEpactNumbers: UnicodeCategory("Coptic Epact Numbers"),
  oldItalic: UnicodeCategory("Old Italic"),
  gothic: UnicodeCategory("Gothic"),
  oldPermic: UnicodeCategory("Old Permic"),
  ugaritic: UnicodeCategory("Ugaritic"),
  oldPersian: UnicodeCategory("Old Persian"),
  deseret: UnicodeCategory("Deseret"),
  shavian: UnicodeCategory("Shavian"),
  osmanya: UnicodeCategory("Osmanya"),
  elbasan: UnicodeCategory("Elbasan"),
  caucasianAlbanian: UnicodeCategory("Caucasian Albanian"),
  linearA: UnicodeCategory("Linear A"),
  cypriotSyllabary: UnicodeCategory("Cypriot Syllabary"),
  imperialAramaic: UnicodeCategory("Imperial Aramaic"),
  palmyrene: UnicodeCategory("Palmyrene"),
  nabataean: UnicodeCategory("Nabataean"),
  hatran: UnicodeCategory("Hatran"),
  phoenician: UnicodeCategory("Phoenician"),
  lydian: UnicodeCategory("Lydian"),
  meroiticHieroglyphs: UnicodeCategory("Meroitic Hieroglyphs"),
  meroiticCursive: UnicodeCategory("Meroitic Cursive"),
  kharoshthi: UnicodeCategory("Kharoshthi"),
  oldSouthArabian: UnicodeCategory("Old South Arabian"),
  oldNorthArabian: UnicodeCategory("Old North Arabian"),
  manichaean: UnicodeCategory("Manichaean"),
  avestan: UnicodeCategory("Avestan"),
  inscriptionalParthian: UnicodeCategory("Inscriptional Parthian"),
  inscriptionalPahlavi: UnicodeCategory("Inscriptional Pahlavi"),
  psalterPahlavi: UnicodeCategory("Psalter Pahlavi"),
  oldTurkic: UnicodeCategory("Old Turkic"),
  oldHungarian: UnicodeCategory("Old Hungarian"),
  rumiNumeralSymbols: UnicodeCategory("Rumi Numeral Symbols"),
  brahmi: UnicodeCategory("Brahmi"),
  kaithi: UnicodeCategory("Kaithi"),
  soraSompeng: UnicodeCategory("Sora Sompeng"),
  chakma: UnicodeCategory("Chakma"),
  mahajani: UnicodeCategory("Mahajani"),
  sharada: UnicodeCategory("Sharada"),
  sinhalaArchaicNumbers: UnicodeCategory("Sinhala Archaic Numbers"),
  khojki: UnicodeCategory("Khojki"),
  multani: UnicodeCategory("Multani"),
  khudawadi: UnicodeCategory("Khudawadi"),
  grantha: UnicodeCategory("Grantha"),
  tirhuta: UnicodeCategory("Tirhuta"),
  siddham: UnicodeCategory("Siddham"),
  modi: UnicodeCategory("Modi"),
  takri: UnicodeCategory("Takri"),
  ahom: UnicodeCategory("Ahom"),
  warangCiti: UnicodeCategory("Warang Citi"),
  pauCinHau: UnicodeCategory("Pau Cin Hau"),
  cuneiform: UnicodeCategory("Cuneiform"),
  cuneiformNumbersAndPunctuation: UnicodeCategory("Cuneiform Numbers and Punctuation"),
  earlyDynasticCuneiform: UnicodeCategory("Early Dynastic Cuneiform"),
  egyptianHieroglyphs: UnicodeCategory("Egyptian Hieroglyphs"),
  anatolianHieroglyphs: UnicodeCategory("Anatolian Hieroglyphs"),
  bamumSupplement: UnicodeCategory("Bamum Supplement"),
  mro: UnicodeCategory("Mro"),
  bassaVah: UnicodeCategory("Bassa Vah"),
  pahawhHmong: UnicodeCategory("Pahawh Hmong"),
  miao: UnicodeCategory("Miao"),
  kanaSupplement: UnicodeCategory("Kana Supplement"),
  duployan: UnicodeCategory("Duployan"),
  shorthandFormatControls: UnicodeCategory("Shorthand Format Controls"),
  byzantineMusicalSymbols: UnicodeCategory("Byzantine Musical Symbols"),
  musicalSymbols: UnicodeCategory("Musical Symbols"),
  ancientGreekMusicalNotation: UnicodeCategory("Ancient Greek Musical Notation"),
  taiXuanJingSymbols: UnicodeCategory("Tai Xuan Jing Symbols"),
  countingRodNumerals: UnicodeCategory("Counting Rod Numerals"),
  mathematicalAlphanumericSymbols: UnicodeCategory("Mathematical Alphanumeric Symbols"),
  suttonSignWriting: UnicodeCategory("Sutton SignWriting"),
  mendekikak: UnicodeCategory("Mende Kikakui"),
  arabicMathematicalAlphabeticSymbols: UnicodeCategory("Arabic Mathematical Alphabetic Symbols"),
  mahjongTiles: UnicodeCategory("Mahjong Tiles"),
  dominoTiles: UnicodeCategory("Domino Tiles"),
  playingCards: UnicodeCategory("Playing Cards"),
  enclosedAlphanumericSupplement: UnicodeCategory("Enclosed Alphanumeric Supplement"),
  enclosedIdeographicSupplement: UnicodeCategory("Enclosed Ideographic Supplement"),
  miscellaneousSymbolsAndPictographs: UnicodeCategory("Miscellaneous Symbols and Pictographs"),
  emoticons: UnicodeCategory("Emoticons (Emoji)"),
  ornamentalDingbats: UnicodeCategory("Ornamental Dingbats"),
  transportAndMapSymbols: UnicodeCategory("Transport and Map Symbols"),
  alchemicalSymbols: UnicodeCategory("Alchemical Symbols"),
  geometricShapesExtended: UnicodeCategory("Geometric Shapes Extended"),
  supplementalArrowsC: UnicodeCategory("Supplemental Arrows-C"),
  supplementalSymbolsAndPictographs: UnicodeCategory("Supplemental Symbols and Pictographs")
}

export const categories = {

}
