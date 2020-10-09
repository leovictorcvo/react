import React, { useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Container, Content, ConfirmContent, Logo, Background } from './styles';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';
import useForm from '../../hooks/useForm';

const SignUp: React.FC = () => {
  const [isPosting, setIsPosting] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    confirmationToken: '',
    password: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('Informe seu nome completo'),
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('Informe seu e-mail'),
    phone: Yup.string().required('Informe seu telefone celular'),
    confirmationToken: Yup.string().required('Informe o código de validação'),
    password: Yup.string().required('Informe sua senha'),
  });

  const form = useForm({ initialValues, schema });

  const handleCheckPhone = useCallback(
    async (
      evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): Promise<void> => {
      evt.preventDefault();
      try {
        setIsPosting(true);
        const { phone } = form.values;
        await api.post('/confirmation', { phone });
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
      } finally {
        setIsPosting(false);
      }
    },
    [form.values],
  );

  const handleSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
      evt.preventDefault();
      try {
        setIsPosting(true);
        const response = await api.post('/users', form.values);
        // eslint-disable-next-line no-console
        return console.log(response.data);
      } catch (error) {
        if (error.response) {
          return alert(error.response.data.message);
        }
        return alert(error.message);
      } finally {
        setIsPosting(false);
      }
    },
    [form.values],
  );

  return (
    <Container>
      <Background />
      <Content>
        <Logo src={logoImg} alt="Logotipo" />
        <form onSubmit={handleSubmit}>
          <h1>Informe seus dados</h1>
          <Input
            placeholder="Nome completo"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            error={form.errors.name}
          />
          <Input
            placeholder="E-mail"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            error={form.errors.email}
          />
          <ConfirmContent>
            <Input
              placeholder="Celular"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              error={form.errors.phone}
            />
            <button
              type="button"
              disabled={!form.values.phone || isPosting}
              onClick={handleCheckPhone}
            >
              Confirmar
            </button>
          </ConfirmContent>
          <Input
            placeholder="Código de validação"
            name="confirmationToken"
            value={form.values.confirmationToken}
            onChange={form.handleChange}
            error={form.errors.confirmationToken}
          />
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            error={form.errors.password}
          />
          {isPosting ? (
            <button type="button" disabled>
              Aguarde...
            </button>
          ) : (
            <button
              type="submit"
              disabled={Object.keys(form.errors).length > 0}
            >
              Salvar
            </button>
          )}
        </form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
