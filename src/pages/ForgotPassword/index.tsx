import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface forgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  // const history = useHistory();

  const handleSubmit = useCallback(
    async (forgotPasswordData: forgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Invalid e-mail'),
        });

        await schema.validate(forgotPasswordData, {
          abortEarly: false,
        });

        const { email } = forgotPasswordData;

        await api.post('/password/forgot', {
          email,
        });

        // history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Recovery password send',
          description:
            'Check your e-mail address inbox, we send a request link',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error recovery the password',
          description:
            'Could not create a password recovery request, please try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Password Recovery</h1>
            <Input name="email" icon={FiMail} placeholder="E-Mail" />

            <Button loading={loading} type="submit">
              Send a recovery request
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Back to login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
