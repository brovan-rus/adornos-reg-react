const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const dateFormat = (d) => {
  const monthName = months[d.getMonth()];
  return `${d.getDate()} ${monthName} ${d.getFullYear()}`;
};
