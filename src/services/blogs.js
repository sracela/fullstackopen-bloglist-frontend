import axios from 'axios'
import authHeader from "./auth-header";
const baseUrl = '/api/blogs'

// let token = null
// const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const config = {    headers: authHeader() ,  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};


const remove = async (id) => {
  const config = {    headers: authHeader() ,  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, comment }