import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import SettingsListItem from './components/settings-list-item.tsx';
import { scale, typography } from '@style';
import { useDeleteProfileMutation } from './delete-profile-mutation.ts';

const createDeleteProfileAlert = (onConfirmed: Function) => {
  Alert.alert(
    'Delete Profile',
    'Are you sure you want to delete your profile?',
    [
      {
        text: 'Yes, delete profile',
        onPress: () => onConfirmed(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
  );
};

const SettingsScreen: React.FC = () => {
  const [deleteProfile] = useDeleteProfileMutation();
  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed opening page because: ', err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[typography.h6, styles.header]}>Profile</Text>
        <SettingsListItem title="Change Password" onPress={() => {}} />
        <SettingsListItem
          title="Delete Profile"
          onPress={() => createDeleteProfileAlert(deleteProfile)}
        />
      </View>
      <View>
        <Text style={[typography.h6, styles.header]}>Privacy</Text>
        <SettingsListItem
          title={'Privacy Policy'}
          onPress={() => openUrl('https://halcyon.yoga/privacy-notice/')}
        />
        <SettingsListItem
          title={'Terms and Conditions'}
          onPress={() => openUrl('https://halcyon.yoga/terms-and-conditions/')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(12),
  },
  innerContainer: {
    paddingBottom: scale(24),
  },
  header: {
    paddingBottom: scale(12),
  },
});

export default SettingsScreen;
