import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {AppTextInput, AppButton} from '../../components';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '../../constants';
import {Pressable} from 'react-native';
import {useAppContext} from '../../context';
import {ROUTES} from '../../navigation';
import {signupValidationSchema} from './helpers';
import {signup} from '../../utils';

export default function Signup() {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values: any) => {
    setIsLoading(true);

    try {
      await signup(values);
      Alert.alert('Success', 'You have successfully signed up', [
        {
          text: 'OK',
          onPress: () => navigation.navigate(ROUTES.LOGIN),
        },
      ]);
    } catch (ex: any) {
      console.log(ex.response?.data?.error || ex.message);
      Alert.alert(ex?.response?.data?.error?.message || ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
      )}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <SafeAreaView style={styles.container}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>Sign up</Text>
              <Text style={styles.subtitle}>
                Please fill in the form to register
              </Text>
            </View>

            <Formik
              validationSchema={signupValidationSchema}
              initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
              }}
              onSubmit={handleSignup}>
              {({
                errors,
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                touched,
              }) => (
                <>
                  <View style={styles.form}>
                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="First name"
                        placeholder="Enter your first name"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={values.firstName}
                        onBlur={handleBlur('firstName')}
                        onChangeText={handleChange('firstName')}
                        error={errors.firstName}
                        touched={touched.firstName}
                        autoFocus
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="Last name"
                        placeholder="Enter your last name"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={values.lastName}
                        onBlur={handleBlur('lastName')}
                        onChangeText={handleChange('lastName')}
                        error={errors.lastName}
                        touched={touched.lastName}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="Email address"
                        placeholder="Email Address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        error={errors.email}
                        touched={touched.email}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="Phone number"
                        placeholder="Enter your phone number"
                        keyboardType="number-pad"
                        value={values.phoneNumber}
                        onBlur={handleBlur('phoneNumber')}
                        onChangeText={handleChange('phoneNumber')}
                        error={errors.phoneNumber}
                        touched={touched.phoneNumber}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <AppTextInput
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry
                        autoCapitalize="none"
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        error={errors.password}
                        touched={touched.password}
                      />
                    </View>
                  </View>

                  <View style={styles.bottom}>
                    <AppButton
                      title="Sign up"
                      isLoading={isLoading}
                      onPress={handleSubmit}
                      full
                    />
                    <Pressable
                      style={styles.bottomTextContainer}
                      onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                      <Text style={styles.bottomText}>
                        Already have an account?{' '}
                        <Text style={styles.bottomTextLink}>Log in</Text>
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    container: {
      flex: 1,
    },
    header: {
      marginTop: 16,
    },
    title: {
      fontSize: 36,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    subtitle: {
      fontWeight: Platform.OS === 'ios' ? '500' : '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
      opacity: 0.5,
      marginTop: 3,
    },
    animationContainer: {
      alignItems: 'center',
    },
    animation: {
      width: 180,
      height: 180,
    },
    form: {
      marginVertical: 40,
    },
    inputContainer: {
      marginBottom: 24,
    },
    bottom: {
      alignItems: 'center',
      paddingBottom: 16,
    },
    bottomTextContainer: {
      alignSelf: 'center',
    },
    bottomText: {
      marginTop: 10,
      fontSize: 12,
      color: theme === 'dark' ? Colors.white : Colors.dark,
    },
    bottomTextLink: {
      fontWeight: '600',
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
    },
  });
