import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CharactersList } from './components/Characters/CharactersList';
import { Header } from './components/Header/Header';
import { EpisodeList } from './components/Episodes/EpisodesList';
import { LocationList } from './components/Locations/LocationList';
import { Characters } from './types/Characters';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Loader } from './components/Loader/Loader';
import { CardId } from './components/CardId/CardId';

function App() {
  const [characterOnId, setCharacterOnId] = useState<Characters | null>(null);
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 1000);

  return (
    <>
      {loading ?
        (
          <div className="wrapper">
            <div className="top">
              <Header />
            </div>
            <div className="content">
              <Routes>
                <Route path="/rickAndmorty" element={<h1 className='home-title'>Rick and Morty</h1>} />
                <Route path="home" element={<Navigate to="/rickAndmorty" />} />
                <Route path='Characters'>
                  <Route index element={<CharactersList />} />
                  <Route path=":CharactersId" element={<CardId characterOnId={characterOnId} />} />
                </Route>

                <Route path="Locations" element={<LocationList />} />
                <Route path="Episodes" element={<EpisodeList />} />
                <Route path="*" element={<Navigate to="/rickAndmorty" />} />
              </Routes>
            </div>
            <div className="bottom">
              <Footer />
            </div>
          </div>
        ) : <Loader />
      }
    </>
  );
}

export default App;
