import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { KoiFishAttributes } from './api/koiFish' // Assuming you have an interface defined elsewhere

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KoiFishAttributes | { message: string }>
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      // Fetch the data from the external API
      const response = await axios.get(`http://localhost:1412/api/koiFishes/${id}`)

      if (response.data) {
        res.status(200).json(response.data)
      } else {
        res.status(404).json({ message: 'Fish not found' })
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
      res.status(500).json({ message: 'Failed to fetch data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
