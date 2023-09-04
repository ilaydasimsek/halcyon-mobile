import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useYogaPractices, useYogaStyles } from '../yoga-practice-query';
import AllPracticesListItem from './components/all-practices-list-item';
import { colors, typography } from '@style';
import { AnimatedButton } from '@components/buttons';
import { YogaCategory } from '../model';

type TCategoryItem = {
  title: string;
  selected: boolean;
  onSelect: () => void;
};

const CategoryItem = ({ title, selected, onSelect }: TCategoryItem) => {
  return (
    <AnimatedButton onPress={onSelect}>
      <View
        style={[styles.categoryItem, selected && styles.selectedCategoryItem]}
      >
        <Text style={[typography.p4, selected && styles.selectedCategoryTitle]}>
          {title}
        </Text>
      </View>
    </AnimatedButton>
  );
};

const AllYogaPracticesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<YogaCategory | null>(
    null,
  );

  const { data: yogaPracticeData } = useYogaPractices({
    styleId: selectedCategory?.id,
  });
  const { data: yogaStyleData } = useYogaStyles();

  if (!yogaPracticeData) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <CategoryItem
          key={'All'}
          title={'All'}
          selected={selectedCategory === null}
          onSelect={() => setSelectedCategory(null)}
        />
        {yogaStyleData?.yogaStyles.edges.map((category) => (
          <CategoryItem
            key={category.node.name}
            title={category.node.name}
            selected={category.node === selectedCategory}
            onSelect={() => setSelectedCategory(category.node)}
          />
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.body}>
        {yogaPracticeData.yogaPractices.edges.map(({ node }) => (
          <AllPracticesListItem key={node.id} yogaPractice={node} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
  },
  categories: {
    margin: 8,
    flexGrow: 0,
  },
  categoryItem: {
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 8,
    marginHorizontal: 6,
  },
  selectedCategoryItem: {
    backgroundColor: colors.darkPink,
  },
  selectedCategoryTitle: {
    color: colors.white,
  },
});

export default AllYogaPracticesScreen;
