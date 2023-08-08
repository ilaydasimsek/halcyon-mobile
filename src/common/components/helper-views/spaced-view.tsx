import React from 'react';
import { View, ViewProps } from 'react-native';

type TSpacedView = ViewProps & {
  spaceBetween: number;
  spaceAround?: number;
};

/****
 * A component that puts some space in between its children
 *
 * @param spaceBetween The amount of padding in between the children components
 * @param spaceAround The amount of padding around the view itself
 * @param children Children that needs to be spaced out
 * @param props  Rest of the View props
 * @constructor
 */
const SpacedView: React.FC<TSpacedView> = ({
  spaceBetween,
  spaceAround = 0,
  children,
  ...props
}) => {
  const childCount = React.Children.count(children);
  return (
    <View style={{ paddingVertical: spaceAround }}>
      {React.Children.map(children, (child, index) =>
        child !== undefined && child !== null ? (
          <View
            style={index + 1 !== childCount && { marginBottom: spaceBetween }}
            {...props}
          >
            {child}
          </View>
        ) : null,
      )}
    </View>
  );
};

export default SpacedView;
