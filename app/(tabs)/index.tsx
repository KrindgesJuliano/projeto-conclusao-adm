import { Button, ScrollView, StyleSheet } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';

import { Text, View } from '@/components/Themed';
import Item from '@/components/Item';
import { useCallback, useEffect, useState } from 'react';
import { getPlayers } from '@/db/sqlite';

export default function TabOneScreen() {
  const [players, setPlayers] = useState<any>([]);

  const GetPlayers = async () => {
    const players = await getPlayers();
    setPlayers(players.reverse());
  }

  useFocusEffect(
    useCallback(() => {
      GetPlayers();
    }, [])
  );


  return (
    <View style={styles.container}>
      {/* <Button title='Player' onPress={() => GetPlayers()} /> */}
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        {players.length > 0 ? players.map((player: any) => (
          <Item key={player.id} name={player.nome} phone={player.telefone} address={player.rua} city={player.cidade} />
        )) :
          <View>
            <Text style={styles.title}>
              Nao existe jogadores cadastrados
            </Text>
            <Link push href='/(tabs)/perfil' style={styles.navigateButton}>Novo Jogador</Link>
          </View>
        }
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
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'tomato',
    color: 'white',
    textAlign: 'center'
  }
});
