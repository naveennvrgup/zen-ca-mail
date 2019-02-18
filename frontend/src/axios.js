import axios from 'axios'

// export let burl = 'http://192.168.43.218:8000/'
export let burl = 'http://192.168.1.3:8000/'

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