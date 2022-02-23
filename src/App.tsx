import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard/Dashboard';
import { Characters } from './pages/Characters/Characters';
import { CharacterDetail } from './pages/CharacterDetails/CharacterDetail';
import { Locations } from './pages/Locations/Locations';
import { LocationDetail } from './pages/LocationDetails/LocationDetail';
import { Episodes } from './pages/Episodes/Episodes';
import { EpisodeDetail } from './pages/EpisodeDetails/EpisodeDetail';
import { About } from './pages/About/About';
import { NavBar } from './core/NavBar/NavBar';
import { Footer } from './core/Footer/Footer';

export interface MenuItemI {
  tag: string;
  url: string;
}

function App(): JSX.Element {
  const navLinks: MenuItemI[] = [
    { tag: 'Characters', url: '/characters/' },
    { tag: 'Locations', url: '/locations/' },
    { tag: 'Episodes', url: '/episodes/' },
    { tag: 'About', url: '/about/' },
  ];

  return (
    <div className="App min-h-screen flex flex-col">
      <NavBar navLinks={navLinks} />
      <main className="flex-1 my-4 flex flex-col justify-center">
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
