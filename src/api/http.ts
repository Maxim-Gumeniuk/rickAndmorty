import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getAllCharacters = () => {
  return axios(`${BASE_URL}/character`)
    .then(data => data.data)
    .then(respone => respone.results)
    .catch(e => console.log(e));
};

export const getCharactersById = (param: number) => {
  return axios(`${BASE_URL}/character/${param}`)
    .then(data => data.data)
    .catch(e => console.log(e));
};

export const getAllLocation = () => {
  return axios(`${BASE_URL}/location`)
    .then(data => data.data)
    .then(respone => respone.results)
    .catch(e => console.log(e));
};


export const getAllEpisodes = () => {
  return axios(`${BASE_URL}/episode`)
    .then(data => data.data)
    .then(respone => respone.results)
    .catch(e => console.log(e));
};
