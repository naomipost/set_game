import type { Color, Shading } from "../../domain/Card";

type Props = {
  color: Color;
  shading: Shading;
}

export const Squiggle = ({ color, shading }: Props) => {
  const colorValue = color.toLowerCase();
  const patternId = `squiggle-stripe-${colorValue}`;

  const getFill = () => {
    if (shading === "Solid") return colorValue;
    if (shading === "Empty") return "white";
    return `url(#${patternId})`;
  };

  return (
    <svg width="70" height="35" viewBox="0 0 70 35">
      {shading === "Striped" && (
        <defs>
          <pattern id={patternId} patternUnits="userSpaceOnUse" width="6" height="6">
            <line x1="0" y1="0" x2="0" y2="6" stroke={colorValue} strokeWidth="2" />
          </pattern>
        </defs>
      )}
      <path
        d="M5,17.5 C5,5 20,5 25,17.5 C30,30 45,30 50,17.5 C55,5 65,5 65,17.5 C65,30 50,30 45,17.5 C40,5 25,5 20,17.5 C15,30 5,30 5,17.5 Z"
        style={{
          fill: getFill(),
          stroke: colorValue,
          strokeWidth: 2,
        }}
      />
    </svg>
  );
}