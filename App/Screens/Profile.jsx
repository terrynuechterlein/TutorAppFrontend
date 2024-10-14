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

  const fetchAndCacheResume = async (resumeUrl) => {
    try {
      const cacheDir = FileSystem.cacheDirectory + "resume.pdf";

      // Check if the file is already cached
      const fileInfo = await FileSystem.getInfoAsync(cacheDir);
      if (!fileInfo.exists) {
        console.log("Downloading resume to cache...");
        await FileSystem.downloadAsync(resumeUrl, cacheDir);
      }

      // Return the cached file path to be used by react-native-pdf
      return cacheDir;
    } catch (error) {
      console.error("Error caching the PDF:", error);
      return resumeUrl; // fallback to the original URL in case of error
    }
  };

  // Fetch the user's resume and cache it
  useEffect(() => {
    if (resumeUrl) {
      const cacheResume = async () => {
        const cachedPath = await fetchAndCacheResume(resumeUrl);
        setResumeUrl(cachedPath); // Update the resume URL with the cached path
      };
      cacheResume();
    }
  }, [resumeUrl]);

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

  // Function to handle resume upload
  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          name: file.name || "resume.pdf",
          type: file.mimeType || "application/pdf",
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
          setResumeUrl(data.resumeUrl); // Update the resume URL
        } else {
          console.error("Failed to upload resume:", response.statusText);
        }
      } else if (result.canceled) {
        console.log("DocumentPicker canceled");
      } else {
        console.error("DocumentPicker returned unexpected result:", result);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

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

      {activeTab === "Resume" && resumeUrl ? (
        <View style={styles.resumeContainer}>
          <Text style={styles.resumeText}>Your Resume:</Text>
          {/* Display the PDF directly */}
          <Pdf
            source={{ uri: resumeUrl, cache: true }}
            onLoadComplete={(numberOfPages) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.error(error);
            }}
            style={styles.pdf} // Customize the size here
          />
        </View>
      ) : (
        <View style={styles.addResumeContainer}>
          <TouchableOpacity
            onPress={handleResumeUpload}
            style={styles.plusIcon}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.addResumeText}>Add your resume</Text>
        </View>
      )}
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
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
  },
  addResumeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusIcon: {
    marginRight: 10,
  },
  addResumeText: {
    fontSize: 16,
    color: "#555",
  },
  resumeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: 600, // Customize the height as needed
  },
});
