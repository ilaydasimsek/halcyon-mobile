import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { colors } from '@style';

type TLoadingOverlay = {
  visible: boolean;
};

const SpinnerOverlay: React.FC<TLoadingOverlay> = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View style={styles.modal}>
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            animating={visible}
            color={colors.white}
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black50,
  },
  activityIndicator: {
    padding: 13,
    borderRadius: 13,
  },
});

export default SpinnerOverlay;
