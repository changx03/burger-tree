import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-aedea.firebaseio.com/',
});

export default instance;
