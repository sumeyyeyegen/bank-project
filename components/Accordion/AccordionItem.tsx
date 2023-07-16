
import React, { useEffect, useState } from 'react'

import InterestRow from './InterestRow'
import InterestAddRow from '../InterestAddRow'
import { useDispatch, useSelector } from 'react-redux'
import { setFilteredBankInterests } from '../../redux/reducers/AccordionReducer'
import Button from '@mui/material/Button'

interface PropsTypes {
  bankId: any,
  bankName: String
}

const AccordionItem = ({ bankId, bankName }: PropsTypes) => {

  const [rows, setRows] = useState<Object[] | any>([{ index: 0 }])
  const [rowPiece, setRowPiece] = useState(1)
  const dispatch = useDispatch();
  const bankList = useSelector((state: any) => state.bank.bankList);
  const [show, setShow] = useState(true);

  const increment = () => {
    setRowPiece(rowPiece + 1);
    let data = rows;
    console.log(rows);

    console.log(rows.length)
    data.push({ index: rows.length });
    setRows([...data])
    console.log(rows)
  }

  const decrement = (index: number) => {
    console.log(index)
    setRowPiece(rowPiece - 1);
    let data = rows.filter((row: any, idx: number) => {
      return idx !== index
    })
    console.log(data)
    setRows([...data]);
  }

  useEffect(() => {
    let filtered = bankList.filter((item: any) => {

      return item?.id === bankId;
    })

    dispatch(setFilteredBankInterests(filtered[0]?.interests))
  }, [bankList, bankId])

  const filteredBankInterests = useSelector((state: any) => state.accordion.filteredBankInterests);
  return (<>
    <div className='d-flex justify-content-end mb-4'>
      <Button onClick={() => increment()} variant="contained" sx={{ padding: 0 }}><h2 className='mb-0 my-2'>+</h2></Button>
    </div>
    {console.log(rows)}
    {rows.length > 0 ? rows.map((row: any, idx: any) => {
      return <InterestAddRow decrement={decrement} key={idx} index={idx} bankId={bankId} bankName={bankName} />
    }) : ""
    }
    {
      filteredBankInterests?.length > 0 ? filteredBankInterests.map((bank: any, idx: any) => {
        return <InterestRow key={idx} selectedType={bank.credit_type} interestId={bank.id} bankId={bank.bank_id} selectedOption={bank.time_option} rate={bank.interest} />
      }) : ""
    }

  </>
  )
}

export default AccordionItem