
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { fetchWrapper } from '../../helpers'

export const accordionReducer = createSlice({
  name: 'bank',
  initialState: {
    bankList: [],
    insertRes: {},
    filteredBankInterests: []
  },
  reducers: {
    setBankList: (state, payload) => {
      console.log(payload);
      state.bankList = payload.payload;
    },
    setInsertRes: (state, payload) => {
      state.insertRes = payload?.payload.data;
    },
    setFilteredBankInterests: (state, payload) => {
      console.log(payload)
      state.filteredBankInterests = payload.payload;
    }
  },

  extraReducers: (builder) => {

  }
})

export const { setBankList, setInsertRes, setFilteredBankInterests } = accordionReducer.actions

export default accordionReducer.reducer
