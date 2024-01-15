import React, {useState, useEffect} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView, // Import SafeAreaView
} from "react-native";
import {Picker} from "@react-native-picker/picker";
import ProfileModal from "../../Components/ProfileModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../Constants/colors";
import BannerModal from "../../Components/BannerModal";

import {Animated} from "react-native";

const EditProfileScreen = ({navigation, route}) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  // const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
   // New state to track changes
  const [changedFields, setChangedFields] = useState({});

  const colleges = ["College 1", "College 2", "College 3"];
  const grades = ["Freshman", "Sophomore", "Junior", "Senior", "Other"];

  const {userId} = route.params; // Get userId from navigation parameters

  // Log the received userId and handle if it's null
  useEffect(() => {
    console.log("Received userId: ", userId);
    if (!userId) {
      console.warn("No userId provided. Navigating back.");
      navigation.goBack();
    }
  }, [userId, navigation]);

  const handleSave = async () => {
    if (!userId) {
      console.error("Cannot save profile without userId.");
      return;
    }
    const userInfo = {
      name,
      // email,
      bio,
      website,
      school,
      grade,
    };

    console.log("UserID for update: ", userId);
    console.log("UserInfo: ", userInfo);

    try {
      // First, update the user information
      const response = await fetch(
        `http://10.2.1.246:5016/api/tutors/${userId}/updateProfile`,
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

        // If the profile update is successful and there's a new profile image, upload it
        if (profileImage && profileImage.uri) {
          await uploadProfileImage(profileImage.uri, userId);
        }
        // Upload banner image if present
        if (bannerImage && bannerImage.uri) {
          await uploadBannerImage(bannerImage.uri, userId);
        }
      } else {
        console.error("Error updating profile:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const goBack = () => {
    navigation.goBack(); //function to go back to the previous screen
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
    setProfileImage({uri}); // sets the new image as the profile picture
    setIsModalVisible(false); // Close the modal after selecting an image
  };

  const handleBannerImageTaken = (uri) => {
    setBannerImage({uri}); //sets the new image as the banner picture
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
        `http://10.2.1.246:5016/api/tutors/${userId}/uploadProfilePicture`,
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
        `http://10.2.1.246:5016/api/tutors/${userId}/uploadBannerImage`,
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack} style={styles.headerIcon}>
            <Ionicons name="arrow-back" size={24} color="white" />
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

        {/* Profile Image Container */}
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

        <View style={styles.inputContainer}>
          <Text style={styles.personalInfoTitle}>Personal Information</Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          {/* <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          /> */}
          <Text style={styles.characterLimit}>max 250 characters</Text>
          <TextInput
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            maxLength={250}
            style={[styles.input, styles.bioInput]}
          />
          <TextInput
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            style={styles.input}
          />
          <TextInput
            placeholder="College"
            value={school}
            onChangeText={setSchool}
            style={styles.input}
          />
        </View>

        <View style={styles.pickerContainer}>
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
    backgroundColor: "turquoise",
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
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  inputContainer: {
    marginTop: 65,
    paddingHorizontal: 20,
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
  bioInput: {
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 15,
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
    marginTop: 35,
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
    backgroundColor: "#1DA1F2",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: "white",
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
    backgroundColor: "#fff", // Match the background color of the header
  },
});
export default EditProfileScreen;
