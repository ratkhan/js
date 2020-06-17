import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    let blogs = response.data;
    blogs.sort(function(a, b) {
        if (a.content.likes < b.content.likes) { return -1; }
        if (a.content.likes > b.content.likes) { return 1; }
        return 0;
    });
    return blogs;
};

const find = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response;
};

const save = async newObject => {
    const config = {
        headers : { Authorization: token}
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const config = {
        headers : { Authorization: token}
    };

    const response = await axios.put( `${baseUrl}/${id}`, newObject, config);
    return response;

};

const remove = async (id) => {
    const config = {
        headers : { Authorization: token}
    };
    return await axios.delete(`${baseUrl}/${id}`, config);
};

export  default { getAll, find, save, update, remove, setToken };