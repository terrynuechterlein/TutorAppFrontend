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
} from "react-native";
import Button, {
  OrangeButton,
  CreativeButton,
  EditProfileButton,
} from "../../Constants/Button";
import ProfileStats from "../../Components/ProfileStats";
import FlashMessage from "react-native-flash-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {faSchool} from "@fortawesome/free-solid-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as SecureStore from "expo-secure-store"; // Import SecureStore
import {useSelector} from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconRow from "../../Components/IconRow";
import ProfileCategories from "../../Components/ProfileCategories";
import AboutComponent from "../../Components/AboutComponent";

export default function Profile({navigation}) {
  const [bio, setBio] = useState("");
  const [savedBio, setSavedBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDoodlePaper, setShowDoodlePaper] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [userId, setUserId] = useState(null);

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchProfileImage();
    fetchBannerImage();
  }, [userId]);

  const fetchProfileImage = async () => {
    if (!userId) {
      console.error("No userId available for fetching profile image");
      return;
    }

    try {
      const response = await fetch(
        `http://10.2.1.246:5016/api/tutors/${userId}/profileImage`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Profile Image URL:", data.imageUrl); // Log the URL for debugging
        if (data.imageUrl) {
          setProfileImage({uri: data.imageUrl});
        } else {
          setProfileImage(require("../../assets/penguin.png")); // Set default image if URL is null/undefined
        }
      } else {
        console.error("Failed to fetch profile image");
        setProfileImage(require("../../assets/penguin.png")); // Default image
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(require("../../assets/penguin.png")); // Default image
    }
  };

  const fetchBannerImage = async () => {
    if (!userId) {
      console.error("No userId available for fetching banner image");
      return;
    }

    try {
      const response = await fetch(
        `http://10.2.1.246:5016/api/tutors/${userId}/bannerImage`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setBannerImage({uri: data.imageUrl});
        } else {
          setBannerImage(require("../../assets/Study.png")); // Default banner image
        }
      } else {
        console.error("Failed to fetch banner image");
        setBannerImage(require("../../assets/Study.png"));
      }
    } catch (error) {
      console.error("Error fetching banner image:", error);
      setBannerImage(require("../../assets/Study.png"));
    }
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsScreen");
    console.log("Settings Icon Pressed");
  };

  const navigateToEditProfile = () => {
    if (!userId) {
      console.error("No userId available");
      return;
    }
    navigation.navigate("EditProfile", {userId: userId});
  };

  console.log("Current profile image state:", profileImage);
  console.log("Banner Image URL:", bannerImage);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <TouchableOpacity
          onPress={handleSettingsPress}
          style={[styles.iconWrapper, styles.gearIconWrapper]}>
          <FontAwesome name="gear" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={bannerImage || require("../../assets/Study.png")}
          style={styles.banner}
        />
        <View style={styles.iconRow}>
          <IconRow />
        </View>
      </View>

      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileContainer}>
          {/* Profile image and name */}
          <TouchableOpacity>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage || require("../../assets/penguin.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.fullName}>FullName</Text>
          <Text style={styles.userName}>@username</Text>

          {/* School info */}
          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faSchool} size={15} color="black" />
            <Text style={styles.infoText}>School</Text>
          </View>

          {/* Degree info */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="book-education"
              size={15}
              color="black"
            />
            <Text style={styles.infoText}>Degree</Text>
          </View>

          {/* Degree info */}
          <View style={styles.infoRow}>
            <AntDesign name="link" size={15} color="black" />
            <Text style={styles.infoText}>Website</Text>
          </View>
        </View>

        <View style={styles.profileStatsContainer}>
        <View>
          <ProfileStats posts={0} followers={0} following={0} />
        </View>

        <EditProfileButton onPress={navigateToEditProfile} />
        </View>
      </View>

      <View style={styles.AboutContainer}>
        <AboutComponent/>
      </View>

      <View style={styles.menuContainer}>
        <ProfileCategories/>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#4B0082",
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
    alignItems: "center",
    marginTop: -50,
    marginLeft: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#00ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
  fullName: {
    // color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  userName: {
    // color: "#ffffff",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    marginLeft: -10,
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
  editIcon: {
    position: "absolute",
    right: 0,
    top: -15,
    zIndex: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  button: {
    width: 75,
  },
  profileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: 'orange',

  },
  gearIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  gearIconWrapper: {
    top: 10,
    right: 10,
  },
  iconWrapper: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 8,
  },
  iconRow: {
    top: -35,
  },
  profileStatsContainer:{
    top: -25,
    gap: 15,
    right: 5,
  },
  menuContainer: {
    // backgroundColor: 'green',
    marginTop: 13,
  },
  horizontalLine: {
    height: 1, 
    backgroundColor: 'black', 
    width: '100%', 
  },
  AboutContainer: {
    marginTop: 30,
  }
});
