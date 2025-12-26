import { Box } from "@mui/material";
import type { Card } from "../domain/Card";
import type { Player } from "../domain/Player";
import { PlayerAvatar } from "./PlayerAvatar";

type Props = {
  players: Player[];
  pendingSet: Card[] | null;
  onClaimSet: (player: Player) => void;
}

export const PlayerList = ({ players, pendingSet, onClaimSet }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateRows="repeat(4, 1fr)"
      gridTemplateColumns="repeat(2, 1fr)"
      gridAutoFlow="column"
      gap={2}
      width="fit-content"
    >
      {players.map((player) => (
        <PlayerAvatar
          key={player.name}
          player={player}
          showAddButton={pendingSet !== null}
          onClaimSet={() => onClaimSet(player)}
        />
      ))}
    </Box>
  );
}