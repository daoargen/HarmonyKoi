import { NewsResponse } from '../types'
import http from '../utils/http'

export const getNews = async () => await http.get<NewsResponse>('/news')
