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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button, {OrangeButton, CreativeButton} from "../../Components/Button"; // Update this path
import DoodlePaper from "../../Components/DoodlePaper";
import ProfileStats from "../../Components/ProfileStats";

export default function Profile() {
  const [bio, setBio] = useState("");
  const [savedBio, setSavedBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDoodlePaper, setShowDoodlePaper] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => handleChooseImage(setBannerImage)}
        style={styles.bannerContainer}>
        <Image
          source={bannerImage || require("../../assets/defaultBanner.jpg")}
          style={styles.banner}
        />
      </TouchableOpacity>

      <View style={styles.profileAndStatsContainer}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => handleChooseImage(setProfileImage)}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage || require("../../assets/hornetLogo2.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>Username</Text>
          <Text style={styles.schoolInfo}>School - Year</Text>
        </View>
        <ProfileStats
          posts={postsCount}
          followers={followersCount}
          following={followingCount}
        />
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
      <OrangeButton
        title="Log Out"
        onPress={() => {}}
        style={styles.logoutButton}
      />
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
    justifyContent: 'center', // Center the image
    alignItems: 'center', // Center the image
  },
  profileImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
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
});
