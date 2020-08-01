import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND}/categories`;

async function getAll(URL = URL_CATEGORIES) {
  const response = await fetch(URL);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error ${response.status}: ${response.statusText}`);
}

async function getAllWithVideos() {
  const categories = await getAll(`${URL_CATEGORIES}?_embed=videos`);
  return categories;
}

async function create(categoryObject) {
  const response = await fetch(URL_CATEGORIES, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(categoryObject),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error ${response.status}: ${response.statusText}`);
}

export default {
  getAllWithVideos,
  getAll,
  create,
};
