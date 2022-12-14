
import React, { useState } from 'react'

import InterestRow from './InterestRow'
import InterestAddRow from '../InterestAddRow'

interface PropsTypes {
  bankId: any,
  bankName: String
}

const AccordionItem = ({ bankId, bankName }: PropsTypes) => {
  //TODO:
  const [filteredBankInterests, setFilteredBankInterests] = useState<object[]>([])

  return (<>
    <InterestAddRow filteredBankInterests={filteredBankInterests} setFilteredBankInterests={setFilteredBankInterests} bankId={bankId} bankName={bankName} />
    {
      filteredBankInterests?.length ? filteredBankInterests.map((bank: any, idx) => {
        return <InterestRow key={idx} selectedType={bank.credit_type} selectedOption={bank.time_option} rate={bank.interest} />
      }) : ""
    }
  </>
  )
}

export default AccordionItem