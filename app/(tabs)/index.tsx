import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Item from '@/components/Item';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
        <Item name="João" phone="123456789" address="Rua ABC" city="São Paulo" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollStyle: {
    width: '100%',
    padding: 10,
    display: 'flex',
    gap: 10
  }
});
