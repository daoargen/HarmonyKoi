import React, { useState } from 'react'
import CreateFish from '../../pages/AdminPage/MangeFish/createFish/createFish'
import { KoiFishAttributes } from '../../types/koiFish.type'

const ParentComponent: React.FC = () => {
  const [koiFishData, setKoiFishData] = useState<KoiFishAttributes[]>([])
  const [currentKoi, setCurrentKoi] = useState<KoiFishAttributes | null>(null)

  const onSave = (savedKoi: KoiFishAttributes) => {
    setKoiFishData((prevData) => {
      const existingKoiIndex = prevData.findIndex((koi) => koi.id === savedKoi.id)
      if (existingKoiIndex !== -1) {
        // Update existing Koi fish
        const updatedData = [...prevData]
        updatedData[existingKoiIndex] = savedKoi
        return updatedData
      } else {
        // Add new Koi fish
        return [...prevData, savedKoi]
      }
    })
  }

  const closeModal = () => {
    setCurrentKoi(null)
  }

  return (
    <div>
      <button onClick={() => setCurrentKoi(null)}>Create New Koi Fish</button>
      {koiFishData.map((koi) => (
        <div key={koi.id}>
          <h3>{koi.name}</h3>
          <button onClick={() => setCurrentKoi(koi)}>Edit</button>
        </div>
      ))}
      {currentKoi !== null && <CreateFish koi={currentKoi} onSave={onSave} />}
    </div>
  )
}

export default ParentComponent
