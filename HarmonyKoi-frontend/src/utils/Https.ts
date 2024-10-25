// utils/http.ts
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:1412/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http
