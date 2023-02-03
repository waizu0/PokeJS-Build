import React, { useRef } from 'react';
import './PokeDexStyles.css';
import PokeIMG from '../assets/pokedex.png';

function PokeDex() {
  const pokemonNameRef = useRef(null);
  const pokemonNumberRef = useRef(null);
  const pokemonImageRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);


  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

        if(APIResponse.status === 200)
        {
            const data = await APIResponse.json();
            return data;
        }
    

  };

  const renderPokemon = async (pokemon) => {
    pokemonNameRef.current.innerHTML = 'Loading...'
    pokemonNumberRef.current.innerHTML = 0;
    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonNameRef.current.innerHTML = data.name;
    pokemonNumberRef.current.innerHTML = data.id;
    pokemonImageRef.current.src =
      data.sprites.versions['generation-v']['black-white'].animated.front_default;
    }else{
        pokemonNameRef.current.innerHTML = 0;
        pokemonNameRef.current.innerHTML = "not found! :("
        pokemonImageRef.current.src = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renderPokemon(inputRef.current.value);
    inputRef.current.value = '';
  };

  React.useEffect(() => {
    formRef.current.addEventListener('submit', handleSubmit);
    renderPokemon("bulbasaur");
   
  }, );
  
 

  return (

    <div className="main-dex">

      <img ref={pokemonImageRef} className="pokemon-image" src="#" alt="/" />

      <h1 className="pokemon-data">
        <span ref={pokemonNumberRef} className="pokemon-number"></span> -{' '}
        <span ref={pokemonNameRef} className="pokemon-name"></span>
      </h1>

      <form ref={formRef} className="form">
        <input
          ref={inputRef}
          type="search"
          className="input-search"
          placeholder="Pokémon Name or Number"
          required
        />
      </form>

      <img className="pokedex-img" src={PokeIMG} alt="/" />
    </div>
  );
}

export default PokeDex;
