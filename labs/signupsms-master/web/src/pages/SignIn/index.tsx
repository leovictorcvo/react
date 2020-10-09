import React, { useState, useCallback } from 'react';
import { FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { Container, Content, Logo, Background } from './styles';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const history = useHistory();
  const [isPosting, setIsPosting] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('Informe seu e-mail'),
    password: Yup.string().required('Informe sua senha'),
  });

  const form = useForm({ initialValues, schema });
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
      evt.preventDefault();
      try {
        setIsPosting(true);
        const response = await api.post('/session', form.values);
        signIn(response.data);
        history.push('/dashboard');
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
    [form.values, signIn, history],
  );

  return (
    <Container>
      <Content>
        <Logo src={logoImg} alt="Logotipo" />
        <form onSubmit={handleSubmit}>
          <h1>Informe seus dados</h1>
          <Input
            placeholder="E-mail"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            error={form.errors.email}
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
              Entrar
            </button>
          )}
        </form>
        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
