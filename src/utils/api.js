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

  userLogin(user) {
    return fetch(`${this._url}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        password: user.password,
      }),
    }).then(handleResponse);
  }

  setDate(date) {
    return fetch(`${this._url}/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
      }),
    }).then(handleResponse);
  }

  getDate() {
    return fetch(`${this._url}/date`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  removeClient(teacherId, clientId) {
    return fetch(`${this._url}/clients/${teacherId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: clientId,
      }),
    }).then(handleResponse);
  }

  addClient(teacherId, clientId, clientName) {
    return fetch(`${this._url}/clients/${teacherId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: clientId,
        clientName: clientName,
      }),
    }).then(handleResponse);
  }

  userAddBookPossibility(userId) {
    return fetch(`${this._url}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  userRemoveBookPossibility(userId) {
    return fetch(`${this._url}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }
}

const api = new Api(baseURL);
export default api;