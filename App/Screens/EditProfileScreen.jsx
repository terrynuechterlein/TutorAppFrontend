import React, {useState, useEffect} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView, 
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {useSelector} from "react-redux";
import ProfileModal from "../../Components/ProfileModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../Constants/colors";
import BannerModal from "../../Components/BannerModal";
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fetchUserDetails } from "../../Utilities/fetchUserDetails";


import {Animated} from "react-native";

const EditProfileScreen = ({navigation, route}) => {
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [major, setMajor] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [twitchURL, setTwitchURL] = useState("");
  const [discordURL, setDiscordURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [changedFields, setChangedFields] = useState("");

  const grades = ["Freshman", "Sophomore", "Junior", "Senior", "Other"];

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchProfileImage();
    fetchBannerImage();
  }, [userId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await fetchUserDetails(userId); 
      if(userProfile) {
        setUserName(userProfile.userName || '');
        setWebsite(userProfile.website || '');
        setSchool(userProfile.school || '');
        setGrade(userProfile.grade || '');
        setMajor(userProfile.major || '');
        setYoutubeURL(userProfile.youtubeUrl || '');
        setTwitchURL(userProfile.twitchUrl || '');
        setDiscordURL(userProfile.discordUrl || '');
        setLinkedinURL(userProfile.linkedInUrl || '');
      }
    };
    fetchUserProfile();
  }, [userId]);

  const fetchProfileImage = async () => {
    if (!userId) {
      console.error("No userId available for fetching profile image");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.137.1:5016/api/tutors/${userId}/profileImage`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Profile Image URL:", data.imageUrl); 
        if (data.imageUrl) {
          setProfileImage({uri: data.imageUrl});
        } else {
          setProfileImage(require("../../assets/penguin.png")); 
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
        `http://192.168.137.1:5016/api/tutors/${userId}/bannerImage`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setBannerImage({uri: data.imageUrl});
        } else {
          setBannerImage(require("../../assets/Study.png")); 
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

  const handleSave = async () => {
    if (!userId) {
      console.error("Cannot save profile without userId.");
      return;
    }
    const userInfo = {
      userName,
      website,
      school,
      grade,
      major,
      youtubeURL,
      twitchURL,
      discordURL,
      linkedinURL,
    };

    console.log("UserID for update: ", userId);
    console.log("UserInfo: ", userInfo);

    try {
      const response = await fetch(
        `http://192.168.137.1:5016/api/tutors/${userId}/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated:", data);
        alert("Profile updated successfully");

        if (profileImage && profileImage.uri) {
          await uploadProfileImage(profileImage.uri, userId);
        }
        if (bannerImage && bannerImage.uri) {
          await uploadBannerImage(bannerImage.uri, userId);
        }

        // Invoke the callback function passed through navigation params
        if (route.params?.onUpdate) {
          route.params.onUpdate(data); // Pass the updated data back to Profile screen
        }

        navigation.goBack();
      } else {
        console.error("Error updating profile:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const goBack = () => {
    navigation.goBack(); 
  };

  const fadeIn = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleImageTaken = (uri) => {
    setProfileImage({uri}); 
    setIsModalVisible(false); 
  };

  const handleBannerImageTaken = (uri) => {
    console.log("Banner image URI passed to EditProfileScreen:", uri);
    setBannerImage({uri}); 
    setIsBannerModalVisible(false);
  };

  const uploadProfileImage = async (imageUri, userId) => {
    const formData = new FormData();
    const uriParts = imageUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("profileImage", {
      uri: imageUri,
      name: `profilepic.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch(
        `http://192.168.137.1:5016/api/tutors/${userId}/uploadProfilePicture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadBannerImage = async (imageUri) => {
    if (!userId) {
      console.error("Cannot upload banner image without userId.");
      return;
    }

    const formData = new FormData();
    const uriParts = imageUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("bannerImage", {
      uri: imageUri,
      name: `banner.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch(
        `http://192.168.137.1:5016/api/tutors/${userId}/uploadBannerImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload banner image");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error uploading banner image:", error);
    }
  };

  console.log("Discord URL: ", discordURL);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={24} color={COLORS.orange} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={bannerImage || require("../../assets/Study.png")}
            style={styles.banner}
          />
          <TouchableOpacity
            onPress={() => setIsBannerModalVisible(true)}
            style={styles.bannerCameraIcon}>
            <Ionicons name="camera" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <Image
            source={profileImage || require("../../assets/penguin.png")}
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.cameraIcon}>
            <Ionicons name="camera" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.personalInfoTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTitle}>Name</Text>
              <TextInput
                placeholder="Name"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
              />
            </View>
            <View style={styles.websiteContainer}>
              <Text style={styles.websiteTitle}>Website</Text>
              <TextInput
                placeholder="Website"
                value={website}
                onChangeText={setWebsite}
                style={styles.input}
              />
            </View>
            <View style={styles.collegeContainer}>
              <Text style={styles.collegeTitle}>College</Text>
              <TextInput
                placeholder="College"
                value={school}
                onChangeText={setSchool}
                style={styles.input}
              />
            </View>
            <View style={styles.majorContainer}>
              <Text style={styles.majorTitle}>Major</Text>
              <TextInput
                placeholder="Major"
                value={major}
                onChangeText={setMajor}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        {/* Social Media section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.personalInfoTitle}>Social Media</Text>
          <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
            <Ionicons name="logo-youtube" size={12} color={'red'}></Ionicons>
            <Text style={styles.nameTitle}>Youtube URL</Text>
            </View>
            <TextInput
              placeholder="Youtube"
              value={youtubeURL}
              onChangeText={setYoutubeURL}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
            <Ionicons name="logo-twitch" size={12} color={'#6b4ba1'}></Ionicons>
            <Text style={styles.nameTitle}>Twitch URL</Text>
            </View>
            <TextInput
              placeholder="Twitch"
              value={twitchURL}
              onChangeText={setTwitchURL}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
            <FontAwesomeIcon icon={faDiscord} size={12} color="#7289da" />
            <Text style={styles.nameTitle}>Discord URL</Text>
            </View>
            <TextInput
              placeholder="Discord"
              value={discordURL}
              onChangeText={setDiscordURL}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputTitle}>
            <Ionicons name="logo-linkedin" size={12} color={'#0077B5'}></Ionicons>
            <Text style={styles.nameTitle}>LinkedIn URL</Text>
            </View>
            <TextInput
              placeholder="LinkedIn"
              value={linkedinURL}
              onChangeText={setLinkedinURL}
              style={styles.input}
            />
          </View>
        </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.personalInfoTitle}>Year</Text>
          <Picker
            selectedValue={grade}
            onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            style={styles.picker}>
            {grades.map((grade, index) => (
              <Picker.Item key={index} label={grade} value={grade} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.becomeTutorContainer}>
          <Text style={styles.becomeTutorText}>Become a tutor</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        {/* Profile Modal */}
        <ProfileModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onImageTaken={handleImageTaken}
        />
        <BannerModal
          isVisible={isBannerModalVisible}
          onClose={() => setIsBannerModalVisible(false)}
          onBannerImageTaken={handleBannerImageTaken}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: 200,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  iconButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  bannerCameraIcon: {
    position: "absolute",
    left: "2%",
    bottom: "93%",
    marginRight: -12,
    marginBottom: -12,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: -50,
    marginBottom: 70,
    overflow: "hidden",

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    aspectRatio: 1,
  },
  cameraIcon: {
    position: "absolute",
    right: "50%",
    bottom: "50%",
    marginRight: -12,
    marginBottom: -12,
  },
  inputFieldsContainer: {
    marginTop: 20,
  },
  sectionContainer: {
    top: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputGroup: {
    paddingTop: 10,
  },
  personalInfoTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    borderColor: "#CCCCCC",
    borderWidth: 0.25,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  inputTitle: {
    flexDirection: 'row',
    gap: 5,
  },
  characterLimit: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    color: "#FF69B4",
    fontSize: 12,
  },

  label: {
    marginLeft: "10%",
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    overflow: "hidden",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  picker: {
    width: "100%",
    color: "#000",
  },
  becomeTutorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    paddingVertical: 10,
  },
  becomeTutorText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.appblue,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", 
  },
});
export default EditProfileScreen;
