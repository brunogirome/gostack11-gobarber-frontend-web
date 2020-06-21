import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface registerData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (SignInData: registerData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Invalid e-mail'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(SignInData, {
          abortEarly: false,
        });

        await signIn(SignInData);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            'Could not login to the application, check the credentials',
        });
      }
    },
    [signIn, addToast],
  );
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>SignIn your season</h1>
          <Input name="email" icon={FiMail} placeholder="E-Mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Login</Button>

          <a href="forgot">Forget my passowrd</a>
        </Form>
        <a href="register">
          <FiLogIn />
          Create account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
