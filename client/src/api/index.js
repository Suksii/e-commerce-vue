import axios from 'axios'

export const request = axios.create({
  baseURL: `e-commerce-vue-bilg.vercel.app`,
  withCredentials: true,
})
