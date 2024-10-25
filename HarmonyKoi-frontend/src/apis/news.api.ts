import { News, NewsResponse } from '../types'
import http from '../utils/http'

export const getNews = async () => await http.get<NewsResponse>('/news')

export const getNewsById = async (id: string) => await http.get<News>(`/news/${id}`)
