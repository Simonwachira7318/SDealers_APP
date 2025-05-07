import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Phone number is not valid')
    .required('Phone is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailToVerify, setEmailToVerify] = useState('');

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });

      setEmailToVerify(values.email);
      setVerificationSent(true);
      Alert.alert(
        'Verification Sent',
        'A verification code has been sent to your email. Please check your inbox.'
      );
    } catch (err) {
      Alert.alert(
        'Signup Failed',
        err.response?.data?.message || 'An error occurred during signup'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/verify-email', {
        email: emailToVerify,
        code: verificationCode,
      });

      Alert.alert(
        'Email Verified',
        'Your email has been successfully verified. You can now login.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err) {
      Alert.alert(
        'Verification Failed',
        err.response?.data?.message || 'Invalid verification code'
      );
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/resend-verification', {
        email: emailToVerify,
      });
      Alert.alert(
        'Code Resent',
        'A new verification code has been sent to your email.'
      );
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Failed to resend verification code'
      );
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to {emailToVerify}
          </Text>

          <View style={styles.inputContainer}>
            <Icon name="key" size={20} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'teal' }]}
            onPress={handleVerification}
            disabled={loading || verificationCode.length < 6}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={resendVerificationCode} disabled={loading}>
            <Text style={styles.resendText}>
              Didn't receive a code? <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.input}
                />
              </View>
              {errors.firstName && touched.firstName ? (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={styles.input}
                />
              </View>
              {errors.lastName && touched.lastName ? (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Icon name="phone" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && touched.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput
                  placeholder="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'teal' }]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'teal',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  icon: {
    marginRight: 10,
    color: '#888',
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    marginRight: 5,
    fontSize: 16,
    color: '#555',
  },
  footerLink: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  resendLink: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignupScreen;