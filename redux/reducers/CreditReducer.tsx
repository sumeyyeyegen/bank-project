
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { fetchWrapper } from '../../helpers'

export const creditReducer = createSlice({
  name: 'bank',
  initialState: {
    bankList: [],
    insertRes: {},
    selectedType: "",
    selectedOption: ""
  },
  reducers: {
    setBankList: (state, payload) => {
      console.log(payload);
      state.bankList = payload.payload;
    },
    setInsertRes: (state, payload) => {
      state.insertRes = payload?.payload.data;
    },
    setSelectedType: (state, payload) => {
      state.selectedType = payload.payload;
    },
    setSelectedOption: (state, payload) => {
      state.selectedOption = payload.payload
    }
  },

  extraReducers: (builder) => {

  }
})

export const { setBankList, setInsertRes, setSelectedType, setSelectedOption } = creditReducer.actions

export default creditReducer.reducer