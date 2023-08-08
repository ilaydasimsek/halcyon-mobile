import React from 'react';
import { SectionList, SectionListProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@style';
import EllipsisListLoader from './ellipsis-list-loader';

type TBasicSectionList<TItem> = SectionListProps<TItem> & {
  loadingMore?: boolean;
};

const BasicSectionList = <ItemT extends unknown>({
  loadingMore = false,
  ...props
}: TBasicSectionList<ItemT>) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <>
      {props.sections === undefined ? <EllipsisListLoader /> : null}
      <SectionList
        style={[styles.container, props.style]}
        contentContainerStyle={[
          styles.flatListContainer,
          { paddingBottom: safeAreaInsets.bottom },
          props.contentContainerStyle,
        ]}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loadingMore ? <EllipsisListLoader /> : null}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flatListContainer: { paddingVertical: 10 },
});

export default BasicSectionList;
