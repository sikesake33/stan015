import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import axios from "axios";
import ListingCard from "../components/ListingCard";

type Listing = {
  id: number;
  title: string;
  description?: string;
  pricePerDay?: number;
  pricePerMonth?: number;
  city: string;
};

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/listings")
      .then(res => setListings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Stanovi — Loznica i okolina</Text>
      {listings.map(l => (
        <ListingCard key={l.id} listing={l} />
      ))}
      <View style={{ marginTop: 24 }}>
        <Button title="Dodaj demo listing (dev)" onPress={() => {
          axios.post("http://localhost:4000/api/listings", {
            title: "Demo stan u centru Loznice",
            description: "Mali, moderan, blizu svih sadržaja",
            address: "Trg 1",
            city: "Loznica",
            images: [],
            pricePerDay: 350000,
            pricePerMonth: 8500000
          }).then(() => axios.get("http://localhost:4000/api/listings").then(r => setListings(r.data)));
        }} />
      </View>
    </ScrollView>
  );
}
