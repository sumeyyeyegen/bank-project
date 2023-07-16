
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { fetchWrapper } from '../../helpers'

export const addBank: any = createAsyncThunk(
  "bank/insert",
  async ({ bankName }: any, thunkAPI: any) => {

    var token = Cookies.get("token");
    var insertResponse: any = fetchWrapper.post("http://localhost:81/api/banks", token, { bank_name: bankName }).then(res => res)

    return insertResponse?.data
  }
)

export const bankReducer = createSlice({
  name: 'bank',
  initialState: {
    bankList: [],
    insertRes: {}
  },
  reducers: {
    setBankList: (state, payload) => {
      console.log(payload);
      state.bankList = payload.payload;
    },
    setInsertRes: (state, payload) => {
      state.insertRes = payload?.payload.data;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(addBank.fulfilled, (state, action) => {
      console.log(action.payload)
      state.insertRes = action?.payload
    }),
      builder.addCase(addBank.rejected, (state, action) => {
        console.log(action.payload)
        state.insertRes = action.payload
      })
  }
})

export const { setBankList, setInsertRes } = bankReducer.actions

export default bankReducer.reducer