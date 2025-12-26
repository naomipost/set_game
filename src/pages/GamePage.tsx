import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import type { Game } from "../domain/Game";
import { DisplayedCards } from "../modules/DisplayedCards";
import { GameOptions } from "../modules/GameOptions";
import { PlayerList } from "../modules/PlayerList";
import type { Card } from "../domain/Card";
import { findSetInCards } from "../utils/GameUtils";

export const GamePage = () => {
  const location = useLocation();
  const state = location.state as Game | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const [displayedCards, setDisplayedCards] = useState(state.displayedCards);
  const [deckCards, setDeckCards] = useState(state.deckCards);
  const { players } = state;
  const [pendingSet, setPendingSet] = useState<Card[] | null>(null);

  const handleDealMoreCards = () => {
    const newCards = deckCards.slice(0, 3);
    setDisplayedCards([...displayedCards, ...newCards]);
    setDeckCards(deckCards.slice(3));
  };

  const handleRemoveSet = (setCards: Card[]) => {
    if(displayedCards.length > 12) {
      const updatedDisplayedCards = displayedCards.filter(card => {
        return !setCards.some(
          setCard => setCard.color === card.color &&
            setCard.shape === card.shape &&
            setCard.number === card.number &&
            setCard.shading === card.shading
        );
      });
      setDisplayedCards(updatedDisplayedCards);
      return;
    }
    if(deckCards.length === 0) {
      const updatedDisplayedCards = displayedCards.filter(card => {
        return !setCards.some(
          setCard => setCard.color === card.color &&
            setCard.shape === card.shape &&
            setCard.number === card.number &&
            setCard.shading === card.shading
        );
      });
      setDisplayedCards(updatedDisplayedCards);
      if(!findSetInCards(updatedDisplayedCards)) {
        alert("No more sets available and deck is empty. Game over!");
      }
      return;
    }
    const newCards = deckCards.slice(0, 3);
    const updatedDisplayedCards = displayedCards.map(card => {
      const setIndex = setCards.findIndex(
        setCard => setCard.color === card.color &&
          setCard.shape === card.shape &&
          setCard.number === card.number &&
          setCard.shading === card.shading
      );
      if (setIndex !== -1 && newCards[setIndex]) {
        return newCards[setIndex];
      }
      return card;
    });
    setDisplayedCards(updatedDisplayedCards);
    setDeckCards(deckCards.slice(3));
  }

  return (
    <Stack direction="row" alignItems="flex-start" mt={4} sx={{ width: '100%' }} ml={2}>
      <Stack>
        <GameOptions handleDealMoreCards={handleDealMoreCards} />
        <PlayerList players={players} pendingSet={pendingSet} onClaimSet={(player) => {
          if (pendingSet) {
            player.setsWon += 1;
            handleRemoveSet(pendingSet);
            setPendingSet(null);
          }
        }} />
      </Stack>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <DisplayedCards
          displayedCards={displayedCards}
          pendingSet={pendingSet}
          setPendingSet={setPendingSet}
        />
      </Box>
    </Stack>
  );
}