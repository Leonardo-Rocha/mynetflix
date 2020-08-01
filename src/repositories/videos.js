import config from '../config';

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

async function create(videoObject) {
  const response = await fetch(URL_VIDEOS, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(videoObject),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error(`Error ${response.status}: ${response.statusText}`);
}

export default {
  create,
};
