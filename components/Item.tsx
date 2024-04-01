import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Item({ name, phone, address, city, id }: { name: string, phone: string, address: string, city: string, id: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.itens}>
        <Text style={styles.text}>Nome: {name}</Text>
        <Text style={styles.text}>Telefone: {phone}</Text>
        <Text style={styles.text}>Endereço: {address}</Text>
        <Text style={styles.text}>Cidade: {city}</Text>
      </View>
      <Link href={{
        pathname: `/(tabs)/[user]`,
        params: {
          user: "edit",
          id
        }
      }}>
        <MaterialCommunityIcons name="account-edit-outline" size={34} color="tomato" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    borderRadius: 5
  },
  itens: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'flex-start',
    // flex: 1,
    flexWrap: 'wrap',
    width: '90%'
  },
  text: {
    width: '50%',
  },
});

