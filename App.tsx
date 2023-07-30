import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLenght: Yup.number()
    .min(8, 'Password precisa ter no mínimo 8 caracteres')
    .max(16, 'Password pode ter no máximo 16 caracteres')
    .required('Password é obrigatório'),
});

export default function App() {
  const [password, setpassword] = useState<string | undefined>('');
  const [isPasswordGenerated, setisPasswordGenerated] =
    useState<boolean>(false);
  const [lowercase, setlowercase] = useState<boolean>(true);
  const [uppercase, setuppercase] = useState<boolean>(false);
  const [numbers, setnumbers] = useState<boolean>(false);
  const [symbols, setsymbols] = useState<boolean>(false);

  const generatePasswordString = async (passwordLenght: number) => {
    let characterList = '';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const symbol = '!@#$%^&*()_+';

    if (lowercase) {
      characterList += lowerCase;
    }
    if (uppercase) {
      characterList += upperCase;
    }
    if (numbers) {
      characterList += number;
    }
    if (symbols) {
      characterList += symbol;
    }
    if (characterList === '') {
      characterList = lowerCase;
    }
    const finalPassword = await createPassword(characterList, passwordLenght);
    setpassword(finalPassword);
    setisPasswordGenerated(true);
  };

  const createPassword = async (characters: string, passwordLenght: number) => {
    let result = '';
    for (let i = 0; i < passwordLenght; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
      return result;
    }
  };

  const resetPasswordState = () => {
    setpassword('');
    setisPasswordGenerated(false);
    setlowercase(true);
    setuppercase(false);
    setnumbers(false);
    setsymbols(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Password Generator</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13414d',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#e9f0ed',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 2,
  },
});
