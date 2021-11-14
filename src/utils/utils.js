import { months } from "./constants";

export const dateFormat = (d) => {
  const monthName = months[d.getMonth()];
  return `${d.getDate()} ${monthName} ${d.getFullYear()}`;
};

export async function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(await res.json());
  } else {
    return res.json();
  }
}
