import { configureStore } from '@reduxjs/toolkit'
import accordionReducer from './reducers/AccordionReducer'
import bankReducer from './reducers/bankReducer'
import creditReducer from './reducers/CreditReducer'

export default configureStore({
  reducer: {
    bank: bankReducer,
    accordion: accordionReducer,
    credit: creditReducer
  }
})