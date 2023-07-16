import React, { FC, useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionItem from './AccordionItem';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Accordion1Item from './Accordion1Item';
// interface AccordionProps {
//   index: number,
//   bankItem: string | any
// }

const AccordionComponent1: FC<any> = ({ allBankList, interestAmount }) => {

  const bankList = useSelector((state: any) => state.bank.bankList);


  const [activeAccordion, setActiveAccordion] = useState({ id: "", bank_name: "" })

  const [activeIndex, setActiveIndex] = useState(-1);

  const { selectedType, selectedOption } = useSelector((state: any) => state.credit);

  const [filteredBankInfo, setFilteredBankInfo] = useState<any[]>([])

  useEffect(() => {
    let filteredData = bankList.length > 0 ? bankList.map((bank: any) => {
      return bank.interests.filter((item: any) => {
        return item.credit_type === selectedType && item.time_option === selectedOption
      })
    }) : ""

    setFilteredBankInfo([...filteredData]);
    console.log(filteredData)
  }, [selectedType, selectedOption, activeIndex])

  function Calculate(bankInfo: Array<any> | any, interestAmount: String) {
    if (bankInfo.length !== 0) {
      let expiry: any = bankInfo[0].credit_type === 1 ? bankInfo[0].time_option === 6 ? 60 : bankInfo[0].time_option === 7 && 120 : bankInfo[0].credit_type === 2 ? bankInfo[0].time_option === 3 ? 12 : bankInfo[0].time_option === 4 ? 24 : bankInfo[0].time_option === 5 ? 36 : 0 : 0

      console.log(interestAmount)
      console.log(bankInfo[0]?.interest)
      console.log(expiry)
      let main = Number(interestAmount) * (bankInfo[0]?.interest) * expiry
      return main;
    }

  }

  const [payBack, setPayBack] = useState([]);
  const [totals, setTotals] = useState<never[]>([])

  useEffect(() => {
    let data: Array<number> | any = filteredBankInfo.map((item: any) => {
      var data = Calculate(item, interestAmount);
      return data;
    })
    setPayBack(data)
  }, [filteredBankInfo, interestAmount])

  const total = (interest: any, money: any) => {
    console.log(interest);
    console.log(Number(money));
    let tot: any = Number(interest) + Number(money)
    console.log(tot)
    return tot
  }

  useEffect(() => {
    let tot: Array<number> | any = payBack.map((item: any) => {
      var tot = total(item, interestAmount);
      return tot;
    })
    setTotals(tot);
  }, [payBack])

  return (
    bankList?.length > 0 && bankList.map((bankItem: any, index: any) => {
      return <Accordion key={index}>
        <div className='p-3'>
          <div
            // aria-controls="panel1a-content"
            // id="panel1a-header"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >

            <Typography sx={{ marginRight: "10px", fontSize: "18px" }} >{bankItem?.bank_name}</Typography>
            <div className='d-flex align-items-end'>
              <Typography sx={{ fontSize: "14px", marginRight: "5px", marginBottom: "6px" }} >Toplam Geri Ödeme:</Typography>
              <Typography sx={{ marginRight: "10px", fontSize: "28px" }} >{totals[index] !== undefined && totals[index] !== "NAN" && !Number.isNaN(totals[index]) ? totals[index] : ""}</Typography>
            </div>
          </div>
          <div className='text-primary d-flex justify-content-center p-0' style={{ fontSize: 11 }}  ><AccordionSummary onClick={() => activeIndex === index ? setActiveIndex(-1) : (
            setActiveIndex(index),
            setActiveAccordion(bankItem)
          )
          }>Detay için tıklayınız</AccordionSummary></div>

        </div>
        {
          activeIndex === index ?
            <div>
              <Typography>
                <div className='container-personal'>
                  <Accordion1Item bankId={activeAccordion?.id} bankName={activeAccordion?.bank_name} interestAmount={interestAmount} />
                </div>
              </Typography>
            </div> : "testt"
        }
      </Accordion >
    })
  )
}

export default AccordionComponent1