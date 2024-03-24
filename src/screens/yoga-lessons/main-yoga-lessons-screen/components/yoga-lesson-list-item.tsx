import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale, colors, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import { TYogaLesson } from '../../model';
import { images } from '@constants';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

type TLessonListItem = Pick<
  TYogaLesson,
  'id' | 'title' | 'description' | 'coverImageUrl'
>;
const YogaLessonListItem: React.FC<TLessonListItem> = ({
  id,
  title,
  description,
  coverImageUrl,
}) => {
  const navigation = useNavigation();
  return (
    <AnimatedButton
      onPress={() =>
        navigation.navigate('YogaLessonDetailsScreen', {
          yogaLessonId: id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <FastImage
              style={styles.imageView}
              source={
                coverImageUrl ? { uri: coverImageUrl } : images.backupImage1
              }
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.textContainer}>
              <Text style={typography.h6} numberOfLines={2}>
                {title}
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[typography.p4]} numberOfLines={6}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(291),
    height: scale(211),
    backgroundColor: colors.white,
    marginLeft: scale(16),
    borderRadius: 10,
  },
  innerContainer: {
    backgroundColor: colors.lightPink,
    margin: scale(16),
    padding: scale(16),
    borderRadius: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(6),
  },
  textContainer: {
    flex: 1,
  },
  imageView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundGray,
    marginRight: 12,
  },
});

export default YogaLessonListItem;
