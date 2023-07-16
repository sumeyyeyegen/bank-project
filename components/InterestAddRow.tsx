import React, { useState, useEffect } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { fetchWrapper } from '../helpers'
import Alert from '../helpers/Alert'

import { useDispatch, useSelector } from 'react-redux'
import { setFilteredBankInterests } from '../redux/reducers/AccordionReducer'

interface PropTypes {
  bankId: any,
  bankName: String,
  decrement: Function,
  index: number
}

const InterestAddRow = ({ bankId, bankName, decrement, index }: PropTypes) => {
  const dispatch = useDispatch();
  const filteredBankInterests = useSelector((state: any) => state.accordion.filteredBankInterests)
  const [interestRate, setInterestRate] = useState()
  const [selectedType, setSelectedType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [updatedOption, setUpdatedOption] = useState([]);

  const [interestAddRes, setInterestAddRes] = useState<any>()

  const [filteredOptionList, setFilteredOptionList] = useState({ id: "", type: "", options: [] })

  const bankList = useSelector((state: any) => state.bank.bankList);

  const [selectListItems, setSelectListItems] = useState([
    {
      id: 1, type: "Konut", options: [
        { typeId: 6, period: "5 yıl", selected: false },
        { typeId: 7, period: "10 yıl", selected: false }]
    },
    {
      id: 2, type: "Tüketici", options: [
        { typeId: 3, period: "12 ay", selected: false },
        { typeId: 4, period: "24 ay", selected: false },
        { typeId: 5, period: "36 ay", selected: false }]
    },
    {
      id: 3, type: "Mevduat", options: [
        { typeId: 1, period: "3 ay", selected: false },
        { typeId: 2, period: "6 ay", selected: false },
        { typeId: 3, period: "12 ay", selected: false }]
    }
  ])

  const [selectListTypes, setSelectListTypes] = useState([
    { id: 1, type: "Konut" },
    { id: 2, type: "Tüketici" },
    { id: 3, type: "Mevduat" }
  ])


  const handleChangeType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const handleChangeOption = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {

    filteredOptionList.options.map((item: any) => {
      item.typeId === selectedOption ? item.selected = true : false
    })
    setFilteredOptionList(filteredOptionList);

    let allData = { bank_id: bankId, interest: Number(data.interest), time_option: data.time_option, credit_type: data.credit_type };


    let token = Cookies.get("token");

    fetchWrapper.post("http://localhost:81/api/interests", token, allData).then(res => {
      dispatch(setFilteredBankInterests([...filteredBankInterests, res.data.data]))
      // dispatch(setBankList([...bankList, res.data.data]))
      setInterestAddRes(res.data)
    }).catch(err => {

      err?.response?.data?.message === 'Can not insert, same time option type for same credit type!!!' ? Alert().Info("Aynı krediye aynı süre değeri ile faiz oranı eklenemez.") : ""
    })
  }

  useEffect(() => {

    let filtered: any = selectListItems.filter((item: any) => {
      return item.id === selectedType
    })

    setFilteredOptionList(filtered[0]);
  }, [selectedType, selectListItems])

  function handleInterestRate(event: any) {
    setInterestRate(event.target.value);
  }


  useEffect(() => {
    let filtered = bankList.filter((item: any) => {

      return item?.id === bankId;
    })

    setFilteredBankInterests(filtered[0]?.interests);
    Control()
  }, [bankList, bankId])


  useEffect(() => {
    Control();
  }, [filteredBankInterests])

  useEffect(() => {

    let list = bankList.filter((item: any) => {
      console.log(bankId)
      console.log(item)
      return item?.id !== bankId;
    })
  }, [])

  useEffect(() => {
    interestAddRes !== null && interestAddRes?.status === "success" ? Alert().Success("Ekleme işlemi başarılı") : ""
    setInterestAddRes(undefined);

    // Alert().Error("Bir sorun oluştu");
  }, [interestAddRes])


  function Control() {
    filteredBankInterests?.length && filteredBankInterests.map((item: any) => {
      selectListItems.map((selectItem: any) => {
        selectItem.options.map((opt: any) => {
          if (item.credit_type === selectItem.id) {
            if (item.time_option === opt.typeId) {
              opt.selected = true;
            }
          }
        })

      })

    })


    setSelectListItems(selectListItems);
  }

  return (
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
              onChange={handleChangeType}
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
              onChange={handleChangeOption}
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
              {...register("interest")}
              defaultValue=""
              value={interestRate}
              variant="outlined"
              onChange={handleInterestRate}

            />
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 d-flex">
          <FormControl fullWidth>
            <Button variant="outlined" type='submit' sx={{ padding: "15px", marginRight: "5px" }}>Kaydet</Button>
          </FormControl>
          <FormControl fullWidth>
            <Button variant="outlined" type='button' color='error' sx={{ padding: "15px" }} onClick={() => decrement(index)}>Sil</Button>
          </FormControl>
        </div>
      </div>
    </form >
  )
}

export default InterestAddRow