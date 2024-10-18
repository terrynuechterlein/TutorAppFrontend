import React, { useState, useEffect } from "react";
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
  EditProfileButton,
  BlueButton,
} from "../../Constants/Button";
import ProfileStats from "../../Components/ProfileStats";
import FlashMessage from "react-native-flash-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as SecureStore from "expo-secure-store"; // Import SecureStore
import * as DocumentPicker from "expo-document-picker";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconRow from "../../Components/IconRow";
import ProfileCategories from "../../Components/ProfileCategories";
import AboutComponent from "../../Components/AboutComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import DocumentScanner from "react-native-document-scanner-plugin";

export default function Profile({ navigation }) {
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [website, setWebsite] = useState("");
  const [youtubeURL, setYoutubeURL] = useState("");
  const [twitchURL, setTwitchURL] = useState("");
  const [discordURL, setDiscordURL] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("Resume");
  const [resumeLocalUri, setResumeLocalUri] = useState(null);

  const userId = useSelector((state) => state.auth.userId);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserProfile = async () => {
        if (!userId) {
          console.error("No userId available for fetching profile details");
          return;
        }

        try {
          const response = await fetch(
            `http://192.168.0.48:5016/api/tutors/${userId}/profile`
          );
          if (response.ok) {
            const data = await response.json();
            setFullName(`${data.firstName} ${data.lastName}`);
            setUsername(data.userName);
            setSchool(data.school);
            setMajor(data.major);
            setBio(data.bio);
            setWebsite(data.website);
            setYoutubeURL(data.youtubeUrl);
            setTwitchURL(data.twitchUrl);
            setDiscordURL(data.discordUrl);
            setLinkedInURL(data.linkedInUrl);
            setIsTutor(data.isTutor);
            console.log("State bio:", bio);
            console.log("State school:", school);
            console.log("State YoutubeURL:", youtubeURL);
          } else {
            console.error("Failed to fetch user profile details");
          }
        } catch (error) {
          console.error("Error fetching user profile details:", error);
        }
      };

      fetchUserProfile();
    }, [userId])
  );

  useEffect(() => {
    fetchProfileImage();
    fetchBannerImage();
    fetchUserResume();
  }, [userId]);

  const fetchProfileImage = async () => {
    if (!userId) {
      console.error("No userId available for fetching profile image");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.0.48:5016/api/tutors/${userId}/profileImage`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setProfileImage({ uri: data.imageUrl });
        } else {
          setProfileImage(require("../../assets/penguin.png")); // Set default image if URL is null/undefined
        }
      } else {
        console.error("Failed to fetch profile image");
        setProfileImage(require("../../assets/penguin.png"));
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(require("../../assets/penguin.png"));
    }
  };

  const fetchBannerImage = async () => {
    if (!userId) {
      console.error("No userId available for fetching banner image");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.0.48:5016/api/tutors/${userId}/bannerImage`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setBannerImage({ uri: data.imageUrl });
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

  const fetchUserResume = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.48:5016/api/tutors/${userId}/resume`
      );
      if (response.ok) {
        const data = await response.json();
        setResumeUrl(data.resumeUrl);
      } else {
        console.error("Failed to fetch resume");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleResumeUpload = async () => {
    try {
      if (resumeUrl || resumeLocalUri) {
        Alert.alert(
          "Replace Resume",
          "Do you want to replace your existing resume?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => scanDocument() },
          ],
          { cancelable: true }
        );
      } else {
        scanDocument();
      }
    } catch (error) {
      console.error("Error during resume upload:", error);
    }
  };

  const scanDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument({
        letUserAdjustCrop: true,
        maxNumDocuments: 1,
      });
      if (scannedImages && scannedImages.length > 0) {
        const imageUri = scannedImages[0];
        setResumeLocalUri(imageUri);

        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          name: "resume.jpg",
          type: "image/jpeg",
        });

        const response = await fetch(
          `http://192.168.0.48:5016/api/tutors/${userId}/uploadResume`,
          {
            method: "PUT",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setResumeUrl(data.resumeUrl);
          setResumeLocalUri(null);
        } else {
          console.error("Failed to upload resume:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error scanning document:", error);
    }
  };

  useEffect(() => {
    if (resumeUrl) {
      console.log("Resume URL:", resumeUrl);
    }
  }, [resumeUrl]);

  const handleSettingsPress = () => {
    navigation.navigate("SettingsScreen");
  };

  const navigateToEditProfile = () => {
    if (!userId) {
      console.error("No userId available");
      return;
    }
    navigation.navigate("EditProfile", {
      userId: userId,
    });
  };

  // Define tab content
  let tabContent = null;

  if (activeTab === "Resume") {
    console.log("resumeLocalUri:", resumeLocalUri);
    console.log("resumeUrl:", resumeUrl);

    if (resumeLocalUri) {
      tabContent = (
        <View style={styles.resumeContainer}>
          <Text style={styles.resumeText}>Your Resume:</Text>
          <Image source={{ uri: resumeLocalUri }} style={styles.resumeImage} />
        </View>
      );
    } else if (
      resumeUrl &&
      resumeUrl !== "" &&
      resumeUrl !== "null" &&
      resumeUrl !== "undefined"
    ) {
      tabContent = (
        <View style={styles.resumeContainer}>
          <Text style={styles.resumeText}>Your Resume:</Text>
          <Image source={{ uri: resumeUrl }} style={styles.resumeImage} />
        </View>
      );
    } else {
      tabContent = (
        <View style={styles.addResumeContainer}>
          <TouchableOpacity
            onPress={handleResumeUpload}
            style={styles.plusIcon}
          >
            <AntDesign name="pluscircleo" size={50} color="#ff8c00" />
          </TouchableOpacity>
          <Text style={styles.addResumeText}>Scan your resume</Text>
        </View>
      );
    }
  } else if (activeTab === "Projects") {
    tabContent = (
      <View style={styles.projectsContainer}>
        {/* Add your projects content here */}
        <Text style={styles.projectsText}>Projects content goes here</Text>
      </View>
    );
  } else if (activeTab === "Services") {
    tabContent = (
      <View style={styles.servicesContainer}>
        {/* Add your services content here */}
        <Text style={styles.servicesText}>Services content goes here</Text>
      </View>
    );
  }

  // useEffect(() => {
  //   console.log("resumeUrl after fetch:", resumeUrl);
  // }, [resumeUrl]);
  
  // useEffect(() => {
  //   console.log("resumeLocalUri after scanning:", resumeLocalUri);
  // }, [resumeLocalUri]);
  

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={styles.bannerContainer}>
        <TouchableOpacity
          onPress={handleSettingsPress}
          style={[styles.iconWrapper, styles.gearIconWrapper]}
        >
          <FontAwesome name="gear" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={bannerImage || require("../../assets/Study.png")}
          style={styles.banner}
        />
        <View style={styles.iconRow}>
          <IconRow
            youtube={youtubeURL}
            twitch={twitchURL}
            discord={discordURL}
            linkedIn={linkedInURL}
          />
        </View>
      </View>

      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage || require("../../assets/penguin.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.nameBadgeContainer}>
            <Text style={styles.fullName}>{fullName}</Text>
            {isTutor && (
              <MaterialIcons
                name="verified"
                size={24}
                color="#FFD700"
                style={styles.badgeIcon}
              />
            )}
          </View>
          <Text style={styles.userName}>@{username}</Text>

          <View style={styles.infoRow}>
            <FontAwesomeIcon icon={faSchool} size={15} color="black" />
            <Text style={styles.infoText}>{school}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="book-education"
              size={15}
              color="black"
            />
            <Text style={styles.infoText}>{major}</Text>
          </View>

          {website && (
            <View style={styles.infoRow}>
              <AntDesign name="link" size={15} color="black" />
              <TouchableOpacity onPress={() => Linking.openURL(website)}>
                <Text style={styles.infoText}>{website}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.profileStatsContainer}>
          <View>
            <ProfileStats posts={0} followers={0} following={0} />
          </View>

          <EditProfileButton onPress={navigateToEditProfile} />
        </View>
      </View>

      <View style={styles.AboutContainer}>
        <AboutComponent summary={bio} />
      </View>

      <View style={styles.menuContainer}>
        <ProfileCategories activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />
      {tabContent}
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
  resumeContainer: {
    padding: 20,
    alignItems: "center",
  },
  addResumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  plusIcon: {
    marginRight: 10,
  },
  addResumeText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  resumeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resumeImage: {
    width: "100%",
    height: 600,
    resizeMode: "contain",
  },
});
