import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import type { Player } from "../domain/Player";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

export const CustomizePlayersDialog = ({ open, onClose, players, setPlayers }: Props) => {
  const [updatedPlayers, setUpdatedPlayers] = useState<Player[]>(() => players.map(p => ({ ...p })));

  const handleCancel = () => {
    setUpdatedPlayers(players.map(p => ({ ...p })));
    onClose();
  };

  useEffect(() => {
    if (open) {
      setUpdatedPlayers(players.map(p => ({ ...p })));
    }
  }, [open, players]);

  return (
    <Dialog open={open} onClose={handleCancel} fullScreen>
      <DialogTitle>Customize Players</DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {updatedPlayers.map((player, index) => (
            <Stack
              direction="row"
              key={index}
              border="1px solid gray"
              borderRadius={2}
              padding={2}
              gap={2}
              justifyContent="space-between"
            >
              <Stack spacing={2} direction={"row"} width="100%">
                <Typography variant="h6">Name:</Typography>
                <TextField
                  defaultValue={player.name}
                  onChange={(e) => setUpdatedPlayers(prev => {
                    const newPlayers = [...prev];
                    newPlayers[index].name = e.target.value;
                    return newPlayers;
                  })}
                  fullWidth
                  variant="standard"
                  size="small"
                />
              </Stack>
              <Stack spacing={2} direction={"row"}>
                <Typography variant="h6">Avatar:</Typography>
                <TextField
                  defaultValue={player.avatar}
                  onChange={(e) => setUpdatedPlayers(prev => {
                    const newPlayers = [...prev];
                    newPlayers[index].avatar = e.target.value;
                    return newPlayers;
                  })}
                  fullWidth
                  variant="standard"
                  size="small"
                  sx={{ maxWidth: '100px' }}
                />
              </Stack>
            </Stack>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={() => { setPlayers([...updatedPlayers]); onClose(); }} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};