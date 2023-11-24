import React, {useState} from "react";
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
import DoodlePaper from "../../Components/DoodlePaper";
import ProfileStats from "../../Components/ProfileStats";
import ProfileModal from "../../Components/ProfileModal";
import FlashMessage from "react-native-flash-message";
import {Ionicons, FontAwesome} from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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

  const handleChooseImage = (setImage) => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = {uri: response.uri};
        setImage(source);
      }
    });
  };

  const handleSaveChanges = () => {
    setSavedBio(bio);
    setIsEditing(false);
    setShowDoodlePaper(true);
    Keyboard.dismiss();
  };

  const handleEditBio = () => {
    setIsEditing(true);
    setShowDoodlePaper(false);
  };

  const handleCancel = () => {
    setBio(savedBio);
    setIsEditing(false);
    setShowDoodlePaper(true);
  };

  const handleCameraIconPress = () => {
    setIsModalVisible(true);
  };

  const handleSettingsPress = () => {
    console.log("Settings Icon Pressed");
  };

  const handleImageTaken = async (uri) => {
    setProfileImage({uri}); // Set the new image as the profile picture
    await uploadImage(uri);
  };

  const uploadImage = async (uri) => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("profileImage", {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch(
        "http://10.2.1.246:5016/api/tutors/uploadProfilePicture",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        // Update state with new profile picture URL
        setProfileImage({uri: responseData.profilePictureUrl});
      } else {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        showMessage({
          message: "Upload failed",
          description: errorData.message || "The image could not be uploaded.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      showMessage({
        message: "Upload error",
        description: "An unexpected error occurred.",
        type: "danger",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => handleChooseImage(setBannerImage)}
        style={styles.bannerContainer}>
        <TouchableOpacity
          onPress={() => handleChooseImage(setBannerImage)}
          style={[styles.iconWrapper, styles.pencilIconWrapper]}>
          <FontAwesome5 name="pencil-alt" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSettingsPress}
          style={[styles.iconWrapper, styles.gearIconWrapper]}>
          <FontAwesome name="gear" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={bannerImage || require("../../assets/Study.png")}
          style={styles.banner}
        />
      </TouchableOpacity>

      <View style={styles.profileAndStatsContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => handleChooseImage(setProfileImage)}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage || require("../../assets/penguin.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={handleCameraIconPress}
                style={styles.cameraIcon}>
                <Ionicons name="camera" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.schoolInfo}>School - Year</Text>
        </View>

        <EditProfileButton onPress={() => navigation.navigate("EditProfile")} />
      </View>

      <View style={styles.bioContainer}>
        <View style={styles.bioHeader}>
          {!isEditing && (
            <TouchableOpacity onPress={handleEditBio} style={styles.editIcon}>
              <FontAwesome name="edit" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          {isEditing && (
            <Text style={styles.maxCharacters}>max 275 characters</Text>
          )}
        </View>
        {showDoodlePaper ? (
          <DoodlePaper text={bio} />
        ) : (
          <TextInput
            multiline
            maxLength={275}
            placeholder="Write a bio about yourself..."
            value={bio}
            onChangeText={setBio}
            style={styles.bioInput}
            editable={isEditing}
          />
        )}
        {isEditing && (
          <View style={styles.buttonsContainer}>
            <CreativeButton
              title="Save"
              onPress={handleSaveChanges}
              style={styles.button}
            />
            <View style={styles.space} />
            <CreativeButton
              title="Cancel"
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
              textColor="#ff8c00"
            />
          </View>
        )}
      </View>

      <ProfileModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onImageTaken={handleImageTaken}
      />
      <FlashMessage position="top" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
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
  cameraIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 50,
  },
  username: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  schoolInfo: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 5,
  },
  bioContainer: {
    margin: 20,
    position: "relative",
  },
  bioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  maxCharacters: {
    color: "#ffffff",
    fontSize: 12,
    opacity: 0.7,
  },
  bioInput: {
    color: "#ffffff",
    borderColor: "#00ffff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#ff8c00",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
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
  cancelButton: {
    backgroundColor: "#ffffff",
  },
  space: {
    width: 10,
  },
  profileAndStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pencilIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  gearIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  pencilIconWrapper: {
    top: 10,
    left: 10,
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
});
