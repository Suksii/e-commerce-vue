import axios from 'axios'

export const request = axios.create({ baseURL: `https://e-commerce-vue-bilg.vercel.app`, withCredentials: true })
