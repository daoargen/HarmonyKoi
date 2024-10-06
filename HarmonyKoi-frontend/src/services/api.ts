// Code mẫu
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com/v1' // Thay thế bằng API của bạn
})

export default api
