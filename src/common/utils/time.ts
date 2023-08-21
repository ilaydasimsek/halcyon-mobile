export function toTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hDisplay = h > 0 ? h + ' h ' : '';
  const mDisplay = m > 0 ? m + ' m ' : '';
  const sDisplay = s + ' s';
  return hDisplay + mDisplay + sDisplay;
}
