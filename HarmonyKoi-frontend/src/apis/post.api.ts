import { PostResponse } from '../types'
import http from '../utils/http'

export const getPost = () => http.get<PostResponse>('/posts')
