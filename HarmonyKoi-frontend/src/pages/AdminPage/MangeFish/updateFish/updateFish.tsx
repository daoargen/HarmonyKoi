import React, { useEffect, useState } from 'react'
import { KoiFishAttributes } from '../../../../types/koiFish.type'
import { getVarieties } from '../../../../apis/variety.api'
import { getElements } from '../../../../apis/element.api'
import { updateKoiFish } from '../../../../apis/koifish.api'
import styles from './updateFish.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { getToken } from '../../../../utils/cookies'

const UpdateFish: React.FC = () => {
  const location = useLocation()
  const koi = location.state?.koi as KoiFishAttributes
  const [name, setName] = useState(koi?.name || '')
  const [varieties, setVarieties] = useState([])
  const [elements, setElements] = useState([])
  const [selectedVariety, setSelectedVariety] = useState(koi?.variety?.id || '')
  const [selectedElements, setSelectedElements] = useState(koi?.elementIds || [])
  const [description, setDescription] = useState(koi?.description || '')
  const [imageUrl, setImageUrl] = useState(koi?.imageUrl || '')
  const [baseColor, setBaseColor] = useState(koi?.baseColor || '')
  const [symbolism, setSymbolism] = useState(koi?.symbolism || '')
  const [price, setPrice] = useState(koi?.price || 0)
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

  const handleUpdateKoiFish = async (koiData: KoiFishAttributes) => {
    try {
      const token = getToken()
      await updateKoiFish(koi.id, koiData, token)
      navigate('/admin/manage/manage-fish')
    } catch (error) {
      console.error('Error updating Koi fish:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedVariety) {
      alert('Please select a variety.')
      return
    }

    const updatedKoi: KoiFishAttributes = {
      ...koi,
      verietyId: selectedVariety,
      name,
      description,
      imageUrl,
      baseColor,
      symbolism,
      price,
      elementIds: selectedElements
    }

    await handleUpdateKoiFish(updatedKoi)
  }

  return (
    <div className={styles['update-fish-modal']}>
      <h2>Update Koi Fish</h2>
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
        <div className={styles['checkbox-group']}>
          <label htmlFor='elements'>Elements:</label>
          <div className={styles['checkbox-container']}>
            {elements.map((element) => (
              <div key={element.id} className={styles['checkbox-item']}>
                <input
                  type='checkbox'
                  id={`element-${element.id}`}
                  value={element.id}
                  checked={selectedElements.includes(element.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedElements([...selectedElements, element.id])
                    } else {
                      setSelectedElements(selectedElements.filter((id) => id !== element.id))
                    }
                  }}
                  className={styles['checkbox']}
                />
                <label htmlFor={`element-${element.id}`} className={styles['checkbox-label']}>
                  {element.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['button-group']}>
          <button type='submit'>Update Koi Fish</button>
          <button type='button' onClick={() => navigate('/admin/manage/manage-fish')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFish
