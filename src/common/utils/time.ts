export function toTime(seconds: number, style: 'text' | 'colon' = 'text') {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  if (style === 'text') {
    const hDisplay = h > 0 ? h + ' h ' : '';
    const mDisplay = m + ' m ';
    return hDisplay + mDisplay;
  } else {
    const hDisplay = h > 0 ? (h < 10 ? '0' + h : h) + ':' : '';
    const mDisplay = (m < 10 ? '0' + m : m) + ':';
    const sDisplay = s < 10 ? '0' + s : s;
    return hDisplay + mDisplay + sDisplay;
  }
}
