import axios from "axios";
const baseUrl = "/api/user";

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const fetchUser = async (userId) => {
  const user = await axios.get(baseUrl + "/" + userId);
  return user.data
}

const updateUser = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { signup, fetchUser, updateUser };
