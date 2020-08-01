import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriesRepository from '../../../repositories/categories';

function RegisterCategory() {
  const initialValues = {
    title: '',
    description: '',
    color: '#0000',
  };

  const { values, handleFormInputChange } = useForm(initialValues);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    categoriesRepository.getAll()
      .then((allCategories) => {
        setCategories(allCategories);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Nova Categoria</h1>

      <form
        onSubmit={function handleSubmit(eventInfo) {
          eventInfo.preventDefault();
          setCategories([...categories, values]);

          categoriesRepository.create({
            title: values.title,
            description: values.description,
            color: values.color,
          })
            .then(() => {
              history.push('/');
            });
        }}
      >
        <FormField
          label='Título'
          name='title'
          value={values.title}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Descrição'
          type='textarea'
          name='description'
          value={values.description}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Cor'
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
