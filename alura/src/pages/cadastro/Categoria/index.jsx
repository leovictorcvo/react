import React, { useState, useEffect } from 'react';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import CategoriesTable from '../../../components/CategoriesTable';

import { getAllCategories, saveCategory, deleteCategory } from '../../../repositories/categories';
import { standardize_color } from '../../../utils/color';
import { handleError } from '../../../utils/error';

const initialValue = {
  id: 0,
  titulo: '',
  cor: '#ffffff',
  descricao: '',
  url: '',
};

const Categoria = () => {
  const [category, setCategory] = useState(initialValue);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories([...data]))
      .catch((error) => handleError(error));
  }, []);

  const handleChange = (evt) => {
    const { value } = evt.target;
    const key = evt.target.getAttribute('name');

    setCategory({
      ...category,
      [key]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const updating = category.id > 0;
    saveCategory(category)
      .then((data) => {
        if (updating) {
          setCategories(categories.map((cat) => (cat.id === data.id ? data : cat)));
        } else {
          setCategories([...categories, data]);
        }
        setCategory(initialValue);
      })
      .catch((error) => handleError(error));
  };

  const handleEditCategory = (id) => {
    const { titulo, cor, link_extra } = categories.find((cat) => cat.id === id);
    setCategory({
      id,
      titulo,
      cor: standardize_color(cor),
      descricao: link_extra ? link_extra.text : '',
      url: link_extra ? link_extra.url : '',
    });
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== id));
      })
      .catch((error) => handleError(error));
  };

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Titulo"
          type="text"
          name="titulo"
          value={category.titulo}
          onChange={handleChange}
        />
        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={category.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Url"
          type="text"
          name="url"
          value={category.url}
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={category.cor}
          onChange={handleChange}
        />
        <Button color="var(--white)" backgroundColor="var(--primary)">
          Salvar
        </Button>
        <Button color="var(--black)" backgroundColor="var(--blackLighter)">
          Limpar
        </Button>
      </form>

      <CategoriesTable
        categories={categories}
        handleDelete={handleDeleteCategory}
        handleEdit={handleEditCategory}
      />
    </PageDefault>
  );
};

export default Categoria;
