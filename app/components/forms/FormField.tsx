import React from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../TextInput';
import { FormFieldProps } from '../../types';
import ErrorMessage from '../ErrorMessage';
import { TextInputProps } from 'react-native';

const FormField: React.FC<FormFieldProps & TextInputProps> = ({
  name,
  ...props
}) => {
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text: string) => setFieldValue(name, text)}
        value={values[name]}
        {...props}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormField;
