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

export const ControlCharacter = UnicodeCategory("Control Character")
export const BasicLatin = UnicodeCategory("Basic Latin")
export const Latin1Supplement = UnicodeCategory("Latin-1 Supplement")
export const LatinExtendedA = UnicodeCategory("Latin Extended-A")
export const LatinExtendedB = UnicodeCategory("Latin Extended-B")
export const IpaExtensions = UnicodeCategory("IPA Extensions")
export const SpacingModifierLetters = UnicodeCategory("Spacing Modifier Letters")
export const CombiningDiacriticalMarks = UnicodeCategory("Combining Diacritical Marks")
export const GreekAndCoptic = UnicodeCategory("Greek and Coptic")
export const Cyrillic = UnicodeCategory("Cyrillic")
export const CyrillicSupplement = UnicodeCategory("Cyrillic Supplement")
export const Armenian = UnicodeCategory("Armenian")
export const Hebrew = UnicodeCategory("Hebrew")
export const Arabic = UnicodeCategory("Arabic")
export const Syriac = UnicodeCategory("Syriac")
export const ArabicSupplement = UnicodeCategory("Arabic Supplement")
export const Thaana = UnicodeCategory("Thaana")
export const Nko = UnicodeCategory("NKo")
export const Samaritan = UnicodeCategory("Samaritan")
export const Mandaic = UnicodeCategory("Mandaic")
export const ArabicExtendedA = UnicodeCategory("Arabic Extended-A")
export const Devanagari = UnicodeCategory("Devanagari")
export const Bengali = UnicodeCategory("Bengali")
export const Gurmukhi = UnicodeCategory("Gurmukhi")
export const Gujarati = UnicodeCategory("Gujarati")
export const Oriya = UnicodeCategory("Oriya")
export const Tamil = UnicodeCategory("Tamil")
export const Telugu = UnicodeCategory("Telugu")
export const Kannada = UnicodeCategory("Kannada")
export const Malayalam = UnicodeCategory("Malayalam")
export const Sinhala = UnicodeCategory("Sinhala")
export const Thai = UnicodeCategory("Thai")
export const Lao = UnicodeCategory("Lao")
export const Tibetan = UnicodeCategory("Tibetan")
export const Myanmar = UnicodeCategory("Myanmar")
export const Georgian = UnicodeCategory("Georgian")
export const HangulJamo = UnicodeCategory("Hangul Jamo")
export const Ethiopic = UnicodeCategory("Ethiopic")
export const EthiopicSupplement = UnicodeCategory("Ethiopic Supplement")
export const Cherokee = UnicodeCategory("Cherokee")
export const UnifiedCanadianAboriginalSyllabics = UnicodeCategory("Unified Canadian Aboriginal Syllabics")
export const Ogham = UnicodeCategory("Ogham")
export const Runic = UnicodeCategory("Runic")
export const Tagalog = UnicodeCategory("Tagalog")
export const Hanunoo = UnicodeCategory("Hanunoo")
export const Buhid = UnicodeCategory("Buhid")
export const Tagbanwa = UnicodeCategory("Tagbanwa")
export const Khmer = UnicodeCategory("Khmer")
export const Mongolian = UnicodeCategory("Mongolian")
export const UnifiedCanadianAboriginalSyllabicsExtended = UnicodeCategory("Unified Canadian Aboriginal Syllabics Extended")
export const Limbu = UnicodeCategory("Limbu")
export const TaiLe = UnicodeCategory("Tai Le")
export const NewTaiLue = UnicodeCategory("New Tai Lue")
export const KhmerSymbols = UnicodeCategory("Khmer Symbols")
export const Buginese = UnicodeCategory("Buginese")
export const TaiTham = UnicodeCategory("Tai Tham")
export const CombiningDiacriticalMarksExtended = UnicodeCategory("Combining Diacritical Marks Extended")
export const Balinese = UnicodeCategory("Balinese")
export const Sundanese = UnicodeCategory("Sundanese")
export const Batak = UnicodeCategory("Batak")
export const Lepcha = UnicodeCategory("Lepcha")
export const OlChiki = UnicodeCategory("Ol Chiki")
export const SundaneseSupplement = UnicodeCategory("Sundanese Supplement")
export const VedicExtensions = UnicodeCategory("Vedic Extensions")
export const PhoneticExtensions = UnicodeCategory("Phonetic Extensions")
export const PhoneticExtensionsSupplement = UnicodeCategory("Phonetic Extensions Supplement")
export const CombiningDiacriticalMarksSupplement = UnicodeCategory("Combining Diacritical Marks Supplement")
export const LatinExtendedAdditional = UnicodeCategory("Latin Extended Additional")
export const GreekExtended = UnicodeCategory("Greek Extended")
export const GeneralPunctuation = UnicodeCategory("General Punctuation")
export const SuperscriptsAndSubscripts = UnicodeCategory("Superscripts and Subscripts")
export const CurrencySymbols = UnicodeCategory("Currency Symbols")
export const CombiningDiacriticalMarksForSymbols = UnicodeCategory("Combining Diacritical Marks for Symbols")
export const LetterlikeSymbols = UnicodeCategory("Letterlike Symbols")
export const NumberForms = UnicodeCategory("Number Forms")
export const Arrows = UnicodeCategory("Arrows")
export const MathematicalOperators = UnicodeCategory("Mathematical Operators")
export const MiscellaneousTechnical = UnicodeCategory("Miscellaneous Technical")
export const ControlPictures = UnicodeCategory("Control Pictures")
export const OpticalCharacterRecognition = UnicodeCategory("Optical Character Recognition")
export const EnclosedAlphanumerics = UnicodeCategory("Enclosed Alphanumerics")
export const BoxDrawing = UnicodeCategory("Box Drawing")
export const BlockElements = UnicodeCategory("Block Elements")
export const GeometricShapes = UnicodeCategory("Geometric Shapes")
export const MiscellaneousSymbols = UnicodeCategory("Miscellaneous Symbols")
export const Dingbats = UnicodeCategory("Dingbats")
export const MiscellaneousMathematicalSymbolsA = UnicodeCategory("Miscellaneous Mathematical Symbols-A")
export const SupplementalArrowsA = UnicodeCategory("Supplemental Arrows-A")
export const BraillePatterns = UnicodeCategory("Braille Patterns")
export const SupplementalArrowsB = UnicodeCategory("Supplemental Arrows-B")
export const MiscellaneousMathematicalSymbolsB = UnicodeCategory("Miscellaneous Mathematical Symbols-B")
export const SupplementalMathematicalOperators = UnicodeCategory("Supplemental Mathematical Operators")
export const MiscellaneousSymbolsAndArrows = UnicodeCategory("Miscellaneous Symbols and Arrows")
export const Glagolitic = UnicodeCategory("Glagolitic")
export const LatinExtendedC = UnicodeCategory("Latin Extended-C")
export const Coptic = UnicodeCategory("Coptic")
export const GeorgianSupplement = UnicodeCategory("Georgian Supplement")
export const Tifinagh = UnicodeCategory("Tifinagh")
export const EthiopicExtended = UnicodeCategory("Ethiopic Extended")
export const CyrillicExtendedA = UnicodeCategory("Cyrillic Extended-A")
export const SupplementalPunctuation = UnicodeCategory("Supplemental Punctuation")
export const CJKRadicalsSupplement = UnicodeCategory("CJK Radicals Supplement")
export const KangxiRadicals = UnicodeCategory("Kangxi Radicals")
export const IdeographicDescriptionCharacters = UnicodeCategory("Ideographic Description Characters")
export const CJKSymbolsAndPunctuation = UnicodeCategory("CJK Symbols and Punctuation")
export const Hiragana = UnicodeCategory("Hiragana")
export const Katakana = UnicodeCategory("Katakana")
export const Bopomofo = UnicodeCategory("Bopomofo")
export const HangulCompatibilityJamo = UnicodeCategory("Hangul Compatibility Jamo")
export const Kanbun = UnicodeCategory("Kanbun")
export const BopomofoExtended = UnicodeCategory("Bopomofo Extended")
export const CJKStrokes = UnicodeCategory("CJK Strokes")
export const KatakanaPhoneticExtensions = UnicodeCategory("Katakana Phonetic Extensions")
export const EnclosedCJKLettersAndMonths = UnicodeCategory("Enclosed CJK Letters and Months")
export const CJKCompatibility = UnicodeCategory("CJK Compatibility")
export const CJKUnifiedIdeographsExtensionA = UnicodeCategory("CJK Unified Ideographs Extension A")
export const YijingHexagramSymbols = UnicodeCategory("Yijing Hexagram Symbols")
export const CJKUnifiedIdeographs = UnicodeCategory("CJK Unified Ideographs")
export const YiSyllables = UnicodeCategory("Yi Syllables")
export const YiRadicals = UnicodeCategory("Yi Radicals")
export const Lisu = UnicodeCategory("Lisu")
export const Vai = UnicodeCategory("Vai")
export const CyrillicExtendedB = UnicodeCategory("Cyrillic Extended-B")
export const Bamum = UnicodeCategory("Bamum")
export const ModifierToneLetters = UnicodeCategory("Modifier Tone Letters")
export const LatinExtendedD = UnicodeCategory("Latin Extended-D")
export const SylotiNagri = UnicodeCategory("Syloti Nagri")
export const CommonIndicNumberForms = UnicodeCategory("Common Indic Number Forms")
export const PhagsPa = UnicodeCategory("Phags-pa")
export const Saurashtra = UnicodeCategory("Saurashtra")
export const DevanagariExtended = UnicodeCategory("Devanagari Extended")
export const KayahLi = UnicodeCategory("Kayah Li")
export const Rejang = UnicodeCategory("Rejang")
export const HangulJamoExtendedA = UnicodeCategory("Hangul Jamo Extended-A")
export const Javanese = UnicodeCategory("Javanese")
export const MyanmarExtendedB = UnicodeCategory("Myanmar Extended-B")
export const Cham = UnicodeCategory("Cham")
export const MyanmarExtendedA = UnicodeCategory("Myanmar Extended-A")
export const TaiViet = UnicodeCategory("Tai Viet")
export const MeeteiMayekExtensions = UnicodeCategory("Meetei Mayek Extensions")
export const EthiopicExtendedA = UnicodeCategory("Ethiopic Extended-A")
export const LatinExtendedE = UnicodeCategory("Latin Extended-E")
export const CherokeeSupplement = UnicodeCategory("Cherokee Supplement")
export const MeeteiMayek = UnicodeCategory("Meetei Mayek")
export const HangulSyllables = UnicodeCategory("Hangul Syllables")
export const HangulJamoExtendedB = UnicodeCategory("Hangul Jamo Extended-B")
export const HighSurrogates = UnicodeCategory("High Surrogates")
export const HighPrivateUseSurrogates = UnicodeCategory("High Private Use Surrogates")
export const LowSurrogates = UnicodeCategory("Low Surrogates")
export const PrivateUseArea = UnicodeCategory("Private Use Area")
export const CJKCompatibilityIdeographs = UnicodeCategory("CJK Compatibility Ideographs")
export const AlphabeticPresentationForms = UnicodeCategory("Alphabetic Presentation Forms")
export const ArabicPresentationFormsA = UnicodeCategory("Arabic Presentation Forms-A")
export const VariationSelectors = UnicodeCategory("Variation Selectors")
export const VerticalForms = UnicodeCategory("Vertical Forms")
export const CombiningHalfMarks = UnicodeCategory("Combining Half Marks")
export const CJKCompatibilityForms = UnicodeCategory("CJK Compatibility Forms")
export const SmallFormVariants = UnicodeCategory("Small Form Variants")
export const ArabicPresentationFormsB = UnicodeCategory("Arabic Presentation Forms-B")
export const HalfwidthAndFullwidthForms = UnicodeCategory("Halfwidth and Fullwidth Forms")
export const Specials = UnicodeCategory("Specials")
export const LinearBSyllabary = UnicodeCategory("Linear B Syllabary")
export const LinearBIdeograms = UnicodeCategory("Linear B Ideograms")
export const AegeanNumbers = UnicodeCategory("Aegean Numbers")
export const AncientGreekNumbers = UnicodeCategory("Ancient Greek Numbers")
export const AncientSymbols = UnicodeCategory("Ancient Symbols")
export const PhaistosDisc = UnicodeCategory("Phaistos Disc")
export const Lycian = UnicodeCategory("Lycian")
export const Carian = UnicodeCategory("Carian")
export const CopticEpactNumbers = UnicodeCategory("Coptic Epact Numbers")
export const OldItalic = UnicodeCategory("Old Italic")
export const Gothic = UnicodeCategory("Gothic")
export const OldPermic = UnicodeCategory("Old Permic")
export const Ugaritic = UnicodeCategory("Ugaritic")
export const OldPersian = UnicodeCategory("Old Persian")
export const Deseret = UnicodeCategory("Deseret")
export const Shavian = UnicodeCategory("Shavian")
export const Osmanya = UnicodeCategory("Osmanya")
export const Elbasan = UnicodeCategory("Elbasan")
export const CaucasianAlbanian = UnicodeCategory("Caucasian Albanian")
export const LinearA = UnicodeCategory("Linear A")
export const CypriotSyllabary = UnicodeCategory("Cypriot Syllabary")
export const ImperialAramaic = UnicodeCategory("Imperial Aramaic")
export const Palmyrene = UnicodeCategory("Palmyrene")
export const Nabataean = UnicodeCategory("Nabataean")
export const Hatran = UnicodeCategory("Hatran")
export const Phoenician = UnicodeCategory("Phoenician")
export const Lydian = UnicodeCategory("Lydian")
export const MeroiticHieroglyphs = UnicodeCategory("Meroitic Hieroglyphs")
export const MeroiticCursive = UnicodeCategory("Meroitic Cursive")
export const Kharoshthi = UnicodeCategory("Kharoshthi")
export const OldSouthArabian = UnicodeCategory("Old South Arabian")
export const OldNorthArabian = UnicodeCategory("Old North Arabian")
export const Manichaean = UnicodeCategory("Manichaean")
export const Avestan = UnicodeCategory("Avestan")
export const InscriptionalParthian = UnicodeCategory("Inscriptional Parthian")
export const InscriptionalPahlavi = UnicodeCategory("Inscriptional Pahlavi")
export const PsalterPahlavi = UnicodeCategory("Psalter Pahlavi")
export const OldTurkic = UnicodeCategory("Old Turkic")
export const OldHungarian = UnicodeCategory("Old Hungarian")
export const RumiNumeralSymbols = UnicodeCategory("Rumi Numeral Symbols")
export const Brahmi = UnicodeCategory("Brahmi")
export const Kaithi = UnicodeCategory("Kaithi")
export const SoraSompeng = UnicodeCategory("Sora Sompeng")
export const Chakma = UnicodeCategory("Chakma")
export const Mahajani = UnicodeCategory("Mahajani")
export const Sharada = UnicodeCategory("Sharada")
export const SinhalaArchaicNumbers = UnicodeCategory("Sinhala Archaic Numbers")
export const Khojki = UnicodeCategory("Khojki")
export const Multani = UnicodeCategory("Multani")
export const Khudawadi = UnicodeCategory("Khudawadi")
export const Grantha = UnicodeCategory("Grantha")
export const Tirhuta = UnicodeCategory("Tirhuta")
export const Siddham = UnicodeCategory("Siddham")
export const Modi = UnicodeCategory("Modi")
export const Takri = UnicodeCategory("Takri")
export const Ahom = UnicodeCategory("Ahom")
export const WarangCiti = UnicodeCategory("Warang Citi")
export const PauCinHau = UnicodeCategory("Pau Cin Hau")
export const Cuneiform = UnicodeCategory("Cuneiform")
export const CuneiformNumbersAndPunctuation = UnicodeCategory("Cuneiform Numbers and Punctuation")
export const EarlyDynasticCuneiform = UnicodeCategory("Early Dynastic Cuneiform")
export const EgyptianHieroglyphs = UnicodeCategory("Egyptian Hieroglyphs")
export const AnatolianHieroglyphs = UnicodeCategory("Anatolian Hieroglyphs")
export const BamumSupplement = UnicodeCategory("Bamum Supplement")
export const Mro = UnicodeCategory("Mro")
export const BassaVah = UnicodeCategory("Bassa Vah")
export const PahawhHmong = UnicodeCategory("Pahawh Hmong")
export const Miao = UnicodeCategory("Miao")
export const KanaSupplement = UnicodeCategory("Kana Supplement")
export const Duployan = UnicodeCategory("Duployan")
export const ShorthandFormatControls = UnicodeCategory("Shorthand Format Controls")
export const ByzantineMusicalSymbols = UnicodeCategory("Byzantine Musical Symbols")
export const MusicalSymbols = UnicodeCategory("Musical Symbols")
export const AncientGreekMusicalNotation = UnicodeCategory("Ancient Greek Musical Notation")
export const TaiXuanJingSymbols = UnicodeCategory("Tai Xuan Jing Symbols")
export const CountingRodNumerals = UnicodeCategory("Counting Rod Numerals")
export const MathematicalAlphanumericSymbols = UnicodeCategory("Mathematical Alphanumeric Symbols")
export const SuttonSignWriting = UnicodeCategory("Sutton SignWriting")
export const Mendekikak = UnicodeCategory("Mende Kikakui")
export const ArabicMathematicalAlphabeticSymbols = UnicodeCategory("Arabic Mathematical Alphabetic Symbols")
export const MahjongTiles = UnicodeCategory("Mahjong Tiles")
export const DominoTiles = UnicodeCategory("Domino Tiles")
export const PlayingCards = UnicodeCategory("Playing Cards")
export const EnclosedAlphanumericSupplement = UnicodeCategory("Enclosed Alphanumeric Supplement")
export const EnclosedIdeographicSupplement = UnicodeCategory("Enclosed Ideographic Supplement")
export const MiscellaneousSymbolsAndPictographs = UnicodeCategory("Miscellaneous Symbols and Pictographs")
export const Emoticons = UnicodeCategory("Emoticons (Emoji)")
export const OrnamentalDingbats = UnicodeCategory("Ornamental Dingbats")
export const TransportAndMapSymbols = UnicodeCategory("Transport and Map Symbols")
export const AlchemicalSymbols = UnicodeCategory("Alchemical Symbols")
export const GeometricShapesExtended = UnicodeCategory("Geometric Shapes Extended")
export const SupplementalArrowsC = UnicodeCategory("Supplemental Arrows-C")
export const SupplementalSymbolsAndPictographs = UnicodeCategory("Supplemental Symbols and Pictographs")
