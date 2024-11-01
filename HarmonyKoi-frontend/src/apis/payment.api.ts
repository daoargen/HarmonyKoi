import { Payment } from '../types/payment.type'
import http from '../utils/http'

export const getPayment = async () => await http.get<Payment>('/payments')

export const getPaymentById = async (id: string) => await http.get<Payment>(`/payments/${id}`)

export const completePayment = async (content: string, transferAmount: number) =>
  await http.post('/payments/webhook', { content, transferAmount })
