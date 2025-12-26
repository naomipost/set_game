import { Card, Stack } from "@mui/material";
import type { CardNumber, Color, Shading, Shape } from "../domain/Card";
import { Diamond } from "./shapes/Diamond";
import { Oval } from "./shapes/Oval";
import { Squiggle } from "./shapes/Squiggle";

type Props = {
  color: Color;
  number: CardNumber;
  shading: Shading;
  shape: Shape;
  highlighted?: boolean;
};

export const CardComponent = ({ color, number, shading, shape, highlighted }: Props) => {
  const renderShape = (key: number) => {
    const props = { color, shading };
    switch (shape) {
      case "Oval":
        return <Oval key={key} {...props} />;
      case "Squiggle":
        return <Squiggle key={key} {...props} />;
      case "Diamond":
        return <Diamond key={key} {...props} />;
    }
  };

  const shapes = Array.from({ length: number }, (_, i) => renderShape(i));

  return (
    <Card
      sx={{
        width: 100,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: highlighted ? '3px solid gold' : '1px solid black',
        borderRadius: '8px',
        padding: 1,
      }}
    >
      <Stack direction="column" alignItems="center" justifyContent="center" spacing={0.5}>
        {shapes}
      </Stack>
    </Card>
  );
}