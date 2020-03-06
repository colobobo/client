const randomBetweenNumbers = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const zeroPad = (num, places) => String(num).padStart(places, "0");

export default {
  randomBetweenNumbers,
  zeroPad
};
