import React, { FC, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionItem from './AccordionItem';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
// interface AccordionProps {
//   index: number,
//   bankItem: string | any
// }

const AccordionComponent: FC<any> = () => {

  const bankList = useSelector((state: any) => state.bank.bankList);


  const [activeAccordion, setActiveAccordion] = useState({ id: "", bank_name: "" })

  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    bankList.length > 0 && bankList.map((bankItem: any, index: any) => {
      return <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index);
            setActiveAccordion(bankItem)
          }}
        >
          <Typography sx={{ marginRight: "10px", fontSize: "20px" }} >{bankItem?.bank_name}</Typography>
          {
            activeIndex === index ?
              <Button variant="outlined" color="error">
                Sil
              </Button> : ""
          }
        </AccordionSummary>

        {activeIndex === index &&
          <div>
            <Typography>
              <AccordionItem bankId={activeAccordion?.id} bankName={activeAccordion?.bank_name} />
            </Typography>
          </div>}
      </Accordion>
    })
  )
}

export default AccordionComponent