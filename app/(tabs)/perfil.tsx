import { SafeAreaView, StyleSheet, TextInput, Text, Button } from 'react-native';
import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { Controller, useForm } from 'react-hook-form';
import { router, useNavigation } from 'expo-router';

import { View } from '@/components/Themed';
import { StyledButton } from '@/components/StyledButton';
import { deleteAllPlayers, saveNewPlayer } from '@/db/sqlite';

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
  const navigation = useNavigation();
  const { control, handleSubmit, reset, getValues, setError, formState: { errors } } = useForm<FormData>({
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
    saveNewPlayer(data).then((res) => {
      console.log(`Dados salvos com sucesso: `, res);
      Toast.show({
        type: `success`,
        text1: `Sucesso`,
        text2: `Competidor ${data.nome} Salvo com Sucesso!`,
      })
      setSubmittedData({} as FormData);
      reset({ nome: '', sobrenome: '', email: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', uf: '' });
      router.replace('/');
    }).catch((err) => {
      console.error(`Erro ao salvar dados do competidor: `, err);
      Toast.show({
        type: `error`,
        text1: `Erro`,
        text2: `Erro ao salvar dados do competidor: ${err}`,
      })
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

      if (json.erro) {
        setError('cep', {
          type: 'custom',
          message: 'CEP não encontrado',
        })
        return
      }

      const { logradouro, bairro, localidade, uf } = json
      reset({ nome: getValues(`nome`), sobrenome: getValues(`sobrenome`), email: getValues(`email`), cep: getValues(`cep`), rua: logradouro, bairro, cidade: localidade, uf })
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
          rules={{ required: 'Nome é obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 letras' } }}
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
          rules={{ required: 'Sobrenome é obrigatório', minLength: { value: 3, message: 'Sobrenome deve ter pelo menos 3 letras' } }}
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
          rules={{ required: 'E-mail é obrigatório', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'E-mail inválido' } }}
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
      </View>
      <Button title='Apagar todos' onPress={() => deleteAllPlayers()} />
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
