import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fontColor, scale, typography } from '@style';
import { CustomKeyboardAvoidingView } from '../../../common/components/helper-views';
import { localized } from '@localization';
import { MainButton, TextButton } from '@components/buttons';
import RegisterSchema from './register-schema';
import { useSignUp, TLoginQuery } from '../auth-query';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const [signUp, { error }] = useSignUp();
  const initialValues: TLoginQuery = {
    email: '',
    password: '',
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    isSubmitting,
    setSubmitting,
    errors: formErrors,
  } = useFormik({
    validationSchema: RegisterSchema,
    initialValues: initialValues,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (request: TLoginQuery) => {
      signUp({ variables: request });
    },
  });

  const onPressAlreadyMemberButton = () => {
    navigation.goBack();
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    if (error) {
      setSubmitting(false);
    }
  }, [error, setSubmitting]);

  const onSubmit = () => {
    nameInputRef.current?.blur();
    emailInputRef.current?.blur();
    passwordInputRef.current?.blur();
    handleSubmit();
  };

  const onChangeTextInputField = () => {
    // resetRequest();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomKeyboardAvoidingView>
        <View style={styles.body}>
          <View>
            <Text style={styles.textInputTitle}>{localized('email')}</Text>
            <TextInput
              onChange={onChangeTextInputField}
              autoCapitalize="none"
              style={[
                styles.textInput,
                // requestError && styles.textInputErrorState,
              ]}
              placeholder={localized('emailPlaceholder')}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              ref={emailInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Text style={styles.textInputTitle}>{localized('password')}</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              placeholder={localized('password')}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              ref={passwordInputRef}
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>
          <Text>{error?.message}</Text>
          <MainButton
            loading={isSubmitting}
            onPress={onSubmit}
            title={localized('signUp')}
            style={styles.signInButton}
            disabled={Object.keys(formErrors).length !== 0}
          />
          <TextButton
            onPress={onPressAlreadyMemberButton}
            text={
              <Text style={[typography.p1, fontColor.textGrayH2]}>
                {localized('alreadyMember')}
                <Text style={{ color: colors.darkPink }}>
                  {' '}
                  {localized('login')}
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
  container: { flex: 1, backgroundColor: colors.backgroundGray },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: scale(29),
    paddingTop: '10%',
    paddingBottom: '6%',
  },
  textInputTitle: {
    ...typography.h5,
    marginBottom: scale(8),
    marginHorizontal: scale(4),
  },
  textInput: {
    ...typography.p3,
    borderColor: colors.brightGray,
    borderBottomWidth: 2,
    paddingBottom: scale(10),
    marginBottom: scale(8),
    paddingTop: scale(8),
    marginHorizontal: scale(4),
  },
  signInButton: {
    marginVertical: scale(18),
    alignSelf: 'center',
    height: scale(46),
    width: scale(168),
  },
});

export default RegisterScreen;
