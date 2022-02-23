import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Characters } from './pages/Characters';
import { CharacterDetail } from './pages/CharacterDetail';
import { Locations } from './pages/Locations';
import { LocationDetail } from './pages/LocationDetail';
import { Episodes } from './pages/Episodes';
import { EpisodeDetail } from './pages/EpisodeDetail';
import { About } from './pages/About';
import { NavBar } from './core/NavBar';
import { Footer } from './core/Footer';

function App(): JSX.Element {
  return (
    <div className="App min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/characters/*" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/locations/*" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
          <Route path="/episodes/*" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
