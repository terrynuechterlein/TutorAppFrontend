import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../Constants/colors";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import AccountSetupModal from "../../Components/AccountSetUpModal";
import CreateProjectModal from "../../Components/CreateProjectModal";
import { OrangeButton } from "../../Constants/Button";

export default function Projects({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [projects, setProjects] = useState([]);
  const [createProjectModalVisible, setCreateProjectModalVisible] =
    useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://172.20.20.20:5016/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = (project) => {
    setProjects([project, ...projects]);
  };

  const handleRequestToJoin = async (projectId) => {
    try {
      const response = await fetch(
        `http://172.20.20.20:5016/api/projects/${projectId}/requestToJoin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      if (response.ok) {
        alert("Request to join project successful.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to request to join project.");
      }
    } catch (error) {
      console.error("Failed to request to join project:", error);
    }
  };

  const renderProject = ({ item }) => {
    console.log(
      "Creator's Profile Picture URL:",
      item.creator.profilePictureUrl
    );
    console.log("Creator object:", item.creator);

    return (
      <View style={styles.projectCardContainer}>
        {/* ImageBackground component to set the background image */}
        <ImageBackground
          source={require("../../assets/Projects/tech7.png")} 
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.torquoise}AA`, // adding AA for 2/3 opacity
              `${COLORS.purple}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >

        {/* ImageBackground component to set the background image */}
        {/* <ImageBackground
          source={require("../../assets/Projects/MultimediaDesign.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.orange}AA`, // adding AA for 2/3 opacity
              `${COLORS.vibrantblue}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Music.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.black}AA`, // adding AA for 2/3 opacity
              `${COLORS.rosy}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/DataScience.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.black}AA`, // adding AA for 2/3 opacity
              `${COLORS.lightyellow}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}
        {/* 
        <ImageBackground
          source={require("../../assets/Projects/Engineering.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.black}AA`, // adding AA for 2/3 opacity
              `${COLORS.white}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Business.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.rosy}AA`, // adding AA for 2/3 opacity
              `${COLORS.white}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Writing.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.softbrown}AA`, // adding AA for 2/3 opacity
              `${COLORS.brown}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Biology.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.sand}AA`, // adding AA for 2/3 opacity
              `${COLORS.green}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}
        {/* 
        <ImageBackground
          source={require("../../assets/Projects/Chemistry.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.purple}AA`, // adding AA for 2/3 opacity
              `${COLORS.green}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Physics.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.purple}AA`, // adding AA for 2/3 opacity
              `${COLORS.vibrantblue}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/VideoProduction.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.rosy}AA`, // adding AA for 2/3 opacity
              `${COLORS.appblue}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Fashion.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.red}AA`, // adding AA for 2/3 opacity
              `${COLORS.black}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}

        {/* <ImageBackground
          source={require("../../assets/Projects/Other.jpg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            style={{ flex: 1 }}
            colors={[
              `${COLORS.red}AA`, // adding AA for 2/3 opacity
              `${COLORS.black}AA`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          > */}
            <View style={styles.projectCardOverlay}>
              <View style={styles.projectCardContent}>
                {/* Project Details */}
                <Text style={styles.projectName}>{item.name}</Text>
                <Text style={styles.projectDescription}>
                  {item.description}
                </Text>

                {/* Creator */}
                <View style={styles.creatorContainer}>
                  <Image
                    source={{ uri: item.creator.profilePictureUrl }}
                    style={styles.creatorImage}
                  />
                  <Text style={styles.creatorName}>
                    {item.creator.userName}
                  </Text>
                </View>

                {/* Members */}
                <View style={styles.membersContainer}>
                  <Text style={styles.membersCount}>
                    {item.members.length} members
                  </Text>
                  <View style={styles.membersImages}>
                    {item.members.map((member, index) => (
                      <Image
                        key={index}
                        source={{ uri: member.profilePictureUrl }}
                        style={styles.memberImage}
                      />
                    ))}
                  </View>
                </View>

                {/* Request to Join Button */}
                {item.isOpenToRequests && (
                  <View style={styles.requestContainer}>
                    <OrangeButton
                      title="Request to Join"
                      onPress={() => handleRequestToJoin(item.id)}
                    />
                    {/* Open to Requests Text */}
                    <Text style={styles.requestsText}>
                      {item.isOpenToRequests
                        ? "Open to requests"
                        : "Not open to requests"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Projects List */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProject}
        contentContainerStyle={styles.projectsList}
      />

      {/* Floating '+' Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setCreateProjectModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Create Project Modal */}
      <CreateProjectModal
        isVisible={createProjectModalVisible}
        onClose={() => setCreateProjectModalVisible(false)}
        onCreateProject={handleCreateProject}
      />

      {/* Account Setup Modal */}
      <AccountSetupModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  projectsList: {
    padding: 10,
  },
  projectCardContainer: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    minHeight: 280,
  },
  projectCardOverlay: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
  },
  projectCardContent: {
    padding: 15,
    flex: 1, 
    minHeight: 280,
  },
  projectName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  projectDescription: {
    fontSize: 16,
    color: "#e0e0e0",
    marginVertical: 10,
  },
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  creatorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  creatorName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  membersContainer: {
    marginVertical: 10,
  },
  membersCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  membersImages: {
    flexDirection: "row",
    marginTop: 5,
  },
  memberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  requestsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffd700",
    alignSelf: "center", 
    marginTop: 10, 
  },
  floatingButton: {
    backgroundColor: COLORS.yellow,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  requestContainer: {
    position: "absolute", 
    bottom: -5, 
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
});
