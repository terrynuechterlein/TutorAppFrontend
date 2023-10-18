import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import COLORS from "../Constants/colors";
import {StyleSheet} from "react-native";

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={{fontSize: 18, ...{color: textColor}}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export const OrangeButton = (props) => {
  const filledBgColor = COLORS.orange;
  const outlinedColor = COLORS.orange;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = COLORS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={{fontSize: 18, ...{color: textColor}}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Button;
