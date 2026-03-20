/**
 * Converte Markdown básico para HTML seguro.
 * Suporta: **negrito**, *itálico*, listas numeradas e quebras de linha.
 */
export function markdownToHtml(text: string): string {
  if (!text) return '';

  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  html = html.replace(/\n/g, '<br />');

  return html;
}
