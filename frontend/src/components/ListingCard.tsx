import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ListingCard({ listing }: any) {
  return (
    <TouchableOpacity style={{
      padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#eee", marginBottom: 12
    }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{listing.title}</Text>
      <Text style={{ color: "#666", marginTop: 6 }}>
        {listing.description}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        {listing.pricePerDay ? <Text style={{ marginRight: 12 }}>Dnevno: {(listing.pricePerDay/100).toFixed(2)} RSD</Text> : null}
        {listing.pricePerMonth ? <Text>Mesečno: {(listing.pricePerMonth/100).toFixed(2)} RSD</Text> : null}
      </View>
    </TouchableOpacity>
  );
}
