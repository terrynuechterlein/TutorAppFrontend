import React, {useState, useEffect, useRef} from "react";
import {View, Image, StyleSheet, Animated} from "react-native";
import discord from "../assets/icons/discord.png";
import linkedin from "../assets/icons/linkedin.png";
import twitch from "../assets/icons/twitch.png";
import youtube from "../assets/icons/youtube.png";

export default function IconRow({socialmedia}) {
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
    inputRange: [0,1],
    outputRange: [0, -1],
  });

  const bounceStyle = {
    transform: [{translateY: bounceInterpolate}],
  };

  return (
      <View style={styles.rectangleContaner}>
        <View style={styles.iconGroup}>
          <Animated.Image source={youtube} style={[styles.icons, bounceStyle]} />
          <Animated.Image source={twitch} style={[styles.icons, bounceStyle]} />
          <Animated.Image source={discord} style={[styles.icons, bounceStyle]} />
          <Animated.Image source={linkedin} style={[styles.icons, bounceStyle]} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  rectangleContaner: {

  },
  iconGroup: {
    flexDirection: 'row',
    // width: ,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 15,    
  },
  icons: {
    width: 25,
    height: 25,
  }

});
