import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useYogaPractices } from '../yoga-practice-query';
import AllPracticesListItem from './components/all-practices-list-item';
import { colors, typography } from '@style';
import { AnimatedButton } from '@components/buttons';

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
  const { data: yogaPracticeData } = useYogaPractices();
  const categories = [
    'Hatha',
    'Vinyasa',
    'Yin',
    'Cat 1',
    'Cat 2',
    'Cat 3',
    'Cat 4',
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
        {categories.map((category) => (
          <CategoryItem
            key={category}
            title={category}
            selected={category === selectedCategory}
            onSelect={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>
      <ScrollView>
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
  categories: {
    margin: 8,
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
