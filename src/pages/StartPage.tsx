import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router";
import { initDeck } from "../utils/GameUtils";

export const StartPage = () => {
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(2);
  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Typography variant="h1">
        Set
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h5">
          Choose the number of players:
        </Typography>
        <TextField
          type="number"
          slotProps={{ htmlInput: { min: 1, max: 7 } }}
          value={numPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
        />
      </Stack>
      <Button variant="contained" color="primary" onClick={() => {
        const players = Array.from({ length: numPlayers }, (_, i) => ({ name: `Player ${i + 1}`, setsWon: 0 }));
        const fullDeck = initDeck();
        const displayedCards = fullDeck.slice(0, 12);
        const deckCards = fullDeck.slice(12);
        navigate('/play', { state: { displayedCards, deckCards, players } })

      }}>
        Start Game
      </Button>
    </Stack>
  )
}