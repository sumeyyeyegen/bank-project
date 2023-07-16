import React from 'react'
import { useSelector } from 'react-redux';

interface PropsTypes {
  bankId: any,
  bankName: String,
  interestAmount: String
}

const Accordion1Item = ({ bankId, bankName, interestAmount }: PropsTypes) => {
  const { selectedType, selectedOption } = useSelector((state: any) => state.credit);
  return (
    <div className='card p-4'>
      <div
        // aria-controls="panel1a-content"
        // id="panel1a-header"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >

        <h2>{bankName}</h2>
        <div className='d-flex align-items-end '>
          <h5 className='mb-3 mr-2'>Toplam Geri Ödeme:</h5>
          <h1>24.000</h1>
        </div>
      </div>
      <div className='d-flex align-items-end justify-content-center mt-3'>
        <h5 className='mr-2' style={{ marginBottom: "0.5em" }}>Hesaba Yatacak Tutar:  </h5>
        <h2>20.000</h2>
      </div>
      {selectedType !== "" && selectedOption !== "" ?
        <div className='d-flex align-items-end justify-content-center mt-3'>
          <h5 className='mr-2'>{selectedType === 1 ? "Konut Kredisi" : selectedType === 2 ? "Tüketici Kredisi" : ""} - </h5>
          <h5 className='mr-2'>{selectedType === 1 ? selectedOption === 6 ? "5 Yıl" : "10 Yıl" : selectedType == 2 ? selectedOption === 3 ? "12 Ay" : selectedOption === 4 ? "24 Ay" : "36 Ay" : ""} -</h5>
          <h5>{interestAmount} </h5>
        </div> : ""
      }
    </div>
  )
}

export default Accordion1Item