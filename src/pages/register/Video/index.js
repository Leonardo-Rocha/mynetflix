import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriesRepository from '../../../repositories/categories';

function RegisterVideo() {
  const initialValues = {
    title: '',
    url: '',
    category: '',
    description: '',
  };
  const { values, handleFormInputChange } = useForm(initialValues);

  const history = useHistory();

  const [categories, setCategories] = useState([]);

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
      <h1>Novo Video</h1>

      <form
        onSubmit={function handleSubmit(eventInfo) {
          eventInfo.preventDefault();
          const chosenCategory = categories.find((category) => category.title === values.category);
          let categoryId;
          if (chosenCategory === undefined) {
            alert('Categoria não reconhecida.');
            return;
          }

          categoryId = chosenCategory.id;

          videosRepository.create({
            title: values.title,
            url: values.url,
            categoryId,
            description: values.description,
          })
            .then(() => {
              history.push('/');
            });
        }}
      >
        <FormField
          label='Título '
          name='title'
          value={values.title}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Link do vídeo '
          name='url'
          value={values.url}
          onChange={handleFormInputChange}
        />

        <FormField
          label='Escolha uma categoria '
          name='category'
          value={values.category}
          onChange={handleFormInputChange}
          suggestions={categories.map(({ title }) => title)}
        />

        <FormField
          label='Descrição '
          type='textarea'
          name='description'
          value={values.description}
          onChange={handleFormInputChange}
        />

        <Button>Cadastrar</Button>
      </form>

      <Link to='/cadastro/categoria'>Cadastrar Categorias</Link>
    </PageDefault>
  );
}

export default RegisterVideo;
