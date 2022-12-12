import { Field } from 'formik'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface formItemPropTypes {
  // register: Function,
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
  isValid: Boolean,
  touched: Boolean | undefined,
  formik: String | undefined,
  type: String,
  handleChange: Function,
  values: String | undefined
}

export { FormItem };

const FormItem = ({ errors, isValid, touched, formik, type, handleChange, values }:
  formItemPropTypes) => {
  return <div className="form-group">
    <label className='text-capitalize' htmlFor={`${type}`}>{type}</label>
    <Field id={`${type}`} type="text" className={`form-control ${errors ? 'is-invalid' : ''}`} onChange={handleChange}
      value={values} />
    <div className={`invalid-feedback ${isValid !== true && touched && "d-block"}`}>{isValid !== true && touched ? <div>{formik}</div> : null}</div>
  </div>
}
