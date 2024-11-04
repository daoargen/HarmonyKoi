import { News, NewsResponse } from '../types/news.type'
import http from '../utils/http'

export const getNews = async () => await http.get<NewsResponse>('/news')

export const getNewsById = async (id: string) => await http.get<News>(`/news/${id}`)

export const deleteNewsById = async (id: string) => await http.delete<News>(`/news/${id}`)

export const updateNews = async (id: string, news: { tittle: string; content: string; imageUrl: string }) =>
  await http.put<News>(`/news/${id}`, news)

export const createNews = async (news: { tittle: string; content: string; imageUrl: string }) =>
  await http.post<News>(`/news`, news)
