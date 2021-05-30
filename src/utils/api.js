import { handleResponse } from "./utils";

const baseURL = "http://localhost:8000";

class Api {
  constructor(url) {
    this._url = url;
  }

  getTeachersList() {
    return fetch(`${this._url}/teacher`, {}).then(handleResponse);
  }

  removeTeacherCard(teacherId) {
    return fetch(`${this._url}/teacher/${teacherId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  addTeacherCard(teacher) {
    return fetch(`${this._url}/teacher/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teacher.name,
        isGuest: teacher.isGuest,
        photoUrl: teacher.photoUrl,
      }),
    }).then(handleResponse);
  }

  addUser(user) {
    return fetch(`${this._url}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        fullName: user.fullName,
        password: user.password,
      }),
    }).then(handleResponse);
  }
}

const api = new Api(baseURL);
export default api;
