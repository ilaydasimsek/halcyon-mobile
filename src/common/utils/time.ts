export function toTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  const hDisplay = h > 0 ? h + ' h ' : '';
  const mDisplay = m + ' m ';
  return hDisplay + mDisplay;
}
