import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CustomizePlayersDialog } from "../modules/CustomizePlayersDialog";
import { initDeck } from "../utils/GameUtils";

export const StartPage = () => {
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(2);
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState(Array.from({ length: numPlayers }, (_, i) => ({ name: `Player ${i + 1}`, setsWon: 0 })));

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
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Customize Players
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          const fullDeck = initDeck();
          const displayedCards = fullDeck.slice(0, 12);
          const deckCards = fullDeck.slice(12);
          navigate('/play', { state: { displayedCards, deckCards, players } })
        }}>
          Start Game
        </Button>
        <CustomizePlayersDialog open={open} onClose={() => setOpen(false)} players={players} setPlayers={setPlayers} />
      </Stack>
    </Stack>
  )
}