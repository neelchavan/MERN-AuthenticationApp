import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import FormikControl from '../FormComponents/FormikControl';

function RegisterForm() {
  const history = useHistory();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('required'),
    email: Yup.string().email().required('required'),
    password: Yup.string().min(7, 'at least 7 characters are required').required('Required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, values);
      localStorage.setItem('authtoken', res.data.token);
      history.push('/dashboard');
    } catch (e) {
      alert(e);
    }

    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <>
      <h1 className="mb-3">Register</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {(formik) => (
          <Form>
            <Container>
              <FormikControl control="input" name="name" label="Name" />
              <FormikControl control="input" name="email" type="email" label="Email" />
              <FormikControl control="input" name="password" type="password" label="Password" />
              <Button type="submit" className="mt-2" disabled={formik.isSubmitting}>
                Submit
              </Button>
              <p className="mt-3">
                Already have an account? <Link to="/">Sign in</Link>
              </p>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
