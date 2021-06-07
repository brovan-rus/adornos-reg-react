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

export function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`);
  } else {
    return res.json();
  }
}
