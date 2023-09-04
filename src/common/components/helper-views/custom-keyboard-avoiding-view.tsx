import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CustomKeyboardAvoidingView: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps={'handled'}
      extraScrollHeight={70}
      keyboardOpeningTime={0}
      enableAutomaticScroll={true}
      alwaysBounceVertical={false}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContainer: { flexGrow: 1 },
});

export default CustomKeyboardAvoidingView;
