import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styles from '../styles/Modal.module.css';
import { Form, Formik } from "formik";
import { FormItem } from "./FormItem";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { fetchWrapper } from "../helpers";
import Cookies from "js-cookie";
import { bankReducer, setBankList, setInsertRes } from "../redux/reducers/bankReducer";
import { useDispatch, useSelector } from 'react-redux';
import Alert from "../helpers/Alert";

interface Values {
  bankName: string
}

interface PropTypes {
  hide: any
}

const Modal = ({ hide }: PropTypes) => {
  const dispatch = useDispatch();
  const bankList = useSelector((state: any) => state.bank.bankList);

  const validationSchema = Yup.object().shape({
    bankName: Yup.string()
      .required("Banka adı zorunludur")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);

  const { errors } = formState;

  function onSubmit(data: Values) {
    let dat = { bank_name: data.bankName }
    const authorization = Cookies.get("token");

    fetchWrapper.post("http://localhost:81/api/banks", authorization, dat).then((res) => {
      console.log(res)
      hide();
      dispatch(setInsertRes(res))
      dispatch(setBankList([...bankList, res.data.data]))
      Alert().Success("Ekleme işlemi başarılı")
    })
      .catch((error: any) => {
        setError('error', { message: error.message });
      });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ bankName: '' }}
      onSubmit={(values: Values) => onSubmit(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
        return (
          <Form>
            <div className={styles.modalOverlay1} />
            <div
              className={styles.modalWrapper1}
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className={styles.customModal}>
                <div className={styles.modalHeader1}>
                  <button
                    type="button"
                    className={styles.modalCloseButton}
                    data-dismiss="modal"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <p>
                  <div className="my-3">
                    <FormItem errors={errors.bankName} isValid={isValid} touched={touched.bankName} formik={formik.errors.bankName} type="bankName" values={values.bankName} handleChange={handleChange} text="Banka Adı" />
                  </div>
                  <button
                    disabled={formState.isSubmitting}
                    type="submit"
                    className="btn btn-success">
                    {formState.isSubmitting &&
                      <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Banka Ekle
                  </button>
                </p>
              </div>
            </div>
          </Form>
        )
      }
      }
    </Formik>
  );
};
export default Modal;
