import React, { useState } from 'react'
import axios from 'axios'
import styles from './createKoiFish.module.css' // Assuming you're using CSS Modules
import { KoiFishAttributes } from './api/koiFish' // Import the interface

const CreateKoiFish: React.FC = () => {
  const [koiFishData, setKoiFishData] = useState<Omit<KoiFishAttributes, 'id' | 'isDeleted'>>({
    verietyId: '',
    name: '',
    description: '',
    imageUrl: '',
    baseColor: '',
    symbolism: '',
    price: 0
  })

  const [message, setMessage] = useState<string | null>(null) // For success or error messages
  const [error, setError] = useState<string | null>(null) // For validation errors

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setKoiFishData({ ...koiFishData, [name]: value })
  }

  // Handle price input separately since it's a number
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKoiFishData({ ...koiFishData, price: Number(e.target.value) })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/koiFishes', koiFishData)
      if (response.status === 201) {
        setMessage('Koi fish successfully added!')
        setError(null)
        // Optionally, reset the form after submission
        setKoiFishData({
          verietyId: '',
          name: '',
          description: '',
          imageUrl: '',
          baseColor: '',
          symbolism: '',
          price: 0
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage(null)
      setError('Failed to add koi fish. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Add a New Koi Fish</h2>
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Variety ID:
          <input type='text' name='verietyId' value={koiFishData.verietyId} onChange={handleInputChange} required />
        </label>

        <label>
          Name:
          <input type='text' name='name' value={koiFishData.name} onChange={handleInputChange} required />
        </label>

        <label>
          Description:
          <textarea name='description' value={koiFishData.description || ''} onChange={handleInputChange} />
        </label>

        <label>
          Image URL:
          <input type='text' name='imageUrl' value={koiFishData.imageUrl || ''} onChange={handleInputChange} />
        </label>

        <label>
          Base Color:
          <input type='text' name='baseColor' value={koiFishData.baseColor} onChange={handleInputChange} required />
        </label>

        <label>
          Symbolism:
          <input type='text' name='symbolism' value={koiFishData.symbolism || ''} onChange={handleInputChange} />
        </label>

        <label>
          Price (VND):
          <input type='number' name='price' value={koiFishData.price} onChange={handlePriceChange} required />
        </label>

        <button type='submit' className={styles.submitButton}>
          Add Koi Fish
        </button>
      </form>
    </div>
  )
}

export default CreateKoiFish
