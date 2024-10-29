import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ServiceCard = ({ service, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => onDelete(service.id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <AntDesign name="close" size={20} color="#ff0000" />
      </TouchableOpacity>

      {/* Service Title and Description */}
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>

      {/* Tiers */}
      {service.tiers && service.tiers.length > 0 && (
        <View style={styles.tiers}>
          {service.tiers.map((tier, index) => (
            <View key={tier.id} style={styles.tier}>
              <Text style={styles.tierHeader}>Tier {index + 1}</Text>
              <Text style={styles.tierTitle}>{tier.title}</Text>
              <Text style={styles.tierDescription}>{tier.description}</Text>
              <Text style={styles.tierPrice}>${tier.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  tiers: {
    marginTop: 10,
  },
  tier: {
    marginBottom: 15,
  },
  tierHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 3,
  },
  tierDescription: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
  },
  tierPrice: {
    fontSize: 14,
    color: "#333",
  },
});

export default ServiceCard;
