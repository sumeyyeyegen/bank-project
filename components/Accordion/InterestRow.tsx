import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

interface PropTypes {
  selectedType: any,
  selectedOption: any,
  rate: any
}

const InterestRow = ({ selectedType, selectedOption, rate }: PropTypes) => {
  return (
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
  )
}

export default InterestRow