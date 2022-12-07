import React from 'react'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormik, Formik, FormikHelpers, Field, Form } from 'formik';
import { Input } from '@mui/material';
import { authService } from '../../services/auth'

interface Values {
  username: string,
  password: string
}

const Login = () => {
  const router = useRouter();

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Kullanıcı adı zorunludur"),
    password: Yup.string()
      .required("Şifre girilmesi zorunludur")
  });

  const formOptions = { resolver: yupResolver(schema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);

  const { errors, touchedFields } = formState;

  function onSubmit(data: Values) {

    return authService.login(data)
      .then((res) => {
        res.status === "success" ? router.push("/") : ""

      })
      .catch(error => {
        console.log(error);

        setError('apiError', { message: error });
      });
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values: Values) => onSubmit(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
        console.log(touched);
        console.log(formik.errors);

        return (
          <div className="w-25 mx-auto">
            <div className="card">
              <div className="card-body">
                <Form>
                  <div className="form-group">
                    <label htmlFor="username">Kullanıcı Adı</label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      onChange={handleChange}
                      value={values.username}
                    />
                    <div className={`invalid-feedback ${isValid !== true && touched.username && "d-block"}`}>{isValid !== true && touched.username ? <div>{formik.errors.username}</div> : null}</div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="password">Şifre</label>
                    <Field
                      id="password"
                      name="password"
                      type="text"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <div className={`invalid-feedback ${isValid !== true && touched.password && errors?.apiError?.message === undefined && "d-block"}`}>{isValid !== true && touched.password && errors?.apiError?.message === undefined ? <div>{formik.errors.password}</div> : null}</div>
                    <div className={`invalid-feedback ${errors.apiError?.message !== undefined && "d-block"}`}>{errors?.apiError?.message !== undefined ? "Invalid Password" : null}</div>
                  </div>
                  <button type="submit">Giriş Yap</button>
                </Form>
              </div>
            </div>
          </div>
        )
      }
      }
    </Formik>

    // </form>
  )
}

export default Login