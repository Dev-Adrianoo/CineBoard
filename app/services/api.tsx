import  axios  from 'axios';
// Base URL : https://api.themoviedb.org/3/
// URL API: https://api.themoviedb.org/3/movie/now_playing?api_key=db2b85382ac2e50df373d2719d989b47

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',

});

export default api;

