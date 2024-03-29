import React from 'react';
import { AnimatedButton } from '@components/buttons';
import { View, Text, StyleSheet } from 'react-native';
import { typography, colors, scale } from '@style';
import { icons } from '@constants';
import FastImage from 'react-native-fast-image';
import { TYogaLessonArticleStep } from '../../model';

type TYogaLessonListItem = {
  lessonStep: TYogaLessonArticleStep;
  completed: boolean;
  onPress: () => void;
};

const ArticleListItem: React.FC<TYogaLessonListItem> = ({
  lessonStep,
  completed,
  onPress,
}) => {
  return (
    <AnimatedButton onPress={onPress}>
      <View style={styles.listItemContainer}>
        <View style={styles.listItemBody}>
          <Text style={[typography.h6, styles.title]} numberOfLines={1}>
            {lessonStep.article.title}
          </Text>
        </View>
        <FastImage
          source={completed ? icons.completedChallenge : icons.readArticle}
          style={styles.challengeStateIcon}
        />
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    marginVertical: scale(4),
    marginBottom: scale(12),
    paddingHorizontal: scale(18),
    paddingVertical: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingBottom: scale(8),
  },
  listItemBody: {
    flex: 1,
    paddingRight: scale(14),
  },
  challengeStateIcon: {
    width: scale(28),
    height: scale(28),
  },
});
export default ArticleListItem;
