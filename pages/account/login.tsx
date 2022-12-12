import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { authService } from '../../services';
import { Field, Formik, Form } from 'formik';
import { FormItem } from '../../components';

export default Login;

interface Values {
  username: string,
  password: string
}


function Login() {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    let control = authService.userValue.getValue();

    if (control !== false && control !== null) {
      router.push('/');
    }
  }, []);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Kullanıcı adı zorunludur"),
    password: Yup.string()
      .required("Şifre girilmesi zorunludur")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: Values) {
    let dat = { username: data.username, password: data.password }
    return authService.login(dat)
      .then((res) => {
        // get return url from query parameters or default to '/'
        const returnUrl: string | any = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch((error: any) => {
        setError('apiError', { message: error.message });
      });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values: Values) => onSubmit(values)}
    >
      {formik => {
        const { touched, isValid, values, handleChange } = formik
        return (
          <div className="w-25 mx-auto">
            <div className="card">
              <div className="card-body">
                <Form >
                  <div className="form-group">
                    <FormItem errors={errors.username} isValid={isValid} touched={touched.username} formik={formik.errors.username} type="username" values={values.username} handleChange={handleChange} text="Kullanıcı Adı" />
                  </div>
                  <div className="form-group">
                    <FormItem errors={errors.password} isValid={isValid} touched={touched.password} formik={formik.errors.password} type="password" values={values.password} handleChange={handleChange} text="Şifre" />
                  </div>

                  <div className={`invalid-feedback ${errors.apiError?.message !== undefined && "d-block"}`}>
                    {errors?.apiError?.message !== undefined ? <>{errors.apiError?.message}</> : null}</div>


                  <button
                    disabled={formState.isSubmitting}
                    type="submit"
                    className="btn btn-primary">
                    {formState.isSubmitting &&
                      <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Giriş Yap
                  </button>
                </Form>
              </div>
            </div>
          </div>
        )
      }
      }
    </Formik>
  );
}
