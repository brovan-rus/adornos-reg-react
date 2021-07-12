import { handleResponse } from "./utils";

const baseURL = "https://adornos-api.herokuapp.com";
// const baseURL = "http://localhost:8000";

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
        description: teacher.description,
        price: teacher.price,
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
        name: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
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

  clearTeachersClients(teacherId, teacherData) {
    return fetch(`${this._url}/teacher/${teacherId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  updateTeacherData(teacherId, teacherData) {
    return fetch(`${this._url}/teacher/${teacherId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teacherData.name,
        description: teacherData.description,
        price: teacherData.price,
        photoUrl: teacherData.photoUrl,
      }),
    }).then(handleResponse);
  }

  addClient(teacherId, client) {
    return fetch(`${this._url}/clients/${teacherId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: client.name,
        phone: client.phone,
        email: client.email,
        id: client._id,
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

  resetUsersBookPossibilities() {
    return fetch(`${this._url}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  resetAllTeachersBooking() {
    return fetch(`${this._url}/teacher`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  addToCurrentTeacherList(teacher) {
    return fetch(`${this._url}/currentTeacher/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherId: teacher._id,
      }),
    }).then(handleResponse);
  }

  clearCurrentTeacherList() {
    return fetch(`${this._url}/currentTeacher/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  getCurrentTeacherList() {
    return fetch(`${this._url}/currentTeacher/`, {}).then(handleResponse);
  }
}

const api = new Api(baseURL);
export default api;
