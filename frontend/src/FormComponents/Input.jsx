/* eslint-disable react/prop-types */
import React from 'react';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div>
          <Form.Group>
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control
              as="input"
              name={name}
              {...rest}
              {...field}
              isInvalid={form.errors[name] && form.touched[name]}
            />
            <Form.Text style={{ color: 'red' }}>
              {form.touched[name] && form.errors[name]}
            </Form.Text>
          </Form.Group>
        </div>
      )}
    </Field>
  );
}

export default Input;
