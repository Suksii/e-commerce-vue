import axios from 'axios'

export const request = axios.create({
  baseURL: `https://e-commerce-vue-server.vercel.app`,
  withCredentials: true,
})
