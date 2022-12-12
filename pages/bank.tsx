import React, { FC, useEffect, useState } from 'react'
import AccordionComponent from '../components/Accordion'
import Button from '@mui/material/Button';
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface BankProps {
  bankName: string
}

interface BanksProps {
  arr: BankProps[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {

  const authorization = context.req.headers.cookie?.split("=")[1];

  // const authorization = Cookies.get("token");
  const requestOptions: Object = {
    method: 'GET',
    url: "http://localhost:81/api/banks",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": authorization
    }
  };

  const res: any = await axios(requestOptions).then((res: any) => res).catch(err => err)

  return {
    props: {
      token: authorization,
      token1: context.req.headers.cookie,
      allBankList: res.data.data
    }
  }
}


const Bank: FC<any> = ({ allBankList, token, token1 }) => {
  return (
    <div className='card'>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>Banka Listesi</h3>
        <Button color="secondary" sx={{ backgroundColor: "#E5D1FF" }}>Banka Ekle</Button>
      </div>
      <div className="card-body">
        {
          allBankList?.length > 0 ? allBankList.map((bank: any, idx: number) => {
            return <AccordionComponent key={idx} bankItem={bank} />
          }) : <div>Herhangi bir banka bulunmamaktadır.</div>
        }

      </div>


    </div>
  )
}

export default Bank