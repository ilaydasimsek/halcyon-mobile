import React, { PropsWithChildren, RefObject } from 'react';
import {
  InputAccessoryView,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useFormikContext } from 'formik';

import { colors, scale, typography } from '@style';
import { ImageButton } from '@components/buttons';
import { icons } from '@constants';

type TBasicTextInput<T extends Record<string, any>> = TextInputProps & {
  inputType: keyof T;
  styleType?: 'bordered' | 'bottomLine';
  showsErrors?: boolean;
  clearOnEdit?: boolean;
  textInputRef?: RefObject<TextInput>;
  nextTextInputRef?: RefObject<TextInput>;
};

/***
 *   A generic TextInput that handles all the Formik logic. Uses Formik context
 * to get all the formik related functions and data.
 *  <T extends Record<string, any>> is the type of Formik input, it should be
 * the same type that's used in Formik's initialProps
 *
 * Warning: Should be used inside a Formik component, otherwise it won't work
 *
 * @param inputType The formik input name
 * @param styleType Either a full bordered style or just a bottom line
 * @param showsErrors used to determine whether the input field shows the yup errors or not
 * @param clearOnEdit Whether the formik state should be cleared on edit
 * @param textInputRef the ref object that will be passed to text input
 * @param props Rest of the TextInput props
 * @constructor
 *
 * Example usage:
 *  type TExampleForm = {
 *    field1: string,
 *    field2: string,
 *  }
 *  const ExampleTextInput = BasicTextInput<TExampleForm>;
 *
 *      <Formik
 *         initialValues={initialValues}
 *         {...}
 *       >
 *           <ExampleTextInput inputType="field1" />
 *           <ExampleTextInput inputType="field2" />
 *       </Formik>
 */

const BasicTextInput = <T extends Record<string, any>>({
  inputType,
  styleType = 'bordered',
  showsErrors = true,
  clearOnEdit = true,
  textInputRef,
  nextTextInputRef,
  style,
  ...props
}: PropsWithChildren<TBasicTextInput<T>>) => {
  const { handleChange, handleBlur, values, errors, setErrors } =
    useFormikContext<T>();
  const inputFieldAccessoryId = `inoutFieldAccessory${String(inputType)}`;
  const baseStyle =
    styleType === 'bordered'
      ? styles.borderedTextInput
      : styles.bottomLinedTextInput;
  const errorStyle =
    styleType === 'bordered'
      ? styles.borderedTextInputError
      : styles.bottomLinedTextInputError;
  const formikError = errors[inputType];

  return (
    <>
      <TextInput
        style={[
          baseStyle,
          showsErrors && formikError !== undefined && errorStyle,
          style,
        ]}
        ref={textInputRef}
        inputAccessoryViewID={inputFieldAccessoryId}
        placeholderTextColor={colors.textGrayH2}
        onChangeText={handleChange(inputType)}
        onChange={(e) => {
          if (clearOnEdit) {
            setErrors({});
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onBlur={handleBlur(String(inputType))}
        onSubmitEditing={() => nextTextInputRef?.current?.focus()}
        value={values[String(inputType)]}
        returnKeyType="next"
        {...props}
      />
      {/*iOS doesn't have a next button on phone-pad so we add it manually*/}
      {props.keyboardType === 'phone-pad' && Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={inputFieldAccessoryId}>
          <View style={styles.inputAccessoryView}>
            <ImageButton
              style={styles.keyboardNextButton}
              onPress={() => nextTextInputRef?.current?.focus()}
              image={icons.back}
            />
          </View>
        </InputAccessoryView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  borderedTextInput: {
    ...typography.p3,
    paddingHorizontal: scale(15),
    // Paddings are different due to different behavior of text input
    paddingTop: Platform.OS === 'android' ? scale(15) : scale(10),
    paddingBottom: Platform.OS === 'android' ? scale(5) : scale(10),
    textAlignVertical: 'top',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.brightGray,
  },
  borderedTextInputError: { borderColor: colors.warningRed },
  bottomLinedTextInput: {
    ...typography.p3,
    borderColor: colors.brightGray,
    borderBottomWidth: 2,
    paddingBottom: scale(5),
    paddingTop: scale(8),
    marginHorizontal: scale(4),
  },
  bottomLinedTextInputError: {
    borderColor: colors.warningRed,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: scale(4),
    marginHorizontal: 0,
  },
  inputAccessoryView: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingVertical: 4,
    backgroundColor: colors.white,
  },
  keyboardNextButton: {
    height: scale(32),
    borderWidth: 0,
  },
});

export default BasicTextInput;
