import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWrapper } from '../../helpers';
import Alert from '../../helpers/Alert';
import { setFilteredBankInterests } from '../../redux/reducers/AccordionReducer';

interface PropTypes {
  selectedType: any,
  selectedOption: any,
  rate: any,
  bankId: number,
  interestId: number
}

const InterestRow = ({ selectedType, selectedOption, rate, bankId, interestId }: PropTypes) => {

  const filteredBankInterests = useSelector((state: any) => state.accordion.filteredBankInterests);
  const dispatch = useDispatch();

  const { handleSubmit } = useForm();
  const [deleteRes, setDeleteRes] = useState()

  const onSubmit = () => {
    let token = Cookies.get("token");
    console.log(bankId)
    console.log(interestId)

    let data = { id: interestId, bank_id: bankId }
    Alert().Question((r: any) => {
      if (r) {
        fetchWrapper.delete("http://localhost:81/api/interests", token, data).then(res => {
          console.log(res)
          setDeleteRes(res)
        })
      }
    })

  }

  useEffect(() => {
    if (deleteRes !== undefined && deleteRes?.status === 200) {
      let newArr = filteredBankInterests.filter((item: any) => {
        return item.id !== interestId
      })

      console.log(newArr)
      dispatch(setFilteredBankInterests([...newArr]))
      Alert().Success("Silme işlemi başarılı")
    }
    setDeleteRes(undefined);
  }, [deleteRes])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row d-flex align-items-end mb-3'>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <TextField
              defaultValue={selectedType === 1 ? "Konut Kredisi" : selectedType === 2 ? "Tüketici Kredisi" : "Mevduat Kredisi"}
              label="Kredi"
            >
            </TextField>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <TextField
              defaultValue={selectedOption === 1 ? "3 Ay" : selectedOption === 2 ? "6 Ay" : selectedOption === 3 ? "12 Ay" : selectedOption === 4 ? "24 Ay" : selectedOption === 5 ? "36 Ay" : selectedOption === 6 ? "5 Yıl" : "10 Yıl"}
              label="Vade"
            />

          </FormControl>
        </div>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <TextField
              required
              id="standard-required"
              defaultValue={rate}
              variant="outlined"
            />
          </FormControl>
        </div>
        <div className="col-12 col-sm-3">
          <FormControl fullWidth>
            <Button variant="outlined" type='submit' sx={{ padding: "15px" }}>Sil</Button>
          </FormControl>
        </div>
      </div>
    </form>
  )
}

export default InterestRow