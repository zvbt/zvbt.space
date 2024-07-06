import twemoji from 'twemoji';

export function parseEmojis(text: string): string {
  return twemoji.parse(text, {
    folder: 'svg',
    ext: '.svg',
    className: 'emoji'
  });
}
