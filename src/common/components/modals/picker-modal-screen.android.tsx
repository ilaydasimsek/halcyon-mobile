import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { TRootStackParamList } from '@navigation';
import { eventEmitter } from '../../utils/event-emitter';

type TPickerModalScreenProps = RouteProp<
  TRootStackParamList,
  'PickerModalScreen'
>;

/**
 * A screen that shows a picker and invokes an event with the final value on
 * dismiss.
 *
 * Warning: Android and iOS' native pickers are different so Android is separated
 * to make sure the behaviors align. Android has a view that user needs to tap
 * to open the picker. So we are hiding that tappable component and focusing
 * the picker automatically
 *
 * @route.param items Children items to be added to the picker
 * @route.param selectedItem item that should be shown as the initial selection
 * @route.param onDismissEventEmitterName event emitter name that the parent
 *              will listen to, on dismiss modal will send an event with the
 *              selection to this emitter name
 */
const PickerModalScreen = () => {
  const route = useRoute<TPickerModalScreenProps>();
  const pickerRef = useRef<Picker<string>>(null);
  const { items, initialSelection, onDismissEventEmitterName } = route.params;
  const itemEntries = useMemo(() => {
    return Object.entries(items).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);
  const navigation = useNavigation();

  useEffect(() => {
    // Focus the picker automatically to show the item selection view
    // User won't see the picker component but instead will only see the selection view itself
    pickerRef.current?.focus();
  }, []);

  return (
    <Picker
      style={styles.picker}
      ref={pickerRef}
      selectedValue={initialSelection ?? itemEntries[0][0]}
      onValueChange={(itemValue, itemIndex) => {
        eventEmitter.emit(onDismissEventEmitterName, itemEntries[itemIndex][0]);
        navigation.goBack();
      }}
    >
      {itemEntries.map(([key, value]) => (
        <Picker.Item label={value} value={key} key={key} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: { opacity: 0 },
});

export default PickerModalScreen;
