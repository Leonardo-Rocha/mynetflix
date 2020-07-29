import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function RegisterCategory() {
  const initialValues = {
    name: '',
    description: '',
    color: '#0000',
  };
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([initialValues]);

  function setValue(key, value) {
    setValues({ ...values, [key]: value });
  }

  function handleFormInputChange(info) {
    setValue(info.target.getAttribute('name'), info.target.value);
  }

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form
        onSubmit={function handleSubmit(eventInfo) {
          eventInfo.preventDefault();
          console.table(values);
          setCategories([...categories, values]);
          setValues(initialValues);
        }}
      >
        <FormField
          label="Nome da categoria: "
          type="text"
          name="name"
          value={values.name}
          onChange={handleFormInputChange}
        />

        <FormField
          label="Descrição: "
          type="text"
          name="description"
          value={values.description}
          onChange={handleFormInputChange}
        />

        <FormField
          label="Cor: "
          type="color"
          name="color"
          value={values.color}
          onChange={handleFormInputChange}
        />

        <button>Cadastrar</button>
      </form>

      <ul>
        {categories.map((categoria, index) => {
          if (categoria.name !== '')
            return <li key={`${categoria}${index}`}>{categoria.name}</li>;
          else return '';
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default RegisterCategory;
