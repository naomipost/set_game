import { Button, Stack } from "@mui/material";

type Props = {
  handleDealMoreCards: () => void;
}

export const GameOptions = ({ handleDealMoreCards }: Props) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" color="secondary" href="/">
        Exit Game
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleDealMoreCards}>
        Deal 3 More Cards
      </Button>
    </Stack>
  );
}