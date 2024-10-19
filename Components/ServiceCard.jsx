import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ServiceCard = ({ service }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>${service.price.toFixed(2)}</Text>
      {service.tiers && service.tiers.length > 0 && (
        <View style={styles.tiers}>
          <Text style={styles.tiersHeader}>Tiers:</Text>
          {service.tiers.map((tier) => (
            <View key={tier.id} style={styles.tier}>
              <Text style={styles.tierTitle}>{tier.title}</Text>
              <Text style={styles.tierPrice}>
                ${tier.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  tiers: {
    marginTop: 10,
  },
  tiersHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  tier: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tierTitle: {
    fontSize: 14,
    color: "#555",
  },
  tierPrice: {
    fontSize: 14,
    color: "#555",
  },
});

export default ServiceCard;
