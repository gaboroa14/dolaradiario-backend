const ahorita: Date = new Date();
const time: number = new Date(
  ahorita.getFullYear(),
  ahorita.getMonth(),
  ahorita.getDate(),
  (ahorita.getMinutes() > 35) ? ahorita.getHours() + 1 : ahorita.getHours(),
  (ahorita.getMinutes() > 35) ? 5 : 35,
  0,
  0,
).getTime() - ahorita.getTime();
console.log(time);
