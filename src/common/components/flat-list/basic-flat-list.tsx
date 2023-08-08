import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@style';
import EllipsisListLoader from './ellipsis-list-loader';

type TBasicFlatList<TItem> = FlatListProps<TItem> & {
  loadingMore?: boolean;
};

const BasicFlatList = <ItemT extends unknown>({
  loadingMore = false,
  ...props
}: TBasicFlatList<ItemT>) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <>
      {props.data === undefined ? <EllipsisListLoader /> : null}
      <FlatList
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

export default BasicFlatList;
