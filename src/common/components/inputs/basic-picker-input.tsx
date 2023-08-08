import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormikContext } from 'formik';

import { colors, scale, typography } from '@style';
import { icons } from '@constants';
import { eventEmitter } from '../../utils/event-emitter';

type TBasicPickerInput<T extends Record<string, any>> = {
  items: { [k: string]: string };
  inputType: keyof T;
  placeholder: string;
  dropdownId: string;
};

const BasicPickerInput = <T extends Record<string, any>>({
  items,
  inputType,
  placeholder,
  dropdownId,
}: PropsWithChildren<TBasicPickerInput<T>>) => {
  const { setFieldValue, values } = useFormikContext<T>();
  const navigation = useNavigation();
  const initialValue = values[String(inputType)];
  const [selectedItemKey, setSelectedItemKey] = useState(initialValue);
  const onPickerDismissEmitterEventName = `on${dropdownId}PickerDismiss`;

  useEffect(() => {
    setFieldValue(String(inputType), selectedItemKey);
  }, [inputType, selectedItemKey, setFieldValue]);

  const onItemSelected = (item: string) => setSelectedItemKey(item);

  useEffect(() => {
    eventEmitter.on(onPickerDismissEmitterEventName, onItemSelected);
    return () => {
      eventEmitter.off(onPickerDismissEmitterEventName, onItemSelected);
    };
  }, [onPickerDismissEmitterEventName]);

  const pickerItemsLength = Object.keys(items).length;
  const canOpenPicker = pickerItemsLength > 1;
  if (pickerItemsLength === 0) {
    return null;
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        canOpenPicker &&
        navigation.navigate('PickerModalScreen', {
          items: items,
          initialSelection: initialValue,
          onDismissEventEmitterName: onPickerDismissEmitterEventName,
        })
      }
    >
      <Text
        style={
          selectedItemKey !== undefined ? styles.text : styles.placeholderText
        }
      >
        {selectedItemKey ? items[selectedItemKey] : placeholder}
      </Text>
      {canOpenPicker ? (
        <Image source={icons.back} style={styles.arrowDownIcon} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.brightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    ...typography.p3,
    color: colors.textGrayH2,
  },
  text: {
    ...typography.p3,
    color: colors.black,
  },
  arrowDownIcon: {
    height: 10,
    width: 13,
    resizeMode: 'contain',
  },
});

export default BasicPickerInput;
