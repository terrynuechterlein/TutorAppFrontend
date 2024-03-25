import React, {useState, useEffect, useRef} from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Linking,
  TouchableOpacity,
} from "react-native";
import discordImg from "../assets/icons/discord.png";
import linkedinImg from "../assets/icons/linkedin.png";
import twitchImg from "../assets/icons/twitch.png";
import youtubeImg from "../assets/icons/youtube.png";

export default function IconRow({youtube, twitch, discord, linkedIn}) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const bounceInterpolate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  });

  const bounceStyle = {
    transform: [{translateY: bounceInterpolate}],
  };

  return (
    <View style={styles.rectangleContaner}>
      <View style={styles.iconGroup}>
        {youtube && (
          <TouchableOpacity onPress={() => Linking.openURL(youtube)}>
            <Animated.Image
              source={youtubeImg}
              style={[styles.icons, bounceStyle]}
            />
          </TouchableOpacity>
        )}
        {twitch && (
          <TouchableOpacity onPress={()=>Linking.openURL(twitch)}>
          <Animated.Image source={twitchImg} style={[styles.icons, bounceStyle]} />
          </TouchableOpacity>
        )}
        {discord && (
          <TouchableOpacity onPress={()=>Linking.openURL(discord)}>
          <Animated.Image
            source={discordImg}
            style={[styles.icons, bounceStyle]}
          />
          </TouchableOpacity>
        )}
        {linkedIn && (
          <TouchableOpacity onPress={() => Linking.openURL(linkedIn)}>
            <Animated.Image
              source={linkedinImg}
              style={[styles.icons, bounceStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rectangleContaner: {},
  iconGroup: {
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 15,
  },
  icons: {
    width: 25,
    height: 25,
  },
});
