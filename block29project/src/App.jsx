import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CreatePlayer from './components/CreatePlayer';
import PlayerList from './components/PlayerList';
import IndividualPlayer from './components/IndividualPlayer';
import SearchBar from './components/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create-player">Create Player</Link>
        </nav>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Routes>
          <Route path="/" element={<PlayerList searchTerm={searchTerm} />} />
          <Route path="/create-player" element={<CreatePlayer />} />
          <Route path="/players/:id" element={<IndividualPlayer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
