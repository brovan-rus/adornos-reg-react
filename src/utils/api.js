import { handleResponse } from "./utils";

const baseURL = "http://localhost:8000";

class Api {
  constructor(url) {
    this._url = url;
  }

  getTeachersList = () => {
    return fetch(`${this._url}/teacher`, {}).then(handleResponse);
  };
}

const api = new Api(baseURL);
export default api;
