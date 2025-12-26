import { Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import type { Card } from "../domain/Card";
import { isSet } from "../utils/GameUtils";
import { CardComponent } from "./CardComponent";

type Props = {
  displayedCards: Card[];
  pendingSet: Card[] | null;
  setPendingSet: React.Dispatch<React.SetStateAction<Card[] | null>>;
}

export const DisplayedCards = ({ displayedCards, pendingSet, setPendingSet }: Props) => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const highlightedCards = pendingSet ?? selectedCards;

  return (
    <>
      <Box
        display="grid"
        gridTemplateRows="repeat(3, auto)"
        gridAutoFlow="column"
        gridAutoColumns="auto"
        gap={2}
        width="fit-content"
      >
        {displayedCards.map((card, index) => {
          const handleClick = () => {
            if (pendingSet) return;

            const newSelectedCards = selectedCards.includes(card)
              ? selectedCards.filter(c => c !== card)
              : [...selectedCards, card];

            setSelectedCards(newSelectedCards);
            if (isSet(newSelectedCards)) {
              setSnackbarOpen(true);
              setPendingSet(newSelectedCards);
              setSelectedCards([]);
            }
          };

          return (
            <Button key={index} onClick={handleClick}>
              <CardComponent {...card} highlighted={highlightedCards.includes(card)} />
            </Button>
          );
        })}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Set found!"
      />
    </>
  );
}