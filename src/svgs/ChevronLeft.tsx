import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface ChevronLeftProps {
  height?: number;
  width?: number;
  stroke?: ColorValue;
  fill?: ColorValue;
}

export const ChevronLeft: React.FC<ChevronLeftProps> = ({
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
        d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"
      />
    </Svg>
  );
};
