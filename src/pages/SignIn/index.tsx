import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>SignIn your season</h1>
        <input placeholder="E-Mail" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>

        <a href="forgot">Forget my passowrd</a>
      </form>
      <a href="register">
        <FiLogIn />
        Create account
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
