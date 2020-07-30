import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function RegisterCategory() {
  const initialValues = {
    title: '',
    description: '',
    color: '#0000',
  };
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);

  function setValue(key, value) {
    setValues({ ...values, [key]: value });
  }

  function handleFormInputChange(info) {
    setValue(info.target.getAttribute('title'), info.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const URL = window.location.hostname.includes('localhost')
        ? 'http://localhost:8080/categorias'
        : 'https://mynetflix-backend.herokuapp.com/categorias';
      const response = await fetch(URL);
      const data = await response.json();
      setCategories([
        ...data,
      ]);
    }
    fetchData();
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form
        onSubmit={function handleSubmit(eventInfo) {
          eventInfo.preventDefault();
          setCategories([...categories, values]);
          setValues(initialValues);
        }}
      >
        <FormField
          label='Nome da categoria: '
          name='title'
          value={values.title}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Descrição: '
          type='textarea'
          name='description'
          value={values.description}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Cor: '
          type='color'
          name='color'
          value={values.color}
          onChange={handleFormInputChange}
        />

        <Button>Cadastrar</Button>
      </form>

      {categories.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categories.map((category, index) => {
          const key = `${category}${index}`;
          return <li key={key}>{category.title}</li>;
        })}
      </ul>

      <Link to='/'>Ir para home</Link>
    </PageDefault>
  );
}

export default RegisterCategory;
