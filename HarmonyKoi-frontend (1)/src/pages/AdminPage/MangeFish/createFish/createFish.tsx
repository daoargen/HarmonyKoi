import React, { useEffect, useState } from 'react'
import { KoiFishAdd } from '../../../../types/koiFish.type'
import { getVarieties } from '../../../../apis/variety.api'
import { getElements } from '../../../../apis/element.api'
import { addKoiFish } from '../../../../apis/koifish.api'
// import styles from './createFish.module.css'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../../utils/cookies'

const CreateFish: React.FC = () => {
  const [name, setName] = useState('')
  const [varieties, setVarieties] = useState([])
  const [elements, setElements] = useState([])
  const [selectedVariety, setSelectedVariety] = useState('')
  const [selectedElements, setSelectedElements] = useState([])
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [baseColor, setBaseColor] = useState('')
  const [symbolism, setSymbolism] = useState('')
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVarieties = async () => {
      try {
        const response = await getVarieties()
        setVarieties(response.data.data)
      } catch (err) {
        console.error('Error fetching varieties:', err)
      }
    }

    const fetchElements = async () => {
      try {
        const response = await getElements()
        setElements(response.data.data)
      } catch (err) {
        console.error('Error fetching elements:', err)
      }
    }

    fetchVarieties()
    fetchElements()
  }, [])

  const handleAddKoiFish = async (koiData: KoiFishAdd) => {
    try {
      const token = getToken()
      await addKoiFish(koiData, token)
      navigate('/admin/manage/manage-fish')
    } catch (error) {
      console.error('Error creating Koi fish:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedVariety) {
      alert('Please select a variety.')
      return
    }

    const newKoi: KoiFishAdd = {
      verietyId: selectedVariety,
      name,
      description,
      imageUrl,
      baseColor,
      symbolism,
      price,
      elementIds: selectedElements
    }

    await handleAddKoiFish(newKoi)
  }

  return (
    <div className={styles['create-fish-modal']}>
      <h2>Create New Koi Fish</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='varieties'>Variety:</label>
          <select id='varieties' value={selectedVariety} onChange={(e) => setSelectedVariety(e.target.value)} required>
            <option value=''>Select a variety</option>
            {varieties.map((variety) => (
              <option key={variety.id} value={variety.id}>
                {variety.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input id='imageUrl' type='text' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='baseColor'>Base Color:</label>
          <input id='baseColor' type='text' value={baseColor} onChange={(e) => setBaseColor(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='symbolism'>Symbolism:</label>
          <input id='symbolism' type='text' value={symbolism} onChange={(e) => setSymbolism(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input id='price' type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label htmlFor='elements'>Elements:</label>
          <select
            id='elements'
            multiple
            value={selectedElements}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, (option) => option.value)
              setSelectedElements(options)
            }}
          >
            {elements.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles['button-group']}>
          <button type='submit'>Create Koi Fish</button>
          <button type='button' onClick={() => navigate('/admin/manage/manage-fish')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFish
