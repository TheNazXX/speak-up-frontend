export function extractBoldWords(html: string): string[] {
  const regex = /<strong>(.*?)<\/strong>|<b>(.*?)<\/b>/g;
  let matches;
  const result = [];

  while ((matches = regex.exec(html)) !== null) {
    const boldText = matches[1] || matches[2];
    if (boldText) {
      result.push(
        ...boldText
          .split(" ")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      );
    }
  }

  return result;
}
