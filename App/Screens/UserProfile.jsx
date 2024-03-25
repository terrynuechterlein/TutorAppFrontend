import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Linking,
} from "react-native";
import Button, {
  OrangeButton,
  CreativeButton,
  BlueButton,
} from "../../Constants/Button";
import ProfileStats from "../../Components/ProfileStats";
import FlashMessage from "react-native-flash-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useFocusEffect} from "@react-navigation/native";
import {faSchool} from "@fortawesome/free-solid-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as SecureStore from "expo-secure-store"; // Import SecureStore
import {useSelector} from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconRow from "../../Components/IconRow";
import ProfileCategories from "../../Components/ProfileCategories";
import AboutComponent from "../../Components/AboutComponent";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function UserProfile({route, navigation}) {
  // Extract the passed user data
  const {user} = route.params;

  // Helper function to get the image source
  const getImageSource = (uri, defaultImage) => (uri ? {uri} : defaultImage);

  console.log("Received user object:", user);

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <View style={styles.bannerContainer}>
        <Image
          source={getImageSource(
            user.bannerImageUrl,
            require("../../assets/Study.png")
          )}
          style={styles.banner}
        />
        <View style={styles.iconRow}>
          <IconRow
            youtube={user.youtubeURL}
            twitch={user.twitchURL}
            discord={user.discordURL}
            linkedIn={user.linkedInURL}
          />
        </View>
      </View>

      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity>
            <View style={styles.profileImageContainer}>
            <Image
              source={getImageSource(user.profilePictureUrl, require('../../assets/penguin.png'))}
              style={styles.profileImage}
              resizeMode="cover"
            />
            </View>
          </TouchableOpacity>
          <Text style={styles.fullName}>
            {user.fullName || `${user.firstName} ${user.lastName}`}
          </Text>
          <Text style={styles.userName}>@{user.userName}</Text>

          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faSchool} size={15} color="black" />
            <Text style={styles.infoText}>{user.school}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="book-education"
              size={15}
              color="black"
            />
            <Text style={styles.infoText}>{user.major}</Text>
          </View>

          {user.website && (
            <View style={styles.infoRow}>
              <AntDesign name="link" size={15} color="black" />
              <TouchableOpacity onPress={() => Linking.openURL(user.website)}>
                <Text style={styles.infoText}>{user.website}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.profileStatsContainer}>
          <View>
            <ProfileStats posts={0} followers={0} following={0} />
          </View>
        </View>
      </View>

      <View style={styles.AboutContainer}>
        <AboutComponent summary={user.bio} />
      </View>

      <View style={styles.menuContainer}>
        <ProfileCategories />
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 200,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    alignItems: "flex-start",
    marginTop: -50,
    marginLeft: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgba(0, 120, 255, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  userName: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 3,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 10,
  },
  saveButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  profileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    top: -35,
  },
  profileStatsContainer: {
    top: -25,
    gap: 15,
    right: 5,
  },
  menuContainer: {
    marginTop: 13,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
  },
  AboutContainer: {
    marginTop: 30,
  },
});
