import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import { colors, fontColor, scale, typography } from '@style';
import { CustomKeyboardAvoidingView } from '@components/helper-views';
import { localized } from '@localization';
import { MainButton, TextButton } from '@components/buttons';
import { TLoginQuery, useLogin } from '../auth-query';
import LoginSchema from './login-schema';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loginMutation, { error, reset }] = useLogin();
  const initialValues: TLoginQuery = {
    email: '',
    password: '',
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors: formErrors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: initialValues,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (request: TLoginQuery) => {
      loginMutation({ variables: request });
    },
  });

  useEffect(() => {
    if (error) {
      setSubmitting(false);
    }
  }, [error, setSubmitting]);
  const onSubmit = () => {
    passwordInputRef.current?.blur();
    emailInputRef.current?.blur();
    handleSubmit();
  };

  const onPressNotAMemberButton = () => {
    navigation.goBack();
    navigation.navigate('RegisterScreen');
  };

  const onChangeTextInputField = () => {
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <View style={styles.body}>
          <View>
            <TextInput
              onChange={onChangeTextInputField}
              style={[styles.textInput]}
              placeholderTextColor={colors.textGrayH2}
              onChangeText={handleChange('email')}
              placeholder={localized('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              ref={emailInputRef}
              blurOnSubmit={false}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              returnKeyType="next"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.textInput]}
              placeholderTextColor={colors.textGrayH2}
              onChange={onChangeTextInputField}
              placeholder={localized('password')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              ref={passwordInputRef}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={() => passwordInputRef.current?.blur()}
              autoCapitalize="none"
            />
            <TextButton
              onPress={() => {}}
              text={
                <Text style={typography.p2}>{localized('resetPassword')}</Text>
              }
              style={styles.resetPasswordButton}
            />
            <Text style={[typography.p4, fontColor.warningRed]}>
              {error?.message ?? ''}
            </Text>
          </View>
          <View>
            <MainButton
              loading={isSubmitting}
              onPress={onSubmit}
              title={localized('signIn')}
              style={styles.loginButton}
              disabled={Object.keys(formErrors).length !== 0}
            />
          </View>
          <TextButton
            onPress={onPressNotAMemberButton}
            text={
              <Text style={[typography.p1, fontColor.textGrayH2]}>
                {localized('notAMember')}
                <Text style={[{ color: colors.darkPink }]}>
                  {' '}
                  {localized('registerNow')}
                </Text>
              </Text>
            }
          />
        </View>
      </CustomKeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: scale(35),
    paddingTop: '5%',
    paddingBottom: '3.5%',
    justifyContent: 'space-between',
  },
  resetPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: scale(17),
  },
  loginButton: { marginBottom: scale(40) },
  textInput: {
    ...typography.p1,
    paddingStart: scale(15),
    height: 55,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.brightGray,
    marginBottom: scale(17),
  },
});

export default LoginScreen;
