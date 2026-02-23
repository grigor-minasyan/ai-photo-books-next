import assert from "assert";
/**
 * Armenian Name Declension Utility (Fixed for Euphonic N)
 */
export function declineArmenianName(template: string, name: string): string {
  const vowels = [
    "ա",
    "ե",
    "է",
    "ը",
    "ի",
    "ո",
    "ու",
    "օ",
    "Ա",
    "Ե",
    "Է",
    "Ը",
    "Ի",
    "Ո",
    "Ու",
    "Օ",
  ];
  const endsWithAOrO = /[աոԱՈ]$/.test(name);
  const endsWithVowel = new RegExp(`[${vowels.join("")}]$`).test(name);

  return template.replace(
    /{{NAME}}(?:-(ի|ին|ը|ն))?/g,
    (match, suffix, offset, fullString) => {
      if (!suffix) return name;

      // 1. Lookahead logic: Find the first non-whitespace character after the placeholder
      const remainingString = fullString.slice(offset + match.length);
      const firstCharOfNextWord = remainingString.trimStart().charAt(0);
      const nextIsVowel = vowels.includes(firstCharOfNextWord);

      switch (suffix) {
        case "ի": // Genitive
          return endsWithAOrO ? `${name}յի` : `${name}ի`;

        case "ին": // Dative
          return endsWithAOrO ? `${name}յին` : `${name}ին`;

        case "ը": // Definite Article
        case "ն":
          // RULE: Use 'ն' if:
          // - Name ends in a vowel
          // - OR the next word starts with a vowel (Euphonic N)
          return endsWithVowel || nextIsVowel ? `${name}ն` : `${name}ը`;

        default:
          return name + suffix;
      }
    },
  );
}

export const imagePathToBase64 = async (
  imagePath: string,
): Promise<{
  base64String: string;
  type: string;
}> => {
  const inputFile = Bun.file(imagePath);
  const exists = await inputFile.exists();
  assert(exists, `File not found: ${imagePath}`);

  const arrayBuffer = await inputFile.arrayBuffer();

  const base64String = Buffer.from(new Uint8Array(arrayBuffer)).toString(
    "base64",
  );
  return { base64String, type: inputFile.type };
};
