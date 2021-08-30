import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import FormikControl from '../FormComponents/FormikControl';

function Login() {
  const initialValues = {
    email: '',
    password: '',
  };
  const history = useHistory();

  const validationSchema = Yup.object({
    email: Yup.string().email().required('required'),
    password: Yup.string().min(7, 'at least 7 characters are required').required('Required'),
  });

  const onSubmit = async (values, isSubmittingProps) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, values);
      localStorage.setItem('authtoken', res.data.token);
      history.push('/dashboard');
    } catch (e) {
      if (e.message === 'Network Error') {
        alert(e.message);
      }
      alert(e.response.data);
    }
    isSubmittingProps.setSubmitting(false);
    isSubmittingProps.resetForm();
  };

  return (
    <>
      <h1 className="mb-3">Login</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {(formik) => (
          <Form>
            <Container>
              <FormikControl control="input" name="email" type="email" label="Email" />
              <FormikControl control="input" name="password" type="password" label="Password" />
              <Button type="submit" className="mt-2" disabled={formik.isSubmitting}>
                Submit
              </Button>
              <p className="mt-3">
                Don&apos;t have an account? <Link to="/register">Sign up</Link>
              </p>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
