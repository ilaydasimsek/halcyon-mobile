import React, { useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { TRootStackParamList } from '@navigation';
import BaseModalScreenWrapper from './base-modal-screen-wrapper';
import { eventEmitter } from '../../utils/event-emitter';

export type TPickerModalScreen = {
  items: { [k: string]: string };
  initialSelection?: string;
  onDismissEventEmitterName: string;
};

type TPickerModalScreenProps = RouteProp<
  TRootStackParamList,
  'PickerModalScreen'
>;

/**
 * A screen that shows a picker and invokes an event with the final value on
 * dismiss.
 *
 * Warning: Android and iOS has different pickers, Android is separated into a
 * different file
 *
 * @route.param items Children items to be added to the picker
 * @route.param selectedItem item that should be shown as the initial selection
 * @route.param onDismissEventEmitterName event emitter name that the parent
 *              will listen to, on dismiss modal will send an event with the
 *              selection to this emitter name
 */
const PickerModalScreen = () => {
  const route = useRoute<TPickerModalScreenProps>();
  const { items, initialSelection, onDismissEventEmitterName } = route.params;
  const itemEntries = useMemo(() => {
    return Object.entries(items).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);
  const [selectedValue, setSelectedValue] = useState(
    initialSelection ?? itemEntries[0][0],
  );
  const navigation = useNavigation();

  return (
    <BaseModalScreenWrapper
      onDismiss={() => {
        eventEmitter.emit(onDismissEventEmitterName, selectedValue);
        navigation.goBack();
      }}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedValue(itemEntries[itemIndex][0])
        }
      >
        {itemEntries.map(([key, value]) => (
          <Picker.Item label={value} value={key} key={key} />
        ))}
      </Picker>
    </BaseModalScreenWrapper>
  );
};

export default PickerModalScreen;
