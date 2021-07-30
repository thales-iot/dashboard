import axios from 'axios';

const username = `${process.env.REACT_APP_BROKER_USERNAME}`;
const password = `${process.env.REACT_APP_BROKER_PASSWORD}`;

const api = axios.create({
  baseURL: 'https://instancia.cloud.shiftr.io',
  auth: { username, password },
});

export default api;
