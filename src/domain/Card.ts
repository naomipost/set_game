export type Color = "Red" | "Green" | "Purple";

export type CardNumber = 1 | 2 | 3;

export type Shape = "Oval" | "Squiggle" | "Diamond";

export type Shading = "Solid" | "Striped" | "Empty";

export type Card = {
  color: Color;
  number: CardNumber;
  shape: Shape;
  shading: Shading;
};