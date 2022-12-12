import { configureStore } from '@reduxjs/toolkit'
import bankReducer from './reducers/bankReducer'

export default configureStore({
  reducer: {
    bank: bankReducer
  }
})