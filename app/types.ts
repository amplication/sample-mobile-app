import * as Yup from 'yup';

export interface ButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  onPress: () => void;
}

export interface FormProps {
  children: React.ReactNode;
  initialValues: {
    email: string;
    password: string;
    name?: string;
  };
  onSubmit: (userInfo?: any) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any, any, any, any>;
}

export interface FormFieldProps {
  name: string;
  icon?: string;
}

export interface RootStackProps {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
}
