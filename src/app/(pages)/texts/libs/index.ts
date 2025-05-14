export function extractUnknownWords(html: string): string[] {
  const div = document.createElement('div');
  div.innerHTML = html;

  const spans = div.querySelectorAll('strong.unknown-word');

  return Array.from(spans)
    .map((el) => el.textContent?.trim())
    .filter((word): word is string => !!word);
}
