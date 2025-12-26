import type { Card, Color, Shape, Shading, CardNumber } from "../domain/Card";

export const initDeck = (): Card[] => {
  const colors: Color[] = ["Red", "Green", "Purple"];
  const numbers: CardNumber[] = [1, 2, 3];
  const shapes: Shape[] = ["Oval", "Squiggle", "Diamond"];
  const shadings: Shading[] = ["Solid", "Striped", "Empty"];
  const deck: Card[] = [];

  for (const color of colors) {
    for (const number of numbers) {
      for (const shape of shapes) {
        for (const shading of shadings) {
          deck.push({ color, number, shape, shading });
        }
      }
    }
  }
  const shuffledDeck = shuffleDeck(deck);

  return shuffledDeck;
}

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

export const isSet = (cards: Card[]): boolean => {
  if (cards.length !== 3) return false;
  const attributes = ["color", "number", "shape", "shading"] as const;

  for (const attr of attributes) {
    const values = cards.map(card => card[attr]);
    const allSame = values.every(value => value === values[0]);
    const allDifferent = new Set(values).size === 3;
    if (!(allSame || allDifferent)) {
      return false;
    }
  }

  return true;
}

export const findSetInCards = (cards: Card[]): Card[] | null => {
  const n = cards.length;
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        const potentialSet = [cards[i], cards[j], cards[k]];
        if (isSet(potentialSet)) {
          return potentialSet;
        }
      }
    }
  }
  return null;
}