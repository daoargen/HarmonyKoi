'use client'

import React, { useState } from 'react'
import styles from './PaymentModal.module.css'

interface PaymentInfo {
  accountNumber: string
  bank: string
  amount: number
  description: string
}

export default function PaymentButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const paymentInfo: PaymentInfo = {
    accountNumber: '0765423178',
    bank: 'MBbank',
    amount: 100000,
    description: 'Ủng hộ quỹ bảo trợ trẻ em'
  }

  const handlePayment = () => {
    // Implement payment logic here
    console.log('Processing payment...')
    setIsOpen(false)
  }

  return (
    <div className={styles.paymentContainer}>
      <button onClick={() => setIsOpen(true)} className={styles.paymentButton}>
        Thanh toán
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Thông tin thanh toán</h2>
              <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={styles.icon}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <img
                src={`https://qr.sepay.vn/img?acc=${paymentInfo.accountNumber}&bank=${paymentInfo.bank}&amount=${paymentInfo.amount}&des=${encodeURIComponent(paymentInfo.description)}`}
                alt='QR Code thanh toán'
                className={styles.qrCode}
              />
              <div className={styles.paymentInfo}>
                <p>
                  <strong>Số tài khoản:</strong> {paymentInfo.accountNumber}
                </p>
                <p>
                  <strong>Ngân hàng:</strong> {paymentInfo.bank}
                </p>
                <p>
                  <strong>Số tiền:</strong> {paymentInfo.amount.toLocaleString()} VND
                </p>
                <p>
                  <strong>Nội dung:</strong> {paymentInfo.description}
                </p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={handlePayment} className={styles.confirmButton}>
                Thanh toán
              </button>
              <button onClick={() => setIsOpen(false)} className={styles.cancelButton}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
