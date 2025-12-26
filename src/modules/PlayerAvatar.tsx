import AddIcon from '@mui/icons-material/Add';
import { Button, Stack, Typography } from "@mui/material";
import type { Player } from "../domain/Player";

type Props = {
  player: Player;
  showAddButton: boolean;
  onClaimSet: () => void;
}

export const PlayerAvatar = ({ player, showAddButton, onClaimSet }: Props) => {
  return (
    <Stack spacing={1} alignItems="center" mt={2}>
      <Typography variant="h5" fontWeight={600}>{player.name}</Typography>
      <Stack spacing={0.5} alignItems="center">
        <Typography>Sets Won: {player.setsWon}</Typography>
        {showAddButton && (
          <Button
            size="small"
            onClick={onClaimSet}
            startIcon={<AddIcon />}
            variant='outlined'
          >
            Claim Set
          </Button>
        )}
      </Stack>
    </Stack>
  );
}