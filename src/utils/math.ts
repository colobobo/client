const randomBetweenNumbers = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

export default {
  randomBetweenNumbers,
  zeroPad
};
