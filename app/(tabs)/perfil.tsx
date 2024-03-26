import { Pressable, SafeAreaView, StyleSheet, TextInput, Text } from 'react-native';

import { View } from '@/components/Themed';
import { StyledButton } from '@/components/StyledButton';
import { Controller, useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('database.db');

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function TabTwoScreen() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
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
  });
  const [submittedData, setSubmittedData] = useState<FormData>({} as FormData);

  const onSubmit = (data: FormData) => {
    console.log(`Submitted Data:  `, data);
    setSubmittedData(data);

    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT INTO profile (
          nome,
          sobrenome,
          email,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          uf
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          data.nome,
          data.sobrenome,
          data.email,
          data.cep,
          data.rua,
          data.numero,
          data.bairro,
          data.cidade,
          data.uf,
        ],
        (txResult: any) => {
          console.log("Dados salvos com sucesso");
        },
        (txError: any) => {
          console.error("Erro ao salvar dados: ", txError);
        }
      );
    }, (error: any) => {
      console.error("Erro ao abrir banco de dados: ", error);
    });
  }

  const handleClear = () => {
    reset({
      nome: '',
      sobrenome: '',
      email: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
    });
    setSubmittedData({} as FormData);
  }

  const handleCep = useCallback(async (cep: any) => {
    if (cep) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const json = await response.json()
      console.log(`JSON: `, json)

      const { logradouro, bairro, localidade, uf } = json
      reset({ ...submittedData, rua: logradouro, bairro, cidade: localidade, uf })
    }

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              onChangeText={field.onChange}
              value={field.value}
              style={styles.textInput}
              placeholder="Primeiro Nome"
            />
          )}
          name="nome"
          rules={{ required: 'You must enter your name' }}
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

        <Controller
          control={control}
          name='sobrenome'
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Segundo Nome"
              style={styles.textInput} />
          )}
          rules={{ required: 'Sobrenome é obrigatório' }}
        />
        {errors.sobrenome && <Text style={styles.errorText}>{errors.sobrenome.message}</Text>}
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              style={styles.textInput}
            />
          )}
          rules={{ required: 'Email é obrigatório' }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        <Controller
          control={control}
          name='cep'
          render={({ field: { onChange, value } }) => (
            <View style={styles.cepContainer}>
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder='CEP'
                style={styles.textInput}
              />
              <StyledButton onPress={() => handleCep(value)} color='tomato' icon='search' />
            </View>
          )}
          rules={{ required: 'CEP é obrigatório' }}
        />
        {errors.cep && <Text style={styles.errorText}>{errors.cep.message}</Text>}
        <Controller
          control={control}
          name='rua'
          render={({ field: { onChange, value } }) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder='Rua'
              style={styles.textInput} />}
          rules={{ required: 'Rua é obrigatório' }}
        />
        {errors.rua && <Text style={styles.errorText}>{errors.rua.message}</Text>}
        <Controller
          control={control}
          name='numero'
          render={({ field: { onChange, value } }) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder='Numero'
              style={styles.textInput} />}
          rules={{ required: 'Numero é obrigatório' }}
        />
        {errors.numero && <Text style={styles.errorText}>{errors.numero.message}</Text>}
        <Controller
          control={control}
          name='bairro'
          render={({ field: { onChange, value } }) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder='Bairro'
              style={styles.textInput} />}
          rules={{ required: 'Bairro é obrigatório' }}
        />
        {errors.bairro && <Text style={styles.errorText}>{errors.bairro.message}</Text>}
        <Controller
          control={control}
          name='cidade'
          render={({ field: { onChange, value } }) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder='Cidade'
              style={styles.textInput} />}
          rules={{ required: 'Cidade é obrigatório' }}
        />
        {errors.cidade && <Text style={styles.errorText}>{errors.cidade.message}</Text>}
        <Controller
          control={control}
          name='uf'
          render={({ field: { onChange, value } }) =>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder='UF'
              style={styles.textInput} />}
          rules={{ required: 'UF é obrigatório' }}
        />
        {errors.uf && <Text style={styles.errorText}>{errors.uf.message}</Text>}
        <View style={styles.buttonContainer}>
          <StyledButton title="Cancelar" onPress={() => handleClear()} color='tomato' grow={1} />
          <StyledButton title="Salvar" onPress={handleSubmit(onSubmit)} color='green' grow={1} />
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
    color: 'red',
    height: 40,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    flexGrow: 1
  },
  buttonContainer: {
    marginTop: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  errorText: {
    color: 'red',
  },
  cepContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
    gap: 10
  }
});
