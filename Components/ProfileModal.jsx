import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import Modal from 'react-native-modal';

export default function ProfileModal({ isVisible, onClose }) {

  const handleChooseFromLibrary = () => {
    // Implement logic to choose image from library
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

        <TouchableOpacity style={styles.row} >
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
