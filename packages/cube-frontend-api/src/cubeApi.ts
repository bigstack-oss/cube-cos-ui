import axios from 'axios'

export const cubeApiClient = axios.create({
  baseURL: '/cube/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchSettings = async () => {
  return 'Welcome to Gube!'
}

export const cubeApi = {
  fetchSettings,
}
