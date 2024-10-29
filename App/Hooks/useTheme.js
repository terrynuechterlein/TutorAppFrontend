import {useSelector} from "react-redux";
import COLORS from "../../Constants/colors";

export default function useTheme() {
  const themeState = useSelector((state) => state.theme.theme);
  const themeColors = COLORS[themeState];
  return {themeState, themeColors};
}
