import type { Color, Shading } from "../../domain/Card";

type Props = {
  color: Color;
  shading: Shading;
}

export const Oval = ({ color, shading }: Props) => {
  const colorValue = color.toLowerCase();
  const patternId = `oval-stripe-${colorValue}`;

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
      <ellipse
        cx="35"
        cy="17.5"
        rx="32"
        ry="14"
        style={{
          fill: getFill(),
          stroke: colorValue,
          strokeWidth: 2,
        }}
      />
    </svg>
  );
}