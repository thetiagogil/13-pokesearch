import { Autocomplete, CircularProgress, Stack, Typography } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../components/pokemon";
import { capFirstLetter } from "../utils/capFirstLetter";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

export const HomePage = () => {
  const [pokemonName, setPokemonName] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1025"
        );
        const names = response.data.results.map((pokemon: { name: string }) =>
          capFirstLetter(pokemon.name)
        );
        setPokemonList(names);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = async (pokemonName: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const img = new Image();
      img.src = response.data.sprites.front_default;
      img.onload = () => {
        setPokemon(response.data);
        setLoading(false);
      };
    } catch (err) {
      console.error(err);
      setPokemon(null);
      setLoading(false);
    }
  };

  const handleSelection = (_e: any, newValue: string | null) => {
    setPokemonName(newValue);
    if (newValue) {
      handleSearch(newValue);
    }
  };

  const handleSwitch = (type: string) => {
    if (type === "previous" && pokemon && pokemon.id > 1) {
      handleSearch((pokemon.id - 1).toString());
    } else if (type === "next" && pokemon && pokemon.id < 1025) {
      handleSearch((pokemon.id + 1).toString());
    }
  };

  return (
    <Stack alignItems="center">
      <Stack width={300} alignItems="center" gap={6} mt={4}>
        <Stack width="100%" alignItems="center" gap={2}>
          <Typography level="h2">Pokésearch</Typography>
          <Autocomplete
            options={pokemonList}
            value={pokemonName}
            onChange={handleSelection}
            placeholder="Please type a pokémon name..."
            sx={{ width: "100%" }}
          />
        </Stack>

        {loading ? (
          <CircularProgress />
        ) : (
          pokemon && <Pokemon pokemon={pokemon} handleSwitch={handleSwitch} />
        )}
      </Stack>
    </Stack>
  );
};
