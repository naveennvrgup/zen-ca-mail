import axios from 'axios'

// it eases the dev workflow by automatically 
// providing the appropriate base url for the 
// dev and prod

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