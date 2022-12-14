import React, { FC, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionItem from './AccordionItem';
interface AccordionProps {
  key: number,
  bankItem: string | any
}

const AccordionComponent: FC<AccordionProps | any> = ({ bankItem }) => {

  const [activeAccordion, setActiveAccordion] = useState({ id: "", bank_name: "" })

  return (
    <Accordion onClick={() => setActiveAccordion(bankItem)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{bankItem?.bank_name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <AccordionItem bankId={activeAccordion?.id} bankName={activeAccordion?.bank_name} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionComponent