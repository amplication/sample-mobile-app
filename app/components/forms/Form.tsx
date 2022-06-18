import React from 'react';
import { Formik } from 'formik';
import { FormProps } from '../../types';

const Form: React.FC<FormProps> = ({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;
