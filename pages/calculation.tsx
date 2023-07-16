import React, { FC, useEffect } from 'react'
import Tabs from '../components/Tabs'
import { fetchWrapper } from '../helpers';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { setBankList } from '../redux/reducers/AccordionReducer';

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

  const res: any = await fetchWrapper.get("http://localhost:81/api/banks", authorization).then((res: any) => res).catch((err: any) => err)

  return {
    props: {
      // token: authorization,
      // token1: context.req.headers.cookie,
      allBankList: res.data.data
    }
  }
}


const Calculation: FC<any> = ({ allBankList }) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBankList(allBankList))
  }, [allBankList])

  return (
    <div>
      <Tabs allBankList={allBankList} />
    </div>
  )
}

export default Calculation