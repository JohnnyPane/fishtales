import userService from './user'
import axios from 'axios'
const baseUrl = '/api/fish'


let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const getUsersFish = async (userId) => {
  const request = await axios.get(`${baseUrl}/user/${userId}`);
  return request.data;
};

export default { getAll, create, update, setToken, getUsersFish }