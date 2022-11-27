import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllCharacters, getAllEpisodes, getAllLocation } from './api/http';
import { CharactersList } from './components/Characters/CharactersList';
import { Header } from './components/Header/Header';
import { EpisodeList } from './components/Episodes/EpisodesList';
import { LocationList } from './components/Locations/LocationList';
import { Characters } from './types/Characters';
import { Episodes } from './types/Episodes';
import { Locations } from './types/Locations';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Loader } from './components/Loader/Loader';
import { CardId } from './components/CardId/CardId';

function App() {
  const [Characters, setCharacters] = useState<Characters[]>([]);
  const [Locations, setLocations] = useState<Locations[]>([]);
  const [Episodes, setEpisodes] = useState<Episodes[]>([]);
  const [Query, setQuery] = useState('');
  const [characterOnId, setCharacterOnId] = useState<Characters | null>(null);

  async function setAllCharacters() {
    try {
      const characters = await getAllCharacters();

      setCharacters(characters);
    } catch (error) {
      throw new Error('error');
    }
  }

  async function setAllLocation() {
    try {
      const locations = await getAllLocation();

      setLocations(locations);
    } catch (error) {
      throw new Error('error');
    }
  }

  async function setAllEpisodes() {
    try {
      const episodes = await getAllEpisodes();

      setEpisodes(episodes);
    } catch (error) {
      throw new Error('error');
    }
  }

  useEffect(() => {
    setAllCharacters();
    setAllLocation();
    setAllEpisodes();
  }, []);

  const handleCheckItem = (...itemPart: string[]) => {
    return (
      itemPart.find(itemInfo => {
        return itemInfo.toLowerCase().includes(Query.toLocaleLowerCase());
      })
    );
  };

  const filterCharacters = Characters.filter((character) => {
    const { name, gender, species, status } = character;

    return (
      handleCheckItem(name, gender, species, status)
    );
  });

  const filterLocations = Locations.filter((location) => {
    const { name, type, dimension } = location;

    return (
      handleCheckItem(name, type, dimension)
    );
  });

  const filterEpisodes = Episodes.filter((episode) => {
    const { name, air_date } = episode;

    return (
      handleCheckItem(name, air_date)
    );
  });

  return (
    <>
      {Characters.length > 0 ?
        (
          <div className="wrapper">
            <div className="top">
              <Header />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<h2>home page</h2>} />
                <Route path="home" element={<Navigate to="/" />} />
                <Route path='Characters'>
                  <Route index element={<CharactersList Characters={filterCharacters} setQuery={setQuery} setCharacterOnId={setCharacterOnId}/>} />
                  <Route path=":CharactersId" element={<CardId characterOnId={characterOnId} />} />
                </Route>

                <Route path="Locations" element={<LocationList Locations={filterLocations} setQuery={setQuery} />} />
                <Route path="Episodes" element={<EpisodeList Episodes={filterEpisodes} setQuery={setQuery} />} />
                <Route path="*" element={<Loader />} />
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
