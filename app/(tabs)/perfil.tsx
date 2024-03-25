import { Pressable, SafeAreaView, StyleSheet, TextInput, Text } from 'react-native';

import { View } from '@/components/Themed';
import { StyledButton } from '@/components/StyledButton';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

export default function TabTwoScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      sobrenome: '',
      email: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
    }
  })
  const [submittedData, setSubmittedData] = useState({});

  const onSubmit = (data: any) => {
    console.log(`Submitted Data:  `, data);
    setSubmittedData(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.textInput}
              placeholder="Your Name"
            />
          )}
          name="name"
          rules={{ required: 'You must enter your name' }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Controller control={control} name='sobrenome' render={({ field: { onChange, value } }) =>
          <TextInput onChangeText={onChange} value={value} placeholder="Segundo Nome" style={styles.textInput} />
        }
          rules={{ required: 'Sobrenome é obrigatório' }}
        />
        <TextInput placeholder="Email" style={styles.textInput} />
        <TextInput placeholder='CEP' style={styles.textInput} />
        <TextInput placeholder='Rua' style={styles.textInput} />
        <TextInput placeholder='Numero' style={styles.textInput} />
        <TextInput placeholder='Bairro' style={styles.textInput} />
        <TextInput placeholder='Cidade' style={styles.textInput} />
        <TextInput placeholder='UF' style={styles.textInput} />
        <View style={styles.buttonContainer}>
          <StyledButton title="Cancelar" onPress={() => { }} color='tomato' />
          <StyledButton title="Salvar" onPress={handleSubmit(onSubmit)} color='green' />
        </View>
        <Text style={styles.title}>{JSON.stringify(submittedData)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'tomato',
    width: '100%',
    height: 40,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    fontSize: 16
  },
  buttonContainer: {
    overflow: 'hidden',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  errorText: {
    color: 'white',
  }
});
