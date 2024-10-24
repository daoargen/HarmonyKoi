import { PostResponse } from '../types'
import http from '../utils/http'

export const getPost = async () => await http.get<PostResponse>('/posts')
