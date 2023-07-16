import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchWrapper } from '../helpers';
import { setSelectedOption, setSelectedType } from '../redux/reducers/CreditReducer';
import AccordionComponent1 from './Accordion/Accordion1';

const CreditInterest = ({ allBankList }: any) => {

  const bankList = useSelector((state: any) => state.bank.bankList);
  const dispatch = useDispatch();
  const { selectedType, selectedOption } = useSelector((state: any) => state.credit);
  const [interestAmount, setInterestAmount] = useState()
  const [filteredOptionList, setFilteredOptionList] = useState({ id: "", type: "", options: [] })
  const [selectListItems, setSelectListItems] = useState([
    {
      id: 1, type: "Konut Kredisi", options: [
        { typeId: 6, period: "5 yıl", selected: false },
        { typeId: 7, period: "10 yıl", selected: false }]
    },
    {
      id: 2, type: "Tüketici Kredisi", options: [
        { typeId: 3, period: "12 ay", selected: false },
        { typeId: 4, period: "24 ay", selected: false },
        { typeId: 5, period: "36 ay", selected: false }]
    }
  ])



  const [selectListTypes, setSelectListTypes] = useState([
    { id: 1, type: "Konut" },
    { id: 2, type: "Tüketici" }
  ])


  const handleChangeType = (event: SelectChangeEvent) => {
    console.log(event)
    console.log(event.target.value)
    event && event.target.value &&
      dispatch(setSelectedType(event?.target?.value));
  };

  const handleInterestAmount = (e: any) => {
    setInterestAmount(e.target.value);
  }

  const handleChangeOption = (event: SelectChangeEvent) => {
    console.log(event)
    console.log(event.target.value)
    event && event.target.value &&
      dispatch(setSelectedOption(event?.target?.value));
  }

  const onSubmit = (data: any) => {

    console.log(data);

    filteredOptionList.options.map((item: any) => {
      item.typeId === selectedOption ? item.selected = true : false
    })
    setFilteredOptionList(filteredOptionList);

  }

  useEffect(() => {

    let filtered: any = selectListItems.filter((item: any) => {
      return item.id === selectedType
    })

    setFilteredOptionList(filtered[0]);
  }, [selectedType, selectListItems])

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row d-flex align-items-end mb-3'>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Kredi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedType}
              label="Kredi"
              {...register("credit_type")}
              onChange={(e) => handleChangeType(e)}
            >
              {
                selectListTypes.map((type: any) => {
                  return <MenuItem key={type.id} value={type.id}>{type.type}</MenuItem>
                })
              }

            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              label="Vade"
              {...register("time_option")}
              onChange={(e) => handleChangeOption(e)}
            >
              {
                filteredOptionList?.options?.length && filteredOptionList?.options?.map((item: any) => {
                  if (item.selected !== true) {
                    return <MenuItem key={item.typeId} value={item.typeId}>{item.period}</MenuItem>
                  }
                })
              }

            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <TextField
              required
              id="standard-required"
              label="Required"
              {...register("interestAmount")}
              defaultValue=""
              value={interestAmount}
              variant="outlined"
              onChange={handleInterestAmount}

            />
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 d-flex">
          <FormControl fullWidth>
            <Button variant="outlined" type='submit' sx={{ padding: "15px", marginRight: "5px" }}>Bul</Button>
          </FormControl>
        </div>
      </div>
    </form >
    <AccordionComponent1 interestAmount={interestAmount} allBankList={allBankList} />
  </>
  )
}

export default CreditInterest