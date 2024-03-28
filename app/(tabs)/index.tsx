import { Button, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Item from '@/components/Item';
import { useEffect, useState } from 'react';
import { getPlayers } from '@/db/sqlite';

export default function TabOneScreen() {
  const [players, setPlayers] = useState<any>([]);

  const GetPlayers = async () => {
    const players = await getPlayers();
    setPlayers(players.reverse());
  }

  useEffect(() => {
    async () => {
      GetPlayers();
    }
  }, [])


  return (
    <View style={styles.container}>
      <Button title='Player' onPress={() => GetPlayers()} />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        {players ? players.map((player: any) => (
          <Item key={player.id} name={player.nome} phone={player.telefone} address={player.rua} city={player.cidade} />
        )) : <Text>Carregando...</Text>}

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
