import { Card, IconButton, Stack, Typography } from "@mui/joy";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { capFirstLetter } from "../utils/capFirstLetter";

type Pokemon = {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
  };
  handleSwitch: (type: string) => void;
};

export const Pokemon = ({ pokemon, handleSwitch }: Pokemon) => {
  return (
    <Stack width="100%">
      <Stack component={Card} alignItems="center">
        <Typography level="title-lg">{capFirstLetter(pokemon.name)}</Typography>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="50%"
          height="50%"
        />
        <Stack
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            variant="outlined"
            onClick={() => handleSwitch("previous")}
            disabled={pokemon.id <= 1}
          >
            <MdOutlineKeyboardArrowLeft />
          </IconButton>
          <Typography level="body-md" color="neutral">
            #{pokemon.id}
          </Typography>
          <IconButton
            variant="outlined"
            onClick={() => handleSwitch("next")}
            disabled={pokemon.id >= 1025}
          >
            <MdOutlineKeyboardArrowRight />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
