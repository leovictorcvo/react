import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import DatePicker from './components/DatePicker';
import BannerInput from './components/BannerInput';

import { Container, SubmitButton } from './styles';
import { saveMeetupRequest } from '~/store/modules/meetup/actions';

const schema = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string().required('Favor informar o título do meetup'),
  description: Yup.string().required('Favor detalhar como vai ser o meetup'),
  date: Yup.date().required('Informe a data e hora do meetup'),
  location: Yup.string().required('Favor informar onde vai ser o meetup'),
});

export default function Meetup() {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.meetup);
  const [newBanner, setNewBanner] = useState(null);

  function handleSubmit(data) {
    if (newBanner) {
      data = { ...data, banner: newBanner };
    }

    console.tron.log('data', data);
    dispatch(saveMeetupRequest(data));
  }

  function bannerChanged(banner) {
    setNewBanner(banner);
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <Input name="id" hidden />
        <BannerInput name="banner" bannerChanged={bannerChanged} />
        <Input name="title" placeholder="Título do meetup" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <DatePicker name="date" />
        <Input name="location" placeholder="Localização" />
        <SubmitButton type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Salvar meetup</span>
        </SubmitButton>
      </Form>
    </Container>
  );
}
