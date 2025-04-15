export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  const userLocale = navigator.language || 'en-US';
  const formatter = new Intl.NumberFormat(userLocale, {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  
  return `${formatter.format(mins)}:${formatter.format(secs)}`;
};
