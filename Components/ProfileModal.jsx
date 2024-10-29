import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileModal({ isVisible, onClose, onImageTaken }) {

  const handleChooseFromLibrary = async () => {
    // Ask for permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      showMessage({
        message: "You've refused to allow this app to access your photos!",
        type: "danger",
      });
      return;
    }
    
    // Launch the image library to choose an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],     
      quality: 1,          // Highest quality
    });
    
    // If the user doesn't cancel the operation, send the chosen image back
    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Accessing the uri from the assets array
      onClose();
      onImageTaken(imageUri);
   }
  };
  
  const handleTakePhoto = async () => {
    // Ask for permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    // Launch the camera with the following settings
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, 
      aspect: [4, 3],     
      quality: 1,    
    });
  
    if (!result.cancelled) {
      onClose(); 
      onImageTaken(result.uri); 
    }
  };
  
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      style={styles.modalContainer}
      animationInTiming={500} 
      animationOutTiming={500} 
    >
      <View style={styles.modalContent}>
        <View style={styles.dragBar} />
        <Text style={styles.title}>Profile Image</Text>
        <View style={styles.separator} />

        <TouchableOpacity style={styles.row} onPress={handleTakePhoto}>
          <Ionicons name="camera-outline" size={24} />
          <Text style={styles.label}>Take a photo</Text>
        </TouchableOpacity>
        
        <View style={styles.separator} />

        <TouchableOpacity style={styles.row} onPress={handleChooseFromLibrary}>
          <Ionicons name="image-outline" size={24} />
          <Text style={styles.label}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
    marginTop: 'auto',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%', 
  },
  dragBar: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'grey',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  overlay: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },

});
