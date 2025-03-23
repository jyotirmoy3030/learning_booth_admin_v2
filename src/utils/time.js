export function secondsToHms(seconds) {
  seconds = Number(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const hDisplay =
    hours > 0 ? hours + (hours === 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay =
    minutes > 0 ? minutes + (minutes === 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay =
    remainingSeconds > 0
      ? remainingSeconds + (remainingSeconds === 1 ? ' second' : ' seconds')
      : '';
  return hDisplay + mDisplay + sDisplay;
}
