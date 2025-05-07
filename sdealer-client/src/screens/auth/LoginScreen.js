// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      // This is just for demo - in a real app, you would call your API here
      if (values.email === 'demo@gmail.com' && values.password === '#Pass004') {
        dispatch(loginSuccess({
          email: values.email,
          firstName: 'Demo',
          lastName: 'User'
        }));
        navigation.navigate('Home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={100}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>S!Dealers Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.passwordInput}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

              <Button onPress={handleSubmit} title="Login" />
            </View>
          )}
        </Formik>

        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Don't have an account? Sign up
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: { color: 'red', fontSize: 12 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});

export default LoginScreen;