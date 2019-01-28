import axios from 'axios'

export let burl = 'http://localhost:8000/'

if(process.env.NODE_ENV==='production'){
  burl='/'
}

export default () => axios.create({
    baseURL:burl,
    headers: {
      Authorisation: sessionStorage['token']
    }
  });