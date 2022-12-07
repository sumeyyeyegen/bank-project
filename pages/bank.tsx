import React, { FC, useEffect, useState } from 'react'
import AccordionComponent from '../components/Accordion'
import Button from '@mui/material/Button';
import { fetchWrapper } from '../helpers/wrapper';
import { GetServerSideProps } from 'next';

interface BankProps {
  bankName: string
}

interface BanksProps {
  arr: BankProps[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  // var allBanks: any = [];
  // fetchWrapper.get(`http://localhost:81/api/banks`).then((res: any) => allBanks.push(...res))

  const res = await fetch('http://localhost:81/api/banks',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzA0NDkzMDksImxldmVsIjoxLCJ1c2VySWQiOjEsInVzZXJuYW1lIjoicHJveG9sYWIifQ.nLnn3tDO3owt2zn2LLyxe7evi6uxmx5wZCIuxS4Rg1s"
      }
    }
  );
  var allBanks = await res.json();


  // res.map((item: any) => allBanks.push(item.bank_name))
  // allBanks = await allBanks.length > 0 ? allBanks.map((item: any) => item?.bank_name) : [{ bank_name: "İş" }]
  // console.log(allBanks);


  return {
    props: {
      allBankList: allBanks.data
    }
  }
}

const Bank: FC<BanksProps | any> = ({ allBankList }) => {

  return (
    <div className='card'>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>Banka Listesi</h3>
        <Button color="secondary" sx={{ backgroundColor: "#E5D1FF" }}>Banka Ekle</Button>
      </div>
      <div className="card-body">
        {/* {console.log(allBankList)}
        {console.log(fetchWrapper.get(`http://localhost:81/api/banks`).then(res => console.log(res)))} */}

        {
          allBankList.length > 0 ? allBankList.map((bank: any, idx: number) => {
            return <AccordionComponent key={idx} bankItem={bank} />
          }) : ""
        }

      </div>


    </div>
  )
}

export default Bank