import axios from "axios";

export const api = axios.create({
  baseURL:
    //process.env.NODE_ENV === "production"
      //? "barker.herokuapp.com/api/":
      "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("barker-user-token");

if (token) {
  //api.defaults.headers.common["Authorization"] = 'x-auth-token';
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}