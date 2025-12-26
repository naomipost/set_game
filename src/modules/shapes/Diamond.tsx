import type { Color, Shading } from "../../domain/Card";

type Props = {
  color: Color;
  shading: Shading;
}

export const Diamond = ({ color, shading }: Props) => {
  const colorValue = color.toLowerCase();
  const patternId = `diamond-stripe-${colorValue}`;

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
      <polygon
        points="35,2 67,17.5 35,33 3,17.5"
        style={{
          fill: getFill(),
          stroke: colorValue,
          strokeWidth: 2,
        }}
      />
    </svg>
  );
}