import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

// Fetch all persons from the server
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

// Add a new person to the server
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

// Delete a person by ID
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, remove };
