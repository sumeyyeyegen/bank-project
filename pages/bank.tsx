import React, { FC } from 'react'
import AccordionComponent from '../components/Accordion'
import Button from '@mui/material/Button';
import { fetchWrapper } from '../helpers/wrapper';
import { GetServerSideProps } from 'next';

interface BankProps {
  bankName: string
}

interface BanksProps {
  array: BankProps[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  var allBanks: any = [];
  let data: any = fetchWrapper.get(`http://localhost/api/banks`).then(res => res)
  console.log(data);

  // const res = await fetch(
  //   'http://localhost/api/banks');
  allBanks = await data?.data;

  // Sending fetched data to the page component via props.
  return {
    props: {
      allBankList: allBanks?.length > 0 && allBanks.map((bank: any) => { return { bankName: bank?.bank_name } })
    }
  }
}

const Bank: FC<BanksProps | any> = ({ allBankList }) => {
  console.log(allBankList);

  return (
    <div className='card'>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>Banka Listesi</h3>
        <Button color="secondary" sx={{ backgroundColor: "#E5D1FF" }}>Banka Ekle</Button>
      </div>
      <div className="card-body">
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