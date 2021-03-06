import Axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "//localhost:3030/";

var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data, options) {
    return ajax(endpoint, "POST", data, options);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "GET", data = null, options = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
      ...options,
    });
    return res.data;
  } catch (err) {
    console.error(
      `Had issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`
    );
    throw err;
  }
}
