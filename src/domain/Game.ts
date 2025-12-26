import type { Card } from "./Card";
import type { Player } from "./Player";

export type Game = {
  displayedCards: Card[];
  deckCards: Card[];
  players: Player[];
}