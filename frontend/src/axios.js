import axios from 'axios'

export let burl = 'http://localhost:8000/'

if (process.env.NODE_ENV === 'production') {
  burl = '/'
}

export default () => {
  return axios.create({
    baseURL: burl,
    headers: {
      authorization: sessionStorage['token'],
    }
  });
}