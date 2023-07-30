import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface ChevronRightProps {
  height?: number;
  width?: number;
  stroke?: ColorValue;
  fill?: ColorValue;
}

export const ChevronRight: React.FC<ChevronRightProps> = ({
  height = 48,
  width = 48,
  stroke = "#FFFFFF",
  fill = "#FFFFFF",
}) => {
  return (
    <Svg height={height} viewBox="0 -960 960 960" width={width}>
      <Path
        vectorEffect="non-scaling-stroke"
        stroke={stroke}
        fill={fill}
        d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"
      />
    </Svg>
  );
};
