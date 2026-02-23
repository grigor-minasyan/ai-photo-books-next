import { declineArmenianName } from "../src/utils";

import { describe, expect, test } from "bun:test";

describe("Armenian Name Declension", () => {
  test('Genitive case (-ի) with bridge "y"', () => {
    expect(declineArmenianName("Սա {{NAME}}-ի գիրքն է", "Ալեք")).toBe(
      "Սա Ալեքի գիրքն է",
    );
    expect(declineArmenianName("Սա {{NAME}}-ի գիրքն է", "Արա")).toBe(
      "Սա Արայի գիրքն է",
    );
    expect(declineArmenianName("Սա {{NAME}}-ի գիրքն է", "Մարո")).toBe(
      "Սա Մարոյի գիրքն է",
    );
  });

  test("Definite article (-ը/-ն) based on name ending", () => {
    // Ends in consonant -> ը
    expect(declineArmenianName("{{NAME}}-ը գնաց տուն", "Ալեք")).toBe(
      "Ալեքը գնաց տուն",
    );
    // Ends in vowel -> ն
    expect(declineArmenianName("{{NAME}}-ը գնաց տուն", "Արա")).toBe(
      "Արան գնաց տուն",
    );
  });

  test("Definite article (-ն) triggered by following vowel", () => {
    // Even if name ends in consonant, if "է" follows, it must be "ն"
    expect(declineArmenianName("{{NAME}}-ը էստեղ է", "Ալեք")).toBe(
      "Ալեքն էստեղ է",
    );
  });

  test("Dative Definite (-ին)", () => {
    expect(declineArmenianName("Մոտեցիր {{NAME}}-ին", "Ալեք")).toBe(
      "Մոտեցիր Ալեքին",
    );
    expect(declineArmenianName("Մոտեցիր {{NAME}}-ին", "Արա")).toBe(
      "Մոտեցիր Արային",
    );
  });

  test("Multiple placeholders in one string", () => {
    const template = "{{NAME}}-ը տվեց գիրքը {{NAME}}-ին";
    expect(declineArmenianName(template, "Ալեք")).toBe(
      "Ալեքը տվեց գիրքը Ալեքին",
    );
  });

  test("Euphonic N skips spaces to find the next vowel", () => {
    // Should detect the 'է' even though there is a space after the name
    const template = "{{NAME}}-ը էստեղ է";
    expect(declineArmenianName(template, "Ալեք")).toBe("Ալեքն էստեղ է");

    // Should stay 'ը' if the next word starts with a consonant
    const template2 = "{{NAME}}-ը գնաց տուն";
    expect(declineArmenianName(template2, "Ալեք")).toBe("Ալեքը գնաց տուն");
  });
});

describe("Comprehensive Armenian Name Declension Tests", () => {
  describe("Definite Article Rules (-ը / -ն)", () => {
    test.each([
      // [Template, Name, Expected, Description]
      [
        "{{NAME}}-ը գնաց տուն",
        "Ալեք",
        "Ալեքը գնաց տուն",
        "Consonant ending + Consonant next word",
      ],
      [
        "{{NAME}}-ը այստեղ է",
        "Ալեք",
        "Ալեքն այստեղ է",
        "Consonant ending + Vowel next word (Euphonic N)",
      ],
      [
        "{{NAME}}-ը ուտում է",
        "Դավիթ",
        "Դավիթն ուտում է",
        "Consonant ending + Vowel (ու) next word",
      ],
      [
        "{{NAME}}-ը պարում է",
        "Աննա",
        "Աննան պարում է",
        "Vowel ending (ա) always gets -ն",
      ],
      [
        "{{NAME}}-ը երգում է",
        "Մարո",
        "Մարոն երգում է",
        "Vowel ending (ո) always gets -ն",
      ],
      [
        "{{NAME}}-ը արդեն եկել է",
        "Նարե",
        "Նարեն արդեն եկել է",
        "Vowel ending (ե) always gets -ն",
      ],
      [
        "{{NAME}}-ը էստեղ է",
        "Գոռ",
        "Գոռն էստեղ է",
        "Handles multiple spaces before vowel",
      ],
    ])("Definite: %s with %s -> %s", (template, name, expected) => {
      expect(declineArmenianName(template, name)).toBe(expected);
    });
  });

  describe("Genitive Case Rules (-ի / -յի)", () => {
    test.each([
      // [Template, Name, Expected, Description]
      [
        "Սա {{NAME}}-ի գիրքն է",
        "Հայկ",
        "Սա Հայկի գիրքն է",
        "Consonant ending names just add -ի",
      ],
      [
        "Սա {{NAME}}-ի գիրքն է",
        "Արա",
        "Սա Արայի գիրքն է",
        "Names ending in -ա add -յի",
      ],
      [
        "Սա {{NAME}}-ի տունն է",
        "Մարո",
        "Սա Մարոյի տունն է",
        "Names ending in -ո add -յի",
      ],
      [
        "Սա {{NAME}}-ի համակարգիչն է",
        "Արամ",
        "Սա Արամի համակարգիչն է",
        "Standard consonant declension",
      ],
    ])("Genitive: %s with %s -> %s", (template, name, expected) => {
      expect(declineArmenianName(template, name)).toBe(expected);
    });
  });

  describe("Dative Definite Rules (-ին / -յին)", () => {
    test.each([
      // [Template, Name, Expected, Description]
      [
        "Տուր գիրքը {{NAME}}-ին",
        "Մարիամ",
        "Տուր գիրքը Մարիամին",
        "Consonant ending + -ին",
      ],
      [
        "Նամակ գրիր {{NAME}}-ին",
        "Աննա",
        "Նամակ գրիր Աննային",
        "Vowel ending -ա + -յին",
      ],
      [
        "Մոտեցիր {{NAME}}-ին",
        "Կարո",
        "Մոտեցիր Կարոյին",
        "Vowel ending -ո + -յին",
      ],
    ])("Dative: %s with %s -> %s", (template, name, expected) => {
      expect(declineArmenianName(template, name)).toBe(expected);
    });
  });

  describe("Edge Cases and Multiple Placeholders", () => {
    test("should handle multiple names in different cases", () => {
      const template = "{{NAME}}-ը սիրում է {{NAME}}-ին";
      // "Aleks loves Anna"
      // Aleks ends in consonant, 'սիրում' starts with consonant -> Ալեքը
      // Anna ends in vowel -> Աննային
      expect(declineArmenianName(template, "Ալեք")).toContain("Ալեքը");

      // Note: My current function replaces ALL {{NAME}} with the same name.
      // If your app uses different names, you'd need {{NAME1}}, {{NAME2}}.
    });

    test("should be case insensitive for vowel detection", () => {
      expect(declineArmenianName("{{NAME}}-ը Էստեղ է", "Ալեք")).toBe(
        "Ալեքն Էստեղ է",
      );
    });

    test.each([
      ["Բարի գիշեր, {{NAME}}։", "Ալեք", "Բարի գիշեր, Ալեք։"],
      ["գիշեր, {{NAME}} ջան", "Ալեք", "գիշեր, Ալեք ջան"],
    ])(
      "should handle forms with name at the end of the sentence",
      (template, name, expected) => {
        expect(declineArmenianName(template, name)).toBe(expected);
      },
    );
  });
});
