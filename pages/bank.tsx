import React, { FC, useEffect, useState } from 'react'
import AccordionComponent from '../components/Accordion/Accordion'
import Button from '@mui/material/Button';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Modal from '../components/Modal';
import useModal from '../helpers/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { setBankList } from '../redux/reducers/bankReducer';

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
      // token: authorization,
      // token1: context.req.headers.cookie,
      allBankList: res.data.data
    }
  }
}


const Bank: FC<any> = ({ allBankList }) => {
  const bankList = useSelector((state: any) => state.bank.bankList);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBankList(allBankList))
  }, [allBankList])

  useEffect(() => {
    console.log(bankList);
  }, [bankList])


  const { isShowing, toggle } = useModal();
  return (
    <div className='card'>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>Banka Listesi</h3>
        <Button color="secondary" sx={{ backgroundColor: "#E5D1FF" }} onClick={toggle}>Banka Ekle</Button>
      </div>
      {
        isShowing ? <Modal
          hide={toggle} /> : null
      }
      <div className="card-body">
        {
          bankList.length > 0 ? <AccordionComponent /> : <div>Herhangi bir banka bulunmamaktadır.</div>
        }
      </div>


    </div>
  )
}

export default Bank