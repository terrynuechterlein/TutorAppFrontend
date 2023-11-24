import {View, Text, TouchableOpacity} from "react-native";
import React from "react";
import COLORS from "./colors";
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

export const CreativeButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.creativeButton, props.style]}
      onPress={props.onPress}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.creativeButtonText,
          {color: props.textColor || "#ffffff"},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export const EditProfileButton = (props) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      style={[
        styles.editProfileButton,
        isPressed ? styles.editProfileButtonPressed : {},
        props.style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={props.onPress}
      activeOpacity={1}>
      <Text style={styles.editProfileButtonText}>
        {props.title || "Edit Profile"}
      </Text>
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
  creativeButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#ff8c00",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  creativeButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  editProfileButton: {
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  editProfileButtonText: {
    color: COLORS.black,
    fontSize: 18,
  },
  editProfileButtonPressed: {
    backgroundColor: COLORS.lightGrey, 
  },
});

export default Button;
