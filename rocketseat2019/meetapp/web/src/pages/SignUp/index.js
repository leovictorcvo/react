import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import Logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Favor informar o seu nome completo'),
  email: Yup.string()
    .email('E-mail com formato inválido')
    .required('Favor informar o e-mail'),
  password: Yup.string().required('Informe sua senha'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={Logo} alt="Meetapp" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Informe seu nome completo" />
        <Input name="email" placeholder="Informe seu e-mail" />
        <Input
          type="password"
          name="password"
          placeholder="Informe sua senha"
        />
        <button type="submit">
          {loading ? 'Enviando os dados...' : 'Criar conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
