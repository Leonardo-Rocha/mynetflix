import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function setValue(key, value) {
    setValues({ ...values, [key]: value });
  }

  function handleFormInputChange(info) {
    setValue(info.target.getAttribute('name'), info.target.value);
  }

  function clearForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleFormInputChange,
    clearForm,
  };
}

export default useForm;
