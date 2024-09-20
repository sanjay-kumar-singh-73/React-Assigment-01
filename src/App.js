import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch Pokémon data from the API 
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // Fetching first 151 Pokémon
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(pokemon => 
          fetch(pokemon.url).then(res => res.json())
        );
        
        Promise.all(fetches).then(results => {
          setPokemonData(results);
          setFilteredPokemon(results);
        });
      });
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPokemon(filtered);
  };

  return (
    <div className="App">
      <h1>Image Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={handleSearch}
      />

      <div className="pokemon-container">
        {filteredPokemon.map(pokemon => (
          <div className="pokemon-card" key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;