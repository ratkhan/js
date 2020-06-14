import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const save = async newObject => {
    const config = {
        headers : { Authorization: token}
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers : { Authorization: token}
    };
    return await axios.delete(`${baseUrl}/${id}`, config);
};

export  default { getAll, save, remove, setToken };