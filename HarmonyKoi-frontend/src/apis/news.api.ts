import { NewsResponse } from '../types'
import http from '../utils/http'

export const getNews = () => http.get<NewsResponse>('/news')
