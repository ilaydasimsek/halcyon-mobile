import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors, typography, scale } from '@style';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TRootStackParamList } from '@navigation';
import FastImage from 'react-native-fast-image';

type TProgramScreenProps = RouteProp<TRootStackParamList, 'ProgramScreen'>;

const ProgramScreen = () => {
  const { params } = useRoute<TProgramScreenProps>();
  const yogaPoses = params.yogaPractice.yogaPoses;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[typography.h2, styles.header]}>Program</Text>
      {yogaPoses.map((pose, index) => (
        <View key={index} style={styles.muscleGroupItem}>
          <View>
            <Text style={typography.h6}>{pose.name}</Text>
            <Text style={typography.p4}>{pose.sanskritName}</Text>
          </View>
          {pose.imageUrl && (
            <FastImage
              style={styles.imageView}
              source={{ uri: pose.imageUrl }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  scrollViewContentContainer: {
    paddingVertical: scale(18),
    paddingHorizontal: scale(16),
  },
  muscleGroupItem: {
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(6),
    paddingHorizontal: scale(16),
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  imageView: {
    height: scale(52),
    width: scale(52),
  },
  header: {
    paddingBottom: scale(12),
  },
});

export default ProgramScreen;
