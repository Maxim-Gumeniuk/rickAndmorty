import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CharactersList } from './components/Characters/CharactersList';
import { LocationList } from './components/Locations/LocationList';
import { EpisodeList } from './components/Episodes/EpisodesList';
import { CardId } from './components/CardId/CardId';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<h1 className='home-title'>Rick and Morty</h1>} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path='Characters'>
              <Route index element={<CharactersList />} />
              <Route path=":CharactersId" element={<CardId />} />
            </Route>
            <Route path="Locations" element={<LocationList />} />
            <Route path="Episodes" element={<EpisodeList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
