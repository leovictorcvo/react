import React from 'react';
import PropTypes from 'prop-types';

import { Table, Button } from './style';

const CategoryTable = ({ categories, handleDelete, handleEdit }) => (
  <Table>
    <thead>
      <tr>
        <th>Titulo</th>
        <th>Descrição</th>
        <th>Cor</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>

    </thead>
    <tbody>
      {categories.map((cat) => (
        <tr key={cat.id}>
          <td>{cat.titulo}</td>
          <td>{cat.link_extra && cat.link_extra.text}</td>
          <td><div style={{ backgroundColor: cat.cor, width: '100%', height: 18 }} /></td>
          <td>
            <Button type="button" onClick={() => handleEdit(cat.id)}>Editar</Button>
          </td>
          <td>
            <Button type="button" onClick={() => handleDelete(cat.id)}>Excluir</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

CategoryTable.defaultProps = {
  categories: [],
};

CategoryTable.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
    link_extra: PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  })),
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default CategoryTable;
