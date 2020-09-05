import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassowrd: React.FC = () => {
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { search } = useLocation();

  const handleSubmit = useCallback(
    async (ResetPasswordData: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('The new password is required'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'The new password must match',
          ),
        });

        await schema.validate(ResetPasswordData, {
          abortEarly: false,
        });

        const token = search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const { password, password_confirmation } = ResetPasswordData;

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Your password was changed! Please try to login again.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Reset password error',
          description: 'Could not reset the password, please try again.',
        });
      }
    },
    [addToast, history, search],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New passowrd"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirm your new password"
            />
            <Button type="submit">Change password</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassowrd;
